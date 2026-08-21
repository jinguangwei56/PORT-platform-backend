import { store } from './store.js';

export function managerDashboard() {
  const customers=store.listCustomers();
  const scores=customers.map(c=>store.getScore(c.customerId)).filter(Boolean);
  const byGrade=scores.reduce((a,s)=>{a[s.grade]=(a[s.grade]||0)+1;return a;},{});
  const byWarning=scores.reduce((a,s)=>{a[s.warning]=(a[s.warning]||0)+1;return a;},{});
  return {
    totalCustomers:customers.length,
    gradeDistribution:byGrade,
    warningDistribution:byWarning,
    priorityCustomers:scores.sort((a,b)=>(b.pi??0)-(a.pi??0)).slice(0,20),
    totalAQ:scores.reduce((n,s)=>n+(Number(s.aq)||0),0)
  };
}
