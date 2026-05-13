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
      provTitle:"Происхождение данных",provDesc:"Как сформирован каждый тип сигнала в демо-версии.",
      provObservedBadge:"Официальные",
      provObservedBadge2:"Официальные",provEstimatedBadge:"Оценочные",provInferredBadge:"Выведенные",provModelBadge:"Сгенерированные моделью",
      provTipObserved:"Данные из официальных публичных источников (NBKR, Нацстатком, Всемирный банк).",
      provTipEstimated:"Оценено по неполным данным или прокси-показателям.",
      provTipInferred:"Выведено из комбинации нескольких индикаторов.",
      provTipModel:"Сформировано модельной логикой или сценарным синтезом.",
      provSignalGdp:"ВВП, бедность, зарплата, макро",
      provSignalLoans:"Структура кредитования, портфельный микс",
      provSignalStages:"Картирование стадий Спиральной Динамики",
      provSignalNarrative:"Нарратив риска, рекомендации",
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
      cons:"Потребление",bus:"Бизнес",other:"Прочее",resultsTitle:"📊 Результаты анализа",btnExportPdf:"📥 Скачать PDF",pdfExportUnavailable:"Не удалось сформировать PDF: библиотека экспорта не загружена.",
      execSummaryTitle:"Краткое резюме",execLblCondition:"Общее состояние",execLblRisk:"Главный риск",execLblConsequence:"Ожидаемое следствие",execLblAction:"Рекомендуемые действия",
      execConditionPoor:"Напряжённая модель: низкий вклад в благосостояние при текущих вводных.",execConditionMixed:"Смешанная картина: есть сильные сигналы риска, требуется внимание.",      execConditionGood:"Более сбалансированный профиль по индексу вклада.",
      execConsequenceUnavailable:"—",execActionFallback:"Смотрите детальные рекомендации ниже.",
      worstCaseTitle:"⚠️ Худший сценарий",worstCaseDisclaimer:"Сценарный сигнал: это не подтверждённый факт.",
      worstLblCondition:"Состояние при ухудшении",worstLblRisk:"Эскалированный риск",worstLblConsequence:"Если не реагировать",
      worstConditionHigh:"Критическая дестабилизация профиля банка и среды заемщиков.",worstConditionMedium:"Устойчивость быстро снижается, риск становится системным.",worstConditionLow:"Умеренное ухудшение может ускорить переход к среднему риску.",
      worstConsequenceHigh:"Вероятны каскад просрочек, репутационный удар и жёсткое внешнее давление на кредитную модель.",worstConsequenceMedium:"Растут издержки риска и снижается доверие, что ограничивает пространство для роста.",worstConsequenceLow:"Без профилактики локальные сигналы могут перерасти в заметный репутационный и социальный разрыв.",
      worstDriverPrefix:"Ключевой фактор уязвимости",
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
      recShortTerm_redPressure:"Снизить высокое давление кредитной практики: ограничить штрафы и пени, продлить окна реструктуризации и усилить проверки доступности платежей.",
      recShortTerm_empathyGap:"Запустить протоколы поддержки заёмщиков: реструктуризация при трудностях, прозрачные коммуникации и меры по облегчению для клиентов.",
      recShortTerm_stageMismatch:"Сбалансировать продуктовый микс под локальную реальность: упростить условия, добавить платежи, привязанные к доходу, и снизить «точки трения».",
      recShortTerm_welfareScorePenalty:"Стабилизировать ключевые показатели, чувствительные к благосостоянию: смягчить фактическую стоимость заимствования и снизить извлекательные условия.",
      recShortTerm_esgClaimMismatch:"Устранить разрыв доверия по ESG: согласовать публичные ESG-заявления с измеримой практикой на уровне заёмщиков и раскрытием информации.",
      recStrategic_red:"Перейти от доминирования Red (извлечение) к созданию ценности на Orange/Green через продуктивное кредитование и инклюзивные цели роста.",
      recStrategic_blue:"Сохранить дисциплину Blue и расширить инновации Orange в кредитовании МСП и управлении портфелем по результатам.",
      recStrategic_orange:"Усилить исполнение Orange с защитами Green: сочетать KPI роста с KPI социальной доступности и устойчивости.",
      recStrategic_green:"Масштабировать сильные стороны Green в системное мышление Yellow: встроить межотраслевые welfare-эффекты в кредитную стратегию.",
      recStrategic_yellow:"Закрепить адаптивное управление, чтобы решения по портфелю оставались согласованы с меняющимися паттернами благосостояния населения.",
      recStrategic_turquoise:"Сохранить долгосрочную системную ориентацию и одновременно защищать устойчивость заёмщиков в волатильных сегментах.",
      recStrategic_beige:"Сместиться от сигналов «кредитования выживания» к базовым продуктам стабильности и путям включения с учётом риска.",
      recStrategic_purple:"Перейти от паттернов «традиция/община» к прозрачному, основанному на данных управлению кредитованием.",
      recTier_noImpact:"До появления данных по impact сохраняйте сбалансированную позицию перехода, затем согласуйте действия с измеримыми результатами для заёмщиков.",
      recTier_highImpact:"Выявлено устойчивое выравнивание: укрепляйте текущую стратегию дисциплинированным мониторингом и поэтапным улучшением результатов для заёмщиков.",
      recTier_midImpact:"Переходное выравнивание: в приоритете точечные корректировки портфеля для улучшения согласованности с благосостоянием и последовательности исполнения.",
      recTier_lowImpact:"Структурный риск: выполните план коррекции структурного риска с фокусом на доступность, управление и перестройку стадийного профиля.",
      recRisk_esgHigh:"Выявлен большой разрыв по ESG-выравниванию: введите ежеквартальный аудит обещанных ESG-результатов против опыта заёмщиков.",
      recRisk_esgMonitor:"Контролируйте ESG-выравнивание каждый квартал, чтобы предотвратить дрейф между заявленными ценностями и поведением в поле.",
      recRisk_levelHigh:"Установите 90-дневный план реагирования на риск с надзором совета для уязвимых сегментов заёмщиков.",
      recRisk_levelMedium:"Используйте ежемесячные ранние предупреждения по просрочке, реструктуризации и сигналам социального стресса.",
      recRisk_levelLow:"Поддерживайте лёгкий мониторинг и сохраняйте профилактический контроль доступности.",
      recPrimaryDriverTemplate:"Сначала устраните главный драйвер несоответствия: {driver}.",
      recTitle:"💡 РЕКОМЕНДАЦИЯ:",
      stageMeaning:{beige:"Выживание",purple:"Традиции/Семья",red:"Неравенство/Бунт",blue:"Порядок/Дисциплина",orange:"Достижение/Средний класс",green:"Эмпатия/Взаимопомощь",yellow:"Гибкость/Адаптация",turquoise:"Холизм/Глобальность"},
      mismatchScoreLabel:"Mismatch индекс:", mismatchRiskLabel:"Уровень риска:", mismatchDriverLabel:"Главный драйвер:", esgConfidenceLabel:"Уверенность ESG:", driverConfidenceLabel:"Уверенность драйвера:", shortTermLabel:"Краткосрочное последствие:", longTermLabel:"Долгосрочное последствие:", predictiveDisclaimer:"⚠️ Сценарный прогноз: это ориентировочная оценка, а не гарантированный результат.",
      sponsorLead:"Ограничение демо: этот анализ основан на публичных и оценочных данных.",
      sponsorTension:"С вашими внутренними данными профиль риска может измениться существенно — ключевые драйверы могут быть недооценены или интерпретированы неверно.",
      sponsorResolution:"Запустите эту модель на ваших внутренних данных в Лаборатории Спонсора.",
      sponsorValueSimulation:"Симуляция перед принятием решений",
      sponsorValueCalibration:"Калибровка на внутреннем поведенческом профиле",
      sponsorValueScenario:"Сценарное тестирование (политика / продукт / кредитная стратегия)",
      sponsorPrimaryCta:"Запросить доступ в Лабораторию Спонсора",
      sponsorSecondaryCta:"Смотреть, как внутренние данные меняют результаты",
      sponsorCompareDemo:"Публичная демонстрация → Оценочно",
      sponsorCompareLab:"Лаборатория Спонсора → Калиброванная симуляция",
      riskLevels:{low:"низкий",medium:"средний",high:"высокий"},
      execLblSignalReliability:"Надёжность сигнала",
      signalReliabilityHeading:"Надёжность сигнала",
      combinedConfidenceLabel:"Сводная уверенность",
      uncertaintyTierHigh:"Высокая",
      uncertaintyTierMedium:"Средняя",
      uncertaintyTierLow:"Низкая",
      signalStrengthStrong:"Устойчивый сигнал — интерпретации можно использовать как основу для решений.",
      signalStrengthModerate:"Умеренная уверенность — трактуйте выводы как ориентир и проверяйте данными.",
      signalStrengthProvisional:"Предварительный сигнал — избегайте жёстких выводов без дополнительной проверки.",

      driverLabels:{redPressure:"Давление Красной стадии",empathyGap:"Разрыв эмпатии",stageMismatch:"Структурный разрыв стадий",welfareScorePenalty:"Слабый индекс благосостояния",esgClaimMismatch:"Разрыв ESG-заявлений"},
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
      rankTitle:"🏁 Рейтинг банков",rankInputLabel:"Массив банков (JSON или по одной JSON-строке)",rankInputHint:"Поддерживается JSON-массив или несколько строк JSON (один банк на строку).",btnRank:"📋 Построить рейтинг",rankRisk:"Риск",rankMismatch:"Mismatch",rankEmpty:"Добавьте хотя бы один банк для сравнения.",rankParseErr:"Не удалось прочитать ввод. Используйте JSON-массив или JSON по строкам.",rankImpactTitle:"Real-world impact",rankImpactIndex:"Impact index",rankReputationRisk:"Reputational risk",rankStageGap:"Stage gap",rankShortTermImpact:"Short-term impact",rankLongTermImpact:"Long-term impact",impactRiskLow:"низкий",impactRiskMedium:"средний",impactRiskHigh:"высокий"
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
      provTitle:"Data Provenance",provDesc:"How each signal was derived in this demo.",
      provObservedBadge:"Official",
      provObservedBadge2:"Official",provEstimatedBadge:"Estimated",provInferredBadge:"Inferred",provModelBadge:"Model-generated",
      provTipObserved:"Sourced directly from official public records (NBKR, Stat.kg, World Bank).",
      provTipEstimated:"Estimated from partial data or proxy inputs.",
      provTipInferred:"Inferred by combining multiple indicators.",
      provTipModel:"Generated by model logic or scenario synthesis.",
      provSignalGdp:"GDP, poverty, salary, macro",
      provSignalLoans:"Loan structure, portfolio mix",
      provSignalStages:"Spiral stage mapping",
      provSignalNarrative:"Risk narrative, recommendations",
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
      cons:"Consumption",bus:"Business",other:"Other",resultsTitle:"📊 Analysis Results",btnExportPdf:"📥 Export PDF",pdfExportUnavailable:"Could not build PDF: export library failed to load.",
      execSummaryTitle:"Executive summary",execLblCondition:"Overall condition",execLblRisk:"Primary risk",execLblConsequence:"Expected consequence",execLblAction:"Recommended action",
      execConditionPoor:"Strained posture: low welfare contribution at current inputs.",execConditionMixed:"Mixed picture: notable risk signals—monitor closely.",      execConditionGood:"Relatively balanced profile by contribution index.",
      execConsequenceUnavailable:"—",execActionFallback:"See detailed recommendations below.",
      worstCaseTitle:"⚠️ Worst-case scenario",worstCaseDisclaimer:"Scenario signal only, not a confirmed fact.",
      worstLblCondition:"Condition if factors worsen",worstLblRisk:"Escalated risk",worstLblConsequence:"If unaddressed",
      worstConditionHigh:"Critical destabilization of the bank profile and borrower environment.",worstConditionMedium:"Resilience declines quickly and risk turns systemic.",worstConditionLow:"Moderate deterioration can still accelerate a move toward medium risk.",
      worstConsequenceHigh:"Likely cascade of delinquencies, reputational shock, and strong external pressure on the credit model.",worstConsequenceMedium:"Risk costs rise and trust weakens, limiting room for growth.",worstConsequenceLow:"Without preventive action, local signals can compound into a visible social and reputational gap.",
      worstDriverPrefix:"Key vulnerability driver",
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
      recShortTerm_redPressure:"Снизить высокое давление кредитной практики: ограничить штрафы и пени, продлить окна реструктуризации и усилить проверки доступности платежей.",
      recShortTerm_empathyGap:"Запустить протоколы поддержки заёмщиков: реструктуризация при трудностях, прозрачные коммуникации и меры по облегчению для клиентов.",
      recShortTerm_stageMismatch:"Сбалансировать продуктовый микс под локальную реальность: упростить условия, добавить платежи, привязанные к доходу, и снизить «точки трения».",
      recShortTerm_welfareScorePenalty:"Стабилизировать ключевые показатели, чувствительные к благосостоянию: смягчить фактическую стоимость заимствования и снизить извлекательные условия.",
      recShortTerm_esgClaimMismatch:"Устранить разрыв доверия по ESG: согласовать публичные ESG-заявления с измеримой практикой на уровне заёмщиков и раскрытием информации.",
      recStrategic_red:"Перейти от доминирования Red (извлечение) к созданию ценности на Orange/Green через продуктивное кредитование и инклюзивные цели роста.",
      recStrategic_blue:"Сохранить дисциплину Blue и расширить инновации Orange в кредитовании МСП и управлении портфелем по результатам.",
      recStrategic_orange:"Усилить исполнение Orange с защитами Green: сочетать KPI роста с KPI социальной доступности и устойчивости.",
      recStrategic_green:"Масштабировать сильные стороны Green в системное мышление Yellow: встроить межотраслевые welfare-эффекты в кредитную стратегию.",
      recStrategic_yellow:"Закрепить адаптивное управление, чтобы решения по портфелю оставались согласованы с меняющимися паттернами благосостояния населения.",
      recStrategic_turquoise:"Сохранить долгосрочную системную ориентацию и одновременно защищать устойчивость заёмщиков в волатильных сегментах.",
      recStrategic_beige:"Сместиться от сигналов «кредитования выживания» к базовым продуктам стабильности и путям включения с учётом риска.",
      recStrategic_purple:"Перейти от паттернов «традиция/община» к прозрачному, основанному на данных управлению кредитованием.",
      recTier_noImpact:"До появления данных по impact сохраняйте сбалансированную позицию перехода, затем согласуйте действия с измеримыми результатами для заёмщиков.",
      recTier_highImpact:"Выявлено устойчивое выравнивание: укрепляйте текущую стратегию дисциплинированным мониторингом и поэтапным улучшением результатов для заёмщиков.",
      recTier_midImpact:"Переходное выравнивание: в приоритете точечные корректировки портфеля для улучшения согласованности с благосостоянием и последовательности исполнения.",
      recTier_lowImpact:"Структурный риск: выполните план коррекции структурного риска с фокусом на доступность, управление и перестройку стадийного профиля.",
      recRisk_esgHigh:"Выявлен большой разрыв по ESG-выравниванию: введите ежеквартальный аудит обещанных ESG-результатов против опыта заёмщиков.",
      recRisk_esgMonitor:"Контролируйте ESG-выравнивание каждый квартал, чтобы предотвратить дрейф между заявленными ценностями и поведением в поле.",
      recRisk_levelHigh:"Установите 90-дневный план реагирования на риск с надзором совета для уязвимых сегментов заёмщиков.",
      recRisk_levelMedium:"Используйте ежемесячные ранние предупреждения по просрочке, реструктуризации и сигналам социального стресса.",
      recRisk_levelLow:"Поддерживайте лёгкий мониторинг и сохраняйте профилактический контроль доступности.",
      recPrimaryDriverTemplate:"Сначала устраните главный драйвер несоответствия: {driver}.",
      recTitle:"💡 RECOMMENDATION:",
      stageMeaning:{beige:"Survival",purple:"Traditional/Family",red:"Inequality/Rebellion",blue:"Order/Discipline",orange:"Achievement/Middle Class",green:"Empathy/Mutual Aid",yellow:"Flexible/Adaptive",turquoise:"Holistic/Global"},
      mismatchScoreLabel:"Mismatch score:", mismatchRiskLabel:"Risk level:", mismatchDriverLabel:"Primary driver:", esgConfidenceLabel:"ESG confidence:", driverConfidenceLabel:"Driver confidence:", shortTermLabel:"Short-term consequence:", longTermLabel:"Long-term consequence:", predictiveDisclaimer:"⚠️ Scenario-based projection: indicative only, not a guaranteed outcome.",
      sponsorLead:"Demo limitation: this analysis is based on public and estimated data.",
      sponsorTension:"Your internal data can significantly change the risk profile — key drivers may currently be underestimated or misread.",
      sponsorResolution:"Run this model on your internal data in Sponsor Lab.",
      sponsorValueSimulation:"Simulation before decision-making",
      sponsorValueCalibration:"Internal behavioral calibration",
      sponsorValueScenario:"Scenario testing (policy / product / credit strategy)",
      sponsorPrimaryCta:"Request Sponsor Lab Access",
      sponsorSecondaryCta:"See how internal data changes results",
      sponsorCompareDemo:"Public demo → Estimated",
      sponsorCompareLab:"Sponsor Lab → Calibrated simulation",
      recShortTerm_redPressure:"Reduce high-pressure loan practices: cap penalty fees, extend restructuring windows, and prioritize affordability checks.",
      recShortTerm_empathyGap:"Launch borrower support protocols: hardship restructuring, transparent communication, and customer-relief options.",
      recShortTerm_stageMismatch:"Rebalance product mix to local realities: simplify terms, add income-linked repayment options, and reduce friction points.",
      recShortTerm_welfareScorePenalty:"Stabilize core welfare-sensitive indicators by easing effective borrowing costs and reducing extractive terms.",
      recShortTerm_esgClaimMismatch:"Close the ESG trust gap: align public ESG claims with measurable borrower-level practices and disclosures.",
      recStrategic_red:"Shift from Red-dominant extraction to Orange/Green value creation through productive lending and inclusive growth targets.",
      recStrategic_blue:"Retain Blue discipline while expanding Orange innovation in SME lending and outcome-based portfolio management.",
      recStrategic_orange:"Strengthen Orange execution with Green safeguards: pair growth KPIs with social affordability and resilience KPIs.",
      recStrategic_green:"Scale Green strengths into Yellow systems thinking: embed cross-sector welfare outcomes in credit strategy.",
      recStrategic_yellow:"Codify adaptive governance to keep portfolio decisions aligned with evolving population welfare patterns.",
      recStrategic_turquoise:"Preserve long-term systemic orientation while protecting near-term borrower resilience in volatile segments.",
      recStrategic_beige:"Move from survival-driven lending signals toward basic stability products and risk-aware inclusion pathways.",
      recStrategic_purple:"Transition from tradition-driven patterns to transparent, data-backed lending governance.",
      recTier_noImpact:"Maintain a balanced transition posture until impact data is available, then align actions to measured borrower outcomes.",
      recTier_highImpact:"Stable alignment detected: reinforce current strategy with disciplined monitoring and incremental borrower-outcome improvements.",
      recTier_midImpact:"Transitional alignment detected: prioritize targeted portfolio adjustments to improve welfare alignment and execution consistency.",
      recTier_lowImpact:"Structural risk detected: execute a structural-risk correction plan focused on affordability, governance, and stage-realignment.",
      recRisk_esgHigh:"High ESG alignment gap detected: institute quarterly audit of promised ESG outcomes vs borrower experience.",
      recRisk_esgMonitor:"Monitor ESG alignment every quarter to prevent drift between stated values and field behavior.",
      recRisk_levelHigh:"Set a 90-day risk response plan with board oversight for vulnerable borrower segments.",
      recRisk_levelMedium:"Use monthly early-warning dashboards for delinquency, restructuring, and social stress signals.",
      recRisk_levelLow:"Maintain light-touch monitoring and keep preventive affordability controls active.",
      recPrimaryDriverTemplate:"Primary mismatch driver to address first: {driver}.",
      riskLevels:{low:"low",medium:"medium",high:"high"},
      execLblSignalReliability:"Signal reliability",
      signalReliabilityHeading:"Signal reliability",
      combinedConfidenceLabel:"Combined confidence",
      uncertaintyTierHigh:"High",
      uncertaintyTierMedium:"Medium",
      uncertaintyTierLow:"Low",
      signalStrengthStrong:"Strong signal — interpretations can reasonably guide decisions.",
      signalStrengthModerate:"Moderate confidence — treat outputs as directional and validate with data.",
      signalStrengthProvisional:"Provisional signal — avoid decisive conclusions without corroboration.",

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
      rankTitle:"🏁 Bank Ranking",rankInputLabel:"Bank array input (JSON or one JSON object per line)",rankInputHint:"Supports a JSON array or newline-delimited JSON (one bank per line).",btnRank:"📋 Build ranking",rankRisk:"Risk",rankMismatch:"Mismatch",rankEmpty:"Add at least one bank to compare.",rankParseErr:"Cannot parse input. Use a JSON array or one JSON object per line.",rankImpactTitle:"Real-world impact",rankImpactIndex:"Impact index",rankReputationRisk:"Reputational risk",rankStageGap:"Stage gap",rankShortTermImpact:"Short-term impact",rankLongTermImpact:"Long-term impact",impactRiskLow:"low",impactRiskMedium:"medium",impactRiskHigh:"high"
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
    const tooltipMap = {
      provObservedBadge: 'provTipObserved',
      provEstimatedBadge: 'provTipEstimated',
      provInferredBadge: 'provTipInferred',
      provModelBadge: 'provTipModel'
    };
    Object.entries(tooltipMap).forEach(([id, key]) => {
      if ($(id) && tr[lang][key]) $(id).title = tr[lang][key];
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
