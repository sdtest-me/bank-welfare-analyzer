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

    // Keep explicit finite checks so 0 is preserved and NaN/undefined do not inflate fallbacks.
    const baseImpact = Number.isFinite(safeResult.welfareIndex)
      ? safeResult.welfareIndex
      : Number.isFinite(safeResult.score)
        ? safeResult.score
        : 50;

    const mismatchScore = Number.isFinite(mismatch.mismatchScore) ? mismatch.mismatchScore : 1;
    const riskLevel = typeof mismatch.riskLevel === 'string' ? mismatch.riskLevel : 'high';

    const bank = spiral.bank || {};
    const population = spiral.population || {};

    const bankDominant = dominantStage(bank);
    const populationDominant = dominantStage(population);
    const toFinite = (value) => (Number.isFinite(value) ? value : 0);
    const dominantGap = toFinite(bank[bankDominant]) - toFinite(population[populationDominant]);
    const redGap = Math.max(0, toFinite(bank.red) - toFinite(population.red));
    const greenGap = Math.max(0, toFinite(population.green) - toFinite(bank.green));
    const structuralGap = STAGES.reduce((sum, stage) => sum + Math.abs(toFinite(bank[stage]) - toFinite(population[stage])), 0) / 2;

    const heavyMismatch = Math.pow(mismatchScore, 1.4);
    const gapPenalty = Math.min(Math.abs(dominantGap) / 40, 1);
    const redPenalty = Math.min(toFinite(bank.red) / 40, 1) * 0.2;

    let penalty =
      0.55 * heavyMismatch +
      0.25 * gapPenalty +
      0.20 * redPenalty;

    penalty = Math.min(penalty, 0.9);

    let impact = baseImpact * (1 - penalty);

    if (mismatchScore > 0.35) {
      impact *= 0.8;
    }

    impact = Math.min(impact, baseImpact + 10);

    const impactIndex = Math.max(0, Math.min(100, Math.round(impact)));

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
