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
    return rankBanks(analyzed);
  }

  window.rankBanks = rankBanks;
  window.analyzeMultipleBanks = analyzeMultipleBanks;
})();
