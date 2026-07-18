/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComponentSpec {
  id: string;
  name: string;
  manufacturer: string;
  cost: number; // USD
  weight: number; // kg
  trl: number; // Technology Readiness Level (1-9)
  // Dynamic fields based on category
  capacityKwh?: number;
  voltage?: number;
  current?: number;
  chemistry?: string;
  energyDensity?: number; // Wh/kg
  coolingType?: string;
  cycleLife?: number;
  powerKw?: number;
  torqueNm?: number;
  efficiencyPct?: number;
  maxRpm?: number;
  dimensions?: string;
  material?: string;
  networkSpeed?: string;
  resolution?: string;
  sensorRange?: string;
  type?: string;
  customSpecs?: Record<string, string | number>;
}

export interface EngineeringComponent {
  id: string;
  name: string;
  category: string; // e.g., 'Battery', 'Motor'
  parentCategory: string; // e.g., 'Powertrain', 'Suspension'
  spec: ComponentSpec;
}

export interface BaseSpecs {
  rangeKm: number;
  weightKg: number;
  accelerationSec: number; // 0-100 km/h
  powerKw: number;
  batteryEfficiencyWhKm: number;
  thermalPerformancePct: number;
  manufacturingCostUsd: number;
  comfortRating: number; // 1-100
  reliabilityPct: number; // 1-100
  safetyScore: number; // 1-100
  compatibilityScore: number; // 1-100
  innovationScore: number; // 1-100
  carbonFootprintCo2: number; // kg CO2 during manufacturing
  engineeringComplexityPct: number;
  topSpeedKmh: number; // km/h
}

export interface VehicleModel {
  id: string;
  name: string;
  manufacturer: string;
  category: 'Sedan' | 'SUV' | 'Sports Car' | 'Hypercar' | 'Truck' | 'Motorcycle';
  platform: string;
  batteryType: string;
  motorType: string;
  rangeKm: number;
  weightKg: number;
  performanceScore: number; // 1-100
  baseSpecs: BaseSpecs;
  components: Record<string, EngineeringComponent>; // Map of component key to current active component
}

export interface ComponentLibraryOption {
  id: string;
  name: string;
  manufacturer: string;
  cost: number;
  weight: number;
  trl: number;
  compatibilityRating: number; // 1-100
  specs: Record<string, string | number>;
}

export interface DependencyLink {
  source: string;
  target: string;
  type: 'Power' | 'Cooling' | 'Data' | 'Structural' | 'Signal';
  severity: 'High' | 'Medium' | 'Low';
}

export interface EngineeringRecommendation {
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  reason: string;
  costUsd: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Complex';
  expectedImprovement: string;
  system: string;
}

export interface SavedVersion {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  components: Record<string, EngineeringComponent>;
}

export interface AIAnalysisResult {
  baseSpecs: BaseSpecs;
  dependencies: DependencyLink[];
  recommendations: EngineeringRecommendation[];
  explanation: string;
}

export interface SavedDesign {
  id: string;
  vehicleId: string;
  name: string;
  description: string;
  timestamp: string;
  specs: BaseSpecs;
  components: Record<string, EngineeringComponent>;
}

