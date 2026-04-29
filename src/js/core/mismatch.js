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

    let severity;
    if (mismatchScore >= 0.67) severity = 'high';
    else if (mismatchScore >= 0.34) severity = 'medium';
    else severity = 'low';

    function inferPrimaryDriver() {
      const scoreFactors = {
        redPressure: (redGap / 40) * 0.35,
        empathyGap: (greenGap / 40) * 0.25,
        stageMismatch: (structuralGap / 100) * 0.25,
        welfareScorePenalty: scorePenalty * 0.15,
        esgClaimMismatch: claimsPenalty
      };
      const topFactor = Object.entries(scoreFactors).reduce((max, item) => (item[1] > max[1] ? item : max), ['redPressure', 0]);
      return topFactor[0];
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

    const primaryDriver = inferPrimaryDriver();
    const explanationText = buildExplanationText(primaryDriver);

    const mismatchDescription = {
      en: `Mismatch is ${severity}: bank dominant stage is ${bankDominant} (${bank[bankDominant] || 0}%) while population is ${popDominant} (${population[popDominant] || 0}%). Red pressure gap: ${Math.round(redGap)}pp, empathy gap: ${Math.round(greenGap)}pp.${esgSignal.hasInput ? ` ESG mapping confidence: ${Math.round((esgSignal.confidence || 0) * 100)}%.` : ''}${esgSignal.hasInput ? (esgSignal.claimsHighEsg ? ` ESG value stages detected: ${esgSignal.detectedStages.join(', ') || 'none'}. Expected behavior: ${esgSignal.primaryStage ? ((esgSignal.stageExpectations[esgSignal.primaryStage] || {}).en || 'not defined') : 'not defined'}` : ' ESG text provided but no strong sustainability claim detected.') : ''}`,
      ru: `Несоответствие ${severity === 'high' ? 'высокое' : severity === 'medium' ? 'среднее' : 'низкое'}: доминирующая стадия банка — ${bankDominant} (${bank[bankDominant] || 0}%), населения — ${popDominant} (${population[popDominant] || 0}%). Разрыв по Red: ${Math.round(redGap)} п.п., по эмпатии (Green): ${Math.round(greenGap)} п.п.${esgSignal.hasInput ? ` Уверенность ESG-мэппинга: ${Math.round((esgSignal.confidence || 0) * 100)}%.` : ''}${esgSignal.hasInput ? (esgSignal.claimsHighEsg ? ` Обнаружены ценностные стадии ESG: ${esgSignal.detectedStages.join(', ') || 'нет'}. Ожидаемое поведение: ${esgSignal.primaryStage ? ((esgSignal.stageExpectations[esgSignal.primaryStage] || {}).ru || 'не определено') : 'не определено'}` : ' ESG-текст есть, но сильных заявлений об устойчивости не найдено.') : ''}`
    };

    return {
      mismatchScore,
      esgConfidence: esgSignal.confidence || 0,
      riskLevel: severity,
      primaryDriver,
      explanationText,
      mismatchDescription
    };
  }

  window.calculateMismatch = calculateMismatch;
})();
