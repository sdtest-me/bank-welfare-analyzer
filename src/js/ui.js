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


  function parseBanksInput(raw){
    const text=(raw||'').trim();
    if(!text) return [];

    if(text.startsWith('[')){
      const parsed=JSON.parse(text);
      return Array.isArray(parsed)?parsed:[];
    }

    return text
      .split(/\n+/)
      .map(line=>line.trim())
      .filter(Boolean)
      .map(line=>JSON.parse(line));
  }

  function doRankBanks(){
    const input=$('rankInput');
    const err=$('rankError');
    const list=$('rankList');
    const t=window.i18n.tr[window.i18n.lang];
    err.style.display='none';
    err.textContent='';

    try{
      const banks=parseBanksInput(input.value);
      if(!banks.length){
        list.innerHTML='';
        err.textContent=t.rankEmpty;
        err.style.display='block';
        return;
      }

      const ranked=window.analyzeMultipleBanks(banks);
      list.innerHTML=ranked.map(item=>{
        const name=(item.data&&item.data.bn)||'Unknown';
        const risk=t.riskLevels[item.mismatch.riskLevel]||item.mismatch.riskLevel;
        const snippet=(item.mismatch.explanationText && (item.mismatch.explanationText[window.i18n.lang]||item.mismatch.explanationText.en)) || '-';
        const rec=typeof window.generateRecommendations==='function' ? window.generateRecommendations(item) : null;
        const shortActions=rec&&Array.isArray(rec.shortTermActions)&&rec.shortTermActions.length
          ? `<ul style="margin:6px 0 0 18px;">${rec.shortTermActions.map(a=>`<li>${a}</li>`).join('')}</ul>`
          : '<div>-</div>';
        const strategy=rec&&rec.strategicShift&&rec.strategicShift.recommendation ? rec.strategicShift.recommendation : '-';
        const mitigation=rec&&Array.isArray(rec.riskMitigation)&&rec.riskMitigation.length
          ? `<ul style="margin:6px 0 0 18px;">${rec.riskMitigation.map(a=>`<li>${a}</li>`).join('')}</ul>`
          : '<div>-</div>';
        return `<div class="leaderboard-item">
          <div class="leaderboard-head">
            <span class="leaderboard-rank">#${item.rank}</span>
            <strong>${name}</strong>
          </div>
          <div class="leaderboard-meta">
            <span>${t.rankRisk}: <strong>${risk}</strong></span>
            <span>${t.rankMismatch}: <strong>${item.mismatch.mismatchScore.toFixed(2)}</strong></span>
          </div>
          <div class="leaderboard-explain">${snippet}</div>
          <div class="leaderboard-explain" style="margin-top:8px;"><strong>Short-term actions</strong>${shortActions}</div>
          <div class="leaderboard-explain" style="margin-top:8px;"><strong>Strategic shift</strong><div style="margin-top:4px;">${strategy}</div></div>
          <div class="leaderboard-explain" style="margin-top:8px;"><strong>Risk mitigation</strong>${mitigation}</div>
        </div>`;
      }).join('');
    }catch(e){
      list.innerHTML='';
      err.textContent=t.rankParseErr;
      err.style.display='block';
    }
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

  function generateRecommendations(context){
    const lang = window.i18n.lang;
    const t = window.tr('recommendationTexts') || {};
    const bankDominantText = context.bankD === 'red'
      ? (lang === 'ru' ? t.bankDominantRedRu : t.bankDominantRedEn)
      : (lang === 'ru' ? t.bankDominantOtherRu : t.bankDominantOtherEn);

    const tokens = {
      redIcon: context.icons.red,
      redStage: context.stages.red,
      populationRed: context.population.red,
      bankRedStage: context.stages.red,
      bankRed: context.bank.red,
      blueIcon: context.icons.blue,
      blueStage: context.stages.blue,
      populationBlue: context.population.blue,
      greenIcon: context.icons.green,
      greenStage: context.stages.green,
      populationGreen: context.population.green,
      bankGreenStage: context.stages.green,
      bankGreen: context.bank.green,
      bankIcon: context.icons[context.bankD],
      bankStage: context.stages[context.bankD],
      transitionTarget: t.transitionTarget,
      creditConsumption: context.data.cc
    };

    const applyTokens = template => template.replace(/\{(\w+)\}/g, (_, key) => tokens[key]);
    return {
      bankDominantText,
      gapBullets: ((t.gapBullets || {})[lang] || []).map(applyTokens),
      recommendationIntro: applyTokens(((t.recommendationIntro || {})[lang]) || ''),
      recommendationBullets: ((t.recommendationBullets || {})[lang] || []).map(applyTokens)
    };
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

    const rec = generateRecommendations({ data, population, bank, bankD, icons, stages: t.stages });

    html+=`<div><strong>🏦 ${t.bankText} (${data.bn}):</strong>
      <div class="stage-grid-detail">${stages.map(s=>`<div class="stage-cell stage-${s}">${icons[s]}<br>${bank[s]}%</div>`).join('')}</div>
      <div class="dominant-text">${t.dominant} ${icons[bankD]} ${t.stages[bankD]} (${bank[bankD]}%) - ${rec.bankDominantText}</div></div></div>`;

    const popVsBank = window.i18n.lang === 'ru'
      ? `Банк ${icons[bankD]} ${t.stages[bankD]} (${bank[bankD]}%) vs Население ${icons[popD]} ${t.stages[popD]} (${population[popD]}%) = ${gapSign}${gapDiff}% разрыв`
      : `Bank ${icons[bankD]} ${t.stages[bankD]} (${bank[bankD]}%) vs Population ${icons[popD]} ${t.stages[popD]} (${population[popD]}%) = ${gapSign}${gapDiff}% gap`;
    html+=`<div style="margin-top:16px;padding:14px;background:#fef2f2;border-radius:8px;border-left:4px solid var(--d);">
      <strong>${t.gapTitle}</strong><br><br>
      • ${popVsBank}<br>
      ${rec.gapBullets.map(line=>`• ${line}<br>`).join('')}</div>`;

    html+=`<div style="margin-top:12px;padding:14px;background:#dcfce7;border-radius:8px;border-left:4px solid var(--s);">
      <strong>${t.recTitle}</strong><br>
      ${rec.recommendationIntro}<br>
      ${rec.recommendationBullets.map(line=>`• ${line}<br>`).join('')}</div>`;

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

    const esgInput = $('esgText') ? $('esgText').value : '';
    const analysis = window.analyzeBank({ ...d, esgText: esgInput });
    const spiral=analysis.spiral;
    initSpiralChart(spiral.population,spiral.bank);
    renderDetailedAnalysis(d,spiral.population,spiral.bank);

    const sc=analysis.score;
    $('scoreVal').textContent=sc+'/100';
    const sf=$('scoreFill');sf.style.width=sc+'%';
    sf.style.background=sc<40?'var(--d)':sc<70?'var(--w)':'var(--s)';

    const mismatch = analysis.mismatch;
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
    if ($('rankInput')) {
      $('rankInput').value = JSON.stringify([{ bn: 'Eldik Bank', pg: 208, ig: 12.9, cc: 53, cb: 20, co2: 27, pr: 25.7, im: 17, ix: 32 }, { bn: 'Balanced Bank', pg: 24, ig: 14, cc: 28, cb: 52, co2: 20, pr: 12, im: 9, ix: 14 }], null, 2);
    }
  });

  window.refresh = refresh;
  window.loadEx = loadEx;
  window.doAnalyze = doAnalyze;
  window.doRankBanks = doRankBanks;
})();
