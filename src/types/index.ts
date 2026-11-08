export type MediaCategory = 'guided' | 'unguided';

export type MediaType = 
  | 'twisted-pair'
  | 'coaxial'
  | 'fiber-optic'
  | 'radio'
  | 'microwave'
  | 'infrared';

export interface CableLayer {
  id: string;
  name: string;
  material: string;
  purpose: string;
  specs: string;
  colorHex: string;
}

export interface MediaSpec {
  id: MediaType;
  name: string;
  category: MediaCategory;
  shortName: string;
  tagline: string;
  description: string;
  keyPhysics: string;
  bandwidthRange: string;
  typicalDataRate: string;
  maximumDistance: string;
  attenuationRate: string;
  propagationSpeed: string;
  velocityFactor: number;
  emiImmunity: 'None' | 'Moderate' | 'High' | 'Immune';
  costLevel: '$' | '$$' | '$$$' | '$$$$';
  securityLevel: 'Low' | 'Moderate' | 'High' | 'Ultra-High';
  commonConnectors: string[];
  standards: string[];
  typicalApplications: string[];
  advantages: string[];
  disadvantages: string[];
  subtypes?: {
    name: string;
    description: string;
    keyMetric: string;
  }[];
  layers?: CableLayer[];
}

export interface SimulationParams {
  mediaType: MediaType;
  distance: number;
  frequency: number;
  noiseLevel: number;
  inputPowerDbm: number;
}

export interface SimulationResults {
  attenuationDb: number;
  receivedPowerDbm: number;
  snrDb: number;
  propagationDelayMs: number;
  channelCapacityMbps: number;
  bitErrorRate: number;
  signalIntegrityPercent: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  category: MediaCategory | 'general';
  options: string[];
  correctIndex: number;
  explanation: string;
  mediaReference?: MediaType;
}

export interface LessonItem {
  id: string;
  title: string;
  route: string;
  duration: string;
  isCompleted?: boolean;
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  title: string;
  duration: string;
  lessons: LessonItem[];
}

export type LessonTab = 'overview' | 'guided' | 'unguided' | 'impairments' | 'lab' | 'quiz';
