(function () {
  function normalizeAndCap(obj, max=40){
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
    if(diff!==0){let target=keys.find(k => obj[k] + diff <= max); if(!target) target = keys[0]; obj[target] += diff;}
  }

  function calculateSpiralStages(data){
    const pop={beige:0,purple:0,red:0,blue:0,orange:0,green:0,yellow:0,turquoise:0};
    const bank={beige:0,purple:0,red:0,blue:0,orange:0,green:0,yellow:0,turquoise:0};

    if (data.cc > 40) {
      pop.beige = 40;
      pop.purple = Math.min(15, 15 - (data.gd / 300));
      pop.red = 5;
      pop.blue = 25;
      pop.orange = Math.min(5, data.gd / 500);
      pop.green = Math.min(15, (data.pr * 0.4) + 2);
      pop.yellow = 0;
      pop.turquoise = 0;
    } else {
      pop.beige = Math.min(30, data.pr * 1.2);
      pop.purple = Math.min(25, 30 - (data.gd / 200));
      pop.red = Math.min(35, 20 + data.pr * 0.4);
      pop.blue = 33;
      pop.orange = Math.min(25, data.gd / 150);
      pop.green = Math.min(20, data.pr * 0.5);
      pop.yellow = Math.min(15, data.ig > 10 ? 12 : 5);
      pop.turquoise = 0;
    }

    const profitGap = data.pg / Math.max(data.ig, 1);
    const interestSpread = Math.max(0, data.ix - data.im);
    const capitalDiscipline = Math.max(0, Math.min(35, (data.cp * 0.22) + ((100 - data.di) * 0.18)));
    const welfareSignal = Math.max(0, (data.ig * 1.4) + ((100 - data.pr) * 0.25) + ((100 - data.co2) * 0.16));

    bank.beige = data.cp < 10 ? Math.min(28, (10 - data.cp) * 7) : 1;
    bank.purple = Math.min(11, Math.max(2, 5 + (data.cp < 12 ? 2 : 0) - (data.cb > 35 ? 2 : 0)));

    // Stage-specific drivers with competitive amplification to create decisive peaks when signals are strong.
    const redSignal = Math.max(0, (data.cc * 0.95) + (interestSpread * 2.4) + (profitGap * 3.2) - (data.cb * 0.4) - (data.ig * 0.5));
    const orangeSignal = Math.max(0, (data.pg * 0.45) + (data.cb * 1.28) + (profitGap < 3 ? 8 : 3) - (data.cc * 0.4));
    const blueSignal = Math.max(0, (capitalDiscipline * 2.2) + (data.cp > 35 ? 11 : 4) - (interestSpread * 0.75));
    const greenSignal = Math.max(0, (welfareSignal * 1.5) + (data.ig * 1.35) + ((100 - data.di) * 0.3) - (data.cc * 0.45));

    const competitivePower = 1.7;
    bank.red = Math.min(38, Math.max(6, Math.pow(redSignal / 20, competitivePower) * 10 + 6));
    bank.orange = Math.min(35, Math.max(6, Math.pow(orangeSignal / 25, competitivePower) * 10 + 4));
    bank.blue = Math.min(37, Math.max(7, Math.pow(blueSignal / 21, competitivePower) * 10 + 5));
    bank.green = Math.min(37, Math.max(6, Math.pow(greenSignal / 24, competitivePower) * 10 + 5 + (data.ig > 15 ? 4 : 0) + (data.pr < 10 ? 3 : 0)));

    bank.yellow = Math.min(17, Math.max(4, 6 + (data.cb > 28 ? 3 : 0) + (data.ig > 10 ? 2 : 0) - (profitGap > 6 ? 2 : 0)));
    bank.turquoise = Math.min(9, Math.max(1, (data.ig > 12 ? 4 : 2) + (data.pr < 12 ? 2 : 0)));

    normalizeAndCap(pop);
    normalizeAndCap(bank);
    return{population:pop,bank};
  }

  function calcScore(d){
    const gap=d.pg/Math.max(d.ig,0.1),gf=Math.max(0,100-gap*3),cf=100-d.cc,pf=100-d.pr,ar=(d.im+d.ix)/2,inf=Math.max(0,100-(ar-10)*2),df=100-d.di*0.5;
    return Math.max(0,Math.min(100,Math.round(gf*0.3+cf*0.25+pf*0.2+inf*0.15+df*0.1)));
  }

  window.calcScore = calcScore;
  window.calculateSpiralStages = calculateSpiralStages;
})();
