
| Factor | Weight | Description | Calculation |
|--------|--------|-------------|-------------|
| **F₁: Profit Disparity** | 30% | Ratio of bank profit growth to population income growth | `max(0, 100 − (Profit% / Income%) × 3)` |
| **F₂: Consumption Credit Share** | 25% | Higher consumption loan share = lower score | `100 − %_consumption_loans` |
| **F₃: Poverty Rate** | 20% | High poverty reduces positive impact potential | `100 − %_poverty` |
| **F₄: Interest Rates** | 15% | High rates create debt burden on population | `max(0, 100 − (Avg_Rate − 10) × 2)` |
| **F₅: Dividend Policy** | 10% | 100% profit extraction to shareholders reduces investment potential | `100 − %_dividends × 0.5` |

#### Threshold Values for Color Indication:
| Range | Color | Interpretation |
|-------|-------|----------------|
| 0–39 | 🔴 Red | Low contribution, signs of financial extraction |
| 40–69 | 🟡 Yellow | Moderate contribution, monitoring required |
| 70–100 | 🟢 Green | High contribution, balanced development model |

#### Warning Logic:
- **🔴 Red Warning**: if profit disparity > 5x AND consumption loans > 40% → "Poverty lending"
- **🟡 Yellow Warning**: if score 40–69 → "Monitor needed"
- **🟢 Green Warning**: if score ≥ 70 → "Balanced model"

---

## 3. Источники данных / Data Sources

### 🇷🇺 Данные по Eldik Bank (Кыргызстан)

> ⚠️ **Важно**: Все ссылки ведут на официальные источники. Данные верифицированы на момент публикации (2025–2026). Для аудита рекомендуется проверять первичные документы.

| Показатель | Значение | Источник | URL / Примечание |
|------------|----------|----------|------------------|
| **Рост прибыли 2024** | +208% | Отчётность банка, Нацбанк КР | [NBKR - Финансовая отчётность Элдик Банк](https://www.nbkr.kg/SITE/statistic/bank_financial_statements/) |
| **Уставный капитал** | 74.8 млрд сомов | Пресс-релиз банка, 2025 | [Eldik Bank - Увеличение капитала до 74.8 млрд](https://eldikbank.kg/press/) |
| **Государственная докапитализация** | 61.5 млрд сомов | Постановление Правительства КР, 2025 | [Правительство КР - Капитализация системно значимых банков](https://www.gov.kg/ru/postanovleniya/) |
| **Политика дивидендов** | 100% акционерам | Устав банка, Годовой отчёт 2024 | [Eldik Bank - Годовой отчёт](https://eldikbank.kg/investors/) |
| **Рейтинг Fitch** | B (Стабильный) | Fitch Ratings | [Fitch - Eldik Bank Rating](https://www.fitchratings.com/search?q=eldik+bank) |
| **Средние ставки по кредитам** | 17–32% годовых | Нацбанк КР, мониторинг ставок | [NBKR - Средневзвешенные ставки](https://www.nbkr.kg/SITE/statistic/interest_rates/) |
| **Рост реальных доходов населения** | +12.9% (2024) | Нацстатком КР | [Нацстатком - Доходы населения](https://www.stat.kg/ru/statistics/293/) |
| **Уровень бедности** | 25.7% | Нацстатком КР, 2024 | [Нацстатком - Бедность в КР](https://www.stat.kg/ru/statistics/294/) |
| **ВВП на душу населения** | $2,513 (2024) | Нацстатком КР / Всемирный банк | [World Bank - Kyrgyzstan GDP per capita](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=KG) |
| **Средняя зарплата** | ~37,361 сомов/мес | Нацстатком КР | [Нацстатком - Средняя заработная плата](https://www.stat.kg/ru/statistics/293/) |
| **Структура микрокредитов** | 53% потребление, 20% бизнес | Нацбанк КР, обзор микрофинансирования | [NBKR - Микрокредитование](https://www.nbkr.kg/SITE/statistic/microcredit/) |

#### 🔍 Методология сбора данных:
1. **Финансовые показатели банка**: извлекаются из обязательной отчётности, публикуемой на сайте Нацбанка КР (раздел «Финансовая отчётность банков»).
2. **Макроэкономические данные**: берутся из официальных публикаций Национального статистического комитета КР (stat.kg) с перепроверкой по данным Всемирного банка.
3. **Структура кредитования**: данные Нацбанка КР по микрокредитованию (ежемесячные обзоры).
4. **Рейтинги**: международные рейтинговые агентства (Fitch, Moody's).
5. **Процентные ставки**: средневзвешенные ставки по кредитам физическим лицам, публикуемые НБКР.

> 📌 **Примечание**: Для других стран используйте эквивалентные источники: центральные банки, национальные статистические службы, Всемирный банк, IMF DataMapper.

### 🇬🇧 Data Sources for Eldik Bank (Kyrgyzstan)

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

#### 🔍 Data Collection Methodology:
1. **Bank Financials**: Extracted from mandatory reports published on NBKR website ("Bank Financial Statements" section).
2. **Macroeconomic Data**: Sourced from official publications of National Statistical Committee (stat.kg), cross-checked with World Bank.
3. **Credit Structure**: NBKR monthly microfinance reviews.
4. **Ratings**: International agencies (Fitch, Moody's).
5. **Interest Rates**: NBKR weighted average rates for household loans.

> 📌 **Note**: For other countries, use equivalent sources: central banks, national statistical offices, World Bank, IMF DataMapper.

---

## 4. Интерпретация результатов / Results Interpretation

### 🇷🇺
| Индекс | Что означает | Рекомендуемые действия |
|--------|-------------|------------------------|
| **0–39** 🔴 | Банк генерирует прибыль преимущественно за счёт кредитования бедности. Высокие ставки и потребительские кредиты создают долговую спираль. | Анализ долговой нагрузки клиентов, мониторинг просрочки, запрос от регулятора о структуре портфеля |
| **40–69** 🟡 | Умеренный вклад. Есть риски, но банк частично финансирует реальный сектор. | Регулярный мониторинг, стимулы для бизнес-кредитования |
| **70–100** 🟢 | Банк работает на развитие экономики: низкие ставки, фокус на бизнес-кредиты, рост доходов населения опережает прибыль банка. | Поддержка, налоговые преференции, публичное признание |

### 🇬🇧
| Score | What It Means | Recommended Actions |
|-------|--------------|---------------------|
| **0–39** 🔴 | Bank profits primarily from poverty lending. High rates and consumption loans create debt spiral. | Analyze client debt burden, monitor delinquency, regulator inquiry into portfolio structure |
| **40–69** 🟡 | Moderate contribution. Risks exist, but bank partially funds real sector. | Regular monitoring, incentives for business lending |
| **70–100** 🟢 | Bank supports economic development: low rates, focus on business loans, income growth outpaces bank profit. | Support, tax benefits, public recognition |

---

## 5. Как использовать / How to Use

### 🇷🇺
1. **Откройте приложение**: https://sdtest-me.github.io/bank-welfare-analyzer/
2. **Выберите пример**: нажмите `🏦 Eldik Bank` для загрузки демо-данных
3. **Введите данные другого банка**: нажмите `✨ Новый банк` → заполните поля → `🚀 Анализировать`
4. **Переключайте язык**: кнопки `RU` / `EN` в шапке
5. **Сравните банки**: меняйте параметры и наблюдайте, как меняется Индекс

### 🇬🇧
1. **Open the app**: https://sdtest-me.github.io/bank-welfare-analyzer/
2. **Load example**: click `🏦 Eldik Bank` for demo data
3. **Enter new bank**: click `✨ New Bank` → fill fields → `🚀 Analyze`
4. **Switch language**: `RU` / `EN` buttons in header
5. **Compare banks**: change parameters and watch the Index update

---

## 6. Архитектура / Tech Stack

### 🇷🇺
- **Frontend**: Vanilla HTML5 / CSS3 / JavaScript (ES6+)
- **Визуализация**: Chart.js (Doughnut chart)
- **Хранение**: localStorage (сохранение последней сессии)
- **Деплой**: GitHub Pages (статический хостинг)
- **Адаптивность**: Mobile-first, CSS Grid/Flexbox

### 🇬🇧
- **Frontend**: Vanilla HTML5 / CSS3 / JavaScript (ES6+)
- **Visualization**: Chart.js (Doughnut chart)
- **Storage**: localStorage (last session persistence)
- **Deploy**: GitHub Pages (static hosting)
- **Responsive**: Mobile-first, CSS Grid/Flexbox

---

## 📄 Лицензия / License

MIT License. Используйте для анализа, образования и публичных исследований.

---

## 🤝 Контакты / Contact

Репозиторий: [github.com/sdtest-me/bank-welfare-analyzer](https://github.com/sdtest-me/bank-welfare-analyzer)

> 💡 **Идея**: Банки должны оцениваться не только по прибыли для акционеров, но и по вкладу в благосостояние страны. Этот инструмент — первый шаг к такой оценке.
> 💡 **Idea**: Banks should be evaluated not only by shareholder profit, but by their contribution to national welfare. This tool is the first step toward such assessment.
