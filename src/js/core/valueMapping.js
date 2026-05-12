(function () {
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
      console.log('[valueMapping]', message);
      return;
    }
    console.log('[valueMapping]', message, payload);
  }

  const STAGE_EXPECTATIONS = {
    beige: {
      en: 'Preserve minimum stability and continuity of essential banking access.',
      ru: 'Сохранять минимальную стабильность и непрерывность базового доступа к банковским услугам.'
    },
    purple: {
      en: 'Protect local communities through relationship-based and culturally aware support.',
      ru: 'Поддерживать локальные сообщества через отношения доверия и учет культурного контекста.'
    },
    red: {
      en: 'Assert control and rapid extraction with coercive debt and power-driven actions.',
      ru: 'Утверждать контроль и быстрое извлечение выгоды через силовое и принудительное долговое поведение.'
    },
    blue: {
      en: 'Enforce rules consistently with transparent, compliant, and predictable procedures.',
      ru: 'Последовательно применять правила через прозрачные, комплаенс-ориентированные и предсказуемые процедуры.'
    },
    orange: {
      en: 'Drive efficiency and innovation by financing productivity, entrepreneurship, and growth.',
      ru: 'Повышать эффективность и инновации, финансируя производительность, предпринимательство и рост.'
    },
    green: {
      en: 'Prioritize inclusion, fairness, and debtor wellbeing with humane restructuring options.',
      ru: 'Ставить в приоритет инклюзивность, справедливость и благополучие заемщиков с гуманной реструктуризацией.'
    },
    yellow: {
      en: 'Balance competing needs through systemic risk awareness and adaptive portfolio design.',
      ru: 'Балансировать конкурирующие потребности через системное мышление и адаптивный дизайн портфеля.'
    },
    turquoise: {
      en: 'Integrate long-term social, ecological, and economic resilience across the ecosystem.',
      ru: 'Интегрировать долгосрочную социальную, экологическую и экономическую устойчивость на уровне экосистемы.'
    }
  };

  const STAGE_KEYWORDS = {
    green: [
      { term: 'inclusive', weight: 1.3 },
      { term: 'impact', weight: 1.15 },
      { term: 'equity', weight: 1.15 },
      { term: 'diversity', weight: 1.1 },
      { term: 'community', weight: 1.0 },
      { term: 'decarbon', weight: 1.35 },
      { term: 'climate', weight: 1.3 },
      { term: 'ответствен', weight: 1.1 },
      { term: 'инклюзив', weight: 1.3 }
    ],
    turquoise: [
      { term: 'net zero', weight: 1.65 },
      { term: 'biodiversity', weight: 1.45 },
      { term: 'regenerative', weight: 1.5 },
      { term: 'circular economy', weight: 1.45 },
      { term: 'long-term resilience', weight: 1.35 },
      { term: 'экосистем', weight: 1.35 },
      { term: 'биоразнообраз', weight: 1.4 },
      { term: 'циркулярн', weight: 1.35 },
      { term: 'регенератив', weight: 1.45 }
    ],
    yellow: [
      { term: 'systemic', weight: 1.25 },
      { term: 'holistic', weight: 1.2 },
      { term: 'portfolio balance', weight: 1.2 },
      { term: 'adaptive', weight: 1.2 },
      { term: 'системн', weight: 1.2 },
      { term: 'целостн', weight: 1.2 },
      { term: 'адаптив', weight: 1.2 },
      { term: 'баланс рисков', weight: 1.25 }
    ],
    orange: [
      { term: 'innovation', weight: 1.25 },
      { term: 'entrepreneurship', weight: 1.2 },
      { term: 'productivity', weight: 1.2 },
      { term: 'growth', weight: 1.15 },
      { term: 'efficiency', weight: 1.1 },
      { term: 'инновац', weight: 1.2 },
      { term: 'предприним', weight: 1.15 },
      { term: 'производител', weight: 1.1 },
      { term: 'рост', weight: 1.05 },
      { term: 'эффектив', weight: 1.1 }
    ],
    blue: [
      { term: 'compliance', weight: 1.35 },
      { term: 'governance', weight: 1.25 },
      { term: 'policy', weight: 1.15 },
      { term: 'regulation', weight: 1.2 },
      { term: 'transparency', weight: 1.15 },
      { term: 'комплаенс', weight: 1.35 },
      { term: 'управлен', weight: 1.2 },
      { term: 'регулирован', weight: 1.2 },
      { term: 'политик', weight: 1.1 },
      { term: 'прозрач', weight: 1.15 }
    ],
    purple: [
      { term: 'local tradition', weight: 1.3 },
      { term: 'community trust', weight: 1.35 },
      { term: 'mutual support', weight: 1.3 },
      { term: 'традиц', weight: 1.25 },
      { term: 'общин', weight: 1.2 },
      { term: 'взаимопомощ', weight: 1.3 },
      { term: 'довер', weight: 1.2 }
    ],
    red: [
      { term: 'aggressive collection', weight: 1.5 },
      { term: 'dominance', weight: 1.3 },
      { term: 'hard recovery', weight: 1.45 },
      { term: 'агрессивн взыскан', weight: 1.5 },
      { term: 'доминирован', weight: 1.3 },
      { term: 'жестк взыскан', weight: 1.45 }
    ],
    beige: [
      { term: 'basic access', weight: 1.2 },
      { term: 'survival', weight: 1.25 },
      { term: 'essential services', weight: 1.2 },
      { term: 'базов доступ', weight: 1.2 },
      { term: 'выживан', weight: 1.25 },
      { term: 'базов услуг', weight: 1.2 }
    ]
  };

  const GENERIC_ESG_BUZZWORDS = [
    'esg',
    'sustainable',
    'sustainability',
    'green finance',
    'innovation',
    'innovative',
    'responsible banking',
    'устойчив',
    'зел',
    'социальн',
    'инновац'
  ];
  const STAGES = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'];

  function normalizeText(value) {
    return value.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function countWords(text) {
    if (!text) return 0;
    const matches = text.match(/[a-zа-яё0-9]+/gi);
    return matches ? matches.length : 0;
  }

  function isBoundaryCharacter(character) {
    return !character || !/[a-zа-яё0-9]/i.test(character);
  }

  function isStemKeyword(keyword) {
    return /[а-яё]$/i.test(keyword) || keyword === 'decarbon';
  }

  function countOccurrences(text, keyword) {
    if (!keyword) return 0;
    const normalizedKeyword = normalizeText(keyword);
    const allowStemSuffix = isStemKeyword(normalizedKeyword);
    let fromIndex = 0;
    let count = 0;

    while (fromIndex < text.length) {
      const foundIndex = text.indexOf(normalizedKeyword, fromIndex);
      if (foundIndex === -1) break;

      const before = text.charAt(foundIndex - 1);
      const after = text.charAt(foundIndex + normalizedKeyword.length);
      if (isBoundaryCharacter(before) && (allowStemSuffix || isBoundaryCharacter(after))) {
        count += 1;
      }

      fromIndex = foundIndex + normalizedKeyword.length;
    }

    return count;
  }

  function dampenRepeatedSignal(frequency) {
    if (frequency <= 1) return frequency;
    return 1 + Math.log(frequency);
  }

  function roundMetric(value) {
    return Number(value.toFixed(3));
  }

  function mapValuesToBehavior(esgText) {
    if (!esgText || typeof esgText !== 'string') {
      return {
        hasInput: false,
        detectedStages: [],
        primaryStage: null,
        confidence: 0,
        stageScores: {},
        stageExpectations: STAGE_EXPECTATIONS
      };
    }

    const text = normalizeText(esgText);
    const stageScores = {};
    const stageFrequencies = {};

    STAGES.forEach((stage) => {
      const weighted = (STAGE_KEYWORDS[stage] || []).reduce((sum, entry) => {
        const frequency = countOccurrences(text, entry.term);
        const dampenedFrequency = dampenRepeatedSignal(frequency);
        if (frequency > 0) {
          stageFrequencies[stage] = (stageFrequencies[stage] || 0) + frequency;
          debugLog('keyword match', {
            stage,
            term: entry.term,
            frequency,
            dampenedFrequency: roundMetric(dampenedFrequency),
            weight: entry.weight
          });
        }
        return sum + (dampenedFrequency * entry.weight);
      }, 0);

      stageScores[stage] = roundMetric(weighted);
      debugLog('stage score', { stage, score: stageScores[stage], frequency: stageFrequencies[stage] || 0 });
    });

    const wordCount = countWords(text);
    const totalKeywordMatches = STAGES.reduce((sum, stage) => sum + (stageFrequencies[stage] || 0), 0);
    const buzzwordFrequency = GENERIC_ESG_BUZZWORDS.reduce((sum, term) => sum + countOccurrences(text, term), 0);
    const keywordDensity = wordCount > 0 ? totalKeywordMatches / wordCount : 0;
    const buzzwordDensity = wordCount > 0 ? buzzwordFrequency / wordCount : 0;
    const totalCommunicationMarkers = totalKeywordMatches + buzzwordFrequency;
    const buzzwordShare = totalCommunicationMarkers > 0 ? buzzwordFrequency / totalCommunicationMarkers : 0;
    const buzzwordOveruse = buzzwordFrequency >= 4 && (buzzwordDensity >= 0.08 || buzzwordShare >= 0.55);
    const buzzwordPenalty = Math.min(
      0.75,
      (buzzwordFrequency * 0.045) + (buzzwordDensity * 1.4) + (buzzwordShare * 0.12) + (buzzwordOveruse ? 0.18 : 0)
    );
    debugLog('penalty', {
      type: 'buzzword',
      buzzwordFrequency,
      buzzwordDensity: roundMetric(buzzwordDensity),
      buzzwordShare: roundMetric(buzzwordShare),
      buzzwordOveruse,
      buzzwordPenalty: roundMetric(buzzwordPenalty)
    });

    const rankedStages = STAGES
      .map((stage) => ({ stage, score: stageScores[stage] }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    const detectedStages = rankedStages.map((entry) => entry.stage);
    const primaryStage = detectedStages.length ? detectedStages[0] : null;

    const topScore = rankedStages.length ? rankedStages[0].score : 0;
    const secondScore = rankedStages.length > 1 ? rankedStages[1].score : 0;
    const totalWeightedSignal = rankedStages.reduce((sum, entry) => sum + entry.score, 0);
    const separation = topScore > 0 ? (topScore - secondScore) / topScore : 0;
    const evidence = 1 - Math.exp(-totalWeightedSignal / 6);
    const densityPenalty = keywordDensity > 0.35 ? Math.min(0.2, (keywordDensity - 0.35) * 0.9) : 0;
    const confidence = Math.max(0, Math.min(1, (0.45 * separation + 0.55 * evidence) - buzzwordPenalty - densityPenalty));
    debugLog('confidence calculation', {
      topScore,
      secondScore,
      totalWeightedSignal: roundMetric(totalWeightedSignal),
      separation: roundMetric(separation),
      evidence: roundMetric(evidence),
      buzzwordPenalty: roundMetric(buzzwordPenalty),
      densityPenalty: roundMetric(densityPenalty),
      confidence: roundMetric(confidence)
    });

    const keywordDensityIndicators = {
      wordCount,
      totalKeywordMatches,
      totalCommunicationMarkers,
      totalWeightedSignal: roundMetric(totalWeightedSignal),
      keywordDensity: roundMetric(keywordDensity),
      buzzwordDensity: roundMetric(buzzwordDensity),
      buzzwordShare: roundMetric(buzzwordShare),
      buzzwordOveruse
    };

    return {
      hasInput: true,
      detectedStages,
      primaryStage,
      confidence: roundMetric(confidence),
      stageScores,
      stageFrequencies,
      keywordDensityIndicators,
      wordCount,
      totalKeywordMatches,
      totalCommunicationMarkers,
      keywordDensity: roundMetric(keywordDensity),
      buzzwordFrequency,
      buzzwordDensity: roundMetric(buzzwordDensity),
      buzzwordShare: roundMetric(buzzwordShare),
      buzzwordOveruse,
      buzzwordPenalty: roundMetric(buzzwordPenalty),
      densityPenalty: roundMetric(densityPenalty),
      stageExpectations: STAGE_EXPECTATIONS
    };
  }

  window.mapValuesToBehavior = mapValuesToBehavior;
  window.setBwaDebug = function setBwaDebug(enabled) {
    const normalized = !!enabled;
    window[DEBUG_FLAG_KEY] = normalized;
    try {
      if (window.localStorage) {
        window.localStorage.setItem(DEBUG_FLAG_KEY, String(normalized));
      }
    } catch (error) {
      // no-op when storage is unavailable
    }
    return normalized;
  };
})();
