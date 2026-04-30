(function () {
  const tr = {
    ru: {
      app:"Bank Welfare Analyzer",inpTitle:"Ввод данных банка",btnAnalyze:"🚀 Анализировать",
      exLabel:"Примеры:",exEldik:"🏦 Eldik Bank",exNew:"✨ Новый банк",
      lName:"Название банка *",lCountry:"Страна",lProfit:"Рост прибыли (%) *",
      lCapital:"Капитализация",lDiv:"Дивиденды акционерам (%)",lIntMin:"Ставка мин (%)",lIntMax:"Ставка макс (%)",
      lInc:"Рост доходов населения (%) *",lPov:"Уровень бедности (%) *",lGdp:"ВВП на душу ($)",lSal:"Средняя зарплата",
      lCons:"Кредиты на потребление (%) *",lBus:"Кредиты на бизнес (%) *",lOther:"Прочие кредиты (%)",
      tBank:"Показатели банка",lProfitG:"Рост прибыли",lCap:"Капитализация",lDivP:"Дивиденды",lInt:"Средняя ставка",
      tPop:"Благосостояние населения",lIncG:"Рост реальных доходов",lPovR:"Уровень бедности",lGdpC:"ВВП на душу",lSalA:"Средняя зарплата",
      tCred:"Структура кредитования",credNote:"Данные по микрокредитованию: потребление, бизнес, прочее",
      tScore:"Индекс вклада в благосостояние страны",scoreDesc:"Композитная оценка реального влияния банка на уровень жизни населения страны",
      tLowC:"Низкий вклад",tHighC:"Высокий вклад",tWarn:"⚠️ Предупреждение:",
      warnText:"Прибыль банка растёт в 16 раз быстрее доходов населения. Высокая доля потребительских кредитов указывает на кредитование бедности, а не развития.",
      tProb:"Ключевые проблемы системы",p1:"Кредитование бедности: люди берут кредиты не для развития, а для выживания",
      p2:"Высокие ставки: 17–32% годовых создают долговую ловушку",p3:"Диспропорция прибылей: банк богатеет в 16 раз быстрее роста доходов населения",
      p4:"Господдержка частным акционерам: государство вливает капитал, прибыль уходит акционерам",
      tQuest:"Критические вопросы для оценки",q1:"За счёт чего формируется прибыль? (потребление или инвестиции?)",
      q2:"Какова долговая нагрузка клиентов? (растёт ли просрочка?)",q3:"Какова реальная доходность для экономики? (создаются ли рабочие места?)",
      q4:"Кто получает дивиденды? (государство или частные акционеры?)",
      fRepo:"Репозиторий проекта:",capU:"млрд сомов",salU:"сомов",
      tHigh:"высокий",tMod:"умеренный",tCrit:"критичный",tLow:"низкий",tShare:"акционерам",
      cons:"Потребление",bus:"Бизнес",other:"Прочее",resultsTitle:"📊 Результаты анализа",
      spiralTitle:"🌀 Spiral Dynamics: Население vs Банк",
      spiralDesc:"Сравнение условий жизни по Спиральной Динамике",
      spiralLabels:['Бежевая','Фиолетовая','Красная','Синяя','Оранжевая','Зеленая','Желтая','Бирюзовая'],
      popChartLabel:"👥 Население", bankChartLabel:"🏦 Банк",
      stages:{beige:"Бежевая",purple:"Фиолетовая",red:"Красная",blue:"Синяя",orange:"Оранжевая",green:"Зеленая",yellow:"Желтая",turquoise:"Бирюзовая"},
      dominant:"Доминирующая стадия:",
      detailTitle:"📊 РАСПРЕДЕЛЕНИЕ СТАДИЙ (Сумма = 100%)",
      popText:"УСЛОВИЯ ЖИЗНИ НАСЕЛЕНИЯ",
      bankText:"КУЛЬТУРА БАНКА",
      gapTitle:"⚠️ АНАЛИЗ СПИРАЛЬНОГО РАЗРЫВА:",
      recTitle:"💡 РЕКОМЕНДАЦИЯ:",
      stageMeaning:{beige:"Выживание",purple:"Традиции/Семья",red:"Неравенство/Бунт",blue:"Порядок/Дисциплина",orange:"Достижение/Средний класс",green:"Эмпатия/Взаимопомощь",yellow:"Гибкость/Адаптация",turquoise:"Холизм/Глобальность"},
      mismatchScoreLabel:"Mismatch индекс:", mismatchRiskLabel:"Уровень риска:", mismatchDriverLabel:"Главный драйвер:", esgConfidenceLabel:"Уверенность ESG:", driverConfidenceLabel:"Уверенность драйвера:", shortTermLabel:"Краткосрочное последствие:", longTermLabel:"Долгосрочное последствие:", predictiveDisclaimer:"⚠️ Сценарный прогноз: это ориентировочная оценка, а не гарантированный результат.",
      riskLevels:{low:"низкий",medium:"средний",high:"высокий"},

      driverLabels:{redPressure:"Давление Red",empathyGap:"Разрыв эмпатии",stageMismatch:"Структурный разрыв стадий",welfareScorePenalty:"Слабый welfare score",esgClaimMismatch:"Разрыв ESG-заявлений"},
      recommendationTexts:{
        bankDominantRedRu:"Агрессивное извлечение прибыли",
        bankDominantOtherRu:"Развитие/Инновации",
        bankDominantRedEn:"Aggressive Profit Extraction",
        bankDominantOtherEn:"Development/Innovation",
        transitionTarget:"🟠 Оранжевая",
        gapBullets:{
          ru:[
            "У населения низкий {redIcon} {redStage} ({populationRed}%) — нет бунтов, люди не грабят. Но у банка высокий {bankRedStage} ({bankRed}%) — агрессивное выбивание долгов",
            "У населения высокий {blueIcon} {blueStage} ({populationBlue}%) — дисциплинированно платят долги. Банк использует это для извлечения прибыли",
            "Население {greenIcon} {greenStage} ({populationGreen}%) — спасается взаимовыручкой. У Банка {bankGreenStage} = {bankGreen}% (нет эмпатии к должникам)"
          ],
          en:[
            "Population has low {redIcon} {redStage} ({populationRed}%) — no riots, no robberies. But Bank has high {bankRedStage} ({bankRed}%) — aggressive debt collection",
            "Population has high {blueIcon} {blueStage} ({populationBlue}%) — disciplined debt payers. Bank exploits this for profit",
            "Population {greenIcon} {greenStage} ({populationGreen}%) — survives through mutual aid. Bank {bankGreenStage} = {bankGreen}% (no empathy for debtors)"
          ]
        },
        recommendationIntro:{
          ru:"Банку следует перейти от {bankIcon} {bankStage} к {transitionTarget}:",
          en:"Bank should evolve from {bankIcon} {bankStage} to {transitionTarget} by:"
        },
        recommendationBullets:{
          ru:[
            "Переход от потребительских кредитов ({creditConsumption}%) к бизнес-кредитам",
            "Поддержка предпринимательства и экономического развития",
            "Синхронизация роста прибыли с ростом доходов населения"
          ],
          en:[
            "Shifting from consumer loans ({creditConsumption}%) to business loans",
            "Supporting entrepreneurship & economic development",
            "Aligning profit growth with population income growth"
          ]
        }
      },
      rankTitle:"🏁 Рейтинг банков",rankInputLabel:"Массив банков (JSON или по одной JSON-строке)",rankInputHint:"Поддерживается JSON-массив или несколько строк JSON (один банк на строку).",btnRank:"📋 Построить рейтинг",rankRisk:"Риск",rankMismatch:"Mismatch",rankEmpty:"Добавьте хотя бы один банк для сравнения.",rankParseErr:"Не удалось прочитать ввод. Используйте JSON-массив или JSON по строкам."
    },
    en: {
      app:"Bank Welfare Analyzer",inpTitle:"Bank Input Data",btnAnalyze:"🚀 Analyze",
      exLabel:"Examples:",exEldik:"🏦 Eldik Bank",exNew:"✨ New bank",
      lName:"Bank Name *",lCountry:"Country",lProfit:"Profit Growth (%) *",
      lCapital:"Capitalization",lDiv:"Dividends to Shareholders (%)",lIntMin:"Min Rate (%)",lIntMax:"Max Rate (%)",
      lInc:"Population Income Growth (%) *",lPov:"Poverty Rate (%) *",lGdp:"GDP per Capita ($)",lSal:"Average Salary",
      lCons:"Consumption Loans (%) *",lBus:"Business Loans (%) *",lOther:"Other Loans (%)",
      tBank:"Bank Metrics",lProfitG:"Profit Growth",lCap:"Capitalization",lDivP:"Dividends",lInt:"Average Rate",
      tPop:"Population Welfare",lIncG:"Real Income Growth",lPovR:"Poverty Rate",lGdpC:"GDP per Capita",lSalA:"Average Salary",
      tCred:"Credit Structure",credNote:"Microcredit data: consumption, business, other",
      tScore:"Country Welfare Contribution Index",scoreDesc:"Composite assessment of bank's real impact on country's living standards",
      tLowC:"Low contribution",tHighC:"High contribution",tWarn:"⚠️ Warning:",
      warnText:"Bank profit grows 16x faster than population incomes. High share of consumption loans indicates lending to poverty, not development.",
      tProb:"Key System Problems",p1:"Lending to poverty: people borrow not for development, but survival",
      p2:"High interest rates: 17–32% p.a. create debt traps",p3:"Profit disparity: bank enriches 16x faster than income growth",
      p4:"State support to private shareholders: public capital, private profits",
      tQuest:"Critical Questions for Assessment",q1:"What drives profit? (consumption vs. investment loans?)",
      q2:"What is clients' debt burden? (is delinquency growing?)",q3:"What is real economic return? (are jobs created?)",
      q4:"Who receives dividends? (state or private shareholders?)",
      fRepo:"Project repository:",capU:"bln KGS",salU:"KGS",
      tHigh:"high",tMod:"moderate",tCrit:"critical",tLow:"low",tShare:"to shareholders",
      cons:"Consumption",bus:"Business",other:"Other",resultsTitle:"📊 Analysis Results",
      spiralTitle:"🌀 Spiral Dynamics: Population vs Bank",
      spiralDesc:"Comparison of Life Conditions by Spiral Dynamics",
      spiralLabels:['Beige','Purple','Red','Blue','Orange','Green','Yellow','Turquoise'],
      popChartLabel:"👥 Population", bankChartLabel:"🏦 Bank",
      stages:{beige:"Beige",purple:"Purple",red:"Red",blue:"Blue",orange:"Orange",green:"Green",yellow:"Yellow",turquoise:"Turquoise"},
      dominant:"Dominant Stage:",
      detailTitle:"📊 STAGE DISTRIBUTION (Total = 100%)",
      popText:"POPULATION LIFE CONDITIONS",
      bankText:"BANK CULTURE",
      gapTitle:"⚠️ SPIRAL GAP ANALYSIS:",
      recTitle:"💡 RECOMMENDATION:",
      stageMeaning:{beige:"Survival",purple:"Traditional/Family",red:"Inequality/Rebellion",blue:"Order/Discipline",orange:"Achievement/Middle Class",green:"Empathy/Mutual Aid",yellow:"Flexible/Adaptive",turquoise:"Holistic/Global"},
      mismatchScoreLabel:"Mismatch score:", mismatchRiskLabel:"Risk level:", mismatchDriverLabel:"Primary driver:", esgConfidenceLabel:"ESG confidence:", driverConfidenceLabel:"Driver confidence:", shortTermLabel:"Short-term consequence:", longTermLabel:"Long-term consequence:", predictiveDisclaimer:"⚠️ Scenario-based projection: indicative only, not a guaranteed outcome.",
      riskLevels:{low:"low",medium:"medium",high:"high"},

      driverLabels:{redPressure:"Red pressure",empathyGap:"Empathy gap",stageMismatch:"Structural stage gap",welfareScorePenalty:"Low welfare score",esgClaimMismatch:"ESG claim mismatch"},
      recommendationTexts:{
        bankDominantRedRu:"Агрессивное извлечение прибыли",
        bankDominantOtherRu:"Развитие/Инновации",
        bankDominantRedEn:"Aggressive Profit Extraction",
        bankDominantOtherEn:"Development/Innovation",
        transitionTarget:"🟠 Orange",
        gapBullets:{
          ru:[
            "У населения низкий {redIcon} {redStage} ({populationRed}%) — нет бунтов, люди не грабят. Но у банка высокий {bankRedStage} ({bankRed}%) — агрессивное выбивание долгов",
            "У населения высокий {blueIcon} {blueStage} ({populationBlue}%) — дисциплинированно платят долги. Банк использует это для извлечения прибыли",
            "Население {greenIcon} {greenStage} ({populationGreen}%) — спасается взаимовыручкой. У Банка {bankGreenStage} = {bankGreen}% (нет эмпатии к должникам)"
          ],
          en:[
            "Population has low {redIcon} {redStage} ({populationRed}%) — no riots, no robberies. But Bank has high {bankRedStage} ({bankRed}%) — aggressive debt collection",
            "Population has high {blueIcon} {blueStage} ({populationBlue}%) — disciplined debt payers. Bank exploits this for profit",
            "Population {greenIcon} {greenStage} ({populationGreen}%) — survives through mutual aid. Bank {bankGreenStage} = {bankGreen}% (no empathy for debtors)"
          ]
        },
        recommendationIntro:{
          ru:"Банку следует перейти от {bankIcon} {bankStage} к {transitionTarget}:",
          en:"Bank should evolve from {bankIcon} {bankStage} to {transitionTarget} by:"
        },
        recommendationBullets:{
          ru:[
            "Переход от потребительских кредитов ({creditConsumption}%) к бизнес-кредитам",
            "Поддержка предпринимательства и экономического развития",
            "Синхронизация роста прибыли с ростом доходов населения"
          ],
          en:[
            "Shifting from consumer loans ({creditConsumption}%) to business loans",
            "Supporting entrepreneurship & economic development",
            "Aligning profit growth with population income growth"
          ]
        }
      },
      rankTitle:"🏁 Bank Ranking",rankInputLabel:"Bank array input (JSON or one JSON object per line)",rankInputHint:"Supports a JSON array or newline-delimited JSON (one bank per line).",btnRank:"📋 Build ranking",rankRisk:"Risk",rankMismatch:"Mismatch",rankEmpty:"Add at least one bank to compare.",rankParseErr:"Cannot parse input. Use a JSON array or one JSON object per line."
    }
  };

  let lang = 'ru';

  function $(id){return document.getElementById(id);}

  function setLang(l){
    lang=l;
    $('btnRU').classList.toggle('a',l==='ru');
    $('btnEN').classList.toggle('a',l==='en');
    Object.keys(tr[lang]).forEach(k=>{
      if($(k) && k!=='stages' && k!=='spiralLabels' && k!=='stageMeaning') {
        $(k).textContent=tr[lang][k];
      }
    });
    $('capUnit').textContent=tr[lang].capU;
    $('salUnit').textContent=tr[lang].salU;
    document.title=tr[lang].app;
    $('hTitle').textContent=tr[lang].app;
    if(window.chart){window.chart.data.labels=[tr[lang].cons,tr[lang].bus,tr[lang].other];window.chart.update();}
    if(window.spiralChart){
      window.spiralChart.data.labels=tr[lang].spiralLabels;
      window.spiralChart.data.datasets[0].label=tr[lang].popChartLabel;
      window.spiralChart.data.datasets[1].label=tr[lang].bankChartLabel;
      window.spiralChart.update();
    }
    updateBadgeTexts();
    if (typeof window.refresh === 'function') {
      window.refresh();
    }
  }

  function updateBadgeTexts(){
    const map={bProfit:'tHigh',bInt:'tHigh',bInc:'tMod',bPov:'tCrit',bGdp:'tLow',bDiv:'tShare'};
    Object.entries(map).forEach(([id,key])=>{if($(id))$(id).textContent=tr[lang][key]});
  }

  function fmtPct(v){return (v>=0?'+':'')+v+'%';}
  function fmtNum(v){return v.toLocaleString(lang==='ru'?'ru-RU':'en-US');}

  function translate(key){
    return tr[lang][key];
  }

  window.i18n = { tr, get lang(){ return lang; }, setLang, updateBadgeTexts, fmtPct, fmtNum, translate };
  window.tr = translate;
  window.setLang = setLang;
})();
