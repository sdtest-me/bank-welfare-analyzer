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

    const redGap = Math.max(0, (bank.red || 0) - (population.red || 0));
    const greenGap = Math.max(0, (population.green || 0) - (bank.green || 0));
    const esgAlignmentGap = Math.max(0, redGap + greenGap);

    const shortTermByDriver = {
      redPressure: 'Reduce high-pressure loan practices: cap penalty fees, extend restructuring windows, and prioritize affordability checks.',
      empathyGap: 'Launch borrower support protocols: hardship restructuring, transparent communication, and customer-relief options.',
      stageMismatch: 'Rebalance product mix to local realities: simplify terms, add income-linked repayment options, and reduce friction points.',
      welfareScorePenalty: 'Stabilize core welfare-sensitive indicators by easing effective borrowing costs and reducing extractive terms.',
      esgClaimMismatch: 'Close the ESG trust gap: align public ESG claims with measurable borrower-level practices and disclosures.'
    };

    const strategicByStage = {
      red: 'Shift from Red-dominant extraction to Orange/Green value creation through productive lending and inclusive growth targets.',
      blue: 'Retain Blue discipline while expanding Orange innovation in SME lending and outcome-based portfolio management.',
      orange: 'Strengthen Orange execution with Green safeguards: pair growth KPIs with social affordability and resilience KPIs.',
      green: 'Scale Green strengths into Yellow systems thinking: embed cross-sector welfare outcomes in credit strategy.',
      yellow: 'Codify adaptive governance to keep portfolio decisions aligned with evolving population welfare patterns.',
      turquoise: 'Preserve long-term systemic orientation while protecting near-term borrower resilience in volatile segments.',
      beige: 'Move from survival-driven lending signals toward basic stability products and risk-aware inclusion pathways.',
      purple: 'Transition from tradition-driven patterns to transparent, data-backed lending governance.'
    };

    const riskMitigation = [];
    if (esgAlignmentGap >= 20) {
      riskMitigation.push('High ESG alignment gap detected: institute quarterly audit of promised ESG outcomes vs borrower experience.');
    } else {
      riskMitigation.push('Monitor ESG alignment every quarter to prevent drift between stated values and field behavior.');
    }

    if (mismatch.riskLevel === 'high') {
      riskMitigation.push('Set a 90-day risk response plan with board oversight for vulnerable borrower segments.');
    } else if (mismatch.riskLevel === 'medium') {
      riskMitigation.push('Use monthly early-warning dashboards for delinquency, restructuring, and social stress signals.');
    } else {
      riskMitigation.push('Maintain light-touch monitoring and keep preventive affordability controls active.');
    }

    return {
      shortTermActions: [
        shortTermByDriver[driver] || shortTermByDriver.stageMismatch,
        `Primary mismatch driver to address first: ${driver}.`
      ],
      strategicShift: {
        dominantBankStage: bankDominant,
        dominantPopulationStage: populationDominant,
        recommendation: strategicByStage[bankDominant] || strategicByStage.orange
      },
      riskMitigation
    };
  }

  window.generateRecommendations = generateRecommendations;
})();
