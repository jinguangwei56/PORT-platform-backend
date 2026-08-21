// FONKON v1.1 API contract: transport-neutral request/response shapes.
export const API_CONTRACT_VERSION = '1.1';

export const endpoints = {
  scoreCustomer: {
    method: 'POST',
    path: '/api/v1/customers/score',
    body: 'CustomerRecord',
    response: 'ScoreResult'
  },
  createCustomer: {
    method: 'POST',
    path: '/api/v1/customers',
    body: 'CustomerRecord',
    response: 'CustomerRecord'
  },
  createInterview: {
    method: 'POST',
    path: '/api/v1/interviews',
    body: 'InterviewRecord',
    response: 'InterviewRecord'
  },
  listCustomers: {
    method: 'GET',
    path: '/api/v1/customers',
    response: 'CustomerList'
  }
};

export const ScoreResult = {
  cv: 'number',
  grade: 'S|A|B|C|D',
  ot: 'number',
  pi: 'number',
  aq: 'number',
  warning: 'RED|YELLOW|GREEN',
  nextAction: 'string',
  completeness: 'number',
  confidence: 'HIGH|MEDIUM|LOW'
};
