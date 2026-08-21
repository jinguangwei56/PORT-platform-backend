// FONKON customer domain model v1.1
export const CUSTOMER_FIELDS = {
  customerId: 'customer_id', customerName: 'customer_name', owner: 'owner', companyType: 'company_type',
  coreFruit: 'core_fruit', origin: 'origin', currentPort: 'current_port', annualContainers: 'annual_import_containers',
  matchedContainers: 'fonkon_matched_containers', switchableContainers: 'switchable_containers',
  willingTrialContainers: 'willing_trial_containers', firstTrialContainers: 'first_trial_containers',
  painFrequencyMonth: 'pain_frequency_month', impactDays: 'impact_days', lossPerContainer: 'estimated_loss_per_container',
  willingnessToPay: 'willingness_to_pay', projectTimeDays: 'project_time_days', decisionMakerStatus: 'decision_maker_status',
  competitorCount: 'competitor_count', lastContactDate: 'last_contact_date', nextActionDate: 'next_action_date'
};

export function normalizeCustomer(input = {}) {
  const n = Number;
  return {
    ...input,
    annualContainers: n(input.annualContainers || 0),
    matchedContainers: n(input.matchedContainers || 0),
    switchableContainers: n(input.switchableContainers || 0),
    willingTrialContainers: n(input.willingTrialContainers || 0),
    firstTrialContainers: n(input.firstTrialContainers || 0),
    painFrequencyMonth: n(input.painFrequencyMonth || 0),
    impactDays: n(input.impactDays || 0),
    lossPerContainer: n(input.lossPerContainer || 0),
    willingnessToPay: n(input.willingnessToPay || 0),
    projectTimeDays: n(input.projectTimeDays || 0),
    competitorCount: n(input.competitorCount || 0)
  };
}
