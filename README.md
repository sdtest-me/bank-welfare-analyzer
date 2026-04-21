# 🏦 Bank Welfare Analyzer

**Bilingual README**

**Quick Navigation:**
- [🇬 English Version (International)](#english-version)
- [🇷🇺 Русская версия](#русская-версия)

---

# English Version

> This tool assesses the real contribution of a bank to the population's living standards, going beyond financial metrics for shareholders. It helps distinguish short-term profitability from long-term socio-economic impact.

---

## Table of Contents

1. [Purpose & Target Audience](#1-purpose--target-audience)
2. [Welfare Score Index Methodology](#2-welfare-score-index-methodology)
3. [Spiral Dynamics Methodology](#3-spiral-dynamics-methodology)
4. [Data Sources for Eldik Bank](#4-data-sources-for-eldik-bank)
5. [Results Interpretation](#5-results-interpretation)
6. [How to Use](#6-how-to-use)
7. [Technical Architecture](#7-technical-architecture)

---

## 1. Purpose & Target Audience

**Bank Welfare Analyzer** was created to objectively assess how a bank's activities impact the welfare of a country's population. Unlike standard ratings (ROE, asset quality), this tool focuses on:

- 📊 **Profit Disparity**: comparing bank profit growth vs. population income growth
- 💳 **Credit Structure**: evaluating whether the bank funds business development or consumer debt
- 🏘 **Poverty Context**: accounting for national poverty rates and GDP per capita
- 💰 **Distribution Policy**: analyzing how much profit returns to the economy via dividends and taxes

**Target Audience**: analysts, economists, NGOs, regulators, financial journalists, and citizens interested in sustainable banking sector development.

---

## 2. Welfare Score Index Methodology

The **Welfare Score** Index is calculated using a weighted sum of five factors. Each factor is normalized on a 0–100 scale, where 100 represents maximum positive contribution to population welfare.

### Formula: Welfare Score = (F₁ × 0.30) + (F₂ × 0.25) + (F₃ × 0.20) + (F₄ × 0.15) + (F₅ × 0.10)

| Factor | Weight | Description | Calculation |
|--------|--------|-------------|-------------|
| **F₁: Profit Disparity** | 30% | Ratio of bank profit growth to population income growth | `max(0, 100 − (Profit% / Income%) × 3)` |
| **F₂: Consumption Credit Share** | 25% | Higher consumption loan share = lower score | `100 − %_consumption_loans` |
| **F₃: Poverty Rate** | 20% | High poverty reduces positive impact potential | `100 − %_poverty` |
| **F₄: Interest Rates** | 15% | High rates create debt burden on population | `max(0, 100 − (Avg_Rate − 10) × 2)` |
| **F₅: Dividend Policy** | 10% | 100% profit extraction to shareholders reduces investment potential | `100 − %_dividends × 0.5` |

### Threshold Values for Color Indication:

| Range | Color | Interpretation |
|-------|-------|----------------|
| 0–39 | 🔴 Red | Low contribution, signs of financial extraction |
| 40–69 | 🟡 Yellow | Moderate contribution, monitoring required |
| 70–100 | 🟢 Green | High contribution, balanced development model |

### Warning Logic:

- 🔴 **Red Warning**: if profit disparity > 5x AND consumption loans > 40% → "Poverty lending"
- 🟡 **Yellow Warning**: if score 40–69 → "Monitor needed"
- 🟢 **Green Warning**: if score ≥ 70 → "Balanced model"

---

## 3. Spiral Dynamics Methodology

### 3.1 Overview

Spiral Dynamics theory is a psychological and sociological model that describes the evolution of human value systems through 8 distinct stages (colors). In this application, we apply it to analyze:

1. **Population Life Conditions** - the dominant value systems based on living standards
2. **Bank Organizational Culture** - the dominant value systems based on business practices

### 3.2 Population Spiral Dynamics Stage (vMEME) Calculation

Population stages are calculated based on objective macroeconomic indicators. The sum of all 8 stages always equals **100%**, with no single stage exceeding **40%**.

**Important Condition:** If the share of consumer loans exceeds 40% (`creditConsumption > 40`), the "over-indebted society" logic applies. Otherwise, standard logic is used.

| Stage (vMEME) | Color | Key Indicators | Calculation Formula | Max % |
|-------|-------|----------------|---------------------|-------|
| **Beige** | 🟤 | Survival, basic needs | If cons. > 40%: **40%**, else: `min(30, poverty_rate × 1.2)` | 40% |
| **Purple** | 🟣 | Traditional, family bonds | If cons. > 40%: `min(15, 15 − (GDP / 300))`, else: `min(25, 30 − (GDP / 200))` | 25% |
| **Red** | 🔴 | Inequality, riots, robberies | If cons. > 40%: **5%** (low level, no riots), else: `min(35, 20 + poverty_rate × 0.4)` | 35% |
| **Blue** | 🔵 | Order, payment discipline | If cons. > 40%: **25%** (high, pay debts), else: **Fixed: 33%** | 33% |
| **Orange** | 🟠 | Achievement, middle class | If cons. > 40%: `min(5, GDP / 500)`, else: `min(25, GDP / 150)` | 25% |
| **Green** | 🟢 | Empathy, mutual aid | If cons. > 40%: `min(15, poverty_rate × 0.4 + 2)`, else: `min(20, poverty_rate × 0.5)` | 20% |
| **Yellow** | 🟡 | Flexibility, adaptation | If cons. > 40%: **0%**, else: `min(15, income_growth > 10 ? 12 : 5)` | 15% |
| **Turquoise** | 💎 | Holistic, global vision | **Fixed: 0%** | 0% |

**Logic for over-indebted changes (>40%):**
- **Beige (40%)**: People take loans for survival.
- **Red (5%)**: Despite poverty, the population does not riot or rob (low aggression).
- **Blue (25%)**: The population is hyper-disciplined in paying bank debts.
- **Green (up to 15%)**: In conditions of poverty, people survive through mutual aid from neighbors and relatives (empathy grows).

**Normalization**: After initial calculation, all values are normalized using an algorithm (sum = 100%, max per stage = 40%).

---

### 3.3 Bank Spiral Dynamics Stage (vMEME) Calculation

Bank stages are calculated based on financial metrics and business practices. The sum of all 8 stages always equals **100%**, with no single stage exceeding **40%**.

| Stage (vMEME) | Color | Key Indicators | Calculation Formula | Max % |
|-------|-------|----------------|---------------------|-------|
| **Beige** | 🟤 | Survival, near bankruptcy | If capital < 10: `min(40, (10 - capital) × 10)`, else: **0%** | 40% |
| **Purple** | 🟣 | Family business, nepotism | **Fixed: 0%** | 0% |
| **Red** | 🔴 | Aggressive profit extraction | `min(40, 20 + (profit_gap > 5 ? 15 : profit_gap × 3) + (cons. > 40 ? 5 : 0))` | 40% |
| **Blue** | 🔵 | Compliance, hierarchy | `min(30, 20)` | 30% |
| **Orange** | 🟠 | Business lending, innovation | `min(30, business_loans × 1 + (profit_gap < 3 ? 10 : 0))` | 30% |
| **Green** | 🟢 | ESG, empathy for debtors | `max(0, min(20, 100 - dividends - (cons. > 40 ? 15 : 0)))` | 20% |
| **Yellow** | 🟡 | Adaptive, systemic thinking | `min(15, business_loans > 25 ? 10 : 3)` | 15% |
| **Turquoise** | 💎 | Holistic, ecosystem thinking | **Fixed: 0%** | 0% |

**Profit Gap** = Bank Profit Growth / Population Income Growth

**Logic for Bank changes:**
- **Beige (0%)**: A bank with a capitalization of 74.8 bln is not in the survival stage (the formula zeroes it out if capital > 10).
- **Red (up to 40%)**: The bank aggressively extracts debts (high Red), while the population submissively pays (low Red).
- **Green (0%)**: 100% dividend payout + poverty lending = absolute lack of bank empathy for clients.

**Normalization**: Same — sum = 100%, max per stage = 40%.

### 3.4 Data Sources for Spiral Dynamics Stage (vMEME) Calculation

| Indicator | Source | URL | Verification Method |
|-----------|--------|-----|---------------------|
| **Consumer Loans %** | National Bank of Kyrgyzstan | [NBKR - Microcredit Statistics](https://www.nbkr.kg/SITE/statistic/microcredit/) | Monthly reports, verified quarterly |
| **Business Loans %** | National Bank of Kyrgyzstan | [NBKR - Credit Portfolio Structure](https://www.nbkr.kg/SITE/statistic/bank_financial_statements/) | Annual bank reports |
| **Poverty Rate** | National Statistical Committee | [Stat.kg - Poverty](https://www.stat.kg/ru/statistics/294/) | Household surveys, annual publication |
| **GDP per Capita** | World Bank / Stat.kg | [World Bank - GDP](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=KG) | Cross-verified with national statistics |
| **Income Growth** | National Statistical Committee | [Stat.kg - Income](https://www.stat.kg/ru/statistics/293/) | Real income growth, adjusted for inflation |
| **Average Salary** | National Statistical Committee | [Stat.kg - Wages](https://www.stat.kg/ru/statistics/293/) | Monthly average, nominal terms |
| **Bank Profit Growth** | National Bank of Kyrgyzstan | [NBKR - Financial Statements](https://www.nbkr.kg/SITE/statistic/bank_financial_statements/) | Audited annual reports |
| **Dividend Policy** | Bank Annual Report | [Eldik Bank - Investors](https://eldikbank.kg/investors/) | Shareholder meeting minutes |
| **Interest Rates** | National Bank of Kyrgyzstan | [NBKR - Interest Rates](https://www.nbkr.kg/SITE/statistic/interest_rates/) | Weighted average rates |

### 3.5 Spiral Dynamics Stage (vMEME) Gap Analysis

The gap between Bank and Population stages indicates systemic risk:

| Gap | Interpretation | Risk Level |
|-----|----------------|------------|
| 0–15% | Balanced development | 🟢 Low |
| 16–30% | Moderate misalignment | 🟡 Medium |
| 31%+ | Critical extraction | 🔴 High |

**Example Interpretation (Eldik Bank, Over-indebted Society >40%):**
- Bank Red (40%) vs Population Beige (40%) = 0% gap → But the meanings are opposite: Population Beige means survival, Bank Red means aggressive extraction from this survival.
- Population Red is only 5% (no riots), but Bank Red is 40% (aggressive debt collection). The system is stable only because the population is hyper-disciplined.
- Population Green is 12% (high mutual aid to survive), while Bank Green is 0% (no empathy for debtors).
- Bank Blue is 20% (formal compliance), serving the Red agenda (profit extraction).

---

## 4. Data Sources for Eldik Bank

> ⚠️ **Important**: All links lead to official sources. Data verified as of publication (2025–2026). For audit purposes, consult primary documents.

| Metric | Value | Source | URL / Note |
|--------|-------|--------|------------|
| **Profit Growth 2024** | +208% | Bank Reports, NBKR | [NBKR - Bank Financial Statements](https://www.nbkr.kg/SITE/statistic/bank_financial_statements/) |
| **Authorized Capital** | 74.8 bln KGS | Bank Press Release, 2025 | [Eldik Bank - Capital Increase](https://eldikbank.kg/press/) |
| **State Recapitalization** | 61.5 bln KGS | Gov Decree, 2025 | [Gov.kg - Systemically Important Banks](https://www.gov.kg/ru/postanovleniya/) |
| **Dividend Policy** | 100% to shareholders | Bank Charter, Annual Report 2024 | [Eldik Bank - Investors](https://eldikbank.kg/investors/) |
| **Fitch Rating** | B (Stable) | Fitch Ratings | [Fitch - Eldik Bank](https://www.fitchratings.com/search?q=eldik+bank) |
| **Average Loan Rates** | 17–32% p.a. | NBKR Rate Monitoring | [NBKR - Interest Rates](https://www.nbkr.kg/SITE/statistic/interest_rates/) |
| **Real Income Growth** | +12.9% (2024) | National Stat Committee | [Stat.kg - Population Income](https://www.stat.kg/ru/statistics/293/) |
| **Poverty Rate** | 25.7% | National Stat Committee, 2024 | [Stat.kg - Poverty in KG](https://www.stat.kg/ru/statistics/294/) |
| **GDP per Capita** | $2,513 (2024) | Stat.kg / World Bank | [World Bank - GDP per capita](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=KG) |
| **Average Salary** | ~37,361 KGS/mo | National Stat Committee | [Stat.kg - Average Wage](https://www.stat.kg/ru/statistics/293/) |
| **Microcredit Structure** | 53% consumption, 20% business | NBKR Microfinance Review | [NBKR - Microcredit](https://www.nbkr.kg/SITE/statistic/microcredit/) |

### Data Collection Methodology:

1. **Bank Financials**: Extracted from mandatory reports published on NBKR website ("Bank Financial Statements" section).
2. **Macroeconomic Data**: Sourced from official publications of the National Statistical Committee (stat.kg), cross-checked with World Bank.
3. **Credit Structure**: NBKR monthly microfinance reviews.
4. **Ratings**: International agencies (Fitch, Moody's).
5. **Interest Rates**: NBKR weighted average rates for household loans.

> 📌 **Note**: For other countries, use equivalent sources: central banks, national statistical offices, World Bank, IMF DataMapper.

---

## 5. Results Interpretation

| Score | What It Means | Recommended Actions |
|-------|--------------|---------------------|
| **0–39** 🔴 | Bank profits primarily from poverty lending. High rates and consumption loans create a debt spiral. | Analyze client debt burden, monitor delinquency, regulator inquiry into portfolio structure |
| **40–69** 🟡 | Moderate contribution. Risks exist, but the bank partially funds the real sector. | Regular monitoring, incentives for business lending |
| **70–100** 🟢 | Bank supports economic development: low rates, focus on business loans, income growth outpaces bank profit. | Support, tax benefits, public recognition |

---

## 6. How to Use

1. **Open the app**: https://sdtest-me.github.io/bank-welfare-analyzer/
2. **Load example**: click `🏦 Eldik Bank` for demo data
3. **Enter new bank**: click `✨ New Bank` → fill fields → `🚀 Analyze`
4. **Switch language**: `RU` / `EN` buttons in header
5. **Compare banks**: change parameters and watch the Index update

---

## 7. Technical Architecture

- **Frontend**: Vanilla HTML5 / CSS3 / JavaScript (ES6+)
- **Visualization**: Chart.js (Doughnut chart, Line chart with emoji markers)
- **Storage**: localStorage (last session persistence)
- **Deploy**: GitHub Pages (static hosting)
- **Responsive**: Mobile-first, CSS Grid/Flexbox

---

## License

MIT License. Use for analysis, education, and public research.

---

## Contact

Repository: [github.com/sdtest-me/bank-welfare-analyzer](https://github.com/sdtest-me/bank-welfare-analyzer)

> 💡 **Idea**: Banks should be evaluated not only by shareholder profit, but by their contribution to national welfare. This tool is the first step toward such an assessment.

---

---

# Русская версия

> Этот инструмент оценивает реальный вклад банка в уровень жизни населения, выходящий за рамки финансовых показателей для акционеров. Он помогает отличить краткосрочную прибыльность от долгосрочного социально-экономического эффекта.

---

## Содержание

1. [Назначение и целевая аудитория](#1-назначение-и-целевая-аудитория)
2. [Методология расчёта индекса Welfare Score](#2-методология-расчёта-индекса-welfare-score)
3. [Методология Спиральной Динамики](#3-методология-спиральной-динамики)
4. [Источники данных для Eldik Bank](#4-источники-данных-для-eldik-bank)
5. [Интерпретация результатов](#5-интерпретация-результатов)
6. [Как использовать](#6-как-использовать)
7. [Техническая архитектура](#7-техническая-архитектура)

---

## 1. Назначение и целевая аудитория

**Bank Welfare Analyzer** создан для объективной оценки того, как деятельность банка влияет на благосостояние населения конкретной страны. В отличие от стандартных рейтингов (рентабельность капитала, качество активов), этот инструмент фокусируется на:

- 📊 **Диспропорции прибылей**: сравнивает темпы роста прибыли банка с ростом доходов населения
- 💳 **Структуре кредитования**: оценивает, финансирует ли банк развитие бизнеса или потребительскую задолженность
- 🏘 **Контексту бедности**: учитывает уровень бедности и ВВП на душу населения в стране присутствия
- 💰 **Политике распределения**: анализирует, какая часть прибыли возвращается в экономику через дивиденды и налоги

**Целевая аудитория**: аналитики, экономисты, НКО, регулирующие органы, финансовые журналисты и граждане, интересующиеся устойчивым развитием банковского сектора.

---

## 2. Методология расчёта индекса Welfare Score

Индекс **Welfare Score** рассчитывается по формуле взвешенной суммы пяти факторов. Каждый фактор нормируется по шкале 0–100, где 100 означает максимальный положительный вклад в благосостояние.

### Формула: Welfare Score = (F₁ × 0.30) + (F₂ × 0.25) + (F₃ × 0.20) + (F₄ × 0.15) + (F₅ × 0.10)

| Фактор | Вес | Описание | Как рассчитывается |
|--------|-----|----------|-------------------|
| **F₁: Диспропорция прибылей** | 30% | Соотношение роста прибыли банка к росту доходов населения | `max(0, 100 − (Прибыль% / Доходы%) × 3)` |
| **F₂: Доля потребительских кредитов** | 25% | Чем выше доля кредитов на потребление, тем ниже балл | `100 − %_потребительских_кредитов` |
| **F₃: Уровень бедности** | 20% | Высокая бедность снижает потенциал положительного влияния | `100 − %_бедности` |
| **F₄: Процентные ставки** | 15% | Высокие ставки создают долговую нагрузку на население | `max(0, 100 − (Средняя_ставка − 10) × 2)` |
| **F₅: Политика дивидендов** | 10% | 100% вывод прибыли акционерам снижает инвестиционный потенциал | `100 − %_дивидендов × 0.5` |

### Пороговые значения для цветовой индикации:

| Диапазон | Цвет | Интерпретация |
|----------|------|---------------|
| 0–39 | 🔴 Красный | Низкий вклад, признаки финансовой экстракции |
| 40–69 | 🟡 Жёлтый | Умеренный вклад, требуется мониторинг |
| 70–100 | 🟢 Зелёный | Высокий вклад, сбалансированная модель развития |

### Логика предупреждений:

- 🔴 **Красное предупреждение**: если диспропорция прибылей > 5x И доля потребительских кредитов > 40% → «Кредитование бедности»
- 🟡 **Жёлтое предупреждение**: если скор 40–69 → «Требуется мониторинг»
- 🟢 **Зелёное предупреждение**: если скор ≥ 70 → «Сбалансированная модель»

---

## 3. Методология Спиральной Динамики

### 3.1 Обзор

Спиральная Динамика — это психологическая и социологическая модель, описывающая эволюцию человеческих ценностных систем через 8 различных стадий (цветов) - цMEM-ов (от оригинального vMEME). В этом приложении мы применяем её для анализа:

1. **Условий жизни населения** — доминирующие ценностные на основе уровня жизни
2. **Организационной культуры банка** — доминирующие ценностные системы на основе бизнес-практик

### 3.2 Расчёт стадий Спиральной Динамики (цMEM-ов) для населения

Стадии населения рассчитываются на основе объективных макроэкономических показателей. Сумма всех 8 стадий всегда равна **100%**, ни одна стадия не превышает **40%**.

**Важное условие:** Если доля потребительских кредитов превышает 40% (`creditConsumption > 40`), применяется логика "закредитованного общества". В ином случае — стандартная логика.

| Стадия (цМЕМ) | Цвет | Ключевые индикаторы | Формула расчёта | Макс % |
|--------|------|---------------------|-----------------|--------|
| **Бежевая** | 🟤 | Выживание, базовые потребности | Если потр. > 40%: **40%**, иначе: `min(30, бедность × 1.2)` | 40% |
| **Фиолетовая** | 🟣 | Традиции, семейные связи | Если потр. > 40%: `min(15, 15 − (ВВП / 300))`, иначе: `min(25, 30 − (ВВП / 200))` | 25% |
| **Красная** | 🔴 | Неравенство, бунт, грабежи | Если потр. > 40%: **5%** (низкий уровень, нет бунтов), иначе: `min(35, 20 + бедность × 0.4)` | 35% |
| **Синяя** | 🔵 | Порядок, дисциплина платежей | Если потр. > 40%: **25%** (высокая, платят долги), иначе: **Фикс: 33%** | 33% |
| **Оранжевая** | 🟠 | Достижения, средний класс | Если потр. > 40%: `min(5, ВВП / 500)`, иначе: `min(25, ВВП / 150)` | 25% |
| **Зеленая** | 🟢 | Эмпатия, взаимовыручка | Если потр. > 40%: `min(15, бедность × 0.4 + 2)`, иначе: `min(20, бедность × 0.5)` | 20% |
| **Желтая** | 🟡 | Гибкость, адаптация | Если потр. > 40%: **0%**, иначе: `min(15, рост_доходов > 10 ? 12 : 5)` | 15% |
| **Бирюзовая** | 💎 | Холизм, глобальное видение | **Фиксировано: 0%** | 0% |

**Логика изменений при закредитованности (>40%):**
- **Бежевая (40%)**: Люди берут кредиты на выживание.
- **Красная (5%)**: Несмотря на нищету, население не бастует и не грабит (низкая агрессия).
- **Синяя (25%)**: Население гипер-дисциплинированно платит долги банкам.
- **Зеленая (до 15%)**: В условиях бедности люди спасаются взаимовыручкой соседей и родственников (эмпатия растет).

**Нормализация**: После первоначального расчёта все значения нормализуются алгоритмом (сумма = 100%, макс. на стадию = 40%).

---

### 3.3 Расчёт стадий Спиральной Динамики (цMEM-ов) для банка

Стадии банка рассчитываются на основе финансовых метрик и бизнес-практик. Сумма всех 8 стадий всегда равна **100%**, ни одна стадия не превышает **40%**.

| Стадия (цМЕМ) | Цвет | Ключевые индикаторы | Формула расчёта | Макс % |
|--------|------|---------------------|-----------------|--------|
| **Бежевая** | 🟤 | Выживание, близость к банкротству | Если капитал < 10: `min(40, (10 - капитал) × 10)`, иначе: **0%** | 40% |
| **Фиолетовая** | 🟣 | Семейный бизнес, кумовство | **Фиксировано: 0%** | 0% |
| **Красная** | 🔴 | Агрессивное извлечение прибыли | `min(40, 20 + (разрыв > 5 ? 15 : разрыв × 3) + (потр. > 40 ? 5 : 0))` | 40% |
| **Синяя** | 🔵 | Соответствие, иерархия | `min(30, 20)` | 30% |
| **Оранжевая** | 🟠 | Бизнес-кредиты, инновации | `min(30, бизнес_кредиты × 1 + (разрыв < 3 ? 10 : 0))` | 30% |
| **Зеленая** | 🟢 | ESG, эмпатия к должникам | `max(0, min(20, 100 - дивиденды - (потр. > 40 ? 15 : 0)))` | 20% |
| **Желтая** | 🟡 | Адаптивность, системное мышление | `min(15, бизнес_кредиты > 25 ? 10 : 3)` | 15% |
| **Бирюзовая** | 💎 | Холизм, экосистемное мышление | **Фиксировано: 0%** | 0% |

**Разрыв прибыли** = Рост прибыли банка / Рост доходов населения

**Логика изменений для банка:**
- **Бежевая (0%)**: Банк с капитализацией 74.8 млрд не находится в стадии выживания (формула обнуляет её, если капитал > 10).
- **Красная (до 40%)**: Банк агрессивно выбивает долги (высокий Красный), в то время как население покорно платит (низкий Красный).
- **Зеленая (0%)**: 100% вывод дивидендов + кредитование бедности = полное отсутствие эмпатии банка к клиентам.

**Нормализация**: Та же — сумма = 100%, макс. на стадию = 40%.

### 3.4 Источники данных для расчёта стадий Спиральной Динамики (цMEM-ов)

| Показатель | Источник | URL | Метод верификации |
|------------|----------|-----|-------------------|
| **% Потребительских кредитов** | Нацбанк КР | [НБКР - Статистика микрокредитов](https://www.nbkr.kg/SITE/statistic/microcredit/) | Ежемесячные отчёты, ежеквартальная проверка |
| **% Бизнес-кредитов** | Нацбанк КР | [НБКР - Структура кредитного портфеля](https://www.nbkr.kg/SITE/statistic/bank_financial_statements/) | Годовые отчёты банков |
| **Уровень бедности** | Нацстатком КР | [Нацстатком - Бедность](https://www.stat.kg/ru/statistics/294/) | Обследования домохозяйств, ежегодная публикация |
| **ВВП на душу** | Всемирный банк / Нацстатком | [World Bank - GDP](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=KG) | Перепроверка с национальной статистикой |
| **Рост доходов** | Нацстатком КР | [Нацстатком - Доходы](https://www.stat.kg/ru/statistics/293/) | Реальный рост доходов, с поправкой на инфляцию |
| **Средняя зарплата** | Нацстатком КР | [Нацстатком - Зарплаты](https://www.stat.kg/ru/statistics/293/) | Среднемесячная, в номинальном выражении |
| **Рост прибыли банка** | Нацбанк КР | [НБКР - Финансовая отчётность](https://www.nbkr.kg/SITE/statistic/bank_financial_statements/) | Аудированные годовые отчёты |
| **Политика дивидендов** | Годовой отчёт банка | [Eldik Bank - Инвесторам](https://eldikbank.kg/investors/) | Протоколы собраний акционеров |
| **Процентные ставки** | Нацбанк КР | [НБКР - Процентные ставки](https://www.nbkr.kg/SITE/statistic/interest_rates/) | Средневзвешенные ставки |

### 3.5 Анализ разрыва стадий Спиральной Динамики (цMEM-ов)

Разрыв между стадиями Банка и Населения указывает на системный риск:

| Разрыв | Интерпретация | Уровень риска |
|--------|---------------|---------------|
| 0–15% | Сбалансированное развитие | 🟢 Низкий |
| 16–30% | Умеренное несоответствие | 🟡 Средний |
| 31%+ | Критическая экстракция | 🔴 Высокий |

**Пример интерпретации (Элдик Банк, Закредитованное общество >40%):**
- Банк Красная (40%) vs Население Бежевая (40%) = 0% разрыв → Но смыслы прямо противоположны: Бежевая населения означает выживание, Красная банка — агрессивную экстракцию из этого выживания.
- Население Красная всего 5% (нет бунтов), а Банк Красная 40% (агрессивное выбивание долгов). Система стабильна лишь потому, что население гипер-дисциплинированно.
- Население Зеленая 12% (высокая взаимовыручка для выживания), тогда как Банк Зеленая 0% (нет эмпатии к должникам).
- Банк Синяя 20% (формальное соблюдение правил), обслуживающая Красную повестку (извлечение прибыли).

---

## 4. Источники данных для Eldik Bank

> ⚠️ **Важно**: Все ссылки ведут на официальные источники. Данные верифицированы на момент публикации (2025–2026). Для аудита рекомендуется проверять первичные документы.

| Показатель | Значение | Источник | URL / Примечание |
|------------|----------|----------|------------------|
| **Рост прибыли 2024** | +208% | Отчётность банка, Нацбанк КР | [НБКР - Финансовая отчётность Элдик Банк](https://www.nbkr.kg/SITE/statistic/bank_financial_statements/) |
| **Уставный капитал** | 74.8 млрд сомов | Пресс-релиз банка, 2025 | [Eldik Bank - Увеличение капитала до 74.8 млрд](https://eldikbank.kg/press/) |
| **Государственная докапитализация** | 61.5 млрд сомов | Постановление Правительства КР, 2025 | [Правительство КР - Капитализация системно значимых банков](https://www.gov.kg/ru/postanovleniya/) |
| **Политика дивидендов** | 100% акционерам | Устав банка, Годовой отчёт 2024 | [Eldik Bank - Годовой отчёт](https://eldikbank.kg/investors/) |
| **Рейтинг Fitch** | B (Стабильный) | Fitch Ratings | [Fitch - Eldik Bank Rating](https://www.fitchratings.com/search?q=eldik+bank) |
| **Средние ставки по кредитам** | 17–32% годовых | Нацбанк КР, мониторинг ставок | [НБКР - Средневзвешенные ставки](https://www.nbkr.kg/SITE/statistic/interest_rates/) |
| **Рост реальных доходов населения** | +12.9% (2024) | Нацстатком КР | [Нацстатком - Доходы населения](https://www.stat.kg/ru/statistics/293/) |
| **Уровень бедности** | 25.7% | Нацстатком КР, 2024 | [Нацстатком - Бедность в КР](https://www.stat.kg/ru/statistics/294/) |
| **ВВП на душу населения** | $2,513 (2024) | Нацстатком КР / Всемирный банк | [World Bank - Kyrgyzstan GDP per capita](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=KG) |
| **Средняя зарплата** | ~37,361 сомов/мес | Нацстатком КР | [Нацстатком - Средняя заработная плата](https://www.stat.kg/ru/statistics/293/) |
| **Структура микрокредитов** | 53% потребление, 20% бизнес | Нацбанк КР, обзор микрофинансирования | [НБКР - Микрокредитование](https://www.nbkr.kg/SITE/statistic/microcredit/) |

### Методология сбора данных:

1. **Финансовые показатели банка**: извлекаются из обязательной отчётности, публикуемой на сайте Нацбанка КР (раздел «Финансовая отчётность банков»).
2. **Макроэкономические данные**: берутся из официальных публикаций Национального статистического комитета КР (stat.kg) с перепроверкой по данным Всемирного банка.
3. **Структура кредитования**: данные Нацбанка КР по микрокредитованию (ежемесячные обзоры).
4. **Рейтинги**: международные рейтинговые агентства (Fitch, Moody's).
5. **Процентные ставки**: средневзвешенные ставки по кредитам физическим лицам, публикуемые НБКР.

> 📌 **Примечание**: Для других стран используйте эквивалентные источники: центральные банки, национальные статистические службы, Всемирный банк, IMF DataMapper.

---

## 5. Интерпретация результатов

| Индекс | Что означает | Рекомендуемые действия |
|--------|-------------|------------------------|
| **0–39** 🔴 | Банк генерирует прибыль преимущественно за счёт кредитования бедности. Высокие ставки и потребительские кредиты создают долговую спираль. | Анализ долговой нагрузки клиентов, мониторинг просрочки, запрос от регулятора о структуре портфеля |
| **40–69** 🟡 | Умеренный вклад. Есть риски, но банк частично финансирует реальный сектор. | Регулярный мониторинг, стимулы для бизнес-кредитования |
| **70–100** 🟢 | Банк работает на развитие экономики: низкие ставки, фокус на бизнес-кредиты, рост доходов населения опережает прибыль банка. | Поддержка, налоговые преференции, публичное признание |

---

## 6. Как использовать

1. **Откройте приложение**: https://sdtest-me.github.io/bank-welfare-analyzer/
2. **Выберите пример**: нажмите `🏦 Eldik Bank` для загрузки демо-данных
3. **Введите данные другого банка**: нажмите `✨ Новый банк` → заполните поля → `🚀 Анализировать`
4. **Переключайте язык**: кнопки `RU` / `EN` в шапке
5. **Сравните банки**: меняйте параметры и наблюдайте, как меняется Индекс

---

## 7. Техническая архитектура

- **Frontend**: Vanilla HTML5 / CSS3 / JavaScript (ES6+)
- **Визуализация**: Chart.js (Doughnut chart, Line chart with emoji markers)
- **Хранение**: localStorage (сохранение последней сессии)
- **Деплой**: GitHub Pages (статический хостинг)
- **Адаптивность**: Mobile-first, CSS Grid/Flexbox

---

## Лицензия

MIT License. Используйте для анализа, образования и публичных исследований.

---

## Контакты

Репозиторий: [github.com/sdtest-me/bank-welfare-analyzer](https://github.com/sdtest-me/bank-welfare-analyzer)

> 💡 **Идея**: Банки должны оцениваться не только по прибыли для акционеров, но и по вкладу в благосостояние страны. Этот инструмент — первый шаг к такой оценке.

