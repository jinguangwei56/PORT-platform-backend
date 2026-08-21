// FONKON Customer Scoring Engine 1.2
// Deterministic, quantitative and auditable. No vague narrative directly creates score.
const clamp=(v,min,max)=>Math.max(min,Math.min(max,Number(v)||0));
export function scoreCustomer(input={}){
 const annual=Number(input.annualImportContainers??input.annualContainers??0);
 const painFreq=Number(input.painFrequencyMonthly??input.painFrequencyMonth??0);
 const impactDays=Number(input.impactDays??0);
 const loss=Number(input.estimatedLossPerContainer??input.lossPerContainer??0);
 const premium=Number(input.willingPremiumPerContainer??input.willingnessToPay??0);
 const trialContainers=Number(input.willingTrialContainers??0);
 const firstTrial=Number(input.firstTrialContainers??0);
 const projectDays=Number(input.projectDays??input.projectTimeDays??9999);
 const decision=input.decisionMakerContact??input.decisionMakerStatus??'未知';
 const competitors=Number(input.competitorCount??0);
 const V=annual<50?2:annual<100?5:annual<300?8:annual<500?12:annual<1000?16:annual<3000?18:20;
 const Q=clamp(input.Q,0,15);
 const P=painFreq<=0?0:painFreq===1?3:painFreq<=2?6:painFreq<=4?9:loss<5000?12:15;
 const T=clamp(input.T,0,15);
 const R=clamp(Math.round(painFreq*.8+impactDays*.8+loss/5000),0,10);
 const M=premium<=0?0:premium<300?2:premium<500?4:premium<1000?6:premium<2000?8:10;
 const F=trialContainers<=0?0:firstTrial>0?10:trialContainers>=10?8:trialContainers>=3?6:4;
 const W=clamp(input.W,0,5);
 const CV=V+Q+P+T+R+M+F+W;
 const demand=Math.min(25,P>=12&&Q>=8?25:P>=9?18:P>=6?12:P>=3?6:0);
 const time=projectDays<=7?25:projectDays<=30?20:projectDays<=90?15:projectDays<=180?10:projectDays<=365?5:0;
 const behavior=firstTrial>0?25:trialContainers>=10?20:trialContainers>=3?15:trialContainers>0?8:0;
 const decisionScore=decision==='已确认决策人'?15:decision==='已接触决策人'?12:decision==='影响者'?8:decision==='未知'?3:0;
 const competition=competitors>=3?10:competitors===2?8:competitors===1?5:2;
 const OT=demand+time+behavior+decisionScore+competition;
 const PI=Math.round(CV*OT/100*10)/10;
 const grade=CV>=90?'S':CV>=75?'A':CV>=60?'B':CV>=40?'C':'D';
 const warning=CV<40||OT<50?'RED':CV<60||OT<65?'YELLOW':'GREEN';
 const action=warning==='RED'?'补数据/低成本维护':warning==='YELLOW'?'补齐证据并推进验证':'重点推进下一动作';
 const required=[annual,painFreq,impactDays,loss,premium,projectDays,competitors];
 const supplied=required.filter(v=>Number.isFinite(v)&&v>0).length;
 const completeness=Math.round(supplied/required.length*100);
 const evidenceCount=['evidenceV','evidenceQ','evidenceP','evidenceT','evidenceR','evidenceM','evidenceF','evidenceW'].filter(k=>input[k]!==undefined&&input[k]!==null&&String(input[k]).trim()!=='').length;
 const confidence=completeness>=85&&evidenceCount>=5?'HIGH':completeness>=55&&evidenceCount>=2?'MEDIUM':'LOW';
 return {scores:{V,Q,P,T,R,M,F,W,CV,grade},opportunity:{demand,time,behavior,decision:decisionScore,competition,OT,PI},aq:{firstTrialContainers:firstTrial,willingTrialContainers:trialContainers},warning,action,completeness,evidenceCount,confidence,audit:{version:'1.2',quantitative:true,generatedAt:new Date().toISOString()}};
}
