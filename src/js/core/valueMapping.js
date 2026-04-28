(function () {
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

  const VALUE_KEYWORDS = {
    green: [
      'esg', 'sustainable', 'sustainability', 'green finance', 'inclusive', 'impact',
      'ответствен', 'устойчив', 'зел', 'социальн', 'инклюзив',
      'climate', 'decarbon', 'equity', 'diversity', 'community'
    ],
    turquoise: [
      'net zero', 'biodiversity', 'regenerative', 'circular economy', 'long-term resilience',
      'экосистем', 'биоразнообраз', 'долгосроч', 'циркулярн', 'регенератив'
    ],
    yellow: [
      'systemic', 'holistic', 'portfolio balance', 'adaptive',
      'системн', 'целостн', 'адаптив', 'баланс рисков'
    ],
    orange: [
      'innovation', 'entrepreneurship', 'productivity', 'growth', 'efficiency',
      'инновац', 'предприним', 'производител', 'рост', 'эффектив'
    ],
    blue: [
      'compliance', 'governance', 'policy', 'regulation', 'transparency',
      'комплаенс', 'управлен', 'регулирован', 'политик', 'прозрач'
    ],
    purple: [
      'local tradition', 'community trust', 'mutual support',
      'традиц', 'общин', 'взаимопомощ', 'довер'
    ],
    red: [
      'aggressive collection', 'dominance', 'hard recovery',
      'агрессивн взыскан', 'доминирован', 'жестк взыскан'
    ],
    beige: [
      'basic access', 'survival', 'essential services',
      'базов доступ', 'выживан', 'базов услуг'
    ]
  };

  const STAGES = ['beige', 'purple', 'red', 'blue', 'orange', 'green', 'yellow', 'turquoise'];

  function mapValuesToBehavior(esgText) {
    if (!esgText || typeof esgText !== 'string') {
      return {
        hasInput: false,
        detectedStages: [],
        primaryStage: null,
        stageExpectations: STAGE_EXPECTATIONS
      };
    }

    const text = esgText.toLowerCase();
    const detectedStages = STAGES.filter((stage) => {
      const words = VALUE_KEYWORDS[stage] || [];
      return words.some((word) => text.includes(word));
    });

    const primaryStage = detectedStages.length ? detectedStages[detectedStages.length - 1] : null;

    return {
      hasInput: true,
      detectedStages,
      primaryStage,
      stageExpectations: STAGE_EXPECTATIONS
    };
  }

  window.mapValuesToBehavior = mapValuesToBehavior;
})();
