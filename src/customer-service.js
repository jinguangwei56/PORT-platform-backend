import { store } from './store.js';
import { normalizeCustomer } from './domain/customer.js';
import { scoreCustomer } from './scoring.js';

export function createCustomer(input) {
  const customer = normalizeCustomer(input);
  if (!customer.customerId || !customer.customerName) throw new Error('customerId and customerName are required');
  const saved = store.createCustomer(customer);
  const score = store.saveScore(customer.customerId, scoreCustomer(customer));
  return {customer:saved, score};
}

export function updateCustomerAndRecalculate(input) {
  const existing = store.getCustomer(input.customerId);
  if (!existing) throw new Error('customer_not_found');
  const customer = store.createCustomer(normalizeCustomer({...existing, ...input}));
  const score = store.saveScore(customer.customerId, scoreCustomer(customer));
  return {customer, score};
}

export function getCustomerSnapshot(customerId) {
  const customer = store.getCustomer(customerId);
  if (!customer) return null;
  return {
    customer,
    score: store.getScore(customerId),
    interviews: store.listInterviews(customerId),
    followUps: store.listFollowUps(customerId)
  };
}
