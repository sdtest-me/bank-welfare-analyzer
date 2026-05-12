(function () {
  const STAGES = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'];

  function dominantStage(stageMap) {
    const safeMap = stageMap || {};
    return STAGES.reduce((best, stage) => ((safeMap[stage] || 0) > (safeMap[best] || 0) ? stage : best), STAGES[0]);
  }

  function generateRecommendations(result) {
    const safeResult = result || {};
    const mismatch = safeResult.mismatch || {};
    const spiral = safeResult.spiral || {};
    const bank = spiral.bank || {};
    const population = spiral.population || {};

    const bankDominant = dominantStage(bank);
    const populationDominant = dominantStage(population);
    const driver = mismatch.primaryDriver || 'stageMismatch';

    function tr(key) {
      return (typeof window.i18n !== 'undefined' && typeof window.i18n.translate === 'function')
        ? window.i18n.translate(key)
        : key;
    }
    const driverLabels = (typeof window.i18n !== 'undefined' && typeof window.i18n.translate === 'function')
      ? window.i18n.translate('driverLabels')
      : {};
    const primaryDriverLabel = (driverLabels && driverLabels[driver]) ? driverLabels[driver] : driver;

    const redGap = Math.max(0, (bank.red || 0) - (population.red || 0));
    const greenGap = Math.max(0, (population.green || 0) - (bank.green || 0));
    const esgAlignmentGap = Math.max(0, redGap + greenGap);

    const shortTermByDriver = {
      redPressure: tr('recShortTerm_redPressure'),
      empathyGap: tr('recShortTerm_empathyGap'),
      stageMismatch: tr('recShortTerm_stageMismatch'),
      welfareScorePenalty: tr('recShortTerm_welfareScorePenalty'),
      esgClaimMismatch: tr('recShortTerm_esgClaimMismatch')
    };

    const strategicByStage = {
      red: tr('recStrategic_red'),
      blue: tr('recStrategic_blue'),
      orange: tr('recStrategic_orange'),
      green: tr('recStrategic_green'),
      yellow: tr('recStrategic_yellow'),
      turquoise: tr('recStrategic_turquoise'),
      beige: tr('recStrategic_beige'),
      purple: tr('recStrategic_purple')
    };

    const rawImpact = (safeResult.impact || {}).impactIndex;

    const impactIndex =
      rawImpact === null || rawImpact === undefined || rawImpact === ''
        ? null
        : Number(rawImpact);
    const hasImpact = Number.isFinite(impactIndex);

    const tieredStrategicRecommendation = !hasImpact
      ? tr('recTier_noImpact')
      : impactIndex > 70
        ? tr('recTier_highImpact')
        : impactIndex >= 50
          ? tr('recTier_midImpact')
          : tr('recTier_lowImpact');

    const riskMitigation = [];
    if (esgAlignmentGap >= 20) {
      riskMitigation.push(tr('recRisk_esgHigh'));
    } else {
      riskMitigation.push(tr('recRisk_esgMonitor'));
    }

    if (mismatch.riskLevel === 'high') {
      riskMitigation.push(tr('recRisk_levelHigh'));
    } else if (mismatch.riskLevel === 'medium') {
      riskMitigation.push(tr('recRisk_levelMedium'));
    } else {
      riskMitigation.push(tr('recRisk_levelLow'));
    }

    return {
      shortTermActions: [
        shortTermByDriver[driver] || shortTermByDriver.stageMismatch,
        tr('recPrimaryDriverTemplate').replace('{driver}', primaryDriverLabel)
      ],
      strategicShift: {
        dominantBankStage: bankDominant,
        dominantPopulationStage: populationDominant,
        recommendation: `${strategicByStage[bankDominant] || strategicByStage.orange} ${tieredStrategicRecommendation}`
      },
      riskMitigation
    };
  }

  window.generateRecommendations = generateRecommendations;
})();
