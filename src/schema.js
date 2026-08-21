// Canonical CRM field contract. Keep field codes stable across web, backend and data collection.
export const customerFields = [
  ['customer_id','客户ID'],['customer_name','客户名称'],['sales_owner','业务员'],
  ['company_type','公司类型'],['fruit_categories','主要水果'],['origin_region','来源国/产区'],
  ['current_port','当前口岸'],['annual_import_containers','年进口柜量'],
  ['matchable_containers','FONKON可匹配柜量'],['switchable_containers','可切换柜量'],
  ['willing_trial_containers','客户愿意尝试柜量'],['first_trial_containers','首批试柜柜量'],
  ['pain_frequency_monthly','痛点频率(月)'],['impact_days','单次影响天数'],
  ['estimated_loss_per_container','估计损失/柜(RMB)'],['willing_premium_per_container','客户愿付服务溢价/柜(RMB)'],
  ['project_days','项目时间(天)'],['decision_maker_contact','决策人接触'],['competitor_count','竞争供应商数量'],
  ['Q','品类价值评分'],['T','FONKON匹配度评分'],['W','战略价值评分']
];

export const evidenceLevels = ['A','B','C','D'];
export const customerGrades = ['S','A','B','C','D'];
export const warningLights = ['GREEN','YELLOW','RED'];
