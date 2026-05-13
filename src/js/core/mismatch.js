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

  function amplifyGap(gap, normalizer) {
    const safeGap = Math.max(0, gap || 0);
    const safeNormalizer = Math.max(1, normalizer || 1);
    const linearPressure = clamp01(safeGap / safeNormalizer);

    if (safeGap <= 5) {
      return linearPressure * 0.8;
    }

    const amplifiedTail = Math.pow(
      clamp01((safeGap - 5) / Math.max(1, safeNormalizer - 5)),
      1.3
    );

    return clamp01(linearPressure + amplifiedTail * 0.3);
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

    const redPressure = amplifyGap(redGap, 40);
    const empathyPressure = amplifyGap(greenGap, 40);
    const dominantStagePressure = amplifyGap(stageGap, 50);
    const structuralMismatchPressure = amplifyGap(structuralGap, 100);

    const baseStagePressure = redPressure * 0.42 + empathyPressure * 0.34;
    const structuralPressure = structuralMismatchPressure * 0.18;
    const stageGapPressure = dominantStagePressure * 0.12;
    const scorePressure = scorePenalty * 0.08;

    const heavyGapBoost = clamp01(((redGap + greenGap + stageGap) / 120) ** 1.4);
    const spreadFactor = clamp01(((structuralGap / 100) + (stageGap / 50)) / 2);

    const mismatchScore = clamp01(
      baseStagePressure +
      structuralPressure +
      stageGapPressure +
      scorePressure +
      claimsPenalty +
      heavyGapBoost * 0.12 +
      spreadFactor * 0.08
    );
    debugLog('stage scores', {
      populationDominant: popDominant,
      bankDominant,
      redGap: Number(redGap.toFixed(3)),
      greenGap: Number(greenGap.toFixed(3)),
      structuralGap: Number(structuralGap.toFixed(3)),
      dominantStageGap: Number(stageGap.toFixed(3)),
      redPressure: Number(redPressure.toFixed(3)),
      empathyPressure: Number(empathyPressure.toFixed(3)),
      dominantStagePressure: Number(dominantStagePressure.toFixed(3)),
      structuralMismatchPressure: Number(structuralMismatchPressure.toFixed(3)),
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
      // Keep in sync with calculateImpact() in impact.js (PR #116 calibration)
      const heavyMismatch = Math.pow(safeMismatch, 1.72);
      const dominantGap = (bank[bankDominant] || 0) - (population[popDominant] || 0);
      const redPenalty = (bank.red || 0) > 25 ? 0.15 : 0;
      const dominantGapPenalty = Math.min(Math.abs(dominantGap) / 40, 1);
      const structuralNorm = Math.min(structuralGap / 100, 1);
      const penalty = Math.min(0.94,
        0.78 * heavyMismatch +
        0.28 * dominantGapPenalty +
        0.15 * redPenalty +
        0.12 * structuralNorm
      );
      let mismatchPressure = 1;
      if (safeMismatch > 0.30) {
        mismatchPressure = 0.88 - 0.20 * Math.min(1, (safeMismatch - 0.30) / 0.55);
      }

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
          score: redPressure * 0.42,
          signal: redPressure,
          confidenceWeight: 1.12
        },
        empathyGap: {
          score: empathyPressure * 0.34,
          signal: empathyPressure,
          confidenceWeight: 1.08
        },
        stageMismatch: {
          score: structuralMismatchPressure * 0.18 + dominantStagePressure * 0.12,
          signal: clamp01((structuralMismatchPressure + dominantStagePressure) / 2),
          confidenceWeight: 1.02
        },
        welfareScorePenalty: {
          score: scorePenalty * 0.08,
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
          ru: 'Давление банка (Красная стадия) значительно выше сопротивления общества.'
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

      function localizedStageName(stageKey) {
        try {
          const i18n = typeof window !== 'undefined' ? window.i18n : null;
          const lang = i18n && i18n.lang;
          const bundle = i18n && i18n.tr && lang ? i18n.tr[lang] : null;
          const stages = bundle && bundle.stages;
          const label = stages && stages[stageKey];
          if (typeof label === 'string' && label.length) return label;
        } catch (error) {
          /* ignore i18n access errors */
        }
        return stageKey;
      }
      const bankStageLabel = localizedStageName(bankDominant);
      const populationStageLabel = localizedStageName(popDominant);
      return {
        en: `${riskText.en} ${uncertaintyText.en} Main reason: ${labels[primaryDriver].en} Mismatch score ${mismatchScore.toFixed(2)}. ESG confidence ${confidencePct}%. Driver confidence ${Math.round(driverConfidence * 100)}%. Dominant stages: bank — ${bankStageLabel}, population — ${populationStageLabel}.`,
        ru: `${riskText.ru} ${uncertaintyText.ru} Главная причина: ${labels[primaryDriver].ru} Индекс несоответствия ${mismatchScore.toFixed(2)}. Уверенность ESG ${confidencePct}%. Уверенность драйвера ${Math.round(driverConfidence * 100)}%. Доминирующая стадия банка — ${bankStageLabel}, населения — ${populationStageLabel}.`
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
        context: { en: 'Signal confidence is limited, so treat this as an early warning.', ru: 'Уверенность сигнала ограниченная, воспринимайте это как ранний сигнал.' }
      };
    }

    function buildPredictiveImpact(primaryDriver, driverConfidence) {
      const stageGapSigned = (bank[bankDominant] || 0) - (population[popDominant] || 0);
      const tensionLevel = mismatchScore >= 0.67 ? 'high' : mismatchScore >= 0.34 ? 'medium' : 'low';
      function localStage(key) {
        try {
          const b = window.i18n && window.i18n.tr && window.i18n.lang ? window.i18n.tr[window.i18n.lang] : null;
          const s = b && b.stages && b.stages[key];
          return (typeof s === 'string' && s.length) ? s : key;
        } catch(e) { return key; }
      }
      const bankStageLocalized = localStage(bankDominant);
      const popStageLocalized = localStage(popDominant);
      const stageContext = {
        en: `Bank dominant stage ${bankStageLocalized} (${bank[bankDominant] || 0}%) vs population ${popStageLocalized} (${population[popDominant] || 0}%), gap ${Math.round(stageGapSigned)}pp.`,
        ru: `Доминирующая стадия банка — ${bankStageLocalized} (${bank[bankDominant] || 0}%), населения — ${popStageLocalized} (${population[popDominant] || 0}%), разрыв ${Math.round(stageGapSigned)} п.п.`
      };
      const driverImpact = {
        redPressure: {
          shortTerm: {
            en: 'higher repayment pressure and faster debt rollover among vulnerable households',
            ru: 'рост давления на погашение и ускорение перекредитования у уязвимых домохозяйств'
          },
          longTerm: {
            en: 'rising social resentment and weaker trust in formal finance channels',
            ru: 'рост социального раздражения и снижение доверия к формальным финансовым каналам'
          }
        },
        empathyGap: {
          shortTerm: {
            en: 'more reliance on informal mutual aid to cover loan-servicing shocks',
            ru: 'усиление опоры на неформальную взаимопомощь для покрытия кредитных шоков'
          },
          longTerm: {
            en: 'exclusion of fragile borrowers from healthy credit cycles and slower mobility',
            ru: 'исключение хрупких заемщиков из здоровых кредитных циклов и замедление мобильности'
          }
        },
        stageMismatch: {
          shortTerm: {
            en: 'policy communication friction: bank products fit bank culture better than social needs',
            ru: 'трение в коммуникации: продукты банка лучше соответствуют культуре банка, чем нуждам общества'
          },
          longTerm: {
            en: 'persistent institutional mismatch that can lock the system into low-welfare credit patterns',
            ru: 'устойчивое институциональное несоответствие, закрепляющее низко-благосостоянные кредитные паттерны'
          }
        },
        welfareScorePenalty: {
          shortTerm: {
            en: 'current welfare baseline limiting immediate inclusive impact of new lending',
            ru: 'текущая база благосостояния, ограничивающая немедленный инклюзивный эффект нового кредитования'
          },
          longTerm: {
            en: 'Without welfare recovery, credit expansion risks amplifying inequality over time.',
            ru: 'Без восстановления благосостояния расширение кредитования со временем усиливает неравенство.'
          }
        },
        esgClaimMismatch: {
          shortTerm: {
            en: 'Credibility gap between ESG messaging and borrower experience may widen quickly.',
            ru: 'Разрыв доверия между ESG-риторикой и опытом заемщиков может быстро расшириться.'
          },
          longTerm: {
            en: 'Sustained claim-behavior inconsistency may erode brand legitimacy and reform capacity.',
            ru: 'Длительное расхождение заявлений и поведения подрывает легитимность бренда и способность к реформам.'
          }
        }
      };

      const selected = driverImpact[primaryDriver] || driverImpact.stageMismatch;
      const tone = confidenceTone(driverConfidence);
      const riskPrefix = tensionLevel === 'high'
        ? { en: 'Near-term risk is likely elevated.', ru: 'Краткосрочный риск, вероятно, повышен.' }
        : tensionLevel === 'medium'
          ? { en: 'Near-term risk may be manageable but active.', ru: 'Краткосрочный риск может быть управляемым, но активным.' }
          : { en: 'Near-term risk could be limited under current inputs.', ru: 'Краткосрочный риск может быть ограничен при текущих данных.' };

      return {
        shortTerm: {
          en: `${riskPrefix.en} This scenario ${tone.qualifier.en} lead to ${selected.shortTerm.en}. ${tone.context.en} ${stageContext.en}`,
          ru: `${riskPrefix.ru} Этот сценарий ${tone.qualifier.ru} привести к следующему: ${selected.shortTerm.ru}. ${tone.context.ru} ${stageContext.ru}`
        },
        longTerm: {
          en: `Over time, this scenario ${tone.qualifier.en} contribute to ${selected.longTerm.en} ${tone.context.en} ${stageContext.en}`,
          ru: `Со временем этот сценарий ${tone.qualifier.ru} привести к следующему: ${selected.longTerm.ru} ${tone.context.ru} ${stageContext.ru}`
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
