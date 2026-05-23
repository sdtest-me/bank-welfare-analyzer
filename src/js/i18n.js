(function () {
  const tr = {
    ru: {
      app:"Bank Welfare Analyzer",inpTitle:"Ввод данных банка",btnAnalyze:"🚀 Анализировать",
      heroDemoBadge:"🏛️ Превью Лаборатории Спонсора",heroDemoTitle:"Институциональное сценарное планирование для решений по банковскому welfare.",
      heroDemoSubtitle:"Только сценарное планирование: не прогнозирование и не predictive AI. Для внутренней калибровки, стратегического планирования, policy-экспериментов и тестирования портфельной стратегии.",
      heroDemoPrimary:"Загрузить preview-кейс",heroDemoSecondary:"Быстрый анализ",heroDemoContextPrefix:"Текущий демо-кейс",
      exLabel:"Примеры:",exEldik:"🏦 Eldik Bank",exOptima:"🏦 Optima Bank",exDemir:"🏦 Demir Bank",exKicb:"🏦 KICB",exBakai:"🏦 Bakai Bank",exNew:"✨ Новый банк",
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
      execSummaryTitle:"Краткое резюме",execLblCondition:"Общее состояние",execLblRisk:"Главный риск",execLblConsequence:"Ожидаемое следствие",execLblStakes:"Что поставлено на карту",execLblAction:"Рекомендуемые действия",
      execConditionPoor:"Напряжённая модель: низкий вклад в благосостояние при текущих вводных.",execConditionMixed:"Смешанная картина: есть сильные сигналы риска, требуется внимание.",      execConditionGood:"Более сбалансированный профиль по индексу вклада.",
      execConsequenceUnavailable:"—",execStakesFallback:"—",execActionFallback:"Смотрите детальные рекомендации ниже.",
      worstCaseTitle:"⚠️ Худший сценарий",worstCaseDisclaimer:"Сценарный сигнал: это не подтверждённый факт.",whatIfDisclaimer:"⚠️ Инструмент сценарного планирования — только для внутреннего стратегического использования. Результаты не являются прогнозом, официальным анализом или валидированными выводами. Для калиброванных симуляций используйте Лабораторию Спонсора.",whatIfSponsorLead:"Эскалационный шаг: проверьте этот сценарий на внутренних данных в Лаборатории Спонсора до управленческих решений.",whatIfSponsorPrimaryCta:"Проверить в Лаборатории Спонсора",whatIfSponsorSecondaryCta:"Почему важна внутренняя калибровка",
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
      recShortTerm_redPressure:"При высоком давлении Красной стадии быстро снизьте силовую динамику: ограничьте штрафы и пени, продлите окна реструктуризации и усилите проверки доступности платежей.",
      recShortTerm_empathyGap:"При разрыве эмпатии запустите поддержку заёмщиков: реструктуризация при трудностях, ясные уведомления и маршруты клиентской помощи.",
      recShortTerm_stageMismatch:"При структурном разрыве стадий перестройте продуктовый микс под локальную реальность: упростите условия, добавьте платежи, привязанные к доходу, и уберите операционное трение.",
      recShortTerm_welfareScorePenalty:"При слабом базовом благосостоянии стабилизируйте доступность: смягчите фактическую стоимость заимствования и снизьте извлекательные условия.",
      recShortTerm_esgClaimMismatch:"При разрыве ESG-заявлений закройте дефицит доверия: свяжите публичные обещания с измеримой практикой на уровне заёмщиков и раскрытием информации.",
      recStrategic_red:"Перейти от доминирования Red (извлечение) к созданию ценности на Orange/Green через продуктивное кредитование и инклюзивные цели роста.",
      recStrategic_blue:"Сохранить дисциплину Blue и расширить инновации Orange в кредитовании МСП и управлении портфелем по результатам.",
      recStrategic_orange:"Усилить исполнение Orange с защитами Green: сочетать KPI роста с KPI социальной доступности и устойчивости.",
      recStrategic_green:"Масштабировать сильные стороны Green в системное мышление Yellow: встроить межотраслевые welfare-эффекты в кредитную стратегию.",
      recStrategic_yellow:"Закрепить адаптивное управление, чтобы решения по портфелю оставались согласованы с меняющимися паттернами благосостояния населения.",
      recStrategic_turquoise:"Сохранить долгосрочную системную ориентацию и одновременно защищать устойчивость заёмщиков в волатильных сегментах.",
      recStrategic_beige:"Сместиться от сигналов «кредитования выживания» к базовым продуктам стабильности и путям включения с учётом риска.",
      recStrategic_purple:"Перейти от паттернов «традиция/община» к прозрачному, основанному на данных управлению кредитованием.",
      recTier_noImpact:"До появления данных по impact сохраняйте сбалансированную позицию перехода, затем согласуйте действия с измеримыми результатами для заёмщиков.",
      recTier_highImpact:"Выявлено устойчивое выравнивание: сохраняйте текущий курс, отслеживайте дрейф стадий и закрепляйте точечные улучшения результатов заёмщиков.",
      recTier_midImpact:"Переходное выравнивание: сфокусируйтесь на ведущем драйвере несоответствия и корректируйте портфель, пока траектория риска ещё обратима.",
      recTier_lowImpact:"Структурный риск: запускайте коррекцию доступности, управления и стадийного выравнивания как единый пакет, а не как косметическую коммуникацию.",
      recRisk_esgHigh:"Выявлен большой разрыв по ESG-выравниванию: введите ежеквартальный аудит обещанных ESG-результатов против опыта заёмщиков.",
      recRisk_esgMonitor:"Контролируйте ESG-выравнивание каждый квартал, чтобы предотвратить дрейф между заявленными ценностями и поведением в поле.",
      recRisk_levelHigh:"Установите 90-дневный план реагирования на риск с надзором совета для уязвимых сегментов заёмщиков.",
      recRisk_levelMedium:"Используйте ежемесячные панели просрочки, реструктуризации и социального стресса, чтобы отличать временный шум от устойчивого трения.",
      recRisk_levelLow:"Поддерживайте лёгкий мониторинг и сохраняйте профилактический контроль доступности.",
      recPrimaryDriverTemplate:"Сначала устраните главный драйвер несоответствия: {driver}.",
      recTitle:"💡 РЕКОМЕНДАЦИЯ:",
      stageMeaning:{beige:"Выживание",purple:"Традиции/Семья",red:"Неравенство/Бунт",blue:"Порядок/Дисциплина",orange:"Достижение/Средний класс",green:"Эмпатия/Взаимопомощь",yellow:"Гибкость/Адаптация",turquoise:"Холизм/Глобальность"},
      mismatchScoreLabel:"Mismatch индекс:", mismatchRiskLabel:"Уровень риска:", mismatchDriverLabel:"Главный драйвер:", esgConfidenceLabel:"Уверенность ESG:", driverConfidenceLabel:"Уверенность драйвера:", shortTermLabel:"Краткосрочное последствие:", longTermLabel:"Долгосрочное последствие:", predictiveDisclaimer:"⚠️ Только сценарное планирование: не прогнозирование, не predictive AI и не гарантированный результат.",
      sponsorLead:"Ограничение preview-слоя: этот институциональный сценарный слой опирается на официальные и оценочные данные.",
      sponsorTension:"С вашими внутренними данными профиль риска может измениться существенно — ключевые драйверы могут быть недооценены или интерпретированы неверно.",
      sponsorResolution:"Запустите эту институциональную сценарную модель на ваших внутренних данных в Лаборатории Спонсора.",
      sponsorValueSimulation:"Внутренняя калибровка перед решениями руководства",
      sponsorValueCalibration:"Стратегическое планирование со сценарными контурами",
      sponsorValueScenario:"Policy-эксперименты и тестирование портфельной стратегии",
      sponsorPrimaryCta:"Запросить доступ в Лабораторию Спонсора",
      sponsorSecondaryCta:"Смотреть, как внутренние данные меняют результаты",
      sponsorCompareDemo:"Публичный аналитический слой → Официально/оценочно",
      sponsorCompareLab:"Превью Sponsor Lab → Институциональное сценарное планирование",
      riskLevels:{low:"низкий",medium:"средний",high:"высокий"},
      execLblSignalReliability:"Надёжность сигнала",
      signalReliabilityHeading:"Надёжность сигнала",
      combinedConfidenceLabel:"Сводная уверенность",transparencyTitleWelfare:"Прозрачность решения",transparencyTitleMismatch:"Прозрачность решения",transparencyTitleSpiral:"Прозрачность решения",transparencyTitleImpact:"Прозрачность решения",transparencyConfidenceLabelWelfare:"Уверенность",transparencyCompletenessLabelWelfare:"Полнота данных",transparencySourceLabelWelfare:"Тип источника",transparencyCalibrationLabelWelfare:"Режим калибровки",transparencyConfidenceLabelMismatch:"Уверенность",transparencyCompletenessLabelMismatch:"Полнота данных",transparencySourceLabelMismatch:"Тип источника",transparencyCalibrationLabelMismatch:"Режим калибровки",transparencyConfidenceLabelSpiral:"Уверенность",transparencyCompletenessLabelSpiral:"Полнота данных",transparencySourceLabelSpiral:"Тип источника",transparencyCalibrationLabelSpiral:"Режим калибровки",transparencyConfidenceLabelImpact:"Уверенность",transparencyCompletenessLabelImpact:"Полнота данных",transparencySourceLabelImpact:"Тип источника",transparencyCalibrationLabelImpact:"Режим калибровки",transparencyConfidenceHigh:"Высокая",transparencyConfidenceMedium:"Средняя",transparencyConfidenceLow:"Низкая",transparencySourceOfficial:"Официальный",transparencySourceEstimated:"Оценочный",transparencySourceInferred:"Выведенный",transparencyCalibrationPublic:"Публичная аппроксимация",transparencyCalibrationLab:"Sponsor Lab",
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
      rankTitle:"🏁 Рейтинг банков",rankInputLabel:"Массив банков (JSON или по одной JSON-строке)",rankInputHint:"Поддерживается JSON-массив или несколько строк JSON (один банк на строку).",btnRank:"📋 Построить рейтинг",rankRisk:"Риск",rankMismatch:"Mismatch",rankEmpty:"Добавьте хотя бы один банк для сравнения.",rankParseErr:"Не удалось прочитать ввод. Используйте JSON-массив или JSON по строкам.",rankImpactTitle:"Real-world impact",rankImpactIndex:"Impact index",rankReputationRisk:"Reputational risk",rankStageGap:"Stage gap",rankShortTermImpact:"Short-term impact",rankLongTermImpact:"Long-term impact",impactRiskLow:"низкий",impactRiskMedium:"средний",impactRiskHigh:"высокий",compareModeLabel:"Включить сравнительный режим (3–5 банков)",compareModeHint:"Выберите 3–5 демо-банков для быстрого side-by-side сравнения.",compareRangeErr:"Для сравнительного режима нужно выбрать от 3 до 5 банков.",compareNarrativeLead:"Лидер по совокупному профилю:",compareNarrativeGap:"Наибольший стратегический разрыв у:",compareNarrativeAvg:"Средний mismatch по выборке:",rankWelfare:"Welfare pressure",rankGovernance:"Governance"
    },
    en: {
      app:"Bank Welfare Analyzer",inpTitle:"Bank Input Data",btnAnalyze:"🚀 Analyze",
      heroDemoBadge:"🏛️ Sponsor Lab Preview",heroDemoTitle:"Institutional scenario planning for bank welfare decisions.",
      heroDemoSubtitle:"Scenario-planning only: not forecasting and not predictive AI. Designed for internal calibration, strategic planning, policy experimentation, and portfolio strategy testing.",
      heroDemoPrimary:"Load preview case",heroDemoSecondary:"Run quick analysis",heroDemoContextPrefix:"Current demo case",
      exLabel:"Examples:",exEldik:"🏦 Eldik Bank",exOptima:"🏦 Optima Bank",exDemir:"🏦 Demir Bank",exKicb:"🏦 KICB",exBakai:"🏦 Bakai Bank",exNew:"✨ New bank",
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
      execSummaryTitle:"Executive summary",execLblCondition:"Overall condition",execLblRisk:"Primary risk",execLblConsequence:"Expected consequence",execLblStakes:"What is at stake",execLblAction:"Recommended action",
      execConditionPoor:"Strained posture: low welfare contribution at current inputs.",execConditionMixed:"Mixed picture: notable risk signals—monitor closely.",      execConditionGood:"Relatively balanced profile by contribution index.",
      execConsequenceUnavailable:"—",execStakesFallback:"—",execActionFallback:"See detailed recommendations below.",
      worstCaseTitle:"⚠️ Worst-case scenario",worstCaseDisclaimer:"Scenario signal only, not a confirmed fact.",whatIfDisclaimer:"⚠️ Scenario planning tool — for internal strategic exploration only. Results are not forecasts, not official analysis, and do not represent validated outcomes. Use Sponsor Lab for calibrated internal simulations.",whatIfSponsorLead:"Escalation path: validate this scenario with internal data in Sponsor Lab before executive decisions.",whatIfSponsorPrimaryCta:"Validate in Sponsor Lab",whatIfSponsorSecondaryCta:"Why internal calibration matters",
      worstLblCondition:"Condition if factors worsen",worstLblRisk:"Escalated risk",worstLblConsequence:"If unaddressed",
      worstConditionHigh:"Critical destabilization of the bank profile and borrower environment.",worstConditionMedium:"Resilience declines quickly and risk turns systemic.",worstConditionLow:"Moderate deterioration can still accelerate a move toward medium risk.",
      worstConditionDriver_redPressure:"Collection pressure and repayment stress can escalate into acute borrower instability and fast portfolio deterioration.",
      worstConditionDriver_empathyGap:"Borrower-support gaps can trigger a trust breakdown, rapidly amplifying social and reputational fragility.",
      worstConditionDriver_stageMismatch:"A stage mismatch can lock products out of local realities, causing execution failures and demand distortion.",
      worstConditionDriver_welfareScorePenalty:"Weak welfare fundamentals can turn routine lending friction into systemic affordability stress.",
      worstConditionDriver_esgClaimMismatch:"ESG claim mismatch can harden into a credibility crisis across regulators, media, and clients.",
      worstConsequenceHigh:"Likely cascade of delinquencies, reputational shock, and strong external pressure on the credit model.",worstConsequenceMedium:"Risk costs rise and trust weakens, limiting room for growth.",worstConsequenceLow:"Without preventive action, local signals can compound into a visible social and reputational gap.",
      worstConsequenceDriver_redPressure:"Delinquency can accelerate, restructuring demand can spike, and coercive collection optics can provoke external intervention.",
      worstConsequenceDriver_empathyGap:"Complaint volumes and churn can rise together, reducing recovery quality and increasing franchise damage.",
      worstConsequenceDriver_stageMismatch:"Product underperformance can persist, forcing costly repricing cycles and weakening medium-term growth confidence.",
      worstConsequenceDriver_welfareScorePenalty:"Affordability stress can widen default clusters, increasing provisioning pressure and shrinking strategic flexibility.",
      worstConsequenceDriver_esgClaimMismatch:"Trust erosion can convert into governance pressure, harder capital access, and prolonged reputational discount.",
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
      recShortTerm_redPressure:"При высоком давлении Красной стадии быстро снизьте силовую динамику: ограничьте штрафы и пени, продлите окна реструктуризации и усилите проверки доступности платежей.",
      recShortTerm_empathyGap:"При разрыве эмпатии запустите поддержку заёмщиков: реструктуризация при трудностях, ясные уведомления и маршруты клиентской помощи.",
      recShortTerm_stageMismatch:"При структурном разрыве стадий перестройте продуктовый микс под локальную реальность: упростите условия, добавьте платежи, привязанные к доходу, и уберите операционное трение.",
      recShortTerm_welfareScorePenalty:"При слабом базовом благосостоянии стабилизируйте доступность: смягчите фактическую стоимость заимствования и снизьте извлекательные условия.",
      recShortTerm_esgClaimMismatch:"При разрыве ESG-заявлений закройте дефицит доверия: свяжите публичные обещания с измеримой практикой на уровне заёмщиков и раскрытием информации.",
      recStrategic_red:"Перейти от доминирования Red (извлечение) к созданию ценности на Orange/Green через продуктивное кредитование и инклюзивные цели роста.",
      recStrategic_blue:"Сохранить дисциплину Blue и расширить инновации Orange в кредитовании МСП и управлении портфелем по результатам.",
      recStrategic_orange:"Усилить исполнение Orange с защитами Green: сочетать KPI роста с KPI социальной доступности и устойчивости.",
      recStrategic_green:"Масштабировать сильные стороны Green в системное мышление Yellow: встроить межотраслевые welfare-эффекты в кредитную стратегию.",
      recStrategic_yellow:"Закрепить адаптивное управление, чтобы решения по портфелю оставались согласованы с меняющимися паттернами благосостояния населения.",
      recStrategic_turquoise:"Сохранить долгосрочную системную ориентацию и одновременно защищать устойчивость заёмщиков в волатильных сегментах.",
      recStrategic_beige:"Сместиться от сигналов «кредитования выживания» к базовым продуктам стабильности и путям включения с учётом риска.",
      recStrategic_purple:"Перейти от паттернов «традиция/община» к прозрачному, основанному на данных управлению кредитованием.",
      recTier_noImpact:"До появления данных по impact сохраняйте сбалансированную позицию перехода, затем согласуйте действия с измеримыми результатами для заёмщиков.",
      recTier_highImpact:"Выявлено устойчивое выравнивание: сохраняйте текущий курс, отслеживайте дрейф стадий и закрепляйте точечные улучшения результатов заёмщиков.",
      recTier_midImpact:"Переходное выравнивание: сфокусируйтесь на ведущем драйвере несоответствия и корректируйте портфель, пока траектория риска ещё обратима.",
      recTier_lowImpact:"Структурный риск: запускайте коррекцию доступности, управления и стадийного выравнивания как единый пакет, а не как косметическую коммуникацию.",
      recRisk_esgHigh:"Выявлен большой разрыв по ESG-выравниванию: введите ежеквартальный аудит обещанных ESG-результатов против опыта заёмщиков.",
      recRisk_esgMonitor:"Контролируйте ESG-выравнивание каждый квартал, чтобы предотвратить дрейф между заявленными ценностями и поведением в поле.",
      recRisk_levelHigh:"Установите 90-дневный план реагирования на риск с надзором совета для уязвимых сегментов заёмщиков.",
      recRisk_levelMedium:"Используйте ежемесячные панели просрочки, реструктуризации и социального стресса, чтобы отличать временный шум от устойчивого трения.",
      recRisk_levelLow:"Поддерживайте лёгкий мониторинг и сохраняйте профилактический контроль доступности.",
      recPrimaryDriverTemplate:"Сначала устраните главный драйвер несоответствия: {driver}.",
      recTitle:"💡 RECOMMENDATION:",
      stageMeaning:{beige:"Survival",purple:"Traditional/Family",red:"Inequality/Rebellion",blue:"Order/Discipline",orange:"Achievement/Middle Class",green:"Empathy/Mutual Aid",yellow:"Flexible/Adaptive",turquoise:"Holistic/Global"},
      mismatchScoreLabel:"Mismatch score:", mismatchRiskLabel:"Risk level:", mismatchDriverLabel:"Primary driver:", esgConfidenceLabel:"ESG confidence:", driverConfidenceLabel:"Driver confidence:", shortTermLabel:"Short-term consequence:", longTermLabel:"Long-term consequence:", predictiveDisclaimer:"⚠️ Scenario planning only: not forecasting, not predictive AI, and not a guaranteed outcome.",
      sponsorLead:"Preview limitation: this institutional scenario layer is based on official and estimated data.",
      sponsorTension:"Your internal data can significantly change the risk profile — key drivers may currently be underestimated or misread.",
      sponsorResolution:"Run this institutional scenario model on your internal data in Sponsor Lab.",
      sponsorValueSimulation:"Internal calibration before executive decisions",
      sponsorValueCalibration:"Strategic planning with scenario envelopes",
      sponsorValueScenario:"Policy experimentation and portfolio strategy testing",
      sponsorPrimaryCta:"Request Sponsor Lab Access",
      sponsorSecondaryCta:"See how internal data changes results",
      sponsorCompareDemo:"Public analysis layer → Official/estimated orientation",
      sponsorCompareLab:"Sponsor Lab Preview layer → Institutional scenario planning",
      recShortTerm_redPressure:"For high Red-stage pressure, reduce power friction quickly: cap penalty fees, extend restructuring windows, and prioritize affordability checks.",
      recShortTerm_empathyGap:"For an empathy gap, launch borrower support protocols: hardship restructuring, plain-language communication, and customer-relief routes.",
      recShortTerm_stageMismatch:"For structural stage mismatch, rebalance product design to local realities: simplify terms, add income-linked repayment options, and remove operational friction points.",
      recShortTerm_welfareScorePenalty:"For weak welfare fundamentals, stabilize affordability by easing effective borrowing costs and reducing extractive terms.",
      recShortTerm_esgClaimMismatch:"For ESG claim mismatch, close the trust gap by tying public commitments to measurable borrower-level practices and disclosures.",
      recStrategic_red:"Shift from Red-dominant extraction to Orange/Green value creation through productive lending and inclusive growth targets.",
      recStrategic_blue:"Retain Blue discipline while expanding Orange innovation in SME lending and outcome-based portfolio management.",
      recStrategic_orange:"Strengthen Orange execution with Green safeguards: pair growth KPIs with social affordability and resilience KPIs.",
      recStrategic_green:"Scale Green strengths into Yellow systems thinking: embed cross-sector welfare outcomes in credit strategy.",
      recStrategic_yellow:"Codify adaptive governance to keep portfolio decisions aligned with evolving population welfare patterns.",
      recStrategic_turquoise:"Preserve long-term systemic orientation while protecting near-term borrower resilience in volatile segments.",
      recStrategic_beige:"Move from survival-driven lending signals toward basic stability products and risk-aware inclusion pathways.",
      recStrategic_purple:"Transition from tradition-driven patterns to transparent, data-backed lending governance.",
      recTier_noImpact:"Maintain a balanced transition posture until impact data is available, then align actions to measured borrower outcomes.",
      recTier_highImpact:"Stable alignment detected: preserve the current path, watch for stage drift, and lock in targeted borrower-outcome improvements.",
      recTier_midImpact:"Transitional alignment detected: focus on the leading mismatch driver and adjust the portfolio while the risk path is still reversible.",
      recTier_lowImpact:"Structural risk detected: execute affordability, governance, and stage-realignment corrections as one package, not as cosmetic messaging.",
      recRisk_esgHigh:"High ESG alignment gap detected: institute quarterly audit of promised ESG outcomes vs borrower experience.",
      recRisk_esgMonitor:"Monitor ESG alignment every quarter to prevent drift between stated values and field behavior.",
      recRisk_levelHigh:"Set a 90-day risk response plan with board oversight for vulnerable borrower segments.",
      recRisk_levelMedium:"Use monthly delinquency, restructuring, and social-stress dashboards to separate temporary noise from persistent friction.",
      recRisk_levelLow:"Maintain light-touch monitoring and keep preventive affordability controls active.",
      recPrimaryDriverTemplate:"Primary mismatch driver to address first: {driver}.",
      riskLevels:{low:"low",medium:"medium",high:"high"},
      execLblSignalReliability:"Signal reliability",
      signalReliabilityHeading:"Signal reliability",
      combinedConfidenceLabel:"Combined confidence",transparencyTitleWelfare:"Decision transparency",transparencyTitleMismatch:"Decision transparency",transparencyTitleSpiral:"Decision transparency",transparencyTitleImpact:"Decision transparency",transparencyConfidenceLabelWelfare:"Confidence",transparencyCompletenessLabelWelfare:"Data completeness",transparencySourceLabelWelfare:"Source type",transparencyCalibrationLabelWelfare:"Calibration mode",transparencyConfidenceLabelMismatch:"Confidence",transparencyCompletenessLabelMismatch:"Data completeness",transparencySourceLabelMismatch:"Source type",transparencyCalibrationLabelMismatch:"Calibration mode",transparencyConfidenceLabelSpiral:"Confidence",transparencyCompletenessLabelSpiral:"Data completeness",transparencySourceLabelSpiral:"Source type",transparencyCalibrationLabelSpiral:"Calibration mode",transparencyConfidenceLabelImpact:"Confidence",transparencyCompletenessLabelImpact:"Data completeness",transparencySourceLabelImpact:"Source type",transparencyCalibrationLabelImpact:"Calibration mode",transparencyConfidenceHigh:"High",transparencyConfidenceMedium:"Medium",transparencyConfidenceLow:"Low",transparencySourceOfficial:"Official",transparencySourceEstimated:"Estimated",transparencySourceInferred:"Inferred",transparencyCalibrationPublic:"Public approximation",transparencyCalibrationLab:"Sponsor Lab",
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
        gapBulletsExtraction:{
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
        gapBulletsGovernance:{
          ru:[
            "Банк {bankIcon} {bankStage} — порядок и контроль. У населения {blueIcon} {blueStage} ({populationBlue}%) — дисциплина платежей",
            "У населения высокий {blueIcon} {blueStage} ({populationBlue}%) — соблюдение правил. Банк {bankIcon} {bankStage} опирается на формальное управление",
            "Население {blueIcon} {blueStage} ({populationBlue}%) vs банк {bankIcon} {bankStage} — разрыв в ожиданиях порядка"
          ],
          en:[
            "Bank {bankIcon} {bankStage} — order and control. Population {blueIcon} {blueStage} ({populationBlue}%) — payment discipline",
            "Population has high {blueIcon} {blueStage} ({populationBlue}%) — rule compliance. Bank {bankIcon} {bankStage} relies on formal governance",
            "Population {blueIcon} {blueStage} ({populationBlue}%) vs bank {bankIcon} {bankStage} — governance expectation gap"
          ]
        },
        gapBulletsGrowth:{
          ru:[
            "Банк {bankIcon} {bankStage} — достижение и рост. Потребительские кредиты {creditConsumption}% не синхронизированы с доходами населения",
            "У населения {blueIcon} {blueStage} ({populationBlue}%) — платёжная дисциплина. Банк {bankIcon} {bankStage} гонит рост портфеля",
            "Банк {bankIcon} {bankStage} vs население {greenIcon} {greenStage} ({populationGreen}%) — рост прибыли опережает взаимопомощь"
          ],
          en:[
            "Bank {bankIcon} {bankStage} — achievement and growth. Consumer loans {creditConsumption}% are out of sync with population income",
            "Population {blueIcon} {blueStage} ({populationBlue}%) — payment discipline. Bank {bankIcon} {bankStage} pushes portfolio growth",
            "Bank {bankIcon} {bankStage} vs population {greenIcon} {greenStage} ({populationGreen}%) — profit growth outpaces mutual aid"
          ]
        },
        gapBulletsWelfare:{
          ru:[
            "Население {greenIcon} {greenStage} ({populationGreen}%) — взаимопомощь. Банк {bankIcon} {bankStage}, {bankGreenStage} = {bankGreen}%",
            "У населения {greenIcon} {greenStage} ({populationGreen}%) — эмпатия и поддержка. Банк {bankIcon} {bankStage} не отражает welfare-ориентацию",
            "Банк {bankIcon} {bankStage} vs население {greenIcon} {greenStage} ({populationGreen}%) — разрыв эмпатии"
          ],
          en:[
            "Population {greenIcon} {greenStage} ({populationGreen}%) — mutual aid. Bank {bankIcon} {bankStage}, {bankGreenStage} = {bankGreen}%",
            "Population {greenIcon} {greenStage} ({populationGreen}%) — empathy and support. Bank {bankIcon} {bankStage} does not reflect welfare orientation",
            "Bank {bankIcon} {bankStage} vs population {greenIcon} {greenStage} ({populationGreen}%) — empathy gap"
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
      rankTitle:"🏁 Bank Ranking",rankInputLabel:"Bank array input (JSON or one JSON object per line)",rankInputHint:"Supports a JSON array or newline-delimited JSON (one bank per line).",btnRank:"📋 Build ranking",rankRisk:"Risk",rankMismatch:"Mismatch",rankEmpty:"Add at least one bank to compare.",rankParseErr:"Cannot parse input. Use a JSON array or one JSON object per line.",rankImpactTitle:"Real-world impact",rankImpactIndex:"Impact index",rankReputationRisk:"Reputational risk",rankStageGap:"Stage gap",rankShortTermImpact:"Short-term impact",rankLongTermImpact:"Long-term impact",impactRiskLow:"low",impactRiskMedium:"medium",impactRiskHigh:"high",compareModeLabel:"Enable comparative mode (3–5 banks)",compareModeHint:"Select 3–5 demo banks for rapid side-by-side comparison.",compareRangeErr:"Comparative mode requires selecting 3 to 5 banks.",compareNarrativeLead:"Top strategic profile:",compareNarrativeGap:"Largest strategic gap:",compareNarrativeAvg:"Average mismatch across cohort:",rankWelfare:"Welfare pressure",rankGovernance:"Governance"
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
