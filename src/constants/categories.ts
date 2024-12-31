import type { ResearchPillarDetails, DataDomainDetails, AiMlCategoryDetails } from '../types/categoryTypes';

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

export const RESEARCH_PILLAR_DETAILS: ResearchPillarDetails[] = [
  {
    pillar: 'data_management',
    subcategories: [
      'Data Engineering',
      'Feature Selection & Engineering',
      'Missing Data Handling',
      'Outlier Detection',
      'Data Augmentation',
      'Synthetic Data Generation'
    ]
  },
  {
    pillar: 'model_development',
    subcategories: [
      'Predictive Modeling',
      'Binary Classification',
      'Multiclass Classification',
      'Regression',
      'Clustering & Stratification',
      'Multimodal Data Fusion',
      'Model Optimization'
    ]
  },
  // Add other research pillars...
];

export const DATA_DOMAIN_DETAILS: DataDomainDetails[] = [
  {
    domain: 'imaging',
    subcategories: ['MRI', 'CT', 'X-Ray', 'Ultrasound']
  },
  {
    domain: 'biomarkers',
    subcategories: [
      'Blood Biomarkers',
      'Genetic Biomarkers',
      'Imaging Biomarkers'
    ]
  },
  // Add other data domains...
];

export const AI_ML_CATEGORY_DETAILS: AiMlCategoryDetails[] = [
  {
    category: 'supervised_learning',
    subcategories: [
      'Binary Classification',
      'Multiclass Classification',
      'Regression',
      'Predictive Analytics'
    ]
  },
  {
    category: 'deep_learning',
    subcategories: [
      'Feedforward Neural Networks',
      'Convolutional Neural Networks',
      'Recurrent Neural Networks',
      'Transformer Models',
      'Graph Neural Networks'
    ]
  },
  // Add other AI/ML categories...
];