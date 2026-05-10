(function () {
  const STAGES = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'];


  function toFinite(value) {
    return Number.isFinite(value) ? value : 0;
  }

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
    const safeMismatch = Math.max(0, Math.min(1, toFinite(mismatchScore)));
    // Stronger convex response to mismatch tail (calibration #75); keep architecture: single penalty + pressure.
    const mismatchBoost = Math.pow(safeMismatch, 1.72);
    const riskLevel = typeof mismatch.riskLevel === 'string' ? mismatch.riskLevel : 'high';

    const bank = spiral.bank || {};
    const population = spiral.population || {};

    const bankDominant = dominantStage(bank);
    const populationDominant = dominantStage(population);
    const dominantGap = (bank[bankDominant] || 0) - (population[populationDominant] || 0);
    const redGap = Math.max(0, (bank.red || 0) - (population.red || 0));
    const greenGap = Math.max(0, (population.green || 0) - (bank.green || 0));
    const structuralGap = STAGES.reduce((sum, stage) => sum + Math.abs((bank[stage] || 0) - (population[stage] || 0)), 0) / 2;
    const structuralNorm = Math.min(structuralGap / 100, 1);
    const redPenalty = (bank.red || 0) > 25 ? 0.15 : 0;
    const dominantGapPenalty = Math.min(Math.abs(dominantGap) / 40, 1);
    const penalty = Math.min(0.94,
      0.78 * mismatchBoost +
      0.28 * dominantGapPenalty +
      0.15 * redPenalty +
      0.12 * structuralNorm
    );

    // Extra amplitude for elevated mismatch: analyzeBank nests mismatch on result.mismatch (no top-level mismatchScore).
    let mismatchPressure = 1;
    if (safeMismatch > 0.30) {
      mismatchPressure = 0.88 - 0.20 * Math.min(1, (safeMismatch - 0.30) / 0.55);
    }

    const impactIndex = Math.max(0, Math.min(100,
      Math.round(baseImpact * (1 - penalty) * mismatchPressure)
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
