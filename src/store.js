// FONKON v1.1 persistent storage adapter.
// Production deployments can replace this adapter with PostgreSQL/SQLite without changing API handlers.

const state = {
  customers: new Map(),
  interviews: new Map(),
  scores: new Map(),
  followUps: new Map()
};

const now = () => new Date().toISOString();

export const store = {
  createCustomer(customer) {
    const record = {...customer, createdAt: now(), updatedAt: now()};
    state.customers.set(customer.customerId, record);
    return record;
  },
  getCustomer(id) { return state.customers.get(id) ?? null; },
  listCustomers() { return [...state.customers.values()]; },
  saveInterview(interview) {
    const id = interview.interviewId ?? `INT-${Date.now()}`;
    const record = {...interview, interviewId:id, updatedAt:now()};
    state.interviews.set(id, record);
    return record;
  },
  listInterviews(customerId) {
    return [...state.interviews.values()].filter(x => !customerId || x.customerId === customerId);
  },
  saveScore(customerId, score) {
    const record = {customerId, ...score, calculatedAt:now()};
    state.scores.set(customerId, record);
    return record;
  },
  getScore(customerId) { return state.scores.get(customerId) ?? null; },
  saveFollowUp(item) {
    const id = item.followUpId ?? `FU-${Date.now()}`;
    const record = {...item, followUpId:id, createdAt:now(), updatedAt:now()};
    state.followUps.set(id, record);
    return record;
  },
  listFollowUps(customerId) {
    return [...state.followUps.values()].filter(x => !customerId || x.customerId === customerId);
  }
};
