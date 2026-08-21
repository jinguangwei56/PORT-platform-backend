import http from 'node:http';
import { scoreCustomer } from './scoring.js';
import { normalizeCustomer } from './domain/customer.js';

const customers = new Map();
const interviews = [];

function json(res, status, body) {
  res.writeHead(status, {'content-type':'application/json; charset=utf-8'});
  res.end(JSON.stringify(body));
}

async function body(req) {
  let raw='';
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

export function createServer() {
  return http.createServer(async (req,res)=>{
    try {
      if (req.method==='GET' && req.url==='/api/v1/health') return json(res,200,{ok:true,version:'1.1'});
      if (req.method==='GET' && req.url==='/api/v1/customers') return json(res,200,[...customers.values()]);
      if (req.method==='POST' && req.url==='/api/v1/customers') {
        const input=normalizeCustomer(await body(req));
        if (!input.customerId || !input.customerName) return json(res,400,{error:'customerId and customerName are required'});
        customers.set(input.customerId,input);
        return json(res,201,input);
      }
      if (req.method==='POST' && req.url==='/api/v1/customers/score') {
        const input=normalizeCustomer(await body(req));
        return json(res,200,scoreCustomer(input));
      }
      if (req.method==='POST' && req.url==='/api/v1/interviews') {
        const input=await body(req);
        interviews.push({...input,createdAt:new Date().toISOString()});
        return json(res,201,interviews.at(-1));
      }
      return json(res,404,{error:'not_found'});
    } catch (e) { return json(res,400,{error:'invalid_request',message:e.message}); }
  });
}

if (process.env.PORT) createServer().listen(Number(process.env.PORT));
