(function () {
  function normalizeAndCap(obj, max=40){
    for(let k in obj) obj[k]=Number.isFinite(obj[k]) ? Math.max(0,obj[k]) : 0;
    let total=Object.values(obj).reduce((a,b)=>a+b,0);
    if(total===0)return;
    for(let k in obj) obj[k]=(obj[k]/total)*100;
    let changed=true, iter=0;
    while(changed && iter<5){
      changed=false;iter++;
      let excess=0;
      for(let k in obj){
        if(obj[k]>max){excess+=obj[k]-max;obj[k]=max;changed=true;}
      }
      if(excess>0){
        let keys=Object.keys(obj).filter(k=>obj[k]<max);
        let subSum=keys.reduce((a,k)=>a+obj[k],0);
        if(subSum>0){for(let k of keys)obj[k]+=excess*(obj[k]/subSum);}
        else{let per=excess/Object.keys(obj).length;for(let k in obj)obj[k]+=per;}
      }
    }
    let keys=Object.keys(obj), sum=0;
    for(let k of keys){obj[k]=Math.round(obj[k]);sum+=obj[k];}
    let diff=100-sum;
    if(diff>0){let target=keys.find(k => obj[k] + diff <= max); if(!target) target = keys[0]; obj[target] += diff;}
    if(diff<0){
      let remaining=-diff;
      for(let k of keys.sort((a,b)=>obj[b]-obj[a])){
        let take=Math.min(remaining,obj[k]);
        obj[k]-=take;
        remaining-=take;
        if(remaining===0)break;
      }
    }
  }

  function clamp(value, min, max){return Math.max(min,Math.min(max,value));}
  function finite(value, fallback=0){return Number.isFinite(value) ? value : fallback;}
  function scale(value, min, max){return clamp((value-min)/(max-min),0,1);}
  function amplified(signal, power=1.9){return Math.pow(Math.max(0,signal),power);}

  function calculateSpiralStages(data){
    data = data || {};
    const safeData = {
      ...data,
      pg: finite(data.pg),
      cp: finite(data.cp, 50),
      di: finite(data.di, 50),
      im: finite(data.im),
      ix: finite(data.ix),
      ig: finite(data.ig),
      pr: finite(data.pr),
      gd: finite(data.gd),
      cc: finite(data.cc),
      cb: finite(data.cb),
      co2: finite(data.co2, 50),
    };
    const pop={beige:0,purple:0,red:0,blue:0,orange:0,green:0,yellow:0,turquoise:0};
    const bank={beige:0,purple:0,red:0,blue:0,orange:0,green:0,yellow:0,turquoise:0};

    if (safeData.cc > 40) {
      pop.beige = 40;
      pop.purple = Math.min(15, 15 - (safeData.gd / 300));
      pop.red = 5;
      pop.blue = 25;
      pop.orange = Math.min(5, safeData.gd / 500);
      pop.green = Math.min(15, (safeData.pr * 0.4) + 2);
      pop.yellow = 0;
      pop.turquoise = 0;
    } else {
      pop.beige = Math.min(30, safeData.pr * 1.2);
      pop.purple = Math.min(25, 30 - (safeData.gd / 200));
      pop.red = Math.min(35, 20 + safeData.pr * 0.4);
      pop.blue = 33;
      pop.orange = Math.min(25, safeData.gd / 150);
      pop.green = Math.min(20, safeData.pr * 0.5);
      pop.yellow = Math.min(15, safeData.ig > 10 ? 12 : 5);
      pop.turquoise = 0;
    }

    const profitGap = safeData.pg / Math.max(safeData.ig, 1);
    const interestSpread = Math.max(0, safeData.ix - safeData.im);

    const consumerPressure = scale(safeData.cc, 15, 70);
    const businessFocus = scale(safeData.cb, 8, 60);
    const profitMomentum = scale(safeData.pg, 5, 220);
    const incomeMomentum = scale(safeData.ig, 0, 25);
    const povertyPressure = scale(safeData.pr, 5, 45);
    const spreadPressure = scale(interestSpread, 2, 22);
    const extractionGap = scale(profitGap, 1.5, 8);
    const capitalStrength = scale(safeData.cp, 8, 80);
    const dividendDiscipline = 1 - scale(safeData.di, 20, 100);
    const diversifiedCredit = scale(safeData.co2, 8, 45);

    bank.beige = 0.10 + amplified(1 - capitalStrength, 1.6) * 0.40 + povertyPressure * 0.12;
    bank.purple = 0.08 + amplified(povertyPressure, 1.4) * 0.18 + (consumerPressure > 0.75 ? 0.08 : 0);

    // Distinct earned signals. Orange has no central fallback: it must come from growth,
    // business lending, and real-economy expansion rather than weak normalization residue.
    const redSignal =
      0.07 +
      amplified(consumerPressure, 1.35) * 1.25 +
      amplified(spreadPressure, 1.25) * 0.85 +
      amplified(extractionGap, 1.2) * 0.75 +
      povertyPressure * 0.28 -
      businessFocus * 0.42 -
      incomeMomentum * 0.30;

    const orangeSignal =
      0.03 +
      amplified(businessFocus, 1.25) * 1.55 +
      amplified(profitMomentum, 1.15) * 0.85 +
      incomeMomentum * 0.45 -
      consumerPressure * 0.62 -
      spreadPressure * 0.15;

    const blueSignal =
      0.10 +
      amplified(capitalStrength, 1.2) * 1.10 +
      dividendDiscipline * 0.78 +
      (1 - spreadPressure) * 0.42 +
      (1 - extractionGap) * 0.24 -
      consumerPressure * 0.26;

    const greenSignal =
      0.07 +
      amplified(incomeMomentum, 1.25) * 1.10 +
      (1 - povertyPressure) * 0.48 +
      dividendDiscipline * 0.38 +
      diversifiedCredit * 0.25 -
      consumerPressure * 0.32 +
      (safeData.pr < 12 ? 0.12 : 0);

    const competitivePower = 2.05;
    bank.red = 0.55 + amplified(redSignal, competitivePower) * 18;
    bank.orange = 0.45 + amplified(orangeSignal, competitivePower) * 18;
    bank.blue = 0.75 + amplified(blueSignal, competitivePower) * 16;
    bank.green = 0.65 + amplified(greenSignal, competitivePower) * 17;
    bank.yellow = 0.38 + amplified((businessFocus + incomeMomentum + capitalStrength) / 3, 1.8) * 4.2 + (profitGap < 2.5 ? 0.8 : 0);
    bank.turquoise = 0.20 + amplified((incomeMomentum + (1 - povertyPressure) + diversifiedCredit) / 3, 2.1) * 2.6;

    normalizeAndCap(pop);
    normalizeAndCap(bank, 45);
    return{population:pop,bank};
  }

  function calcScore(d){
    const gap=d.pg/Math.max(d.ig,0.1),gf=Math.max(0,100-gap*3),cf=100-d.cc,pf=100-d.pr,ar=(d.im+d.ix)/2,inf=Math.max(0,100-(ar-10)*2),df=100-d.di*0.5;
    return Math.max(0,Math.min(100,Math.round(gf*0.3+cf*0.25+pf*0.2+inf*0.15+df*0.1)));
  }

  window.calcScore = calcScore;
  window.calculateSpiralStages = calculateSpiralStages;
})();
