(function () {
  const riskPriority = { low: 0, medium: 1, high: 2 };

  function normalizeRiskLevel(level) {
    const safeLevel = typeof level === 'string' ? level.toLowerCase() : '';
    return Object.prototype.hasOwnProperty.call(riskPriority, safeLevel) ? safeLevel : 'high';
  }

  function toComparableResult(item) {
    const source = item || {};
    const mismatch = source.mismatch || {};
    const mismatchScore = Number(mismatch.mismatchScore);
    const riskLevel = normalizeRiskLevel(mismatch.riskLevel);

    return {
      ...source,
      mismatch: {
        ...mismatch,
        mismatchScore: Number.isFinite(mismatchScore) ? mismatchScore : 1,
        riskLevel
      }
    };
  }

  function normalizeImpactRiskKey(key) {
    if (key === 'impactRiskHigh') return 'high';
    if (key === 'impactRiskMedium') return 'medium';
    return 'low';
  }

  function applyFinalRiskOverride(item) {
    const comparable = toComparableResult(item);
    const impact = typeof window.calculateImpact === 'function'
      ? window.calculateImpact(comparable)
      : null;

    if (!impact) {
      return comparable;
    }

    return {
      ...comparable,
      mismatch: {
        ...comparable.mismatch,
        riskLevel: normalizeImpactRiskKey(impact.reputationalRiskKey)
      },
      impact
    };
  }

  function rankBanks(resultsArray) {
    const safeResults = Array.isArray(resultsArray) ? resultsArray : [];

    return safeResults
      .map((result, index) => ({
        originalIndex: index,
        analyzed: toComparableResult(result)
      }))
      .sort((a, b) => {
        const riskDelta = riskPriority[a.analyzed.mismatch.riskLevel] - riskPriority[b.analyzed.mismatch.riskLevel];
        if (riskDelta !== 0) return riskDelta;

        const aImpact = Number(a.analyzed.impact && a.analyzed.impact.impactIndex);
        const bImpact = Number(b.analyzed.impact && b.analyzed.impact.impactIndex);
        const safeAImpact = Number.isFinite(aImpact) ? aImpact : 0;
        const safeBImpact = Number.isFinite(bImpact) ? bImpact : 0;
        const impactDelta = safeBImpact - safeAImpact;
        if (impactDelta !== 0) return impactDelta;

        const mismatchDelta = a.analyzed.mismatch.mismatchScore - b.analyzed.mismatch.mismatchScore;
        if (mismatchDelta !== 0) return mismatchDelta;

        return a.originalIndex - b.originalIndex;
      })
      .map((entry, rankIndex) => ({
        rank: rankIndex + 1,
        ...entry.analyzed
      }));
  }

  function analyzeMultipleBanks(banksArray) {
    const safeBanks = Array.isArray(banksArray) ? banksArray : [];
    const analyzed = safeBanks.map((bank) => window.analyzeBank(bank));
    const withFinalRisk = analyzed.map((result) => applyFinalRiskOverride(result));
    return rankBanks(withFinalRisk);
  }

  window.rankBanks = rankBanks;
  window.analyzeMultipleBanks = analyzeMultipleBanks;
  window.applyFinalRiskOverride = applyFinalRiskOverride;
})();
