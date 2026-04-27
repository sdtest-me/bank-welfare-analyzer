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
      if(subSum>0){for(let k of keys)obj[k]+=excess*(obj[k]/subSum);} else {let per=excess/Object.keys(obj).length;for(let k in obj)obj[k]+=per;}
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
  bank.beige = data.cp < 10 ? Math.min(40, (10 - data.cp) * 10) : 0;
  bank.purple = 0;
  bank.red = Math.min(40, 20 + (profitGap > 5 ? 15 : profitGap * 3) + (data.cc > 40 ? 5 : 0));
  bank.blue = Math.min(30, 20);
  bank.orange = Math.min(30, data.cb * 1 + (profitGap < 3 ? 10 : 0));
  bank.green = Math.max(0, Math.min(20, 100 - data.di - (data.cc > 40 ? 15 : 0)));
  bank.yellow = Math.min(15, data.cb > 25 ? 10 : 3);
  bank.turquoise = 0;

  normalizeAndCap(pop);
  normalizeAndCap(bank);
  return{population:pop,bank};
}

function calcScore(d){
  const gap=d.pg/Math.max(d.ig,0.1),gf=Math.max(0,100-gap*3),cf=100-d.cc,pf=100-d.pr,ar=(d.im+d.ix)/2,inf=Math.max(0,100-(ar-10)*2),df=100-d.di*0.5;
  return Math.max(0,Math.min(100,Math.round(gf*0.3+cf*0.25+pf*0.2+inf*0.15+df*0.1)));
}
