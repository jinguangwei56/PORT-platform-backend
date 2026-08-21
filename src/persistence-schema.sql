-- FONKON v1.1 persistence schema.
CREATE TABLE customers (
  customer_id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  owner TEXT,
  company_type TEXT,
  core_fruit TEXT,
  origin TEXT,
  current_port TEXT,
  annual_import_containers NUMERIC DEFAULT 0,
  fonkon_matched_containers NUMERIC DEFAULT 0,
  switchable_containers NUMERIC DEFAULT 0,
  willing_trial_containers NUMERIC DEFAULT 0,
  first_trial_containers NUMERIC DEFAULT 0,
  pain_frequency_month NUMERIC DEFAULT 0,
  impact_days NUMERIC DEFAULT 0,
  estimated_loss_per_container NUMERIC DEFAULT 0,
  willingness_to_pay NUMERIC DEFAULT 0,
  project_time_days NUMERIC DEFAULT 0,
  decision_maker_status TEXT,
  competitor_count NUMERIC DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE interviews (
  interview_id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  salesperson_id TEXT,
  answers_json TEXT NOT NULL,
  evidence_json TEXT,
  started_at TEXT,
  completed_at TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE score_snapshots (
  customer_id TEXT NOT NULL,
  calculated_at TEXT NOT NULL,
  cv NUMERIC NOT NULL,
  grade TEXT NOT NULL,
  ot NUMERIC NOT NULL,
  pi NUMERIC NOT NULL,
  aq NUMERIC NOT NULL,
  warning TEXT NOT NULL,
  next_action TEXT,
  completeness NUMERIC,
  confidence TEXT,
  PRIMARY KEY(customer_id, calculated_at)
);

CREATE TABLE follow_ups (
  follow_up_id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  owner TEXT,
  due_at TEXT,
  action TEXT,
  status TEXT DEFAULT 'OPEN',
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
