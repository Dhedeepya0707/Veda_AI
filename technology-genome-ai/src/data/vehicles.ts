/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VehicleModel, ComponentLibraryOption, BaseSpecs } from '../types';

// Helper to create template spec values for standard subsystems
function createComponent(
  id: string,
  name: string,
  category: string,
  parentCategory: string,
  manufacturer: string,
  cost: number,
  weight: number,
  trl: number,
  customSpecs: Record<string, string | number> = {}
) {
  return {
    id,
    name,
    category,
    parentCategory,
    spec: {
      id,
      name,
      manufacturer,
      cost,
      weight,
      trl,
      ...customSpecs,
    },
  };
}

export const INITIAL_VEHICLES: Record<string, VehicleModel> = {
  'tesla-s': {
    id: 'tesla-s',
    name: 'Model S Plaid',
    manufacturer: 'Tesla',
    category: 'Sedan',
    platform: 'Palladium',
    batteryType: '4680 Lithium-ion Battery',
    motorType: 'Tri-Motor Carbon-Sleeved Rotor',
    rangeKm: 637,
    weightKg: 2162,
    performanceScore: 98,
    baseSpecs: {
      rangeKm: 637,
      weightKg: 2162,
      accelerationSec: 2.1,
      powerKw: 760,
      batteryEfficiencyWhKm: 157,
      thermalPerformancePct: 92,
      manufacturingCostUsd: 58000,
      comfortRating: 88,
      reliabilityPct: 91,
      safetyScore: 99,
      compatibilityScore: 95,
      innovationScore: 97,
      carbonFootprintCo2: 12500,
      engineeringComplexityPct: 89,
      topSpeedKmh: 322,
    },
    components: {
      'battery': createComponent('tesla-s-bat', '4680 Lithium-ion Battery', 'Battery', 'Powertrain', 'Tesla Energy', 16500, 480, 9, { capacityKwh: 100, voltage: 450, chemistry: 'NCA Cylindrical', energyDensity: 272, coolingType: 'Liquid-cooled snake tube', cycleLife: 1500 }),
      'motor': createComponent('tesla-s-mot', 'Tri-Motor Carbon-Sleeved Rotor', 'Motor', 'Powertrain', 'Tesla Propulsion', 8200, 115, 9, { powerKw: 760, torqueNm: 1420, efficiencyPct: 97, maxRpm: 23300 }),
      'inverter': createComponent('tesla-s-inv', 'SiC High-Power Inverter', 'Inverter', 'Powertrain', 'Tesla Electronics', 1800, 14, 9, { efficiencyPct: 98.5, voltage: 450 }),
      'charger': createComponent('tesla-s-chg', '250kW Supercharger Gen 3', 'Charger', 'Powertrain', 'Tesla Energy', 1500, 18, 9, { powerKw: 250 }),
      'transmission': createComponent('tesla-s-trm', 'Single Speed Planetary Gearbox', 'Transmission', 'Powertrain', 'Tesla Engineering', 1200, 32, 9, { efficiencyPct: 96.2 }),
      'front-suspension': createComponent('tesla-s-fs', 'Double Wishbone Smart Air', 'Front Suspension', 'Suspension', 'Tesla Chassis', 1400, 45, 9),
      'rear-suspension': createComponent('tesla-s-rs', 'Multi-Link Adaptive Air', 'Rear Suspension', 'Suspension', 'Tesla Chassis', 1600, 52, 9),
      'shock-absorbers': createComponent('tesla-s-sa', 'Active Predictive Dampers', 'Shock Absorbers', 'Suspension', 'BWI Group', 1100, 18, 9),
      'tyres': createComponent('tesla-s-tyr', 'Michelin Pilot Sport EV 21"', 'Tyres', 'Wheels', 'Michelin', 1200, 40, 9, { dimensions: '295/30 R21' }),
      'rim-size': createComponent('tesla-s-rim', '21" Arachnid Alloy Rims', 'Rim Size', 'Wheels', 'Tesla Design', 1600, 38, 9),
      'braking-system': createComponent('tesla-s-brk', 'Brembo Six-Piston High Performance', 'Braking System', 'Wheels', 'Brembo', 3200, 28, 9),
      'ecu': createComponent('tesla-s-ecu', 'HW4 Unified Autopilot Computer', 'ECU', 'Electronics', 'Tesla Silicon', 2800, 4, 9),
      'wiring-harness': createComponent('tesla-s-wh', 'Low-Mass 48V Bus Harness', 'Wiring Harness', 'Electronics', 'Yazaki', 1400, 38, 8),
      'can-bus': createComponent('tesla-s-can', 'Dual High-Speed CAN FD', 'CAN Bus', 'Electronics', 'Vector', 400, 1, 9),
      'ethernet-network': createComponent('tesla-s-eth', 'Gigabit Automotive Ethernet Loop', 'Ethernet Network', 'Electronics', 'Broadcom', 800, 2, 9),
      'camera': createComponent('tesla-s-cam', 'Full-Chassis 8x 5MP Vision Suite', 'Camera', 'ADAS', 'ON Semi', 900, 3, 9, { resolution: '5MP' }),
      'radar': createComponent('tesla-s-rad', 'Phoenix High-Resolution Radar', 'Radar', 'ADAS', 'Tesla Engineering', 1100, 1, 8),
      'lidar': createComponent('tesla-s-lid', 'No Active LiDAR (Vision First)', 'LiDAR', 'ADAS', 'N/A', 0, 0, 1),
      'ultrasonic-sensors': createComponent('tesla-s-us', 'No Active USS (Tesla Vision)', 'Ultrasonic Sensors', 'ADAS', 'N/A', 0, 0, 1),
      'gps': createComponent('tesla-s-gps', 'Dual-Band GNSS + Dead Reckoning', 'GPS', 'ADAS', 'u-blox', 300, 1, 9),
      'driver-monitoring': createComponent('tesla-s-dm', 'Cabin IR Eyetracker camera', 'Driver Monitoring', 'ADAS', 'Seeing Machines', 500, 1, 9),
      'displays': createComponent('tesla-s-dsp', '17" Cinematic Rotating Touchscreen', 'Displays', 'Interior', 'LG Display', 1800, 8, 9),
      'seats': createComponent('tesla-s-st', 'Ventilated Vegan Leather Sport Seats', 'Seats', 'Interior', 'Tesla Textiles', 2200, 64, 9),
      'steering': createComponent('tesla-s-str', 'Yoke Steering Wheel with Cap Touch', 'Steering', 'Interior', 'Tesla Design', 1000, 12, 9),
      'buttons': createComponent('tesla-s-btn', 'Zero-Physical Steer Cap Buttons', 'Buttons', 'Interior', 'Tesla Design', 200, 1, 9),
      'hvac': createComponent('tesla-s-hvac', 'Bioweapon Defense Mode HEPA HVAC', 'HVAC', 'Interior', 'Sanden', 1800, 48, 9),
      'infotainment': createComponent('tesla-s-info', 'AMD Ryzen Gaming MCU (10 TFLOPS)', 'Infotainment', 'Interior', 'AMD', 1500, 4, 9),
      'headlights': createComponent('tesla-s-hl', 'Adaptive Matrix LED Projectors', 'Headlights', 'Exterior', 'Hella', 1200, 8, 9),
      'tail-lights': createComponent('tesla-s-tl', 'Unified Premium LED Lightbar', 'Tail Lights', 'Exterior', 'Hella', 700, 5, 9),
      'doors': createComponent('tesla-s-dr', 'Flush Automatic Pop-Out Doors', 'Doors', 'Exterior', 'Tesla Engineering', 2400, 88, 9),
      'chassis-material': createComponent('tesla-s-cm', 'Mega-Casting Aluminum/Steel Hybrid', 'Chassis Material', 'Exterior', 'Tesla Casting', 6800, 320, 9),
      'body-panels': createComponent('tesla-s-bp', 'Low-Drag Aluminum Panels (Cd 0.208)', 'Body Panels', 'Exterior', 'Tesla Press', 4500, 110, 9),
      'battery-cooling': createComponent('tesla-s-bc', 'Dual-Loop Snake Ribbon Chiller', 'Battery Cooling', 'Thermal System', 'Tesla Thermal', 1400, 18, 9),
      'motor-cooling': createComponent('tesla-s-mc', 'Direct Rotor Oil Cooling Loop', 'Motor Cooling', 'Thermal System', 'Tesla Thermal', 1100, 12, 9),
      'heat-pump': createComponent('tesla-s-hp', 'Octovalve Intelligent Heat Pump', 'Heat Pump', 'Thermal System', 'Tesla Thermal', 2500, 35, 9),
      'cooling-pipes': createComponent('tesla-s-cp', 'Unified High-Pressure Nylon Loops', 'Cooling Pipes', 'Thermal System', 'Continental', 600, 14, 9),
      'chassis-design': createComponent('tesla-s-cd', 'Giga-Cast Structural Underbody', 'Chassis Design', 'Manufacturing', 'Tesla Gigafactory', 4200, 0, 9),
      'welding-process': createComponent('tesla-s-wp', 'Automated Friction Stir Spot Welding', 'Welding Process', 'Manufacturing', 'Kuka', 2100, 0, 9),
      'assembly-method': createComponent('tesla-s-am', 'Parallel Module Assembly Flow', 'Assembly Method', 'Manufacturing', 'Tesla Gigafactory', 3500, 0, 9),
      'materials': createComponent('tesla-s-mat', 'Sustainable Hybrid Composites', 'Materials', 'Manufacturing', 'Tesla Sourcing', 4000, 0, 9),
      'manufacturing-process': createComponent('tesla-s-mp', 'High-Speed Automated Press Lines', 'Manufacturing Process', 'Manufacturing', 'Schuler', 5200, 0, 9),
    },
  },
  'porsche-taycan': {
    id: 'porsche-taycan',
    name: 'Taycan Turbo S',
    manufacturer: 'Porsche',
    category: 'Sports Car',
    platform: 'J1 Premium',
    batteryType: '800V Performance Plus Battery',
    motorType: 'Dual Permanently Excited Synchronous Motors',
    rangeKm: 485,
    weightKg: 2295,
    performanceScore: 97,
    baseSpecs: {
      rangeKm: 485,
      weightKg: 2295,
      accelerationSec: 2.4,
      powerKw: 700,
      batteryEfficiencyWhKm: 198,
      thermalPerformancePct: 96,
      manufacturingCostUsd: 78000,
      comfortRating: 92,
      reliabilityPct: 93,
      safetyScore: 98,
      compatibilityScore: 94,
      innovationScore: 95,
      carbonFootprintCo2: 14200,
      engineeringComplexityPct: 93,
      topSpeedKmh: 260,
    },
    components: {
      'battery': createComponent('porsche-bat', '800V Performance Plus Battery', 'Battery', 'Powertrain', 'Dräxlmaier', 21500, 630, 9, { capacityKwh: 93.4, voltage: 800, chemistry: 'NMC 811 pouch', energyDensity: 148, coolingType: 'Bottom plate chiller', cycleLife: 1200 }),
      'motor': createComponent('porsche-mot', 'Dual Permanently Excited Synchronous Motors', 'Motor', 'Powertrain', 'Porsche Propulsion', 9500, 142, 9, { powerKw: 700, torqueNm: 1050, efficiencyPct: 95.5, maxRpm: 16000 }),
      'inverter': createComponent('porsche-inv', '800V High-Response Inverter', 'Inverter', 'Powertrain', 'Hitachi', 2600, 16, 9, { efficiencyPct: 98.2, voltage: 800 }),
      'charger': createComponent('porsche-chg', '800V 270kW DC Fast Charger', 'Charger', 'Powertrain', 'Porsche Smart Energy', 2200, 22, 9, { powerKw: 270 }),
      'transmission': createComponent('porsche-trm', '2-Speed Rear Gearbox', 'Transmission', 'Powertrain', 'ZF Friedrichshafen', 2400, 48, 9, { efficiencyPct: 94.8 }),
      'front-suspension': createComponent('porsche-fs', 'Aluminum Double Wishbone Air', 'Front Suspension', 'Suspension', 'Porsche Engineering', 2200, 42, 9),
      'rear-suspension': createComponent('porsche-rs', 'Multi-link Rear Axle Steering', 'Rear Suspension', 'Suspension', 'Porsche Engineering', 2800, 58, 9),
      'shock-absorbers': createComponent('porsche-sa', 'PASM 3-Chamber Adaptive Dampers', 'Shock Absorbers', 'Suspension', 'Bilstein', 1800, 22, 9),
      'tyres': createComponent('porsche-tyr', 'Goodyear Eagle F1 Asymmetric 5', 'Tyres', 'Wheels', 'Goodyear', 1100, 38, 9, { dimensions: '305/30 R21' }),
      'rim-size': createComponent('porsche-rim', '21" Mission E Design Forged Alloys', 'Rim Size', 'Wheels', 'Porsche Design', 2200, 44, 9),
      'braking-system': createComponent('porsche-brk', 'PCCB Porsche Ceramic Composite Brakes', 'Braking System', 'Wheels', 'Brembo', 9500, 16, 9),
      'ecu': createComponent('porsche-ecu', 'Unified Porsche Chassis Controller', 'ECU', 'Electronics', 'Bosch', 2200, 5, 9),
      'wiring-harness': createComponent('porsche-wh', '800V High-Insulation Copper Harness', 'Wiring Harness', 'Electronics', 'Leoni', 2100, 52, 9),
      'can-bus': createComponent('porsche-can', 'CAN FD with Automotive FlexRay', 'CAN Bus', 'Electronics', 'Vector', 800, 2, 9),
      'ethernet-network': createComponent('porsche-eth', '100Base-T1 BroadR-Reach Network', 'Ethernet Network', 'Electronics', 'Broadcom', 900, 3, 9),
      'camera': createComponent('porsche-cam', '360 Surround View Multi-Cam Grid', 'Camera', 'ADAS', 'Bosch', 1100, 4, 9, { resolution: '4MP' }),
      'radar': createComponent('porsche-rad', 'Mid-Range Multi-Frequency Radar', 'Radar', 'ADAS', 'Continental', 900, 1, 9),
      'lidar': createComponent('porsche-lid', 'Valeo SCALA Laser Scanner', 'LiDAR', 'ADAS', 'Valeo', 2800, 3, 9),
      'ultrasonic-sensors': createComponent('porsche-us', '12-Point Close Range Sonar', 'Ultrasonic Sensors', 'ADAS', 'Bosch', 500, 2, 9),
      'gps': createComponent('porsche-gps', 'High-Precision RTK GPS System', 'GPS', 'ADAS', 'Trimble', 600, 1, 9),
      'driver-monitoring': createComponent('porsche-dm', 'Dashboard Optical Eye Tracker', 'Driver Monitoring', 'ADAS', 'Bosch', 400, 1, 9),
      'displays': createComponent('porsche-dsp', 'Curved 16.8" Screen & Passenger Display', 'Displays', 'Interior', 'Samsung Display', 2600, 12, 9),
      'seats': createComponent('porsche-st', '18-Way Adaptive Memory Bucket Seats', 'Seats', 'Interior', 'Recaro', 3500, 72, 9),
      'steering': createComponent('porsche-str', 'GT Sports Wheel with Mode Dial', 'Steering', 'Interior', 'Porsche Design', 1200, 8, 9),
      'buttons': createComponent('porsche-btn', 'Haptic Touch Response Glass Buttons', 'Buttons', 'Interior', 'Porsche Design', 400, 2, 9),
      'hvac': createComponent('porsche-hvac', '4-Zone Advanced Touchless Airflow', 'HVAC', 'Interior', 'Behr-Hella', 1600, 42, 9),
      'infotainment': createComponent('porsche-info', 'PCM 6.0 Intel Atom Computing Core', 'Infotainment', 'Interior', 'Intel', 1400, 5, 9),
      'headlights': createComponent('porsche-hl', 'PDLS+ 84-Point HD Matrix LED', 'Headlights', 'Exterior', 'Magneti Marelli', 2500, 10, 9),
      'tail-lights': createComponent('porsche-tl', 'Glass-Effect Seamless Rear Light Strip', 'Tail Lights', 'Exterior', 'Hella', 1100, 6, 9),
      'doors': createComponent('porsche-dr', 'Hydraulic Comfort-Close Metal Doors', 'Doors', 'Exterior', 'Porsche Engineering', 1900, 94, 9),
      'chassis-material': createComponent('porsche-cm', 'Steel-Aluminum Hybrid Monocoque', 'Chassis Material', 'Exterior', 'Porsche Foundry', 8500, 360, 9),
      'body-panels': createComponent('porsche-bp', 'Super-Formed Aluminum Exterior Panels', 'Body Panels', 'Exterior', 'Porsche Press', 5200, 95, 9),
      'battery-cooling': createComponent('porsche-bc', 'Dual Plate Under-Cell Liquid Chiller', 'Battery Cooling', 'Thermal System', 'Mahle', 1900, 22, 9),
      'motor-cooling': createComponent('porsche-mc', 'Stator Jacket Fluid Cooling System', 'Motor Cooling', 'Thermal System', 'Mahle', 1300, 14, 9),
      'heat-pump': createComponent('porsche-hp', 'High-Output Intelligent Heat Pump', 'Heat Pump', 'Thermal System', 'Mahle', 2200, 32, 9),
      'cooling-pipes': createComponent('porsche-cp', 'Braided Low-Permeation Coolant Lines', 'Cooling Pipes', 'Thermal System', 'Teklas', 800, 16, 9),
      'chassis-design': createComponent('porsche-cd', 'Integrated Low-Gravity Battery Tray', 'Chassis Design', 'Manufacturing', 'Porsche Zuffenhausen', 5500, 0, 9),
      'welding-process': createComponent('porsche-wp', 'Robotic Cold Metal Transfer Welding', 'Welding Process', 'Manufacturing', 'ABB Robotics', 2800, 0, 9),
      'assembly-method': createComponent('porsche-am', 'Manual-Assisted Smart Ergonomic Line', 'Assembly Method', 'Manufacturing', 'Porsche Zuffenhausen', 4500, 0, 9),
      'materials': createComponent('porsche-mat', 'Forged Lightweight Alloy Elements', 'Materials', 'Manufacturing', 'Hydro Aluminum', 4800, 0, 9),
      'manufacturing-process': createComponent('porsche-mp', 'Multi-Stage Laser Calibration Assembly', 'Manufacturing Process', 'Manufacturing', 'Zeiss', 5800, 0, 9),
    },
  },
  'bmw-i7': {
    id: 'bmw-i7',
    name: 'BMW i7 M70',
    manufacturer: 'BMW',
    category: 'Sedan',
    platform: 'CLAR Modular',
    batteryType: 'Prismatic High-Density Battery',
    motorType: 'Fifth-Gen Electrically Excited Synch Motor',
    rangeKm: 560,
    weightKg: 2695,
    performanceScore: 94,
    baseSpecs: {
      rangeKm: 560,
      weightKg: 2695,
      accelerationSec: 3.7,
      powerKw: 485,
      batteryEfficiencyWhKm: 181,
      thermalPerformancePct: 89,
      manufacturingCostUsd: 82000,
      comfortRating: 98,
      reliabilityPct: 90,
      safetyScore: 97,
      compatibilityScore: 92,
      innovationScore: 94,
      carbonFootprintCo2: 15500,
      engineeringComplexityPct: 91,
      topSpeedKmh: 250,
    },
    components: {
      'battery': createComponent('bmw-bat', 'Prismatic High-Density Battery', 'Battery', 'Powertrain', 'CATL', 18900, 680, 9, { capacityKwh: 101.7, voltage: 400, chemistry: 'NMC 622 Prismatic', energyDensity: 150, coolingType: 'Interlayer cooling plate', cycleLife: 1000 }),
      'motor': createComponent('bmw-mot', 'Fifth-Gen Electrically Excited Synch Motor', 'Motor', 'Powertrain', 'BMW Dingolfing', 7800, 130, 9, { powerKw: 485, torqueNm: 1100, efficiencyPct: 94, maxRpm: 15000 }),
      'inverter': createComponent('bmw-inv', 'M-Performance Power Inverter', 'Inverter', 'Powertrain', 'Bosch', 2100, 15, 9, { efficiencyPct: 97.8, voltage: 400 }),
      'charger': createComponent('bmw-chg', 'Flexible Fast Charger 200kW', 'Charger', 'Powertrain', 'BMW Group', 1600, 20, 9, { powerKw: 200 }),
      'transmission': createComponent('bmw-trm', 'Symmetric Coaxial Reduction Gear', 'Transmission', 'Powertrain', 'ZF Friedrichshafen', 1400, 38, 9, { efficiencyPct: 95.8 }),
      'front-suspension': createComponent('bmw-fs', 'Dual-Section Air Spring Front Struts', 'Front Suspension', 'Suspension', 'BMW Chassis', 2400, 48, 9),
      'rear-suspension': createComponent('bmw-rs', '5-Link Dynamic Rear Axle Steering', 'Rear Suspension', 'Suspension', 'BMW Chassis', 3100, 62, 9),
      'shock-absorbers': createComponent('bmw-sa', 'Executive Drive Pro Predictive Dampers', 'Shock Absorbers', 'Suspension', 'Tenneco', 2200, 24, 9),
      'tyres': createComponent('bmw-tyr', 'Bridgestone Turanza Eco 20"', 'Tyres', 'Wheels', 'Bridgestone', 1000, 36, 9, { dimensions: '285/35 R20' }),
      'rim-size': createComponent('bmw-rim', '20" M Aerodynamic 907 Alloys', 'Rim Size', 'Wheels', 'BMW Design', 1800, 35, 9),
      'braking-system': createComponent('bmw-brk', 'M Sport Multi-Piston Steel Brakes', 'Braking System', 'Wheels', 'Brembo', 4500, 34, 9),
      'ecu': createComponent('bmw-ecu', 'iDrive 8.5 Integrated Compute Unit', 'ECU', 'Electronics', 'Harman', 2400, 5, 9),
      'wiring-harness': createComponent('bmw-wh', 'Aluminum-Enhanced Flex-Layer Harness', 'Wiring Harness', 'Electronics', 'Draexlmaier', 1800, 46, 9),
      'can-bus': createComponent('bmw-can', 'Ethernet-Bridged CAN Bus Network', 'CAN Bus', 'Electronics', 'Vector', 600, 2, 9),
      'ethernet-network': createComponent('bmw-eth', 'BroadR-Reach Gigabit Backplane', 'Ethernet Network', 'Electronics', 'Broadcom', 1100, 3, 9),
      'camera': createComponent('bmw-cam', 'Full-Chassis surround 8MP UHD Camera system', 'Camera', 'ADAS', 'Continental', 1400, 3, 9, { resolution: '8MP' }),
      'radar': createComponent('bmw-rad', 'Mobileye EyeQ5 Radar array', 'Radar', 'ADAS', 'Mobileye', 1500, 2, 9),
      'lidar': createComponent('bmw-lid', 'InnoVusion Falcon Prime LiDAR', 'LiDAR', 'ADAS', 'InnoVusion', 3500, 4, 8),
      'ultrasonic-sensors': createComponent('bmw-us', 'Multi-Sensory Parking USS Array', 'Ultrasonic Sensors', 'ADAS', 'Valeo', 600, 2, 9),
      'gps': createComponent('bmw-gps', 'RTK-Enabled Automotive High-Res GPS', 'GPS', 'ADAS', 'u-blox', 400, 1, 9),
      'driver-monitoring': createComponent('bmw-dm', 'Attention Assist IR Tracking Cam', 'Driver Monitoring', 'ADAS', 'Continental', 500, 1, 9),
      'displays': createComponent('bmw-dsp', '31.3" 8K Ultra-Wide Theater Screen (Rear)', 'Displays', 'Interior', 'Samsung Display', 4500, 18, 9),
      'seats': createComponent('bmw-st', 'Merino Leather Multi-Contour Lounge Seats', 'Seats', 'Interior', 'BMW Interiors', 3800, 84, 9),
      'steering': createComponent('bmw-str', 'Flat-Bottom M Leather Wheel with LED', 'Steering', 'Interior', 'BMW Interiors', 1100, 7, 9),
      'buttons': createComponent('bmw-btn', 'CraftedClarity Crystal Control Dial', 'Buttons', 'Interior', 'Swarovski', 800, 1, 9),
      'hvac': createComponent('bmw-hvac', 'Nanoparticle Filtering Advanced HVAC', 'HVAC', 'Interior', 'Valeo', 1500, 40, 9),
      'infotainment': createComponent('bmw-info', 'BMW OS 8.5 powered by Intel Platform', 'Infotainment', 'Interior', 'Intel', 1800, 6, 9),
      'headlights': createComponent('bmw-hl', 'BMW Crystal Icon Adaptive LED/Laser', 'Headlights', 'Exterior', 'ZKW Group', 3200, 9, 9),
      'tail-lights': createComponent('bmw-tl', 'Three-Dimensional L-Shaped Slim Lights', 'Tail Lights', 'Exterior', 'ZKW Group', 900, 5, 9),
      'doors': createComponent('bmw-dr', 'Fully Automated Comfort-Open Doors', 'Doors', 'Exterior', 'BMW Engineering', 2800, 102, 9),
      'chassis-material': createComponent('bmw-cm', 'Carbon Core Steel-Aluminum Cage', 'Chassis Material', 'Exterior', 'BMW Dingolfing', 9200, 390, 9),
      'body-panels': createComponent('bmw-bp', 'Double-Sided Hot Galvanized Steel Panels', 'Body Panels', 'Exterior', 'BMW Press', 4800, 120, 9),
      'battery-cooling': createComponent('bmw-bc', 'Dual-Zone Structural Chill Plate', 'Battery Cooling', 'Thermal System', 'Modine', 1700, 20, 9),
      'motor-cooling': createComponent('bmw-mc', 'Direct-Stator Jacket Fluid Loop', 'Motor Cooling', 'Thermal System', 'Modine', 1100, 11, 9),
      'heat-pump': createComponent('bmw-hp', 'Variable-Flow Auto-Regulating Heat Pump', 'Heat Pump', 'Thermal System', 'Denso', 2300, 34, 9),
      'cooling-pipes': createComponent('bmw-cp', 'Thermoplastic Pre-Formed Coolant Lines', 'Cooling Pipes', 'Thermal System', 'Hutchinson', 700, 15, 9),
      'chassis-design': createComponent('bmw-cd', 'CLAR Multi-Material High-Rigidity Frame', 'Chassis Design', 'Manufacturing', 'BMW Dingolfing', 6200, 0, 9),
      'welding-process': createComponent('bmw-wp', 'Ultrasonic and Laser Structural Jointing', 'Welding Process', 'Manufacturing', 'Kuka', 2600, 0, 9),
      'assembly-method': createComponent('bmw-am', 'Smart-Flex Automated Chassis Wedging', 'Assembly Method', 'Manufacturing', 'BMW Dingolfing', 4100, 0, 9),
      'materials': createComponent('bmw-mat', 'Recycled Aluminum & Carbon Composites', 'Materials', 'Manufacturing', 'BMW Sourcing', 4500, 0, 9),
      'manufacturing-process': createComponent('bmw-mp', 'Zero-Emission Closed-Loop Paint & Press', 'Manufacturing Process', 'Manufacturing', 'Dürr', 5500, 0, 9),
    },
  },
};

// Helper function to create derived car models to prevent duplicate code and maintain perfect structural integrity
function createDerivedVehicle(
  baseVehicle: VehicleModel,
  overrides: {
    id: string;
    name: string;
    manufacturer: string;
    category: 'Sedan' | 'SUV' | 'Sports Car' | 'Hypercar' | 'Truck';
    platform: string;
    batteryType: string;
    motorType: string;
    rangeKm: number;
    weightKg: number;
    performanceScore: number;
    baseSpecs: Partial<BaseSpecs>;
  }
): VehicleModel {
  const newComponents: Record<string, any> = {};
  
  Object.keys(baseVehicle.components).forEach((key) => {
    const originalComp = baseVehicle.components[key];
    const newId = `${overrides.id}-${key}`;
    
    let newName = originalComp.name;
    if (newName.includes(baseVehicle.name)) {
      newName = newName.replace(baseVehicle.name, overrides.name);
    } else if (newName.includes(baseVehicle.manufacturer)) {
      newName = newName.replace(baseVehicle.manufacturer, overrides.manufacturer);
    } else {
      newName = `${overrides.name} ${originalComp.category}`;
    }

    newComponents[key] = {
      ...originalComp,
      id: newId,
      name: newName,
      spec: {
        ...originalComp.spec,
        id: newId,
        name: newName,
        manufacturer: originalComp.spec.manufacturer === baseVehicle.manufacturer ? overrides.manufacturer : originalComp.spec.manufacturer,
      }
    };
  });

  // Adjust battery & motor specifically
  if (newComponents['battery']) {
    newComponents['battery'].name = overrides.batteryType;
    newComponents['battery'].spec.name = overrides.batteryType;
    newComponents['battery'].spec.manufacturer = `${overrides.manufacturer} Energy`;
  }
  if (newComponents['motor']) {
    newComponents['motor'].name = overrides.motorType;
    newComponents['motor'].spec.name = overrides.motorType;
    newComponents['motor'].spec.manufacturer = `${overrides.manufacturer} Propulsion`;
    if (newComponents['motor'].spec.powerKw) {
      newComponents['motor'].spec.powerKw = overrides.baseSpecs.powerKw || newComponents['motor'].spec.powerKw;
    }
  }

  return {
    id: overrides.id,
    name: overrides.name,
    manufacturer: overrides.manufacturer,
    category: overrides.category,
    platform: overrides.platform,
    batteryType: overrides.batteryType,
    motorType: overrides.motorType,
    rangeKm: overrides.rangeKm,
    weightKg: overrides.weightKg,
    performanceScore: overrides.performanceScore,
    baseSpecs: {
      ...baseVehicle.baseSpecs,
      ...overrides.baseSpecs,
    } as BaseSpecs,
    components: newComponents,
  };
}

const audiEtronGt = createDerivedVehicle(INITIAL_VEHICLES['porsche-taycan'], {
  id: 'audi-etron-gt',
  name: 'RS e-tron GT',
  manufacturer: 'Audi',
  category: 'Sports Car',
  platform: 'J1 Performance',
  batteryType: '800V Performance Li-ion',
  motorType: 'Dual Synchronous Excitation',
  rangeKm: 488,
  weightKg: 2345,
  performanceScore: 95,
  baseSpecs: {
    rangeKm: 488,
    weightKg: 2345,
    accelerationSec: 2.9,
    powerKw: 475,
    batteryEfficiencyWhKm: 193,
    manufacturingCostUsd: 74000,
    comfortRating: 90,
    reliabilityPct: 92,
    safetyScore: 98,
    compatibilityScore: 94,
    innovationScore: 93,
    carbonFootprintCo2: 13800,
    engineeringComplexityPct: 91,
  }
});

const lucidAir = createDerivedVehicle(INITIAL_VEHICLES['tesla-s'], {
  id: 'lucid-air',
  name: 'Air Sapphire',
  manufacturer: 'Lucid Motors',
  category: 'Sedan',
  platform: 'LEAP Premium',
  batteryType: 'Ultra-High Voltage Cell Matrix',
  motorType: 'Tri-Motor Sapphire Propulsion',
  rangeKm: 687,
  weightKg: 2420,
  performanceScore: 99,
  baseSpecs: {
    rangeKm: 687,
    weightKg: 2420,
    accelerationSec: 1.89,
    powerKw: 920,
    batteryEfficiencyWhKm: 145,
    manufacturingCostUsd: 120000,
    comfortRating: 95,
    reliabilityPct: 88,
    safetyScore: 99,
    compatibilityScore: 90,
    innovationScore: 98,
    carbonFootprintCo2: 16200,
    engineeringComplexityPct: 95,
  }
});

const rivianR1t = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'rivian-r1t',
  name: 'R1T Gen 2',
  manufacturer: 'Rivian',
  category: 'Truck',
  platform: 'Rivian Skateboard v2',
  batteryType: 'Max Pack Cylindrical Li-ion',
  motorType: 'Quad-Motor Dual-Drive Unit',
  rangeKm: 676,
  weightKg: 3220,
  performanceScore: 96,
  baseSpecs: {
    rangeKm: 676,
    weightKg: 3220,
    accelerationSec: 3.0,
    powerKw: 765,
    batteryEfficiencyWhKm: 240,
    manufacturingCostUsd: 65000,
    comfortRating: 91,
    reliabilityPct: 90,
    safetyScore: 98,
    compatibilityScore: 92,
    innovationScore: 96,
    carbonFootprintCo2: 18500,
    engineeringComplexityPct: 92,
  }
});

const hyundaiIoniq5n = createDerivedVehicle(INITIAL_VEHICLES['porsche-taycan'], {
  id: 'hyundai-ioniq5n',
  name: 'Ioniq 5 N',
  manufacturer: 'Hyundai',
  category: 'Sports Car',
  platform: 'E-GMP Sport',
  batteryType: '84kWh High-Rate Cell Pack',
  motorType: 'Dual Motor Rally-tuned PMSM',
  rangeKm: 448,
  weightKg: 2235,
  performanceScore: 93,
  baseSpecs: {
    rangeKm: 448,
    weightKg: 2235,
    accelerationSec: 3.4,
    powerKw: 478,
    batteryEfficiencyWhKm: 188,
    manufacturingCostUsd: 48000,
    comfortRating: 85,
    reliabilityPct: 94,
    safetyScore: 97,
    compatibilityScore: 96,
    innovationScore: 95,
    carbonFootprintCo2: 10500,
    engineeringComplexityPct: 87,
  }
});

const rimacNevera = createDerivedVehicle(INITIAL_VEHICLES['porsche-taycan'], {
  id: 'rimac-nevera',
  name: 'Nevera Time Attack',
  manufacturer: 'Rimac',
  category: 'Hypercar',
  platform: 'Nevera Carbon Monocoque',
  batteryType: '120kWh 730V Hypercar Pack',
  motorType: 'Quad Independent PM Motors',
  rangeKm: 490,
  weightKg: 2150,
  performanceScore: 100,
  baseSpecs: {
    rangeKm: 490,
    weightKg: 2150,
    accelerationSec: 1.74,
    powerKw: 1400,
    batteryEfficiencyWhKm: 245,
    manufacturingCostUsd: 350000,
    comfortRating: 80,
    reliabilityPct: 85,
    safetyScore: 99,
    compatibilityScore: 82,
    innovationScore: 100,
    carbonFootprintCo2: 24000,
    engineeringComplexityPct: 98,
  }
});

const mercedesEqs = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'mercedes-eqs',
  name: 'EQS 53 AMG',
  manufacturer: 'Mercedes-AMG',
  category: 'Sedan',
  platform: 'EVA2 Luxury',
  batteryType: '108.4kWh Silic-Carbide Pack',
  motorType: 'AMG Dual-Motor Performance',
  rangeKm: 610,
  weightKg: 2585,
  performanceScore: 95,
  baseSpecs: {
    rangeKm: 610,
    weightKg: 2585,
    accelerationSec: 3.4,
    powerKw: 560,
    batteryEfficiencyWhKm: 178,
    manufacturingCostUsd: 88000,
    comfortRating: 99,
    reliabilityPct: 91,
    safetyScore: 98,
    compatibilityScore: 94,
    innovationScore: 95,
    carbonFootprintCo2: 14900,
    engineeringComplexityPct: 93,
  }
});

const fordF150 = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'ford-f150',
  name: 'F-150 Lightning Platinum',
  manufacturer: 'Ford',
  category: 'Truck',
  platform: 'F-Series EV Frame',
  batteryType: 'Extended Range Pouch Cell Pack',
  motorType: 'Dual-Motor Workhorse Induction',
  rangeKm: 515,
  weightKg: 3015,
  performanceScore: 89,
  baseSpecs: {
    rangeKm: 515,
    weightKg: 3015,
    accelerationSec: 4.0,
    powerKw: 433,
    batteryEfficiencyWhKm: 260,
    manufacturingCostUsd: 59000,
    comfortRating: 92,
    reliabilityPct: 93,
    safetyScore: 97,
    compatibilityScore: 95,
    innovationScore: 90,
    carbonFootprintCo2: 16500,
    engineeringComplexityPct: 85,
  }
});

const volvoEx90 = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'volvo-ex90',
  name: 'EX90 Ultra',
  manufacturer: 'Volvo',
  category: 'SUV',
  platform: 'SPA2 Premium Safety',
  batteryType: '111kWh Safecell Array',
  motorType: 'Twin-Motor Permanent Magnet',
  rangeKm: 600,
  weightKg: 2818,
  performanceScore: 92,
  baseSpecs: {
    rangeKm: 600,
    weightKg: 2818,
    accelerationSec: 4.9,
    powerKw: 380,
    batteryEfficiencyWhKm: 185,
    manufacturingCostUsd: 54000,
    comfortRating: 94,
    reliabilityPct: 95,
    safetyScore: 100,
    compatibilityScore: 97,
    innovationScore: 92,
    carbonFootprintCo2: 11800,
    engineeringComplexityPct: 88,
  }
});

INITIAL_VEHICLES['audi-etron-gt'] = audiEtronGt;
INITIAL_VEHICLES['lucid-air'] = lucidAir;
INITIAL_VEHICLES['rivian-r1t'] = rivianR1t;
INITIAL_VEHICLES['hyundai-ioniq5n'] = hyundaiIoniq5n;
INITIAL_VEHICLES['rimac-nevera'] = rimacNevera;
INITIAL_VEHICLES['mercedes-eqs'] = mercedesEqs;
INITIAL_VEHICLES['ford-f150'] = fordF150;
INITIAL_VEHICLES['volvo-ex90'] = volvoEx90;

// Helper to create fully detailed motorcycles with specialized components
function createMotorcycleVehicle(
  overrides: {
    id: string;
    name: string;
    manufacturer: string;
    rangeKm: number;
    weightKg: number;
    performanceScore: number;
    batteryCapacityKwh: number;
    batteryType: string;
    motorType: string;
    motorPowerKw: number;
    transmissionType: string;
    baseSpecs: Partial<BaseSpecs>;
  }
): VehicleModel {
  const baseVehicle = INITIAL_VEHICLES['porsche-taycan'];
  const newComponents: Record<string, any> = {};

  Object.keys(baseVehicle.components).forEach((key) => {
    const originalComp = baseVehicle.components[key];
    const newId = `${overrides.id}-${key}`;
    newComponents[key] = {
      ...originalComp,
      id: newId,
      name: originalComp.name,
      spec: {
        ...originalComp.spec,
        id: newId,
        manufacturer: overrides.manufacturer,
      }
    };
  });

  // Customizing specific components for motorcycle realism!
  newComponents['battery'] = {
    id: `${overrides.id}-battery`,
    name: overrides.batteryType,
    category: 'Battery',
    parentCategory: 'Powertrain',
    spec: {
      id: `${overrides.id}-battery`,
      name: overrides.batteryType,
      manufacturer: overrides.manufacturer,
      cost: Math.round(overrides.baseSpecs.manufacturingCostUsd! * 0.25),
      weight: Math.round(overrides.weightKg * 0.35),
      trl: 9,
      capacityKwh: overrides.batteryCapacityKwh,
      voltage: 400,
      chemistry: 'Li-ion Cell Matrix',
      energyDensity: 210,
      coolingType: 'Passive Air / Coolant Fins',
      cycleLife: 1500
    }
  };

  newComponents['motor'] = {
    id: `${overrides.id}-motor`,
    name: overrides.motorType,
    category: 'Motor',
    parentCategory: 'Powertrain',
    spec: {
      id: `${overrides.id}-motor`,
      name: overrides.motorType,
      manufacturer: overrides.manufacturer,
      cost: Math.round(overrides.baseSpecs.manufacturingCostUsd! * 0.15),
      weight: Math.round(overrides.weightKg * 0.12),
      trl: 9,
      powerKw: overrides.motorPowerKw,
      torqueNm: Math.round(overrides.motorPowerKw * 1.8),
      efficiencyPct: 96,
      maxRpm: 12000
    }
  };

  newComponents['transmission'] = {
    id: `${overrides.id}-transmission`,
    name: overrides.transmissionType,
    category: 'Transmission',
    parentCategory: 'Powertrain',
    spec: {
      id: `${overrides.id}-transmission`,
      name: overrides.transmissionType,
      manufacturer: overrides.manufacturer,
      cost: 1200,
      weight: 12,
      trl: 9,
      efficiencyPct: 98
    }
  };

  newComponents['front-suspension'] = {
    id: `${overrides.id}-front-suspension`,
    name: 'Fully Adjustable Inverted Telescopic Forks',
    category: 'Front Suspension',
    parentCategory: 'Suspension',
    spec: { id: `${overrides.id}-front-suspension`, name: 'Fully Adjustable Inverted Telescopic Forks', manufacturer: 'Showa', cost: 1800, weight: 15, trl: 9 }
  };

  newComponents['rear-suspension'] = {
    id: `${overrides.id}-rear-suspension`,
    name: 'Single-Sided Cast Aluminum Swingarm',
    category: 'Rear Suspension',
    parentCategory: 'Suspension',
    spec: { id: `${overrides.id}-rear-suspension`, name: 'Single-Sided Cast Aluminum Swingarm', manufacturer: overrides.manufacturer, cost: 2200, weight: 18, trl: 9 }
  };

  newComponents['shock-absorbers'] = {
    id: `${overrides.id}-shock-absorbers`,
    name: 'Öhlins TTX36 Gas-Charged Monoshock',
    category: 'Shock Absorbers',
    parentCategory: 'Suspension',
    spec: { id: `${overrides.id}-shock-absorbers`, name: 'Öhlins TTX36 Gas-Charged Monoshock', manufacturer: 'Öhlins', cost: 1400, weight: 6, trl: 9 }
  };

  newComponents['tyres'] = {
    id: `${overrides.id}-tyres`,
    name: 'Pirelli Diablo Supercorsa Dual-Compound',
    category: 'Tyres',
    parentCategory: 'Wheels',
    spec: { id: `${overrides.id}-tyres`, name: 'Pirelli Diablo Supercorsa Dual-Compound', manufacturer: 'Pirelli', cost: 600, weight: 12, trl: 9, dimensions: '120/70 ZR17 (F) / 200/55 ZR17 (R)' }
  };

  newComponents['rim-size'] = {
    id: `${overrides.id}-rim-size`,
    name: '17" Forged Light-Alloy 5-Spoke Wheels',
    category: 'Rim Size',
    parentCategory: 'Wheels',
    spec: { id: `${overrides.id}-rim-size`, name: '17" Forged Light-Alloy 5-Spoke Wheels', manufacturer: 'Marchesini', cost: 1500, weight: 8, trl: 9 }
  };

  newComponents['braking-system'] = {
    id: `${overrides.id}-braking-system`,
    name: 'Brembo Stylema Monobloc Radials',
    category: 'Braking System',
    parentCategory: 'Wheels',
    spec: { id: `${overrides.id}-braking-system`, name: 'Brembo Stylema Monobloc Radials', manufacturer: 'Brembo', cost: 2500, weight: 7, trl: 9 }
  };

  newComponents['steering'] = {
    id: `${overrides.id}-steering`,
    name: 'Racing Clip-on Handlebars with Dampener',
    category: 'Steering',
    parentCategory: 'Interior',
    spec: { id: `${overrides.id}-steering`, name: 'Racing Clip-on Handlebars with Dampener', manufacturer: 'Ohlins', cost: 800, weight: 3, trl: 9 }
  };

  newComponents['seats'] = {
    id: `${overrides.id}-seats`,
    name: 'Ergonomic Alcantara Rider Saddle',
    category: 'Seats',
    parentCategory: 'Interior',
    spec: { id: `${overrides.id}-seats`, name: 'Ergonomic Alcantara Rider Saddle', manufacturer: overrides.manufacturer, cost: 400, weight: 2, trl: 9 }
  };

  newComponents['doors'] = {
    id: `${overrides.id}-doors`,
    name: 'No Doors (Aerodynamic Frame Fairings)',
    category: 'Doors',
    parentCategory: 'Exterior',
    spec: { id: `${overrides.id}-doors`, name: 'No Doors (Aerodynamic Frame Fairings)', manufacturer: overrides.manufacturer, cost: 0, weight: 0, trl: 9 }
  };

  newComponents['hvac'] = {
    id: `${overrides.id}-hvac`,
    name: 'No Cabin HVAC (Heated Grips & Seat)',
    category: 'HVAC',
    parentCategory: 'Interior',
    spec: { id: `${overrides.id}-hvac`, name: 'No Cabin HVAC (Heated Grips & Seat)', manufacturer: overrides.manufacturer, cost: 200, weight: 1, trl: 9 }
  };

  newComponents['displays'] = {
    id: `${overrides.id}-displays`,
    name: '5" High-Contrast TFT Instrumentation',
    category: 'Displays',
    parentCategory: 'Interior',
    spec: { id: `${overrides.id}-displays`, name: '5" High-Contrast TFT Instrumentation', manufacturer: 'Bosch', cost: 800, weight: 1, trl: 9 }
  };

  newComponents['chassis-material'] = {
    id: `${overrides.id}-chassis-material`,
    name: 'High-Tensile Steel Trellis Main Frame',
    category: 'Chassis Material',
    parentCategory: 'Exterior',
    spec: { id: `${overrides.id}-chassis-material`, name: 'High-Tensile Steel Trellis Main Frame', manufacturer: overrides.manufacturer, cost: 3500, weight: 18, trl: 9 }
  };

  newComponents['body-panels'] = {
    id: `${overrides.id}-body-panels`,
    name: 'Carbon Fiber Lightweight Bodywork',
    category: 'Body Panels',
    parentCategory: 'Exterior',
    spec: { id: `${overrides.id}-body-panels`, name: 'Carbon Fiber Lightweight Bodywork', manufacturer: overrides.manufacturer, cost: 4500, weight: 7, trl: 9 }
  };

  return {
    id: overrides.id,
    name: overrides.name,
    manufacturer: overrides.manufacturer,
    category: 'Motorcycle',
    platform: `${overrides.manufacturer} E-Superbike Platform`,
    batteryType: overrides.batteryType,
    motorType: overrides.motorType,
    rangeKm: overrides.rangeKm,
    weightKg: overrides.weightKg,
    performanceScore: overrides.performanceScore,
    baseSpecs: {
      rangeKm: overrides.rangeKm,
      weightKg: overrides.weightKg,
      accelerationSec: overrides.baseSpecs.accelerationSec || 3.0,
      powerKw: overrides.motorPowerKw,
      batteryEfficiencyWhKm: Math.round((overrides.batteryCapacityKwh * 1000) / overrides.rangeKm),
      thermalPerformancePct: overrides.baseSpecs.thermalPerformancePct || 94,
      manufacturingCostUsd: overrides.baseSpecs.manufacturingCostUsd || 18000,
      comfortRating: overrides.baseSpecs.comfortRating || 75,
      reliabilityPct: overrides.baseSpecs.reliabilityPct || 95,
      safetyScore: overrides.baseSpecs.safetyScore || 90,
      compatibilityScore: overrides.baseSpecs.compatibilityScore || 94,
      innovationScore: overrides.baseSpecs.innovationScore || 95,
      carbonFootprintCo2: overrides.baseSpecs.carbonFootprintCo2 || 3500,
      engineeringComplexityPct: overrides.baseSpecs.engineeringComplexityPct || 82,
      topSpeedKmh: overrides.baseSpecs.topSpeedKmh || 150,
    },
    components: newComponents,
  };
}

const zeroSrf = createMotorcycleVehicle({
  id: 'zero-srf',
  name: 'SR/F Streetfighter',
  manufacturer: 'Zero Motorcycles',
  rangeKm: 252,
  weightKg: 227,
  performanceScore: 92,
  batteryCapacityKwh: 17.3,
  batteryType: 'Z-Force 17.3 Intelligent Li-ion',
  motorType: 'Z-Force 75-10 Air-Cooled PMSM',
  motorPowerKw: 84,
  transmissionType: 'Gates Carbon Belt Drive',
  baseSpecs: {
    accelerationSec: 3.3,
    manufacturingCostUsd: 14500,
    comfortRating: 82,
    reliabilityPct: 95,
    safetyScore: 91,
    carbonFootprintCo2: 2200,
    engineeringComplexityPct: 78,
  }
});

const vergeTsUltra = createMotorcycleVehicle({
  id: 'verge-ts-ultra',
  name: 'TS Ultra Hubless',
  manufacturer: 'Verge Motorcycles',
  rangeKm: 375,
  weightKg: 245,
  performanceScore: 97,
  batteryCapacityKwh: 20.2,
  batteryType: 'TS Integrated Core Cell Pack',
  motorType: 'Revolutionary Hubless Ring Motor',
  motorPowerKw: 150,
  transmissionType: 'Direct Hubless Rim Drive',
  baseSpecs: {
    accelerationSec: 2.5,
    manufacturingCostUsd: 22500,
    comfortRating: 78,
    reliabilityPct: 91,
    safetyScore: 93,
    carbonFootprintCo2: 2900,
    engineeringComplexityPct: 94,
  }
});

const lightningLs218 = createMotorcycleVehicle({
  id: 'lightning-ls218',
  name: 'LS-218 Superbike',
  manufacturer: 'Lightning',
  rangeKm: 290,
  weightKg: 225,
  performanceScore: 99,
  batteryCapacityKwh: 20.0,
  batteryType: '380V High-Discharge Pack',
  motorType: 'Liquid-Cooled 15,000RPM IPM Motor',
  motorPowerKw: 180,
  transmissionType: 'Direct Drive Racing Chain',
  baseSpecs: {
    accelerationSec: 2.2,
    manufacturingCostUsd: 29000,
    comfortRating: 68,
    reliabilityPct: 88,
    safetyScore: 89,
    carbonFootprintCo2: 3200,
    engineeringComplexityPct: 91,
  }
});

const teslaSemi = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'tesla-semi',
  name: 'Semi Class 8',
  manufacturer: 'Tesla',
  category: 'Truck',
  platform: 'Tesla Heavy-Duty Skateboard',
  batteryType: '900kWh Megapack-style Structural Pack',
  motorType: 'Tri-Motor Independent Shaft Drive',
  rangeKm: 800,
  weightKg: 11500,
  performanceScore: 95,
  baseSpecs: {
    rangeKm: 800,
    weightKg: 11500,
    accelerationSec: 5.0,
    powerKw: 750,
    batteryEfficiencyWhKm: 1125,
    manufacturingCostUsd: 140000,
    comfortRating: 85,
    reliabilityPct: 92,
    safetyScore: 99,
    compatibilityScore: 88,
    innovationScore: 98,
    carbonFootprintCo2: 42000,
    engineeringComplexityPct: 93,
  }
});

const volvoFhElectric = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'volvo-fh-electric',
  name: 'FH Electric Hauler',
  manufacturer: 'Volvo Trucks',
  category: 'Truck',
  platform: 'Volvo Heavy FM/FH Platform',
  batteryType: '540kWh High-Payload Pouch Array',
  motorType: 'Triple-Motor Multi-Ratio Propulsion',
  rangeKm: 345,
  weightKg: 14500,
  performanceScore: 91,
  baseSpecs: {
    rangeKm: 345,
    weightKg: 14500,
    accelerationSec: 8.5,
    powerKw: 490,
    batteryEfficiencyWhKm: 1565,
    manufacturingCostUsd: 115000,
    comfortRating: 91,
    reliabilityPct: 96,
    safetyScore: 100,
    compatibilityScore: 93,
    innovationScore: 89,
    carbonFootprintCo2: 38000,
    engineeringComplexityPct: 88,
  }
});

// --- NEW VEHICLES ADDED: INDIAN TRUCKS, BIKES, AND INDIAN CARS ---

// Indian Electric Trucks
const tataPrimaEv = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'tata-prima-ev',
  name: 'Prima E.55S Heavy Haulage',
  manufacturer: 'Tata Motors',
  category: 'Truck',
  platform: 'Tata Heavy-Duty EV Skateboard',
  batteryType: '600kWh Lithium Iron Phosphate (LFP) Liquid-Cooled Pack',
  motorType: 'Dual Permanent Magnet Synchronous Motors',
  rangeKm: 450,
  weightKg: 12500,
  performanceScore: 88,
  baseSpecs: {
    rangeKm: 450,
    weightKg: 12500,
    accelerationSec: 7.2,
    powerKw: 550,
    batteryEfficiencyWhKm: 1330,
    manufacturingCostUsd: 110000,
    comfortRating: 84,
    reliabilityPct: 94,
    safetyScore: 98,
    compatibilityScore: 91,
    innovationScore: 88,
    carbonFootprintCo2: 32000,
    engineeringComplexityPct: 85,
  }
});

const ashokLeylandAvtr = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'ashok-leyland-avtr',
  name: 'AVTR 55T Heavy Duty EV',
  manufacturer: 'Ashok Leyland',
  category: 'Truck',
  platform: 'i-Gen6 EV Architecture',
  batteryType: '500kWh High-Density NMC Cell Matrix',
  motorType: 'Dual Integrated Electric Drive Axle',
  rangeKm: 380,
  weightKg: 13200,
  performanceScore: 86,
  baseSpecs: {
    rangeKm: 380,
    weightKg: 13200,
    accelerationSec: 8.0,
    powerKw: 480,
    batteryEfficiencyWhKm: 1315,
    manufacturingCostUsd: 95000,
    comfortRating: 81,
    reliabilityPct: 95,
    safetyScore: 96,
    compatibilityScore: 92,
    innovationScore: 85,
    carbonFootprintCo2: 29000,
    engineeringComplexityPct: 82,
  }
});

const bharatbenz5528Ev = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'bharatbenz-5528-ev',
  name: 'e-Powerline 5528 Tipper',
  manufacturer: 'BharatBenz',
  category: 'Truck',
  platform: 'Daimler Truck EV Platform',
  batteryType: '450kWh Ruggedized Mining Grade Pack',
  motorType: 'Central Drive Electric Powertrain',
  rangeKm: 320,
  weightKg: 14000,
  performanceScore: 89,
  baseSpecs: {
    rangeKm: 320,
    weightKg: 14000,
    accelerationSec: 9.0,
    powerKw: 400,
    batteryEfficiencyWhKm: 1400,
    manufacturingCostUsd: 125000,
    comfortRating: 88,
    reliabilityPct: 97,
    safetyScore: 99,
    compatibilityScore: 89,
    innovationScore: 87,
    carbonFootprintCo2: 26000,
    engineeringComplexityPct: 86,
  }
});

const mahindraBlazoEv = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'mahindra-blazo-ev',
  name: 'Blazo X m-Power EV',
  manufacturer: 'Mahindra',
  category: 'Truck',
  platform: 'Mahindra Smart Haul EV',
  batteryType: '520kWh Smart BMS Prismatic Array',
  motorType: 'Multi-Speed High-Torque PMSM Motor',
  rangeKm: 400,
  weightKg: 12800,
  performanceScore: 87,
  baseSpecs: {
    rangeKm: 400,
    weightKg: 12800,
    accelerationSec: 7.8,
    powerKw: 460,
    batteryEfficiencyWhKm: 1300,
    manufacturingCostUsd: 102000,
    comfortRating: 83,
    reliabilityPct: 93,
    safetyScore: 97,
    compatibilityScore: 90,
    innovationScore: 88,
    carbonFootprintCo2: 30000,
    engineeringComplexityPct: 84,
  }
});

const eicherProEv = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'eicher-pro-ev',
  name: 'Pro 6055 Intelligent EV',
  manufacturer: 'Eicher Trucks',
  category: 'Truck',
  platform: 'Volvo-Eicher joint-tech EV platform',
  batteryType: '550kWh High-Voltage Blade Pack',
  motorType: 'Dual Integrated Intelligent Drive Axles',
  rangeKm: 420,
  weightKg: 12900,
  performanceScore: 90,
  baseSpecs: {
    rangeKm: 420,
    weightKg: 12900,
    accelerationSec: 7.5,
    powerKw: 500,
    batteryEfficiencyWhKm: 1310,
    manufacturingCostUsd: 108000,
    comfortRating: 86,
    reliabilityPct: 96,
    safetyScore: 98,
    compatibilityScore: 93,
    innovationScore: 91,
    carbonFootprintCo2: 31000,
    engineeringComplexityPct: 87,
  }
});

const tataUltraT7Ev = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'tata-ultra-t7-ev',
  name: 'Ultra T.7 Smart Logistics',
  manufacturer: 'Tata Motors',
  category: 'Truck',
  platform: 'Ultra Smart Modular Cargo Frame',
  batteryType: '120kWh LFP Liquid-Cooled Pack',
  motorType: 'Single High-Speed PM Motor',
  rangeKm: 180,
  weightKg: 7400,
  performanceScore: 83,
  baseSpecs: {
    rangeKm: 180,
    weightKg: 7400,
    accelerationSec: 11.5,
    powerKw: 120,
    batteryEfficiencyWhKm: 660,
    manufacturingCostUsd: 42000,
    comfortRating: 79,
    reliabilityPct: 94,
    safetyScore: 95,
    compatibilityScore: 92,
    innovationScore: 82,
    carbonFootprintCo2: 12000,
    engineeringComplexityPct: 75,
  }
});

const ashokLeylandBadaDostEv = createDerivedVehicle(INITIAL_VEHICLES['bmw-i7'], {
  id: 'ashok-leyland-bada-dost-ev',
  name: 'Bada Dost i5 EV Cargo',
  manufacturer: 'Ashok Leyland',
  category: 'Truck',
  platform: 'Dost Smart Cargo Line',
  batteryType: '80kWh Robust Steel Case LFP',
  motorType: 'Single Integrated Traction Motor',
  rangeKm: 150,
  weightKg: 3490,
  performanceScore: 82,
  baseSpecs: {
    rangeKm: 150,
    weightKg: 3490,
    accelerationSec: 12.0,
    powerKw: 80,
    batteryEfficiencyWhKm: 533,
    manufacturingCostUsd: 28000,
    comfortRating: 75,
    reliabilityPct: 95,
    safetyScore: 93,
    compatibilityScore: 94,
    innovationScore: 80,
    carbonFootprintCo2: 8000,
    engineeringComplexityPct: 70,
  }
});

// Mixed Motorcycles (Indian & Foreign)
const ultravioletteF77 = createMotorcycleVehicle({
  id: 'ultraviolette-f77',
  name: 'F77 Mach 2 Recon',
  manufacturer: 'Ultraviolette',
  rangeKm: 323,
  weightKg: 207,
  performanceScore: 94,
  batteryCapacityKwh: 10.3,
  batteryType: 'SRB10 Smart Lithium-Ion Pack',
  motorType: 'Ultraviolette High-Density Axial Flux',
  motorPowerKw: 30,
  transmissionType: 'Direct Chain Drive',
  baseSpecs: {
    accelerationSec: 7.5,
    manufacturingCostUsd: 4800,
    comfortRating: 80,
    reliabilityPct: 92,
    safetyScore: 93,
    carbonFootprintCo2: 1100,
    engineeringComplexityPct: 88,
  }
});

const olaRoadsterPro = createMotorcycleVehicle({
  id: 'ola-roadster-pro',
  name: 'Roadster Pro Superbike',
  manufacturer: 'Ola Electric',
  rangeKm: 579,
  weightKg: 220,
  performanceScore: 96,
  batteryCapacityKwh: 16.0,
  batteryType: 'Ola Solid-State Prototype Pack',
  motorType: 'Ola Ultimate Liquid-Cooled Synchronous',
  motorPowerKw: 52,
  transmissionType: 'Direct Drive Chain',
  baseSpecs: {
    accelerationSec: 2.0,
    manufacturingCostUsd: 5500,
    comfortRating: 78,
    reliabilityPct: 88,
    safetyScore: 92,
    carbonFootprintCo2: 1300,
    engineeringComplexityPct: 92,
  }
});

const matterAera = createMotorcycleVehicle({
  id: 'matter-aera',
  name: 'Aera 5000 Geared EV',
  manufacturer: 'Matter Motor',
  rangeKm: 150,
  weightKg: 169,
  performanceScore: 88,
  batteryCapacityKwh: 5.0,
  batteryType: 'Matter Energy Liquid-Cooled IP67',
  motorType: 'Matter Hyper-Torque Geared PMSM',
  motorPowerKw: 10.5,
  transmissionType: '4-Speed Manual Sequential Gearbox',
  baseSpecs: {
    accelerationSec: 6.0,
    manufacturingCostUsd: 2500,
    comfortRating: 85,
    reliabilityPct: 93,
    safetyScore: 94,
    carbonFootprintCo2: 600,
    engineeringComplexityPct: 85,
  }
});

const revoltRv400 = createMotorcycleVehicle({
  id: 'revolt-rv400',
  name: 'RV400 BRZ Sport',
  manufacturer: 'Revolt Motors',
  rangeKm: 150,
  weightKg: 108,
  performanceScore: 82,
  batteryCapacityKwh: 3.24,
  batteryType: 'Revolt Removable Li-ion Battery',
  motorType: 'Revolt Mid-Drive PM Motor',
  motorPowerKw: 3.0,
  transmissionType: 'Belt Drive System',
  baseSpecs: {
    accelerationSec: 9.5,
    manufacturingCostUsd: 1500,
    comfortRating: 88,
    reliabilityPct: 96,
    safetyScore: 91,
    carbonFootprintCo2: 450,
    engineeringComplexityPct: 65,
  }
});

const damonHypersport = createMotorcycleVehicle({
  id: 'damon-hypersport',
  name: 'HyperSport Premier Edition',
  manufacturer: 'Damon Motorcycles',
  rangeKm: 320,
  weightKg: 205,
  performanceScore: 98,
  batteryCapacityKwh: 20.0,
  batteryType: 'HyperDrive Monocoque Structural Battery',
  motorType: 'PMAC Liquid-Cooled High-RPM Motor',
  motorPowerKw: 150,
  transmissionType: 'Single Speed Chain Drive',
  baseSpecs: {
    accelerationSec: 2.1,
    manufacturingCostUsd: 24000,
    comfortRating: 72,
    reliabilityPct: 89,
    safetyScore: 95,
    carbonFootprintCo2: 2400,
    engineeringComplexityPct: 95,
  }
});

const energicaEgo = createMotorcycleVehicle({
  id: 'energica-ego',
  name: 'Ego+ RS Superbike',
  manufacturer: 'Energica Motor',
  rangeKm: 420,
  weightKg: 260,
  performanceScore: 97,
  batteryCapacityKwh: 21.5,
  batteryType: 'High-Power Long-Life Lithium Polymer',
  motorType: 'Hybrid Synchronous Reluctance Motor (HSM)',
  motorPowerKw: 126,
  transmissionType: 'Single-Speed Direct Drive Gearbox',
  baseSpecs: {
    accelerationSec: 2.6,
    manufacturingCostUsd: 28000,
    comfortRating: 75,
    reliabilityPct: 94,
    safetyScore: 93,
    carbonFootprintCo2: 2600,
    engineeringComplexityPct: 91,
  }
});

const livewireOne = createMotorcycleVehicle({
  id: 'livewire-one',
  name: 'LiveWire One Urban Cruiser',
  manufacturer: 'LiveWire (Harley-Davidson)',
  rangeKm: 235,
  weightKg: 255,
  performanceScore: 92,
  batteryCapacityKwh: 15.4,
  batteryType: 'LiveWire Revelation Lithium-Ion',
  motorType: 'Revelation Internal Permanent Magnet',
  motorPowerKw: 78,
  transmissionType: 'Bevel Gear and Belt Drive',
  baseSpecs: {
    accelerationSec: 3.0,
    manufacturingCostUsd: 16500,
    comfortRating: 84,
    reliabilityPct: 95,
    safetyScore: 94,
    carbonFootprintCo2: 1900,
    engineeringComplexityPct: 86,
  }
});

// Indian Cars
const tataNexonEv = createDerivedVehicle(INITIAL_VEHICLES['tesla-s'], {
  id: 'tata-nexon-ev',
  name: 'Nexon EV Max Red Dark',
  manufacturer: 'Tata Motors',
  category: 'SUV',
  platform: 'Ziptron EV Architecture',
  batteryType: '40.5kWh High-Energy Density LFP',
  motorType: 'Permanent Magnet Synchronous Motor',
  rangeKm: 453,
  weightKg: 1450,
  performanceScore: 88,
  baseSpecs: {
    rangeKm: 453,
    weightKg: 1450,
    accelerationSec: 8.9,
    powerKw: 105,
    batteryEfficiencyWhKm: 110,
    manufacturingCostUsd: 18500,
    comfortRating: 89,
    reliabilityPct: 94,
    safetyScore: 100,
    compatibilityScore: 92,
    innovationScore: 86,
    carbonFootprintCo2: 3800,
    engineeringComplexityPct: 75,
  }
});

const mahindraXuv400 = createDerivedVehicle(INITIAL_VEHICLES['tesla-s'], {
  id: 'mahindra-xuv400',
  name: 'XUV400 EL Pro Sport',
  manufacturer: 'Mahindra',
  category: 'SUV',
  platform: 'MESMA (Mahindra Electric Scalable Modular Architecture)',
  batteryType: '39.4kWh Lithium-Ion NMC Pack',
  motorType: 'High-Performance Permanent Magnet Motor',
  rangeKm: 456,
  weightKg: 1520,
  performanceScore: 87,
  baseSpecs: {
    rangeKm: 456,
    weightKg: 1520,
    accelerationSec: 8.3,
    powerKw: 110,
    batteryEfficiencyWhKm: 115,
    manufacturingCostUsd: 19000,
    comfortRating: 86,
    reliabilityPct: 91,
    safetyScore: 98,
    compatibilityScore: 91,
    innovationScore: 84,
    carbonFootprintCo2: 4100,
    engineeringComplexityPct: 74,
  }
});

const tataCurvvEv = createDerivedVehicle(INITIAL_VEHICLES['tesla-s'], {
  id: 'tata-curvv-ev',
  name: 'Curvv EV Coupe SUV',
  manufacturer: 'Tata Motors',
  category: 'SUV',
  platform: 'acti.ev Advanced Pure EV Platform',
  batteryType: '55kWh Liquid-Cooled Smart LFP',
  motorType: 'High-Efficiency 4-in-1 PMSM',
  rangeKm: 585,
  weightKg: 1650,
  performanceScore: 91,
  baseSpecs: {
    rangeKm: 585,
    weightKg: 1650,
    accelerationSec: 7.4,
    powerKw: 123,
    batteryEfficiencyWhKm: 120,
    manufacturingCostUsd: 24500,
    comfortRating: 91,
    reliabilityPct: 93,
    safetyScore: 100,
    compatibilityScore: 94,
    innovationScore: 91,
    carbonFootprintCo2: 4500,
    engineeringComplexityPct: 82,
  }
});

const mahindraBe05 = createDerivedVehicle(INITIAL_VEHICLES['tesla-s'], {
  id: 'mahindra-be05',
  name: 'BE.05 Born Electric SUV',
  manufacturer: 'Mahindra',
  category: 'SUV',
  platform: 'INGLO Pure EV Platform',
  batteryType: '79kWh LFP Cell-to-Pack High-Rate Battery',
  motorType: 'Volkswagen-sourced High-Power Dual-Motor',
  rangeKm: 500,
  weightKg: 1850,
  performanceScore: 93,
  baseSpecs: {
    rangeKm: 500,
    weightKg: 1850,
    accelerationSec: 5.5,
    powerKw: 250,
    batteryEfficiencyWhKm: 158,
    manufacturingCostUsd: 32000,
    comfortRating: 92,
    reliabilityPct: 90,
    safetyScore: 99,
    compatibilityScore: 93,
    innovationScore: 94,
    carbonFootprintCo2: 5800,
    engineeringComplexityPct: 86,
  }
});

const tataPunchEv = createDerivedVehicle(INITIAL_VEHICLES['tesla-s'], {
  id: 'tata-punch-ev',
  name: 'Punch.ev Empowered Oxide',
  manufacturer: 'Tata Motors',
  category: 'SUV',
  platform: 'acti.ev Pure EV Architecture',
  batteryType: '35kWh Medium Range LFP Pack',
  motorType: 'Permanent Magnet Synchronous Traction Motor',
  rangeKm: 421,
  weightKg: 1340,
  performanceScore: 86,
  baseSpecs: {
    rangeKm: 421,
    weightKg: 1340,
    accelerationSec: 9.5,
    powerKw: 90,
    batteryEfficiencyWhKm: 102,
    manufacturingCostUsd: 15500,
    comfortRating: 87,
    reliabilityPct: 95,
    safetyScore: 100,
    compatibilityScore: 91,
    innovationScore: 85,
    carbonFootprintCo2: 3200,
    engineeringComplexityPct: 72,
  }
});

const pravaigDefy = createDerivedVehicle(INITIAL_VEHICLES['tesla-s'], {
  id: 'pravaig-defy',
  name: 'Defy Hyper-SUV',
  manufacturer: 'Pravaig Dynamics',
  category: 'SUV',
  platform: 'Pravaig Defy Platform',
  batteryType: '90.9kWh High-Safety LFP Pack',
  motorType: 'Dual-Motor AWD Torque-Active Powertrain',
  rangeKm: 504,
  weightKg: 2050,
  performanceScore: 94,
  baseSpecs: {
    rangeKm: 504,
    weightKg: 2050,
    accelerationSec: 4.9,
    powerKw: 300,
    batteryEfficiencyWhKm: 180,
    manufacturingCostUsd: 45000,
    comfortRating: 94,
    reliabilityPct: 89,
    safetyScore: 98,
    compatibilityScore: 92,
    innovationScore: 93,
    carbonFootprintCo2: 8800,
    engineeringComplexityPct: 88,
  }
});

// --- END OF NEW VEHICLES ---

INITIAL_VEHICLES['zero-srf'] = zeroSrf;
INITIAL_VEHICLES['verge-ts-ultra'] = vergeTsUltra;
INITIAL_VEHICLES['lightning-ls218'] = lightningLs218;
INITIAL_VEHICLES['tesla-semi'] = teslaSemi;
INITIAL_VEHICLES['volvo-fh-electric'] = volvoFhElectric;

// Register newly defined vehicles to INITIAL_VEHICLES map
INITIAL_VEHICLES['tata-prima-ev'] = tataPrimaEv;
INITIAL_VEHICLES['ashok-leyland-avtr'] = ashokLeylandAvtr;
INITIAL_VEHICLES['bharatbenz-5528-ev'] = bharatbenz5528Ev;
INITIAL_VEHICLES['mahindra-blazo-ev'] = mahindraBlazoEv;
INITIAL_VEHICLES['eicher-pro-ev'] = eicherProEv;
INITIAL_VEHICLES['tata-ultra-t7-ev'] = tataUltraT7Ev;
INITIAL_VEHICLES['ashok-leyland-bada-dost-ev'] = ashokLeylandBadaDostEv;

INITIAL_VEHICLES['ultraviolette-f77'] = ultravioletteF77;
INITIAL_VEHICLES['ola-roadster-pro'] = olaRoadsterPro;
INITIAL_VEHICLES['matter-aera'] = matterAera;
INITIAL_VEHICLES['revolt-rv400'] = revoltRv400;
INITIAL_VEHICLES['damon-hypersport'] = damonHypersport;
INITIAL_VEHICLES['energica-ego'] = energicaEgo;
INITIAL_VEHICLES['livewire-one'] = livewireOne;

INITIAL_VEHICLES['tata-nexon-ev'] = tataNexonEv;
INITIAL_VEHICLES['mahindra-xuv400'] = mahindraXuv400;
INITIAL_VEHICLES['tata-curvv-ev'] = tataCurvvEv;
INITIAL_VEHICLES['mahindra-be05'] = mahindraBe05;
INITIAL_VEHICLES['tata-punch-ev'] = tataPunchEv;
INITIAL_VEHICLES['pravaig-defy'] = pravaigDefy;

export const COMPONENT_LIBRARY: Record<string, ComponentLibraryOption[]> = {
  'battery': [
    { id: 'lib-bat-solid', name: 'GigaPower Solid State Battery', manufacturer: 'QuantumScape', cost: 28000, weight: 360, trl: 6, compatibilityRating: 78, specs: { capacityKwh: 120, voltage: 900, chemistry: 'Lithium-Metal Solid State', energyDensity: 333, coolingType: 'Advanced Solid Conductive Plate', cycleLife: 2000, dimensions: '1900 x 1200 x 110 mm' } },
    { id: 'lib-bat-lfp', name: 'Blade LFP Cobalt-Free Battery', manufacturer: 'BYD', cost: 9800, weight: 550, trl: 9, compatibilityRating: 92, specs: { capacityKwh: 85, voltage: 400, chemistry: 'Lithium Iron Phosphate', energyDensity: 155, coolingType: 'Bottom Direct Plate liquid', cycleLife: 3000, dimensions: '2100 x 1300 x 130 mm' } },
    { id: 'lib-bat-nmc', name: 'NMC 911 Ultium Cell Pack', manufacturer: 'LG Energy', cost: 17800, weight: 460, trl: 9, compatibilityRating: 88, specs: { capacityKwh: 105, voltage: 450, chemistry: 'Nickel Manganese Cobalt', energyDensity: 245, coolingType: 'Snake Tube Liquid', cycleLife: 1500, dimensions: '2000 x 1250 x 120 mm' } },
    { id: 'lib-bat-na', name: 'SodiMax Sodium-Ion Battery', manufacturer: 'CATL', cost: 6200, weight: 590, trl: 7, compatibilityRating: 84, specs: { capacityKwh: 65, voltage: 320, chemistry: 'Sodium-Ion', energyDensity: 110, coolingType: 'Standard Liquid Chiller', cycleLife: 4000, dimensions: '2100 x 1350 x 140 mm' } }
  ],
  'motor': [
    { id: 'lib-mot-axial', name: 'YASA Axial Flux High-Torque Motor', manufacturer: 'YASA (Mercedes)', cost: 11500, weight: 65, trl: 8, compatibilityRating: 82, specs: { powerKw: 650, torqueNm: 1600, efficiencyPct: 98, maxRpm: 12000, dimensions: 'Diameter 340mm, Width 95mm' } },
    { id: 'lib-mot-pmsm', name: 'Dyson Digital Dual-Stator Motor', manufacturer: 'Dyson Electric', cost: 5800, weight: 95, trl: 9, compatibilityRating: 95, specs: { powerKw: 420, torqueNm: 750, efficiencyPct: 96.5, maxRpm: 19500, dimensions: 'Diameter 380mm, Width 300mm' } },
    { id: 'lib-mot-heavy', name: 'SpaceX Hyper-Drive Core Induction', manufacturer: 'SpaceX Propulsion', cost: 15000, weight: 180, trl: 7, compatibilityRating: 70, specs: { powerKw: 950, torqueNm: 2200, efficiencyPct: 95.8, maxRpm: 24000, dimensions: 'Diameter 420mm, Width 480mm' } }
  ],
  'inverter': [
    { id: 'lib-inv-sic', name: 'EliteSiC Silicon Carbide Inverter', manufacturer: 'onsemi', cost: 2400, weight: 11, trl: 9, compatibilityRating: 96, specs: { efficiencyPct: 99.1, voltage: 800 } },
    { id: 'lib-inv-gan', name: 'GaNFast Ultra-Compact Inverter', manufacturer: 'Navitas', cost: 3200, weight: 7, trl: 8, compatibilityRating: 88, specs: { efficiencyPct: 99.4, voltage: 450 } }
  ],
  'charger': [
    { id: 'lib-chg-v2g', name: 'Delta Bi-Directional V2G Charger', manufacturer: 'Delta Electronics', cost: 1900, weight: 21, trl: 9, compatibilityRating: 94, specs: { powerKw: 22 } },
    { id: 'lib-chg-fast', name: '350kW Extreme Fast Charge Port', manufacturer: 'ABB', cost: 2600, weight: 16, trl: 9, compatibilityRating: 91, specs: { powerKw: 350 } }
  ],
  'transmission': [
    { id: 'lib-trm-2spd', name: 'ZF 2-Speed Torque-Vectoring Gearbox', manufacturer: 'ZF Group', cost: 2900, weight: 44, trl: 9, compatibilityRating: 89, specs: { efficiencyPct: 96.8 } },
    { id: 'lib-trm-single', name: 'BorgWarner High-Speed Coaxial Reducer', manufacturer: 'BorgWarner', cost: 1300, weight: 29, trl: 9, compatibilityRating: 97, specs: { efficiencyPct: 97.4 } }
  ],
  'front-suspension': [
    { id: 'lib-fs-wishbone', name: 'Multi-Chamber Active Wishbone Air Air', manufacturer: 'Porsche Engineering', cost: 2100, weight: 40, trl: 9, compatibilityRating: 93, specs: { type: 'Active Double Wishbone Air' } },
    { id: 'lib-fs-macpherson', name: 'Lightweight Extruded Aluminum Struts', manufacturer: 'Bilstein', cost: 1100, weight: 28, trl: 9, compatibilityRating: 96, specs: { type: 'MacPherson Air Strut' } }
  ],
  'rear-suspension': [
    { id: 'lib-rs-steer', name: '5-Link Active Rear Axle Steering', manufacturer: 'ZF Group', cost: 3400, weight: 55, trl: 9, compatibilityRating: 91, specs: { type: 'Multi-link Rear Steering' } },
    { id: 'lib-rs-multilink', name: 'High-Strength Tubular Multi-Link', manufacturer: 'Multimatic', cost: 1600, weight: 46, trl: 9, compatibilityRating: 95, specs: { type: 'Independent 5-Link' } }
  ],
  'shock-absorbers': [
    { id: 'lib-sa-clearmotion', name: 'ClearMotion Active Electromagnetic Actuator', manufacturer: 'ClearMotion', cost: 4800, weight: 22, trl: 8, compatibilityRating: 84, specs: { responseTimeMs: 1, powerUsageKw: 2 } },
    { id: 'lib-sa-magnetic', name: 'MagneRide 4.0 Pro Intelligent Dampers', manufacturer: 'BWI Group', cost: 2100, weight: 16, trl: 9, compatibilityRating: 95, specs: { responseTimeMs: 6, powerUsageKw: 0.1 } }
  ],
  'tyres': [
    { id: 'lib-tyr-airless', name: 'Uptis Airless puncture-proof tyres', manufacturer: 'Michelin', cost: 2200, weight: 44, trl: 7, compatibilityRating: 86, specs: { dimensions: '245/45 R20', material: 'Resin-embedded Fiberglass Compound' } },
    { id: 'lib-tyr-pirelli', name: 'Pirelli P-Zero Cyber Tyre (Smart Sensor)', manufacturer: 'Pirelli', cost: 1600, weight: 34, trl: 9, compatibilityRating: 96, specs: { dimensions: '295/35 R21', material: 'Premium Performance Rubber with Integrated RFID BLE chip' } }
  ],
  'rim-size': [
    { id: 'lib-rim-forged', name: '21" Forged Magnesium Aero Rims', manufacturer: 'BBS Wheels', cost: 2900, weight: 32, trl: 9, compatibilityRating: 92, specs: { diameter: '21 inch', material: 'Forged Magnesium Alloy' } },
    { id: 'lib-rim-carbon', name: '20" Ultra-Light Carbon Fiber Weave', manufacturer: 'Dymag', cost: 4800, weight: 22, trl: 8, compatibilityRating: 85, specs: { diameter: '20 inch', material: 'Carbon Fiber Composite' } }
  ],
  'braking-system': [
    { id: 'lib-brk-carboceramic', name: 'Carbon Ceramic Brembo Track Suite', manufacturer: 'Brembo', cost: 8800, weight: 16, trl: 9, compatibilityRating: 87, specs: { caliperType: '6-Piston Monobloc', rotorMaterial: 'Carbon-Silicon Carbide' } },
    { id: 'lib-brk-electro', name: 'Electro-Hydraulic Brake-by-Wire Hub', manufacturer: 'Bosch', cost: 2600, weight: 24, trl: 9, compatibilityRating: 96, specs: { responseTimeMs: 45, energyRecoveryPct: 98 } }
  ],
  'ecu': [
    { id: 'lib-ecu-orin', name: 'NVIDIA DRIVE Orin Compute Platform', manufacturer: 'NVIDIA', cost: 4200, weight: 3, trl: 9, compatibilityRating: 91, specs: { computeTflops: 254, powerUsageW: 45 } },
    { id: 'lib-ecu-ride', name: 'Snapdragon Ride Flex Cockpit SoC', manufacturer: 'Qualcomm', cost: 3500, weight: 2, trl: 8, compatibilityRating: 94, specs: { computeTflops: 180, powerUsageW: 30 } }
  ],
  'wiring-harness': [
    { id: 'lib-wh-ribbon', name: 'Low-Mass 48V Bus Ribbon Harness', manufacturer: 'Yazaki', cost: 1100, weight: 18, trl: 9, compatibilityRating: 95, specs: { material: 'Flat Aluminum Ribbon', voltageRating: '48V' } },
    { id: 'lib-wh-shielded', name: 'High-Voltage Multi-Layer Shielded Loom', manufacturer: 'Leoni', cost: 2300, weight: 42, trl: 9, compatibilityRating: 91, specs: { material: 'Shielded Pure Copper', voltageRating: '800V' } }
  ],
  'can-bus': [
    { id: 'lib-can-fd', name: 'Triple-Redundant CAN FD Loop', manufacturer: 'Vector', cost: 500, weight: 1, trl: 9, compatibilityRating: 99, specs: { dataRateMbps: 8 } },
    { id: 'lib-can-flex', name: 'FlexRay Automotive Cluster Controller', manufacturer: 'NXP', cost: 800, weight: 1, trl: 9, compatibilityRating: 93, specs: { dataRateMbps: 10 } }
  ],
  'ethernet-network': [
    { id: 'lib-eth-gigabit', name: 'Gigabit Automotive Ethernet Loop', manufacturer: 'Broadcom', cost: 1100, weight: 2, trl: 9, compatibilityRating: 96, specs: { bandwidthGbps: 1 } },
    { id: 'lib-eth-optical', name: 'Multi-Gigabit Optical Fiber Backbone', manufacturer: 'Corning', cost: 2400, weight: 1, trl: 8, compatibilityRating: 84, specs: { bandwidthGbps: 10 } }
  ],
  'camera': [
    { id: 'lib-cam-8mp', name: 'Sony IMX 8MP UHD Vision Suite', manufacturer: 'Sony', cost: 1400, weight: 2, trl: 9, compatibilityRating: 94, specs: { resolution: '8MP', framesPerSecond: 60 } },
    { id: 'lib-cam-thermal', name: 'Teledyne FLIR Thermal Night Vision Cam', manufacturer: 'Teledyne FLIR', cost: 3100, weight: 3, trl: 8, compatibilityRating: 88, specs: { resolution: 'VGA Thermal', fieldOfView: '75 deg' } }
  ],
  'radar': [
    { id: 'lib-rad-mill', name: 'Arbe Phoenix Millimeter 4D Imaging Radar', manufacturer: 'Arbe Robotics', cost: 1900, weight: 1.5, trl: 8, compatibilityRating: 90, specs: { sensorRange: '300m', fieldOfView: '100x30 degrees', channels: '2304 virtual channels' } },
    { id: 'lib-rad-standard', name: 'Bosch Premium 5th-Gen Mid-Range Radar', manufacturer: 'Bosch', cost: 850, weight: 0.8, trl: 9, compatibilityRating: 98, specs: { sensorRange: '210m', fieldOfView: '90 degrees', channels: '12 virtual channels' } }
  ],
  'lidar': [
    { id: 'lib-lid-luminar', name: 'Luminar Iris 1550nm Long-Range LiDAR', manufacturer: 'Luminar Technologies', cost: 3800, weight: 3.2, trl: 9, compatibilityRating: 84, specs: { sensorRange: '500m', fieldOfView: '120x30 degrees', laserType: '1550nm Eye-safe Laser' } },
    { id: 'lib-lid-hesai', name: 'Hesai Pandar 128-Channel Spinning LiDAR', manufacturer: 'Hesai Technology', cost: 5500, weight: 4.8, trl: 9, compatibilityRating: 75, specs: { sensorRange: '250m', fieldOfView: '360x40 degrees', laserType: '905nm Laser Array' } }
  ],
  'ultrasonic-sensors': [
    { id: 'lib-us-sonar', name: '12-Sensor Close Range Sonar Grid', manufacturer: 'Valeo', cost: 450, weight: 2, trl: 9, compatibilityRating: 98, specs: { responseTimeMs: 12, rangeMeters: 5 } },
    { id: 'lib-us-radar', name: 'Solid-State Micro-Radar Parking Suite', manufacturer: 'Bosch', cost: 1100, weight: 1, trl: 8, compatibilityRating: 89, specs: { responseTimeMs: 4, rangeMeters: 8 } }
  ],
  'gps': [
    { id: 'lib-gps-rtk', name: 'High-Precision RTK Carrier GPS', manufacturer: 'Trimble', cost: 750, weight: 1, trl: 9, compatibilityRating: 95, specs: { precisionCm: 2 } },
    { id: 'lib-gps-gnss', name: 'Dual-Band GNSS + Galileo dead reckoning', manufacturer: 'u-blox', cost: 400, weight: 1, trl: 9, compatibilityRating: 98, specs: { precisionCm: 30 } }
  ],
  'driver-monitoring': [
    { id: 'lib-dm-ir', name: 'Cabin IR Eye Tracker & Cognitive Assess', manufacturer: 'Seeing Machines', cost: 550, weight: 1, trl: 9, compatibilityRating: 96, specs: { trackingFrequencyHz: 60 } },
    { id: 'lib-dm-cap', name: 'Steering Wheel Touch-Capacitive sensor', manufacturer: 'Continental', cost: 250, weight: 1, trl: 9, compatibilityRating: 98, specs: { sensingPoints: 8 } }
  ],
  'displays': [
    { id: 'lib-dsp-pillar', name: 'MBUX Hyperscreen Pillar-to-Pillar OLED', manufacturer: 'LG Display', cost: 4800, weight: 24, trl: 9, compatibilityRating: 80, specs: { resolution: '8K Ultra HD Span', dimensions: '1410 mm width', panelType: 'Active-Matrix OLED Glass' } },
    { id: 'lib-dsp-hud', name: 'Deep-3D Holographic Laser AR HUD', manufacturer: 'Envisics', cost: 3100, weight: 6, trl: 8, compatibilityRating: 88, specs: { resolution: 'Custom Holographic Projection', dimensions: 'Dual-focal plane projection (2.5m and 10m)', panelType: 'Spatial Light Modulator Laser' } }
  ],
  'seats': [
    { id: 'lib-st-recaro', name: 'Recaro Ergo-Active 22-Way Pneumatic', manufacturer: 'Recaro', cost: 3800, weight: 62, trl: 9, compatibilityRating: 92, specs: { massageModes: 8, heatingVentPct: 100 } },
    { id: 'lib-st-light', name: 'Sustainable Lightweight Recycled Mesh', manufacturer: 'Tesla Textiles', cost: 1800, weight: 32, trl: 9, compatibilityRating: 96, specs: { massageModes: 0, heatingVentPct: 80 } }
  ],
  'steering': [
    { id: 'lib-str-sbw', name: 'Steer-by-Wire Variable Ratio Yoke', manufacturer: 'Toyota/Lexus', cost: 1900, weight: 9, trl: 8, compatibilityRating: 85, specs: { lockToLockTurns: 'Variable (0.4 to 1.2)' } },
    { id: 'lib-str-classic', name: 'GT Alcantara Classic Sport Wheel', manufacturer: 'Porsche Design', cost: 1000, weight: 6, trl: 9, compatibilityRating: 97, specs: { lockToLockTurns: 'Fixed (2.2)' } }
  ],
  'buttons': [
    { id: 'lib-btn-context', name: 'OLED Smart Contextual Smart Buttons', manufacturer: 'Razer', cost: 550, weight: 1, trl: 8, compatibilityRating: 88, specs: { dynamicScreens: 6 } },
    { id: 'lib-btn-haptic', name: 'Solid-State Haptic Glass Panel Unit', manufacturer: 'Bosch', cost: 350, weight: 1, trl: 9, compatibilityRating: 96, specs: { dynamicScreens: 0 } }
  ],
  'hvac': [
    { id: 'lib-hvac-hepa', name: 'Bioweapon Defense HEPA Filtration', manufacturer: 'Sanden', cost: 1700, weight: 36, trl: 9, compatibilityRating: 93, specs: { airExchangeRateM3Min: 12 } },
    { id: 'lib-hvac-smart', name: 'Multi-Zone Energy-Saving Micro-HVAC', manufacturer: 'Denso', cost: 1100, weight: 26, trl: 9, compatibilityRating: 97, specs: { airExchangeRateM3Min: 8 } }
  ],
  'infotainment': [
    { id: 'lib-info-ryzen', name: 'AMD Ryzen Embedded V2000 Console', manufacturer: 'AMD', cost: 1400, weight: 3, trl: 9, compatibilityRating: 93, specs: { graphicComputeTflops: 10.2 } },
    { id: 'lib-info-mseries', name: 'M-Series High-Performance Car Chip', manufacturer: 'Apple', cost: 2600, weight: 2, trl: 8, compatibilityRating: 82, specs: { graphicComputeTflops: 14.8 } }
  ],
  'headlights': [
    { id: 'lib-hl-laser', name: 'Laser-Matrix Long-Range Projection', manufacturer: 'ZKW Group', cost: 2700, weight: 8, trl: 9, compatibilityRating: 91, specs: { illuminationRangeM: 600 } },
    { id: 'lib-hl-led', name: 'High-Efficiency Adaptive Matrix LED', manufacturer: 'Hella', cost: 1300, weight: 6, trl: 9, compatibilityRating: 96, specs: { illuminationRangeM: 350 } }
  ],
  'tail-lights': [
    { id: 'lib-tl-oled', name: 'Holographic OLED Floating Lightbar', manufacturer: 'Magneti Marelli', cost: 1100, weight: 4, trl: 9, compatibilityRating: 94, specs: { pixelCount: 240 } },
    { id: 'lib-tl-slim', name: 'Minimalist High-Contrast LED Strip', manufacturer: 'Hella', cost: 550, weight: 3, trl: 9, compatibilityRating: 98, specs: { pixelCount: 60 } }
  ],
  'doors': [
    { id: 'lib-dr-hydraulic', name: 'Comfort-Close Hydraulic Portals', manufacturer: 'Porsche Design', cost: 2400, weight: 72, trl: 9, compatibilityRating: 91, specs: { mechanism: 'Electro-Hydraulic' } },
    { id: 'lib-dr-gullwing', name: 'Lightweight Aero Gullwing Actuators', manufacturer: 'Tesla Engineering', cost: 3600, weight: 92, trl: 8, compatibilityRating: 79, specs: { mechanism: 'Electric dual-hinge' } }
  ],
  'chassis-material': [
    { id: 'lib-cm-carbon', name: 'Carbon Fiber Reinforced Polymer Monocoque', manufacturer: 'SGL Carbon', cost: 16000, weight: 195, trl: 9, compatibilityRating: 75, specs: { material: 'CFRP & Epoxy Matrix', tensileStrengthMpa: 3500, torsionalRigidityNmDeg: 42000 } },
    { id: 'lib-cm-titanium', name: 'Titanium-Reinforced Aluminum Cast Spaceframe', manufacturer: 'Alcoa', cost: 11000, weight: 260, trl: 8, compatibilityRating: 88, specs: { material: 'AA6082 & Grade 5 Titanium inserts', tensileStrengthMpa: 850, torsionalRigidityNmDeg: 34000 } }
  ],
  'body-panels': [
    { id: 'lib-bp-aerospace', name: 'Super-Formed Aerospace Grade Panels', manufacturer: 'Alcoa', cost: 4400, weight: 80, trl: 9, compatibilityRating: 94, specs: { CdFactor: 0.208 } },
    { id: 'lib-bp-carbon', name: 'Dry Carbon Fiber Exterior Skin Shell', manufacturer: 'SGL Carbon', cost: 7800, weight: 42, trl: 9, compatibilityRating: 83, specs: { CdFactor: 0.205 } }
  ],
  'battery-cooling': [
    { id: 'lib-bc-phase', name: 'PCM Phase Change Thermal Absorption System', manufacturer: 'Outlast Technologies', cost: 3400, weight: 32, trl: 7, compatibilityRating: 85, specs: { coolingType: 'Phase Change Material & Fluid Micro-channels', coolingCapacityKw: 15 } },
    { id: 'lib-bc-refrig', name: 'Direct-Refrigerant Cooling loop', manufacturer: 'Denso', cost: 2200, weight: 21, trl: 9, compatibilityRating: 92, specs: { coolingType: 'R1234yf Direct Expansion Chiller Plates', coolingCapacityKw: 12 } }
  ],
  'motor-cooling': [
    { id: 'lib-mc-rotor', name: 'Direct Rotor Internal Oil Chiller', manufacturer: 'Mahle', cost: 1300, weight: 10, trl: 9, compatibilityRating: 93, specs: { coolingCapacityKw: 6 } },
    { id: 'lib-mc-stator', name: 'Stator Water-Glycol Dual-Jacket Loop', manufacturer: 'Modine', cost: 850, weight: 14, trl: 9, compatibilityRating: 96, specs: { coolingCapacityKw: 4 } }
  ],
  'heat-pump': [
    { id: 'lib-hp-octovalve', name: 'Octovalve 8-way Thermal Distribution', manufacturer: 'Tesla Thermal', cost: 2400, weight: 26, trl: 9, compatibilityRating: 94, specs: { thermalLoops: 8 } },
    { id: 'lib-hp-varflow', name: 'Variable-Flow Automated Heat Pump', manufacturer: 'Denso', cost: 1950, weight: 30, trl: 9, compatibilityRating: 97, specs: { thermalLoops: 4 } }
  ],
  'cooling-pipes': [
    { id: 'lib-cp-nylon', name: 'Nylon 12 Low-Permeation Coolant Lines', manufacturer: 'Continental', cost: 550, weight: 9, trl: 9, compatibilityRating: 98, specs: { material: 'Thermoplastic Nylon-12' } },
    { id: 'lib-cp-braided', name: 'Braided Stainless High-Temp Hose Suite', manufacturer: 'Goodridge', cost: 1100, weight: 13, trl: 9, compatibilityRating: 92, specs: { material: 'PTFE inner with SS braid' } }
  ],
  'chassis-design': [
    { id: 'lib-cd-giga', name: 'Integrated Front & Rear Megacasting Design', manufacturer: 'Tesla Casting', cost: 4100, weight: 0, trl: 9, compatibilityRating: 93, specs: { castParts: 2 } },
    { id: 'lib-cd-spaceframe', name: 'Multi-Material Extruded Node Spaceframe', manufacturer: 'Audi', cost: 5200, weight: 0, trl: 9, compatibilityRating: 89, specs: { castParts: 14 } }
  ],
  'welding-process': [
    { id: 'lib-wp-friction', name: 'Automated Friction Stir Spot Welding', manufacturer: 'Kuka Robotics', cost: 2200, weight: 0, trl: 9, compatibilityRating: 95, specs: { laserAccuracyMm: 0.1 } },
    { id: 'lib-wp-cnc', name: 'High-Precision CNC Laser Joint Fusing', manufacturer: 'IPG Photonics', cost: 3400, weight: 0, trl: 9, compatibilityRating: 92, specs: { laserAccuracyMm: 0.02 } }
  ],
  'assembly-method': [
    { id: 'lib-am-unboxed', name: 'Unboxed Modular Parallel Flow Assembly', manufacturer: 'Tesla Gigafactory', cost: 3600, weight: 0, trl: 8, compatibilityRating: 89, specs: { assemblyStepsCount: 40 } },
    { id: 'lib-am-sequential', name: 'Sequential Synchronized Production Line', manufacturer: 'Kuka Robotics', cost: 2600, weight: 0, trl: 9, compatibilityRating: 97, specs: { assemblyStepsCount: 120 } }
  ],
  'materials': [
    { id: 'lib-mat-hybrid', name: 'Bamboo-Composites & Recycled Aluminum', manufacturer: 'Hydro', cost: 3000, weight: 0, trl: 9, compatibilityRating: 95, specs: { recyclingPct: 85 } },
    { id: 'lib-mat-scandium', name: 'Lightweight Titanium-Scandium Alloys', manufacturer: 'Alcoa', cost: 5800, weight: 0, trl: 8, compatibilityRating: 86, specs: { recyclingPct: 20 } }
  ],
  'manufacturing-process': [
    { id: 'lib-mp-servo', name: 'High-Speed Automated Servo Stamping Line', manufacturer: 'Schuler', cost: 4800, weight: 0, trl: 9, compatibilityRating: 96, specs: { pressForceTons: 9100 } },
    { id: 'lib-mp-idra', name: 'High-Tonnage GigaPress Casting Line', manufacturer: 'Idra Group', cost: 7200, weight: 0, trl: 9, compatibilityRating: 91, specs: { pressForceTons: 12000 } }
  ]
};

export const VEHICLE_COMPONENTS_METADATA: Record<string, { label: string; coords: { x: number; y: number; r: number } }> = {
  'battery': { label: 'Battery Pack', coords: { x: 380, y: 150, r: 65 } },
  'motor': { label: 'Electric Motor', coords: { x: 550, y: 150, r: 35 } },
  'inverter': { label: 'Inverter', coords: { x: 550, y: 90, r: 25 } },
  'charger': { label: 'Charger Port', coords: { x: 640, y: 100, r: 15 } },
  'transmission': { label: 'Planetary Gearbox', coords: { x: 550, y: 210, r: 25 } },
  'front-suspension': { label: 'Front Suspension', coords: { x: 210, y: 80, r: 30 } },
  'rear-suspension': { label: 'Rear Suspension', coords: { x: 550, y: 80, r: 30 } },
  'shock-absorbers': { label: 'Predictive Dampers', coords: { x: 210, y: 220, r: 20 } },
  'tyres': { label: 'High Performance Tyres', coords: { x: 210, y: 300, r: 40 } },
  'rim-size': { label: 'Alloy Wheels', coords: { x: 210, y: 300, r: 25 } },
  'braking-system': { label: 'Ceramic/Steel Brakes', coords: { x: 210, y: 270, r: 20 } },
  'ecu': { label: 'Autonomous ECU', coords: { x: 290, y: 95, r: 25 } },
  'wiring-harness': { label: 'Wiring Harness', coords: { x: 380, y: 95, r: 45 } },
  'can-bus': { label: 'CAN FD / FlexRay Network', coords: { x: 380, y: 110, r: 5 } },
  'ethernet-network': { label: 'Automotive Ethernet Loop', coords: { x: 380, y: 80, r: 5 } },
  'camera': { label: 'HD Vision Suite', coords: { x: 190, y: 150, r: 15 } },
  'radar': { label: 'Phoenix 4D Radar', coords: { x: 160, y: 150, r: 15 } },
  'lidar': { label: 'Valeo Laser Scanner', coords: { x: 230, y: 150, r: 15 } },
  'ultrasonic-sensors': { label: 'Parking Sonar Grid', coords: { x: 150, y: 110, r: 10 } },
  'gps': { label: 'Dual-Band GNSS Antenna', coords: { x: 420, y: 70, r: 12 } },
  'driver-monitoring': { label: 'Cabin Eye Tracker', coords: { x: 320, y: 125, r: 10 } },
  'displays': { label: 'OLED Cinema Touchscreen', coords: { x: 310, y: 150, r: 35 } },
  'seats': { label: 'Active Memory Seats', coords: { x: 360, y: 150, r: 40 } },
  'steering': { label: 'Steering Wheel/Yoke', coords: { x: 300, y: 160, r: 20 } },
  'buttons': { label: 'Physical/Haptic Controls', coords: { x: 300, y: 180, r: 8 } },
  'hvac': createComponent('hvac', 'Air filtration HVAC', 'HVAC', 'Interior', 'Valeo', 1000, 30, 9).id ? { label: 'HEPA HVAC Module', coords: { x: 270, y: 150, r: 25 } } : { label: 'HEPA HVAC Module', coords: { x: 270, y: 150, r: 25 } },
  'infotainment': { label: 'AMD/Intel Compute Processor', coords: { x: 320, y: 100, r: 15 } },
  'headlights': { label: 'HD Matrix LED Projectors', coords: { x: 160, y: 60, r: 15 } },
  'tail-lights': { label: 'Seamless Rear Lightbar', coords: { x: 620, y: 150, r: 15 } },
  'doors': { label: 'Self-Presenting Doors', coords: { x: 380, y: 220, r: 60 } },
  'chassis-material': { label: 'Structural Mega-Cast Frame', coords: { x: 380, y: 150, r: 140 } },
  'body-panels': { label: 'Aerodynamic Body Panels', coords: { x: 380, y: 150, r: 150 } },
  'battery-cooling': { label: 'Battery Heat Exchangers', coords: { x: 380, y: 160, r: 50 } },
  'motor-cooling': { label: 'Stator Jacket Fluid Loop', coords: { x: 550, y: 160, r: 25 } },
  'heat-pump': { label: 'Intelligent Heat Pump', coords: { x: 250, y: 150, r: 25 } },
  'cooling-pipes': { label: 'Braided Coolant Distribution Lines', coords: { x: 380, y: 150, r: 90 } },
};
