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

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
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

    const esgSignal = parseEsgSignal(esgText);
    const claimsPenalty = esgSignal.claimsHighEsg && (bank.red || 0) >= 25 && (bank.green || 0) <= 10 ? 0.2 : 0;
    const scorePenalty = (100 - score) / 100;
    debugLog('penalties', { claimsPenalty, scorePenalty: Number(scorePenalty.toFixed(3)) });

    const mismatchScore = clamp01(
      (redGap / 40) * 0.35 +
      (greenGap / 40) * 0.25 +
      (structuralGap / 100) * 0.25 +
      scorePenalty * 0.15 +
      claimsPenalty
    );
    debugLog('stage scores', {
      populationDominant: popDominant,
      bankDominant,
      redGap: Number(redGap.toFixed(3)),
      greenGap: Number(greenGap.toFixed(3)),
      structuralGap: Number(structuralGap.toFixed(3)),
      mismatchScore: Number(mismatchScore.toFixed(3))
    });
    debugLog('confidence calculation', {
      esgConfidence: Number((esgSignal.confidence || 0).toFixed(3)),
      claimsHighEsg: esgSignal.claimsHighEsg,
      primaryStage: esgSignal.primaryStage || null
    });

    function calculateAdjustedRiskLevel() {
      const confidence = clamp01(esgSignal.confidence || 0);
      const confidenceCentering = confidence - 0.5;

      const highThreshold = clamp(0.67 - confidenceCentering * 0.12, 0.55, 0.78);
      const mediumThreshold = clamp(0.34 - confidenceCentering * 0.08, 0.22, 0.48);

      let level;
      if (mismatchScore >= highThreshold) level = 'high';
      else if (mismatchScore >= mediumThreshold) level = 'medium';
      else level = 'low';

      return {
        level,
        thresholds: {
          high: highThreshold,
          medium: mediumThreshold
        }
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
          score: (redGap / 40) * 0.35,
          signal: redGap / 40,
          confidenceWeight: 1
        },
        empathyGap: {
          score: (greenGap / 40) * 0.25,
          signal: greenGap / 40,
          confidenceWeight: 1
        },
        stageMismatch: {
          score: (structuralGap / 100) * 0.25,
          signal: structuralGap / 100,
          confidenceWeight: 0.9
        },
        welfareScorePenalty: {
          score: scorePenalty * 0.15,
          signal: scorePenalty,
          confidenceWeight: 0.8
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

    function buildExplanationText(primaryDriver) {
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
          en: 'Bank and population value-stage profiles are structurally misaligned.',
          ru: 'Профили ценностных стадий банка и населения структурно не совпадают.'
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

      const riskText = severity === 'high'
        ? { en: 'High risk of extractive mismatch.', ru: 'Высокий риск экстрактивного несоответствия.' }
        : severity === 'medium'
          ? { en: 'Moderate misalignment risk that needs monitoring.', ru: 'Умеренный риск несоответствия, требуется мониторинг.' }
          : { en: 'Low mismatch risk under current inputs.', ru: 'Низкий риск несоответствия при текущих данных.' };

      return {
        en: `${riskText.en} Main reason: ${labels[primaryDriver].en} Mismatch score ${mismatchScore.toFixed(2)}. ESG confidence ${confidencePct}%. Dominant stages: bank ${bankDominant}, population ${popDominant}.`,
        ru: `${riskText.ru} Главная причина: ${labels[primaryDriver].ru} Индекс несоответствия ${mismatchScore.toFixed(2)}. Уверенность ESG ${confidencePct}%. Доминирующие стадии: банк ${bankDominant}, население ${popDominant}.`
      };
    }

    const driverInference = inferPrimaryDriver();
    const primaryDriver = driverInference.driver;
    const driverConfidence = driverInference.driverConfidence;
    const explanationText = buildExplanationText(primaryDriver);

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
      mismatchDescription
    };
  }

  window.calculateMismatch = calculateMismatch;
})();
