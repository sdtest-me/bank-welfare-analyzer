(function () {
  function analyzeBank(data) {
    const esgInput = data && typeof data.esgText === 'string' ? data.esgText : '';
    const score = window.calcScore(data);
    const spiral = window.calculateSpiralStages(data);
    const behavior = window.mapValuesToBehavior(esgInput);
    const mismatch = window.calculateMismatch({ score, spiral }, esgInput);

    return {
      data,
      score,
      spiral,
      behavior,
      mismatch
    };
  }

  window.analyzeBank = analyzeBank;
})();
