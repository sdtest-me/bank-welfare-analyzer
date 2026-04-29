(function () {
  const def={bn:"Eldik Bank",co:"Кыргызстан",pg:208,cp:74.8,di:100,im:17,ix:32,ig:12.9,pr:25.7,gd:2513,as:37361,cc:53,cb:20,co2:27};
  window.chart = null;
  window.spiralChart = null;

  function $(id){return document.getElementById(id);}
  function showRes(){$('resultsSection').style.display='block';}
  function hideRes(){$('resultsSection').style.display='none';}

  function loadEx(n){
    $('exEldik').classList.toggle('a',n==='eldik');
    $('exNew').classList.toggle('a',n==='new');
    if(n==='eldik'){
      const map={bn:'bankName',co:'country',pg:'profitGrowth',cp:'capital',di:'dividends',im:'interestMin',ix:'interestMax',ig:'incomeGrowth',pr:'povertyRate',gd:'gdpPerCapita',as:'avgSalary',cc:'creditConsumption',cb:'creditBusiness',co2:'creditOther'};
      Object.keys(def).forEach(k=>{if($(map[k]))$(map[k]).value=def[k]});
      doAnalyze();
    }else{
      $('f').reset();
      ['bankName','country','profitGrowth','capital','dividends','interestMin','interestMax','incomeGrowth','povertyRate','gdpPerCapita','avgSalary','creditConsumption','creditBusiness','creditOther'].forEach(id=>$(id).value='');
      hideRes();
      setTimeout(()=>$('bankName').focus(),50);
    }
  }

  function getData(){
    return {
      bn:$('bankName').value||'Unknown',co:$('country').value,
      pg:parseFloat($('profitGrowth').value)||0,cp:parseFloat($('capital').value)||0,
      di:parseFloat($('dividends').value)||0,im:parseFloat($('interestMin').value)||0,
      ix:parseFloat($('interestMax').value)||0,ig:parseFloat($('incomeGrowth').value)||0,
      pr:parseFloat($('povertyRate').value)||0,gd:parseFloat($('gdpPerCapita').value)||0,
      as:parseInt($('avgSalary').value)||0,cc:parseFloat($('creditConsumption').value)||0,
      cb:parseFloat($('creditBusiness').value)||0,co2:parseFloat($('creditOther').value)||0
    };
  }

  function doAnalyze(){
    const d=getData();
    const hasData=d.pg>0||d.ig>0||d.cc>0;
    if(!hasData){hideRes();return;}
    showRes();
    $('hTitle').textContent=`${d.bn} | ${window.i18n.tr[window.i18n.lang].app}`;
    refresh(d);
    localStorage.setItem('bwa_data',JSON.stringify(d));
    $('resultsTitle').scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderDetailedAnalysis(data, population, bank){
    const stages=['beige','purple','red','blue','orange','green','yellow','turquoise'];
    const icons={beige:'🟤',purple:'🟣',red:'🔴',blue:'🔵',orange:'🟠',green:'🟢',yellow:'🟡',turquoise:'💎'};
    const popD=stages.reduce((a,b)=>population[a]>population[b]?a:b);
    const bankD=stages.reduce((a,b)=>bank[a]>bank[b]?a:b);
    const t=window.i18n.tr[window.i18n.lang];
    const gapDiff = bank[bankD]-population[popD];
    const gapSign = gapDiff > 0 ? '+' : '';

    let html=`<div class="detail-table"><div class="detail-title">${t.detailTitle}</div>`;

    html+=`<div style="margin-bottom:12px;"><strong>👥 ${t.popText} (${data.co}):</strong>
      <div class="stage-grid-detail">${stages.map(s=>`<div class="stage-cell stage-${s}">${icons[s]}<br>${population[s]}%</div>`).join('')}</div>
      <div class="dominant-text">${t.dominant} ${icons[popD]} ${t.stages[popD]} (${population[popD]}%) - ${t.stageMeaning[popD]}</div></div>`;

    html+=`<div><strong>🏦 ${t.bankText} (${data.bn}):</strong>
      <div class="stage-grid-detail">${stages.map(s=>`<div class="stage-cell stage-${s}">${icons[s]}<br>${bank[s]}%</div>`).join('')}</div>
      <div class="dominant-text">${t.dominant} ${icons[bankD]} ${t.stages[bankD]} (${bank[bankD]}%) - ${bankD==='red'?(window.i18n.lang==='ru'?'Агрессивное извлечение прибыли':'Aggressive Profit Extraction'):(window.i18n.lang==='ru'?'Развитие/Инновации':'Development/Innovation')}</div></div></div>`;

    if (window.i18n.lang === 'ru') {
      html+=`<div style="margin-top:16px;padding:14px;background:#fef2f2;border-radius:8px;border-left:4px solid var(--d);">
        <strong>${t.gapTitle}</strong><br><br>
        • Банк ${icons[bankD]} ${t.stages[bankD]} (${bank[bankD]}%) vs Население ${icons[popD]} ${t.stages[popD]} (${population[popD]}%) = ${gapSign}${gapDiff}% разрыв<br>
        • У населения низкий ${icons.red} ${t.stages.red} (${population.red}%) — нет бунтов, люди не грабят. Но у банка высокий ${t.stages.red} (${bank.red}%) — агрессивное выбивание долгов<br>
        • У населения высокий ${icons.blue} ${t.stages.blue} (${population.blue}%) — дисциплинированно платят долги. Банк использует это для извлечения прибыли<br>
        • Население ${icons.green} ${t.stages.green} (${population.green}%) — спасается взаимовыручкой. У Банка ${t.stages.green} = ${bank.green}% (нет эмпатии к должникам)</div>`;

      html+=`<div style="margin-top:12px;padding:14px;background:#dcfce7;border-radius:8px;border-left:4px solid var(--s);">
        <strong>${t.recTitle}</strong><br>
        Банку следует перейти от ${icons[bankD]} ${t.stages[bankD]} к 🟠 Оранжевой:<br>
        • Переход от потребительских кредитов (${data.cc}%) к бизнес-кредитам<br>
        • Поддержка предпринимательства и экономического развития<br>
        • Синхронизация роста прибыли с ростом доходов населения</div>`;
    } else {
      html+=`<div style="margin-top:16px;padding:14px;background:#fef2f2;border-radius:8px;border-left:4px solid var(--d);">
        <strong>${t.gapTitle}</strong><br><br>
        • Bank ${icons[bankD]} ${t.stages[bankD]} (${bank[bankD]}%) vs Population ${icons[popD]} ${t.stages[popD]} (${population[popD]}%) = ${gapSign}${gapDiff}% gap<br>
        • Population has low ${icons.red} ${t.stages.red} (${population.red}%) — no riots, no robberies. But Bank has high ${t.stages.red} (${bank.red}%) — aggressive debt collection<br>
        • Population has high ${icons.blue} ${t.stages.blue} (${population.blue}%) — disciplined debt payers. Bank exploits this for profit<br>
        • Population ${icons.green} ${t.stages.green} (${population.green}%) — survives through mutual aid. Bank ${t.stages.green} = ${bank.green}% (no empathy for debtors)</div>`;

      html+=`<div style="margin-top:12px;padding:14px;background:#dcfce7;border-radius:8px;border-left:4px solid var(--s);">
        <strong>${t.recTitle}</strong><br>
        Bank should evolve from ${icons[bankD]} ${t.stages[bankD]} to 🟠 Orange by:<br>
        • Shifting from consumer loans (${data.cc}%) to business loans<br>
        • Supporting entrepreneurship & economic development<br>
        • Aligning profit growth with population income growth</div>`;
    }

    $('spiralDetails').innerHTML=html;
  }

  function initSpiralChart(population,bank){
    if(window.spiralChart)window.spiralChart.destroy();
    const ctx=$('spiralChart').getContext('2d');

    window.spiralChart=new Chart(ctx,{
      type:'line',
      data:{
        labels:window.i18n.tr[window.i18n.lang].spiralLabels,
        datasets:[
          {
            label: window.i18n.tr[window.i18n.lang].popChartLabel,
            data:[population.beige,population.purple,population.red,population.blue,population.orange,population.green,population.yellow,population.turquoise],
            borderColor:'#16a34a',borderWidth:4,pointBackgroundColor:'#16a34a',pointRadius:6,pointHoverRadius:8,tension:0.4,fill:false
          },
          {
            label: window.i18n.tr[window.i18n.lang].bankChartLabel,
            data:[bank.beige,bank.purple,bank.red,bank.blue,bank.orange,bank.green,bank.yellow,bank.turquoise],
            borderColor:'#dc2626',borderWidth:4,pointBackgroundColor:'#dc2626',pointRadius:6,pointHoverRadius:8,tension:0.4,fill:false
          }
        ]
      },
      options:{
        responsive:true,maintainAspectRatio:false,
        plugins:{
          legend:{position:'top',labels:{usePointStyle:true, padding:20, font:{size:12}}},
          tooltip:{mode:'index',intersect:false,callbacks:{label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`}}
        },
        scales:{y:{beginAtZero:true,max:45,ticks:{stepSize:10}},x:{grid:{display:false}}}
      }
    });
  }

  function refresh(d=null){
    if(!d)d=getData();
    $('rProfit').textContent=window.i18n.fmtPct(d.pg);$('rCap').textContent=d.cp;
    $('rDiv').textContent=d.di;$('rInt').textContent=`${d.im}–${d.ix}`;
    $('rInc').textContent=window.i18n.fmtPct(d.ig);$('rPov').textContent=d.pr;
    $('rGdp').textContent=window.i18n.fmtNum(d.gd);$('rSal').textContent=window.i18n.fmtNum(d.as);
    $('bProfit').className=`badge badge-${d.pg>50?'d':d.pg>20?'w':'s'}`;
    $('bInt').className=`badge badge-${d.ix>25?'d':d.ix>15?'w':'s'}`;
    $('bInc').className=`badge badge-${d.ig>10?'s':d.ig>5?'w':'d'}`;
    $('bPov').className=`badge badge-${d.pr>20?'d':d.pr>10?'w':'s'}`;
    $('bGdp').className=`badge badge-${d.gd<3000?'w':d.gd<10000?'n':'s'}`;
    $('bDiv').className=`badge badge-${d.di>80?'w':'n'}`;
    window.i18n.updateBadgeTexts();

    if(!window.chart){
      const ctx=$('chart').getContext('2d');
      window.chart=new Chart(ctx,{type:'doughnut',data:{labels:[window.i18n.tr[window.i18n.lang].cons,window.i18n.tr[window.i18n.lang].bus,window.i18n.tr[window.i18n.lang].other],datasets:[{data:[d.cc,d.cb,d.co2],backgroundColor:['#dc2626','#16a34a','#64748b'],borderWidth:0,spacing:2}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{usePointStyle:true,padding:20,font:{size:11}}},tooltip:{callbacks:{label:c=>c.label+': '+c.parsed+'%'}}},cutout:'65%'}});
    }else{window.chart.data.labels=[window.i18n.tr[window.i18n.lang].cons,window.i18n.tr[window.i18n.lang].bus,window.i18n.tr[window.i18n.lang].other];window.chart.data.datasets[0].data=[d.cc,d.cb,d.co2];window.chart.update();}

    const spiral=window.calculateSpiralStages(d);
    initSpiralChart(spiral.population,spiral.bank);
    renderDetailedAnalysis(d,spiral.population,spiral.bank);

    const sc=window.calcScore(d);
    $('scoreVal').textContent=sc+'/100';
    const sf=$('scoreFill');sf.style.width=sc+'%';
    sf.style.background=sc<40?'var(--d)':sc<70?'var(--w)':'var(--s)';

    const esgInput = $('esgText') ? $('esgText').value : '';
    const mismatch = window.calculateMismatch({ score: sc, spiral }, esgInput);
    $('mismatchVal').textContent = mismatch.mismatchScore.toFixed(2);
    $('mismatchRiskLevel').textContent = window.i18n.tr[window.i18n.lang].riskLevels[mismatch.riskLevel] || mismatch.riskLevel;
    $('mismatchDriver').textContent = window.i18n.tr[window.i18n.lang].driverLabels[mismatch.primaryDriver] || mismatch.primaryDriver;

    const esgConfidence = Math.max(0, Math.min(1, mismatch.esgConfidence || 0));
    const driverConfidence = Math.max(0, Math.min(1, mismatch.driverConfidence || 0));
    const esgPct = Math.round(esgConfidence * 100);
    const driverPct = Math.round(driverConfidence * 100);

    $('esgConfidenceVal').textContent = `${esgPct}%`;
    $('driverConfidenceVal').textContent = `${driverPct}%`;

    const esgBar = $('esgConfidenceBar');
    const driverBar = $('driverConfidenceBar');
    esgBar.style.width = `${esgPct}%`;
    driverBar.style.width = `${driverPct}%`;

    const pickColor = pct => pct >= 75 ? 'var(--s)' : pct >= 45 ? 'var(--w)' : 'var(--d)';
    esgBar.style.background = pickColor(esgPct);
    driverBar.style.background = pickColor(driverPct);

    $('mismatchText').textContent = mismatch.explanationText[window.i18n.lang] || mismatch.explanationText.en;
    const predictive = mismatch.predictiveImpact || {};
    const shortTerm = predictive.shortTerm ? (predictive.shortTerm[window.i18n.lang] || predictive.shortTerm.en) : '-';
    const longTerm = predictive.longTerm ? (predictive.longTerm[window.i18n.lang] || predictive.longTerm.en) : '-';
    $('mismatchShortTerm').textContent = shortTerm;
    $('mismatchLongTerm').textContent = longTerm;
    const gap=d.pg/Math.max(d.ig,0.1);
    const wb=$('warnBox'),wt=$('warnText');
    if(gap>5&&d.cc>40){wb.style.background='#fef2f2';wb.style.color='var(--d)';wt.textContent=window.i18n.lang==='ru'?`Прибыль банка растёт в ${Math.round(gap)} раз быстрее доходов населения. Высокая доля потребительских кредитов (${d.cc}%) указывает на кредитование бедности, а не развития.`:`Bank profit grows ${Math.round(gap)}x faster than population income. High share of consumption loans (${d.cc}%) indicates lending to poverty, not development.`;}
    else if(sc>=70){wb.style.background='#dcfce7';wb.style.color='#166534';wt.textContent=window.i18n.lang==='ru'?`✅ Банк показывает сбалансированную модель: умеренные ставки, фокус на бизнес-кредитование и рост доходов населения.`:`✅ Bank shows balanced model: moderate rates, focus on business lending, and population income growth.`;}
    else{wb.style.background='#fef3c7';wb.style.color='#92400e';wt.textContent=window.i18n.lang==='ru'?`⚠️ Требуется мониторинг: отдельные показатели указывают на риски долговой нагрузки.`:`⚠️ Monitor needed: some indicators suggest debt burden risks.`;}
  }

  function fixCredit(){
    const c=parseFloat($('creditConsumption').value)||0,b=parseFloat($('creditBusiness').value)||0,o=parseFloat($('creditOther').value)||0;
    if(Math.abs(c+b+o-100)>1)$('creditOther').value=Math.max(0,100-c-b);
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const sv=localStorage.getItem('bwa_data');
    if(sv){try{const d=JSON.parse(sv);const m={bn:'bankName',co:'country',pg:'profitGrowth',cp:'capital',di:'dividends',im:'interestMin',ix:'interestMax',ig:'incomeGrowth',pr:'povertyRate',gd:'gdpPerCapita',as:'avgSalary',cc:'creditConsumption',cb:'creditBusiness',co2:'creditOther'};Object.keys(d).forEach(k=>{if($(m[k])&&d[k]!==undefined)$(m[k]).value=d[k];});}catch(e){}}
    refresh(def);
    window.setLang('en');
    showRes();
    ['creditConsumption','creditBusiness','creditOther'].forEach(id=>$(id).addEventListener('change',fixCredit));
  });

  window.refresh = refresh;
  window.loadEx = loadEx;
  window.doAnalyze = doAnalyze;
})();
