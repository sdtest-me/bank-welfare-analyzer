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

    const mismatchDescription = {
      en: `Mismatch is ${severity}: bank dominant stage is ${bankDominant} (${bank[bankDominant] || 0}%) while population is ${popDominant} (${population[popDominant] || 0}%). Red pressure gap: ${Math.round(redGap)}pp, empathy gap: ${Math.round(greenGap)}pp.${esgSignal.hasInput ? ` ESG mapping confidence: ${Math.round((esgSignal.confidence || 0) * 100)}%.` : ''}${esgSignal.hasInput ? (esgSignal.claimsHighEsg ? ` ESG value stages detected: ${esgSignal.detectedStages.join(', ') || 'none'}. Expected behavior: ${esgSignal.primaryStage ? ((esgSignal.stageExpectations[esgSignal.primaryStage] || {}).en || 'not defined') : 'not defined'}` : ' ESG text provided but no strong sustainability claim detected.') : ''}`,
      ru: `Несоответствие ${severity === 'high' ? 'высокое' : severity === 'medium' ? 'среднее' : 'низкое'}: доминирующая стадия банка — ${bankDominant} (${bank[bankDominant] || 0}%), населения — ${popDominant} (${population[popDominant] || 0}%). Разрыв по Red: ${Math.round(redGap)} п.п., по эмпатии (Green): ${Math.round(greenGap)} п.п.${esgSignal.hasInput ? ` Уверенность ESG-мэппинга: ${Math.round((esgSignal.confidence || 0) * 100)}%.` : ''}${esgSignal.hasInput ? (esgSignal.claimsHighEsg ? ` Обнаружены ценностные стадии ESG: ${esgSignal.detectedStages.join(', ') || 'нет'}. Ожидаемое поведение: ${esgSignal.primaryStage ? ((esgSignal.stageExpectations[esgSignal.primaryStage] || {}).ru || 'не определено') : 'не определено'}` : ' ESG-текст есть, но сильных заявлений об устойчивости не найдено.') : ''}`
    };

    return {
      mismatchScore,
      esgConfidence: esgSignal.confidence || 0,
      mismatchDescription
    };
  }

  window.calculateMismatch = calculateMismatch;
})();
