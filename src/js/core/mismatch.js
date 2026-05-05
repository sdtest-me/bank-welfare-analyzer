(function () {
  const STAGES = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'];
  const DEBUG_FLAG_KEY = '__BWA_DEBUG__';

  function isDebugEnabled() {
    if (typeof window === 'undefined') return false;
    if (window[DEBUG_FLAG_KEY] === true) return true;
    try {
      return window.localStorage && window.localStorage.getItem(DEBUG_FLAG_KEY) === 'true';
    } catch (error) {
      return false;
    }
  }

  function debugLog(message, payload) {
    if (!isDebugEnabled()) return;
    if (typeof payload === 'undefined') {
      console.log('[mismatch]', message);
      return;
    }
    console.log('[mismatch]', message, payload);
  }

  function dominantStage(map) {
    return STAGES.reduce((maxStage, stage) => (map[stage] > map[maxStage] ? stage : maxStage), STAGES[0]);
  }

  function parseEsgSignal(esgText) {
    const mapping = typeof window.mapValuesToBehavior === 'function'
      ? window.mapValuesToBehavior(esgText)
      : { hasInput: false, detectedStages: [], primaryStage: null, stageExpectations: {} };

    const detected = mapping.detectedStages || [];
    const claimsHighEsg = detected.includes('green') || detected.includes('yellow') || detected.includes('turquoise');

    return {
      hasInput: !!mapping.hasInput,
      claimsHighEsg,
      detectedStages: detected,
      primaryStage: mapping.primaryStage,
      confidence: typeof mapping.confidence === 'number' ? mapping.confidence : 0,
      stageExpectations: mapping.stageExpectations || {}
    };
  }

  function clamp01(value) {
    return Math.max(0, Math.min(1, value));
  }


  function calculateMismatch(scoringOutput, esgText) {
    const safeOutput = scoringOutput || {};
    const score = typeof safeOutput.score === 'number' ? safeOutput.score : 0;
    const spiral = safeOutput.spiral || {};
    const population = spiral.population || {};
    const bank = spiral.bank || {};

    const popDominant = dominantStage(population);
    const bankDominant = dominantStage(bank);

    const redGap = Math.max(0, (bank.red || 0) - (population.red || 0));
    const greenGap = Math.max(0, (population.green || 0) - (bank.green || 0));
    const structuralGap = STAGES.reduce((sum, stage) => sum + Math.abs((bank[stage] || 0) - (population[stage] || 0)), 0) / 2;
    const stageGap = Math.abs((bank[bankDominant] || 0) - (population[popDominant] || 0));

    const esgSignal = parseEsgSignal(esgText);
    const claimsPenalty = esgSignal.claimsHighEsg && (bank.red || 0) >= 25 && (bank.green || 0) <= 10 ? 0.2 : 0;
    const scorePenalty = (100 - score) / 100;
    debugLog('penalties', { claimsPenalty, scorePenalty: Number(scorePenalty.toFixed(3)) });

    const baseStagePressure = (redGap / 40) * 0.4 + (greenGap / 40) * 0.3;
    const structuralPressure = (structuralGap / 100) * 0.2;
    const scorePressure = scorePenalty * 0.1;

    const heavyGapBoost = clamp01(((redGap + greenGap + stageGap) / 120) ** 1.4);
    const spreadFactor = clamp01(((structuralGap / 100) + (stageGap / 50)) / 2);

    const mismatchScore = clamp01(
      baseStagePressure +
      structuralPressure +
      scorePressure +
      claimsPenalty +
      heavyGapBoost * 0.14 +
      spreadFactor * 0.08
    );
    debugLog('stage scores', {
      populationDominant: popDominant,
      bankDominant,
      redGap: Number(redGap.toFixed(3)),
      greenGap: Number(greenGap.toFixed(3)),
      structuralGap: Number(structuralGap.toFixed(3)),
      dominantStageGap: Number(stageGap.toFixed(3)),
      heavyGapBoost: Number(heavyGapBoost.toFixed(3)),
      spreadFactor: Number(spreadFactor.toFixed(3)),
      mismatchScore: Number(mismatchScore.toFixed(3))
    });
    debugLog('confidence calculation', {
      esgConfidence: Number((esgSignal.confidence || 0).toFixed(3)),
      claimsHighEsg: esgSignal.claimsHighEsg,
      primaryStage: esgSignal.primaryStage || null
    });

    function calculateImpactIndexForRisk() {
      const baseImpact = score;
      const safeMismatch = clamp01(mismatchScore);
      const heavyMismatch = Math.pow(safeMismatch, 1.4);
      const dominantGap = (bank[bankDominant] || 0) - (population[popDominant] || 0);
      const redPenalty = (bank.red || 0) > 25 ? 0.15 : 0;
      const dominantGapPenalty = Math.min(Math.abs(dominantGap) / 40, 1);
      const penalty = Math.min(0.9,
        0.6 * heavyMismatch +
        0.25 * dominantGapPenalty +
        0.15 * redPenalty
      );
      const mismatchPressure = safeMismatch > 0.30 ? 0.9 : 1;

      return Math.max(0, Math.min(100,
        Math.round(baseImpact * (1 - penalty) * mismatchPressure)
      ));
    }

    function calculateAdjustedRiskLevel() {
      const impactIndex = calculateImpactIndexForRisk();

      let level;
      if (impactIndex > 70) level = 'low';
      else if (impactIndex >= 50) level = 'medium';
      else level = 'high';

      if (level === 'low' && (mismatchScore > 0.35 || impactIndex < 60)) {
        level = 'medium';
      }

      return {
        level,
        thresholds: {
          high: 49,
          medium: 70
        },
        impactIndex
      };
    }

    const adjustedRisk = calculateAdjustedRiskLevel();
    const severity = adjustedRisk.level;

    function inferPrimaryDriver() {
      const confidence = clamp01(esgSignal.confidence || 0);
      const confidenceFactor = 0.6 + confidence * 0.8;
      const ambiguityFloor = 0.085;
      const scoreFactors = {
        redPressure: {
          score: (redGap / 40) * 0.4,
          signal: redGap / 40,
          confidenceWeight: 1.05
        },
        empathyGap: {
          score: (greenGap / 40) * 0.3,
          signal: greenGap / 40,
          confidenceWeight: 1
        },
        stageMismatch: {
          score: (structuralGap / 100) * 0.2 + (stageGap / 50) * 0.08,
          signal: clamp01(((structuralGap / 100) + (stageGap / 50)) / 2),
          confidenceWeight: 0.95
        },
        welfareScorePenalty: {
          score: scorePenalty * 0.1,
          signal: scorePenalty,
          confidenceWeight: 0.75
        },
        esgClaimMismatch: {
          score: claimsPenalty,
          signal: claimsPenalty / 0.2,
          confidenceWeight: 0.5 + confidence * 0.9
        }
      };

      const weightedFactors = Object.entries(scoreFactors).map(([name, factor]) => ({
        name,
        weightedScore: factor.score * factor.signal * confidenceFactor * factor.confidenceWeight,
        rawScore: factor.score
      }));
      weightedFactors.sort((a, b) => b.weightedScore - a.weightedScore);

      const top = weightedFactors[0];
      const second = weightedFactors[1];
      const margin = top.weightedScore - (second ? second.weightedScore : 0);

      if (top.weightedScore < ambiguityFloor || margin < ambiguityFloor * 0.35) {
        return {
          driver: 'stageMismatch',
          driverConfidence: clamp01((top.weightedScore + margin) / (ambiguityFloor * 2))
        };
      }

      return {
        driver: top.name,
        driverConfidence: clamp01(top.weightedScore / (top.rawScore + ambiguityFloor))
      };
    }

    function buildExplanationText(primaryDriver, driverConfidence) {
      const confidencePct = Math.round((esgSignal.confidence || 0) * 100);
      const labels = {
        redPressure: {
          en: 'Bank pressure (Red stage) is much higher than social resistance.',
          ru: 'Давление банка (стадия Red) значительно выше сопротивления общества.'
        },
        empathyGap: {
          en: 'Population relies on mutual aid more than the bank shows empathy.',
          ru: 'Население сильнее опирается на взаимопомощь, чем банк проявляет эмпатию.'
        },
        stageMismatch: {
          en: 'Bank and population value-stage profiles show deep structural misalignment across stages.',
          ru: 'Профили ценностных стадий банка и населения демонстрируют глубокое структурное рассогласование.'
        },
        welfareScorePenalty: {
          en: 'Core welfare indicators reduce trust in inclusive impact.',
          ru: 'Базовые показатели благосостояния снижают доверие к инклюзивному эффекту.'
        },
        esgClaimMismatch: {
          en: 'ESG claims conflict with observed high-pressure/low-empathy behavior.',
          ru: 'Заявления ESG конфликтуют с наблюдаемым высоким давлением и низкой эмпатией.'
        }
      };

      const uncertaintyBand = (esgSignal.confidence + driverConfidence) / 2;
      const uncertaintyText = uncertaintyBand >= 0.75
        ? { en: 'Uncertainty: low.', ru: 'Неопределенность: низкая.' }
        : uncertaintyBand >= 0.45
          ? { en: 'Uncertainty: medium.', ru: 'Неопределенность: средняя.' }
          : { en: 'Uncertainty: high.', ru: 'Неопределенность: высокая.' };

      const riskText = severity === 'high'
        ? { en: 'High risk of extractive mismatch.', ru: 'Высокий риск экстрактивного несоответствия.' }
        : severity === 'medium'
          ? { en: 'Moderate misalignment risk that needs monitoring.', ru: 'Умеренный риск несоответствия, требуется мониторинг.' }
          : { en: 'Current indicators suggest limited immediate mismatch exposure.', ru: 'Текущие индикаторы указывают на ограниченную немедленную экспозицию несоответствия.' };

      return {
        en: `${riskText.en} ${uncertaintyText.en} Main reason: ${labels[primaryDriver].en} Mismatch score ${mismatchScore.toFixed(2)}. ESG confidence ${confidencePct}%. Driver confidence ${Math.round(driverConfidence * 100)}%. Dominant stages: bank ${bankDominant}, population ${popDominant}.`,
        ru: `${riskText.ru} ${uncertaintyText.ru} Главная причина: ${labels[primaryDriver].ru} Индекс несоответствия ${mismatchScore.toFixed(2)}. Уверенность ESG ${confidencePct}%. Уверенность драйвера ${Math.round(driverConfidence * 100)}%. Доминирующие стадии: банк ${bankDominant}, население ${popDominant}.`
      };
    }

    function confidenceTone(driverConfidence) {
      const combined = clamp01(((esgSignal.confidence || 0) + (driverConfidence || 0)) / 2);
      if (combined >= 0.75) {
        return {
          qualifier: { en: 'is likely to', ru: 'с высокой вероятностью может' },
          context: { en: 'Signal confidence is relatively high for this scenario.', ru: 'Уверенность сигнала относительно высокая для этого сценария.' }
        };
      }
      if (combined >= 0.45) {
        return {
          qualifier: { en: 'may', ru: 'может' },
          context: { en: 'Signal confidence is moderate, so outcomes are uncertain.', ru: 'Уверенность сигнала средняя, поэтому исходы неопределенны.' }
        };
      }
      return {
        qualifier: { en: 'could potentially', ru: 'потенциально может' },
        context: { en: 'Signal confidence is limited, so treat this as a provisional signal.', ru: 'Уверенность сигнала ограниченная, воспринимайте это как предварительный сигнал.' }
      };
    }

    function buildPredictiveImpact(primaryDriver, driverConfidence) {
      const stageGapSigned = (bank[bankDominant] || 0) - (population[popDominant] || 0);
      const impactIndex = adjustedRisk.impactIndex;
      const dominantGapAbs = Math.abs(stageGapSigned);
      const structuralGapValue = structuralGap;
      const stageContext = {
        en: `Bank dominant stage ${bankDominant} (${bank[bankDominant] || 0}%) vs population ${popDominant} (${population[popDominant] || 0}%), gap ${Math.round(stageGapSigned)}pp.`,
        ru: `Доминирующая стадия банка ${bankDominant} (${bank[bankDominant] || 0}%) против населения ${popDominant} (${population[popDominant] || 0}%), разрыв ${Math.round(stageGapSigned)} п.п.`
      };

      const stabilityTone = impactIndex > 70
        ? {
          shortTerm: { en: 'Current signals suggest stable alignment with manageable stress pockets.', ru: 'Текущие сигналы указывают на устойчивое выравнивание с управляемыми зонами стресса.' },
          longTerm: { en: 'The trajectory is broadly stable if corrective discipline is maintained.', ru: 'Траектория в целом устойчива при сохранении корректирующей дисциплины.' }
        }
        : impactIndex >= 50
          ? {
            shortTerm: { en: 'Signals indicate a transitional and somewhat unstable alignment period.', ru: 'Сигналы показывают переходный и частично нестабильный период выравнивания.' },
            longTerm: { en: 'Without calibration, transitional instability can harden into persistent drag.', ru: 'Без калибровки переходная нестабильность может закрепиться как постоянное ограничение.' }
          }
          : {
            shortTerm: { en: 'Signals point to structural risk and active welfare-pressure transmission.', ru: 'Сигналы указывают на структурный риск и активную передачу давления на благосостояние.' },
            longTerm: { en: 'Structural risk can compound into entrenched exclusion and trust erosion.', ru: 'Структурный риск может накапливаться в закрепленное исключение и эрозию доверия.' }
          };

      const driverNarratives = [];
      if (dominantGapAbs >= 15) {
        driverNarratives.push({
          shortTerm: { en: 'Cultural and power misalignment is visible in frontline lending interactions.', ru: 'Культурное и силовое несоответствие заметно во фронтальных взаимодействиях кредитования.' },
          longTerm: { en: 'If left unresolved, cultural-power distance can weaken institutional legitimacy.', ru: 'Если не устранить, культурно-силовая дистанция может ослабить институциональную легитимность.' }
        });
      }
      if (structuralGapValue >= 24) {
        driverNarratives.push({
          shortTerm: { en: 'Systemic misalignment across stages is already reducing policy fit.', ru: 'Системное несоответствие между стадиями уже снижает соответствие политик контексту.' },
          longTerm: { en: 'Persistent systemic misalignment may lock credit strategy into low-adaptation cycles.', ru: 'Длительное системное несоответствие может зафиксировать кредитную стратегию в циклах низкой адаптации.' }
        });
      }
      if (mismatchScore > 0.35) {
        driverNarratives.push({
          shortTerm: { en: 'Behavioral friction is increasing execution cost across borrower journeys.', ru: 'Поведенческое трение повышает стоимость исполнения на пути заемщика.' },
          longTerm: { en: 'Repeated behavioral friction can depress repayment culture and cooperative trust.', ru: 'Повторяющееся поведенческое трение может ослабить культуру возврата и кооперативное доверие.' }
        });
      }

      const driverImpact = {
        redPressure: {
          shortTerm: { en: 'Repayment pressure is likely to intensify among vulnerable households.', ru: 'Давление на погашение, вероятно, усилится у уязвимых домохозяйств.' },
          longTerm: { en: 'Sustained pressure can convert financial strain into social backlash.', ru: 'Устойчивое давление может превратить финансовое напряжение в социальную ответную реакцию.' }
        },
        empathyGap: {
          shortTerm: { en: 'Borrowers may shift toward informal coping channels during shocks.', ru: 'Заемщики могут смещаться к неформальным каналам адаптации во время шоков.' },
          longTerm: { en: 'Fragile segments may be excluded from healthy credit mobility pathways.', ru: 'Хрупкие сегменты могут быть исключены из здоровых траекторий кредитной мобильности.' }
        },
        stageMismatch: {
          shortTerm: { en: 'Product logic and social context are diverging in implementation.', ru: 'Логика продуктов и социальный контекст расходятся в реализации.' },
          longTerm: { en: 'Institutional mismatch may normalize low-welfare lending equilibrium.', ru: 'Институциональное несоответствие может нормализовать низко-благосостоянное кредитное равновесие.' }
        },
        welfareScorePenalty: {
          shortTerm: { en: 'Weak welfare baseline is constraining inclusive impact of new credit.', ru: 'Слабая база благосостояния ограничивает инклюзивный эффект нового кредита.' },
          longTerm: { en: 'Without welfare recovery, credit growth may amplify inequality dynamics.', ru: 'Без восстановления благосостояния рост кредита может усилить динамику неравенства.' }
        },
        esgClaimMismatch: {
          shortTerm: { en: 'Credibility tension between ESG messaging and borrower experience can widen.', ru: 'Напряжение доверия между ESG-коммуникацией и опытом заемщика может расширяться.' },
          longTerm: { en: 'Claim-behavior divergence may erode reform capacity and brand trust.', ru: 'Расхождение заявлений и поведения может подорвать реформаторский потенциал и доверие к бренду.' }
        }
      };

      const selected = driverImpact[primaryDriver] || driverImpact.stageMismatch;
      const tone = confidenceTone(driverConfidence);
      const driverOverlay = driverNarratives[0] || null;

      return {
        shortTerm: {
          en: `${stabilityTone.shortTerm.en} ${selected.shortTerm.en}${driverOverlay ? ` ${driverOverlay.shortTerm.en}` : ''} ${tone.context.en} ${stageContext.en}`,
          ru: `${stabilityTone.shortTerm.ru} ${selected.shortTerm.ru}${driverOverlay ? ` ${driverOverlay.shortTerm.ru}` : ''} ${tone.context.ru} ${stageContext.ru}`
        },
        longTerm: {
          en: `${stabilityTone.longTerm.en} ${selected.longTerm.en}${driverOverlay ? ` ${driverOverlay.longTerm.en}` : ''} ${tone.context.en} ${stageContext.en}`,
          ru: `${stabilityTone.longTerm.ru} ${selected.longTerm.ru}${driverOverlay ? ` ${driverOverlay.longTerm.ru}` : ''} ${tone.context.ru} ${stageContext.ru}`
        }
      };
    }


    const driverInference = inferPrimaryDriver();
    const primaryDriver = driverInference.driver;
    const driverConfidence = driverInference.driverConfidence;
    const explanationText = buildExplanationText(primaryDriver, driverConfidence);
    const predictiveImpact = buildPredictiveImpact(primaryDriver, driverConfidence);

    const mismatchDescription = {
      en: `Mismatch is ${severity}: bank dominant stage is ${bankDominant} (${bank[bankDominant] || 0}%) while population is ${popDominant} (${population[popDominant] || 0}%). Red pressure gap: ${Math.round(redGap)}pp, empathy gap: ${Math.round(greenGap)}pp.${esgSignal.hasInput ? ` ESG mapping confidence: ${Math.round((esgSignal.confidence || 0) * 100)}%.` : ''}${esgSignal.hasInput ? (esgSignal.claimsHighEsg ? ` ESG value stages detected: ${esgSignal.detectedStages.join(', ') || 'none'}. Expected behavior: ${esgSignal.primaryStage ? ((esgSignal.stageExpectations[esgSignal.primaryStage] || {}).en || 'not defined') : 'not defined'}` : ' ESG text provided but no strong sustainability claim detected.') : ''}`,
      ru: `Несоответствие ${severity === 'high' ? 'высокое' : severity === 'medium' ? 'среднее' : 'низкое'}: доминирующая стадия банка — ${bankDominant} (${bank[bankDominant] || 0}%), населения — ${popDominant} (${population[popDominant] || 0}%). Разрыв по Red: ${Math.round(redGap)} п.п., по эмпатии (Green): ${Math.round(greenGap)} п.п.${esgSignal.hasInput ? ` Уверенность ESG-мэппинга: ${Math.round((esgSignal.confidence || 0) * 100)}%.` : ''}${esgSignal.hasInput ? (esgSignal.claimsHighEsg ? ` Обнаружены ценностные стадии ESG: ${esgSignal.detectedStages.join(', ') || 'нет'}. Ожидаемое поведение: ${esgSignal.primaryStage ? ((esgSignal.stageExpectations[esgSignal.primaryStage] || {}).ru || 'не определено') : 'не определено'}` : ' ESG-текст есть, но сильных заявлений об устойчивости не найдено.') : ''}`
    };

    return {
      mismatchScore,
      esgConfidence: esgSignal.confidence || 0,
      riskLevel: severity,
      adjustedRiskLevel: severity,
      primaryDriver,
      driverConfidence,
      explanationText,
      predictiveImpact,
      mismatchDescription
    };
  }

  window.calculateMismatch = calculateMismatch;
})();
