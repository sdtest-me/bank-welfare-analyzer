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

    bank.beige = data.cp < 10 ? Math.min(30, (10 - data.cp) * 8) : 2;
    bank.purple = Math.min(12, Math.max(2, 6 + (data.cp < 12 ? 3 : 0) - (data.cb > 30 ? 2 : 0)));

    // Keep Red meaningful, but avoid single-stage collapse by balancing with Blue/Orange/Green.
    const redBase = 14 + (profitGap > 5 ? 10 : profitGap * 2.2) + (data.cc > 40 ? 4 : 0);
    const diversificationBias = (data.cb > 25 ? 3 : 0) + (data.ig > 8 ? 2 : 0);
    bank.red = Math.min(34, Math.max(8, redBase - diversificationBias));

    bank.blue = Math.min(28, Math.max(12, 14 + (data.cc > 40 ? 4 : 0) + (data.cp < 10 ? 3 : 0)));
    bank.orange = Math.min(30, Math.max(10, (data.cb * 0.8) + (profitGap < 3 ? 9 : 5)));
    bank.green = Math.min(24, Math.max(8, 16 + (data.di < 35 ? 4 : 0) - (data.cc > 40 ? 5 : 0)));
    bank.yellow = Math.min(18, Math.max(5, (data.cb > 25 ? 9 : 6) + (data.ig > 10 ? 2 : 0)));
    bank.turquoise = Math.min(8, Math.max(1, data.ig > 12 ? 4 : 2));

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
