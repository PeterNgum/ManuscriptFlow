export type ResearchPillar = 
  | 'data_management'
  | 'model_development'
  | 'responsible_ai'
  | 'model_evaluation'
  | 'model_deployment';

export type DataDomain = 
  | 'imaging'
  | 'biomarkers'
  | 'ehr'
  | 'wearable'
  | 'genomics'
  | 'temporal';

export type AiMlCategory = 
  | 'supervised_learning'
  | 'unsupervised_learning'
  | 'reinforcement_learning'
  | 'deep_learning'
  | 'transfer_learning'
  | 'explainable_ai'
  | 'federated_learning';

export interface DiseaseArea {
  id: string;
  name: string;
  description: string | null;
}

export const CATEGORY_LABELS: Record<string, string> = {
  // Research Pillars
  data_management: 'Data Management',
  model_development: 'Model Development',
  responsible_ai: 'Responsible AI',
  model_evaluation: 'Model Evaluation',
  model_deployment: 'Model Deployment',

  // Data Domains
  imaging: 'Imaging Data',
  biomarkers: 'Biomarkers',
  ehr: 'Electronic Health Records',
  wearable: 'Wearable Sensor Data',
  genomics: 'Genomics',
  temporal: 'Temporal Data',

  // AI/ML Categories
  supervised_learning: 'Supervised Learning',
  unsupervised_learning: 'Unsupervised Learning',
  reinforcement_learning: 'Reinforcement Learning',
  deep_learning: 'Deep Learning',
  transfer_learning: 'Transfer Learning',
  explainable_ai: 'Explainable AI',
  federated_learning: 'Federated Learning'
};