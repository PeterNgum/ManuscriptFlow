// Primary category types
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

// Secondary category interfaces
export interface ResearchPillarDetails {
  pillar: ResearchPillar;
  subcategories: string[];
}

export interface DataDomainDetails {
  domain: DataDomain;
  subcategories: string[];
}

export interface AiMlCategoryDetails {
  category: AiMlCategory;
  subcategories: string[];
}