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
    gapTitle:"⚠️ АНАЛИЗ РАЗРЫВА (SPIRAL GAP):",
    recTitle:"💡 РЕКОМЕНДАЦИЯ:",
    stageMeaning:{beige:"Выживание",purple:"Традиции/Семья",red:"Неравенство/Борьба",blue:"Порядок/Дисциплина",orange:"Достижения/Средний класс",green:"Эмпатия/Взаимовыручка",yellow:"Гибкость/Адаптация",turquoise:"Холизм/Глобальное видение"}
  },
  en: {
    app:"Bank Welfare Analyzer",inpTitle:"Enter Bank Data",btnAnalyze:"🚀 Analyze",
    exLabel:"Examples:",exEldik:"🏦 Eldik Bank",exNew:"✨ New Bank",
    lName:"Bank Name *",lCountry:"Country",lProfit:"Profit Growth (%) *",
    lCapital:"Capitalization",lDiv:"Dividends to Shareholders (%)",lIntMin:"Rate Min (%)",lIntMax:"Rate Max (%)",
    lInc:"Population Income Growth (%) *",lPov:"Poverty Rate (%) *",lGdp:"GDP per Capita ($)",lSal:"Average Salary",
    lCons:"Consumption Loans (%) *",lBus:"Business Loans (%) *",lOther:"Other Loans (%)",
    tBank:"Bank Metrics",lProfitG:"Profit Growth",lCap:"Capitalization",lDivP:"Dividends",lInt:"Average Interest Rate",
    tPop:"Population Welfare",lIncG:"Real Income Growth",lPovR:"Poverty Rate",lGdpC:"GDP per Capita",lSalA:"Average Salary",
    tCred:"Credit Structure",credNote:"Microcredit: consumption, business, other",
    tScore:"Country Welfare Contribution Index",scoreDesc:"Composite score of the bank's real impact on the country's population living standards",
    tLowC:"Low contribution",tHighC:"High contribution",tWarn:"⚠️ Warning:",
    warnText:"Bank profit grows 16x faster than population income. High share of consumption loans indicates lending to poverty, not development.",
    tProb:"Key System Problems",p1:"Poverty lending: people borrow for survival, not development",
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
    stageMeaning:{beige:"Survival",purple:"Traditional/Family",red:"Inequality/Rebellion",blue:"Order/Discipline",orange:"Achievement/Middle Class",green:"Empathy/Mutual Aid",yellow:"Flexible/Adaptive",turquoise:"Holistic/Global"}
  }
};

function setLang(l){
  AppState.lang=l;
  $('btnRU').classList.toggle('a',l==='ru');
  $('btnEN').classList.toggle('a',l==='en');
  Object.keys(tr[AppState.lang]).forEach(k=>{
    if($(k) && k!=='stages' && k!=='spiralLabels' && k!=='stageMeaning') {
      $(k).textContent=tr[AppState.lang][k];
    }
  });
  $('capUnit').textContent=tr[AppState.lang].capU;
  $('salUnit').textContent=tr[AppState.lang].salU;
  document.title=tr[AppState.lang].app;
  $('hTitle').textContent=tr[AppState.lang].app;
  if(AppState.chart){AppState.chart.data.labels=[tr[AppState.lang].cons,tr[AppState.lang].bus,tr[AppState.lang].other];AppState.chart.update();}
  if(AppState.spiralChart){
    AppState.spiralChart.data.labels=tr[AppState.lang].spiralLabels;
    AppState.spiralChart.data.datasets[0].label=tr[AppState.lang].popChartLabel;
    AppState.spiralChart.data.datasets[1].label=tr[AppState.lang].bankChartLabel;
    AppState.spiralChart.update();
  }
  updateBadgeTexts();
  refresh();
}

function updateBadgeTexts(){
  const map={bProfit:'tHigh',bInt:'tHigh',bInc:'tMod',bPov:'tCrit',bGdp:'tLow',bDiv:'tShare'};
  Object.entries(map).forEach(([id,key])=>{if($(id))$(id).textContent=tr[AppState.lang][key]});
}
