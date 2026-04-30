(function () {
  const STAGES = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'];

  function dominantStage(stageMap) {
    const safeMap = stageMap || {};
    return STAGES.reduce((best, stage) => ((safeMap[stage] || 0) > (safeMap[best] || 0) ? stage : best), STAGES[0]);
  }

  function calculateImpact(result) {
    const safeResult = result || {};
    const mismatch = safeResult.mismatch || {};
    const spiral = safeResult.spiral || {};
    const prediction = mismatch.predictiveImpact || {};

    const mismatchScore = Number.isFinite(mismatch.mismatchScore) ? mismatch.mismatchScore : 1;
    const riskLevel = typeof mismatch.riskLevel === 'string' ? mismatch.riskLevel : 'high';

    const bank = spiral.bank || {};
    const population = spiral.population || {};

    const bankDominant = dominantStage(bank);
    const populationDominant = dominantStage(population);
    const dominantGap = (bank[bankDominant] || 0) - (population[populationDominant] || 0);
    const redGap = Math.max(0, (bank.red || 0) - (population.red || 0));
    const greenGap = Math.max(0, (population.green || 0) - (bank.green || 0));
    const structuralGap = STAGES.reduce((sum, stage) => sum + Math.abs((bank[stage] || 0) - (population[stage] || 0)), 0) / 2;

    const impactIndex = Math.max(0, Math.min(100,
      Math.round((mismatchScore * 65 + Math.min(structuralGap, 100) / 100 * 25 + Math.min(Math.abs(dominantGap), 40) / 40 * 10) * 100)
    ));

    let reputationalRiskKey = 'impactRiskLow';
    if (riskLevel === 'high' || mismatchScore >= 0.67 || redGap >= 18) reputationalRiskKey = 'impactRiskHigh';
    else if (riskLevel === 'medium' || mismatchScore >= 0.34 || redGap >= 10 || greenGap >= 10) reputationalRiskKey = 'impactRiskMedium';

    return {
      impactIndex,
      reputationalRiskKey,
      stageGaps: {
        bankDominant,
        populationDominant,
        dominantGap: Math.round(dominantGap),
        redGap: Math.round(redGap),
        greenGap: Math.round(greenGap),
        structuralGap: Math.round(structuralGap)
      },
      prediction: {
        shortTerm: prediction.shortTerm || null,
        longTerm: prediction.longTerm || null
      }
    };
  }

  window.calculateImpact = calculateImpact;
})();
