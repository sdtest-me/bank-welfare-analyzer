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

    const mismatchScore = Number.isFinite(mismatch.mismatchScore) ? mismatch.mismatchScore : 0;
    const riskLevel = typeof mismatch.riskLevel === 'string' ? mismatch.riskLevel : 'high';

    const bank = spiral.bank || {};
    const population = spiral.population || {};

    const bankDominant = dominantStage(bank);
    const populationDominant = dominantStage(population);
    const computedDominantGap = (bank[bankDominant] || 0) - (population[populationDominant] || 0);
    const dominantGap = Number.isFinite(mismatch.dominantStageGap) ? Math.abs(mismatch.dominantStageGap) : Math.abs(computedDominantGap);
    const redGap = Math.max(0, (bank.red || 0) - (population.red || 0));
    const greenGap = Math.max(0, (population.green || 0) - (bank.green || 0));
    const structuralGap = STAGES.reduce((sum, stage) => sum + Math.abs((bank[stage] || 0) - (population[stage] || 0)), 0) / 2;

    const baseImpact = safeResult.welfareIndex || safeResult.score || 50;
    let mismatchPenalty = mismatchScore * 40;
    if (mismatchScore > 0.35) mismatchPenalty *= 1.2;

    const stagePenalty = dominantGap * 0.8;
    const redPenalty = redGap * 0.6;
    const greenPenalty = greenGap * 0.4;

    const impactRaw = baseImpact - mismatchPenalty - stagePenalty - redPenalty - greenPenalty;
    const impactIndex = Math.round(Math.max(0, Math.min(100, impactRaw)));

    let reputationalRiskKey = 'impactRiskLow';
    if (riskLevel === 'high' || mismatchScore >= 0.67 || redGap >= 18) reputationalRiskKey = 'impactRiskHigh';
    else if (riskLevel === 'medium' || mismatchScore >= 0.34 || redGap >= 10 || greenGap >= 10) reputationalRiskKey = 'impactRiskMedium';

    return {
      impactIndex,
      reputationalRiskKey,
      stageGaps: {
        bankDominant,
        populationDominant,
        dominantGap: Math.round(computedDominantGap),
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
