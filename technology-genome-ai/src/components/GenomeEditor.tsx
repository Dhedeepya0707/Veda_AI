/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Settings, ChevronDown, ChevronRight, Layers, Sliders, Play, Cpu,
  Search, Info, Check, ShieldCheck, HelpCircle, Activity, Merge, GitMerge, FileCheck,
  RotateCcw, Trash2, X, Bookmark, Minus, Plus, Gauge, Scissors, Wrench
} from 'lucide-react';
import { VehicleModel, EngineeringComponent, ComponentLibraryOption, AIAnalysisResult, SavedVersion, BaseSpecs } from '../types';
import { COMPONENT_LIBRARY, INITIAL_VEHICLES } from '../data/vehicles';
import VehicleVisualizer from './VehicleVisualizer';
import DependencyGraph from './DependencyGraph';
import DesignCompare from './DesignCompare';
import VersionTimeline from './VersionTimeline';

interface GenomeEditorProps {
  vehicle: VehicleModel;
  onBack: () => void;
  onAddModificationLog: (log: { vehicleName: string; componentName: string; timestamp: string; type: string }) => void;
  onSaveDesign: (name: string, description: string, components: Record<string, EngineeringComponent>, specs: BaseSpecs) => void;
}

// Group definitions for the left panel explorer
const CATEGORY_GROUPS = [
  {
    name: 'Powertrain',
    items: ['battery', 'motor', 'inverter', 'charger', 'transmission']
  },
  {
    name: 'Suspension',
    items: ['front-suspension', 'rear-suspension', 'shock-absorbers']
  },
  {
    name: 'Wheels & Brakes',
    items: ['tyres', 'rim-size', 'braking-system']
  },
  {
    name: 'Electronics',
    items: ['ecu', 'wiring-harness', 'can-bus', 'ethernet-network']
  },
  {
    name: 'ADAS & Autonomous',
    items: ['camera', 'radar', 'lidar', 'ultrasonic-sensors', 'gps', 'driver-monitoring']
  },
  {
    name: 'Interior',
    items: ['displays', 'seats', 'steering', 'buttons', 'hvac', 'infotainment']
  },
  {
    name: 'Exterior',
    items: ['headlights', 'tail-lights', 'doors', 'chassis-material', 'body-panels']
  },
  {
    name: 'Thermal Systems',
    items: ['battery-cooling', 'motor-cooling', 'heat-pump', 'cooling-pipes']
  },
  {
    name: 'Manufacturing & Process',
    items: ['chassis-design', 'welding-process', 'assembly-method', 'materials', 'manufacturing-process']
  }
];

const SPEC_CONFIGS: Record<string, { label: string; min: number; max: number; step: number; unit: string }> = {
  capacityKwh: { label: 'Battery Capacity', min: 10, max: 250, step: 0.5, unit: 'kWh' },
  powerKw: { label: 'Peak Power', min: 20, max: 1500, step: 5, unit: 'kW' },
  torqueNm: { label: 'Peak Torque', min: 50, max: 2500, step: 5, unit: 'Nm' },
  voltage: { label: 'System Voltage', min: 48, max: 1000, step: 4, unit: 'V' },
  efficiencyPct: { label: 'Efficiency', min: 50, max: 100, step: 0.5, unit: '%' },
  weight: { label: 'Weight', min: 1, max: 1500, step: 1, unit: 'kg' },
  cost: { label: 'Cost Index', min: 50, max: 75000, step: 50, unit: 'USD' },
  cycleLife: { label: 'Cycle Life', min: 100, max: 15000, step: 50, unit: 'cycles' },
  energyDensity: { label: 'Energy Density', min: 50, max: 800, step: 5, unit: 'Wh/kg' },
  trl: { label: 'TRL Level', min: 1, max: 9, step: 1, unit: 'TRL' }
};

const CRISPR_STEPS = [
  'SYNTHESIZING CUSTOM SGRNA TARGETING SEQUENCES...',
  'BINDING CAS9 ENDONUCLEASE COMPLEX TO TARGET DNA SEGMENT...',
  'CLEAVING DOUBLE-STRAND CHROMOSOME AT SPECIFIED SPECS GENE LOCUS...',
  'EXCISING BASELINE COMPONENT GENETIC BLUEPRINT...',
  'DONATING AND SPLICING CUSTOM RECOMBINANT COMPONENT GENOME...',
  'CONFIRMING RECOMBINANT MUTATION & RE-LIGATING DNA CHAINS...'
];

interface VernierDialProps {
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: number) => void;
  onFinish: () => void;
}

function VernierDial({
  value,
  min,
  max,
  step,
  unit,
  onChange,
  onFinish
}: VernierDialProps) {
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startValueRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startValueRef.current = value;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const steps = Math.round(deltaX / 6);
    const deltaValue = steps * step;
    const rawVal = startValueRef.current + deltaValue;
    const clampedVal = Math.min(max, Math.max(min, rawVal));
    const finalVal = Math.round(clampedVal / step) * step;
    onChange(finalVal);
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      onFinish();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const dir = e.deltaY > 0 ? -1 : 1;
    const deltaValue = dir * step;
    const clampedVal = Math.min(max, Math.max(min, value + deltaValue));
    const finalVal = Math.round(clampedVal / step) * step;
    onChange(finalVal);
    onFinish();
  };

  const totalTicks = 35;
  const ticks = [];
  for (let i = 0; i < totalTicks; i++) {
    const offset = i - 17;
    const tickValue = value + offset * step;
    const isValid = tickValue >= min && tickValue <= max;
    ticks.push({ offset, isValid, isMajor: offset % 5 === 0 });
  }

  return (
    <div className="space-y-1.5 select-none">
      <div
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        className="relative h-12 bg-black/80 rounded border border-white/10 cursor-ew-resize flex flex-col justify-between overflow-hidden py-1"
      >
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none flex justify-center items-center">
          <div className="w-0.5 h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)] relative z-10">
            <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-blue-500" />
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-blue-500" />
          </div>
        </div>

        <div className="flex justify-between items-end px-3 w-full h-7 relative overflow-hidden">
          {ticks.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center"
              style={{
                opacity: t.isValid ? Math.max(0.1, 1 - Math.abs(t.offset) / 17) : 0.02
              }}
            >
              {t.isMajor && t.isValid && (
                <span className="text-[6.5px] font-mono text-slate-400 mb-0.5 scale-75">
                  {Math.round((value + t.offset * step) * 10) / 10}
                </span>
              )}
              <div
                className={`w-[1px] ${
                  t.offset === 0
                    ? 'h-3.5 bg-blue-400'
                    : t.isMajor
                    ? 'h-2.5 bg-slate-500'
                    : 'h-1.5 bg-slate-700'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-between px-2 text-[6px] font-mono text-slate-500 uppercase tracking-widest pt-0.5 border-t border-white/5">
          <span>{min} {unit}</span>
          <span className="text-blue-500/70 font-bold">DRAG OR SCROLL DIAL</span>
          <span>{max} {unit}</span>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-2 bg-black/50 border border-white/5 rounded p-1">
        <button
          onClick={() => {
            const nv = Math.max(min, value - step);
            onChange(Math.round(nv / step) * step);
            onFinish();
          }}
          disabled={value <= min}
          className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 text-slate-400 hover:text-slate-200 cursor-pointer transition-all"
        >
          <Minus className="w-3 h-3" />
        </button>

        <div className="flex items-baseline justify-center space-x-1 font-mono">
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const nv = Number(e.target.value);
              if (!isNaN(nv)) {
                const clamped = Math.min(max, Math.max(min, nv));
                onChange(clamped);
              }
            }}
            onBlur={() => onFinish()}
            className="w-16 bg-transparent border-b border-white/10 hover:border-white/20 focus:border-blue-500 focus:outline-none text-center font-bold text-[11px] text-slate-100"
            step={step}
            min={min}
            max={max}
          />
          <span className="text-[8px] text-slate-500 uppercase">{unit}</span>
        </div>

        <button
          onClick={() => {
            const nv = Math.min(max, value + step);
            onChange(Math.round(nv / step) * step);
            onFinish();
          }}
          disabled={value >= max}
          className="p-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 text-slate-400 hover:text-slate-200 cursor-pointer transition-all"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default function GenomeEditor({
  vehicle,
  onBack,
  onAddModificationLog,
  onSaveDesign
}: GenomeEditorProps) {
  // Workspace States
  const [activeTab, setActiveTab] = useState<'design' | 'dependencies' | 'compare' | 'versions' | 'merge'>('design');
  const [components, setComponents] = useState<Record<string, EngineeringComponent>>({ ...vehicle.components });
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  
  const [selectedTuningParam, setSelectedTuningParam] = useState<string | null>(null);
  const analysisDebounceRef = useRef<any>(null);

  // Custom component builder states
  const [customBuilderKey, setCustomBuilderKey] = useState<string | null>(null);
  const [customName, setCustomName] = useState('');
  const [customManufacturer, setCustomManufacturer] = useState('Custom Biotech Lab');

  // Custom specs states depending on category:
  // Battery
  const [batteryChemistry, setBatteryChemistry] = useState('Solid-State Quantum');
  const [batteryCapacity, setBatteryCapacity] = useState(100);
  const [batteryVoltage, setBatteryVoltage] = useState(800);
  const [batteryDensity, setBatteryDensity] = useState(350);
  const [batteryCycleLife, setBatteryCycleLife] = useState(5000);

  // Motor
  const [motorType, setMotorType] = useState('Permanent Magnet Synchronous');
  const [motorPower, setMotorPower] = useState(500);
  const [motorTorque, setMotorTorque] = useState(650);
  const [motorRpm, setMotorRpm] = useState(18000);
  const [motorEfficiency, setMotorEfficiency] = useState(96);

  // Charger
  const [chargerComposition, setChargerComposition] = useState('Silicon Carbide (SiC)');
  const [chargerPower, setChargerPower] = useState(250);

  // General fallback components
  const [generalComposition, setGeneralComposition] = useState('Advanced Carbon Matrix');
  const [generalWeight, setGeneralWeight] = useState(50);
  const [generalCost, setGeneralCost] = useState(2500);
  const [generalTrl, setGeneralTrl] = useState(8);

  // CRISPR Molecular Editing state
  const [crisprEditingTask, setCrisprEditingTask] = useState<{
    key: string;
    name: string;
    targetComponentKey: string;
    steps: string[];
    currentStepIndex: number;
    payload: EngineeringComponent;
  } | null>(null);

  // Pre-populate custom component builder fields based on current baseline component
  useEffect(() => {
    if (customBuilderKey) {
      const activeItem = components[customBuilderKey];
      if (activeItem) {
        setCustomName(`Bespoke ${activeItem.category || customBuilderKey}`);
        setCustomManufacturer('Bespoke Genetic Lab');
        
        if (customBuilderKey === 'battery') {
          setBatteryChemistry(activeItem.spec?.chemistry || 'Solid-State Quantum');
          setBatteryCapacity(activeItem.spec?.capacityKwh || 100);
          setBatteryVoltage(activeItem.spec?.voltage || 800);
          setBatteryDensity(activeItem.spec?.energyDensity || 320);
          setBatteryCycleLife(activeItem.spec?.cycleLife || 4000);
        } else if (customBuilderKey === 'motor') {
          setMotorType(activeItem.spec?.type || 'Permanent Magnet Synchronous');
          setMotorPower(activeItem.spec?.powerKw || 500);
          setMotorTorque(activeItem.spec?.torqueNm || 650);
          setMotorRpm(activeItem.spec?.maxRpm || 16000);
          setMotorEfficiency(activeItem.spec?.efficiencyPct || 95);
        } else if (customBuilderKey === 'charger') {
          setChargerComposition(activeItem.spec?.composition || 'Silicon Carbide (SiC)');
          setChargerPower(activeItem.spec?.powerKw || 250);
        } else {
          setGeneralComposition(activeItem.spec?.composition || 'Advanced Carbon Matrix');
          setGeneralWeight(activeItem.spec?.weight || activeItem.weight || 45);
          setGeneralCost(activeItem.spec?.cost || activeItem.cost || 2000);
          setGeneralTrl(activeItem.spec?.trl || 8);
        }
      }
    }
  }, [customBuilderKey, components]);

  // Handle the sequential CRISPR gene-editing timer
  useEffect(() => {
    if (!crisprEditingTask) return;

    const interval = setInterval(() => {
      setCrisprEditingTask((prev) => {
        if (!prev) return null;
        if (prev.currentStepIndex >= CRISPR_STEPS.length - 1) {
          clearInterval(interval);
          
          const previous = components[prev.key];
          const newComponents = { ...components, [prev.key]: prev.payload };
          setComponents(newComponents);
          
          onAddModificationLog({
            vehicleName: vehicle.name,
            componentName: prev.payload.name,
            timestamp: new Date().toLocaleTimeString(),
            type: 'GENOME_SPLICED'
          });

          // Trigger calculations after splicing complete
          setTimeout(() => {
            triggerAIAnalysis({
              key: prev.key,
              currentName: prev.payload.name,
              previousName: previous ? previous.name : 'Unknown'
            }, newComponents);
          }, 50);

          return null; // Close loader
        }
        return {
          ...prev,
          currentStepIndex: prev.currentStepIndex + 1
        };
      });
    }, 600); // 600ms per step, 3.6s total CRISPR sequence animation

    return () => clearInterval(interval);
  }, [crisprEditingTask, components, vehicle.name]);

  // Helper to extract numeric parameters from spec
  const getNumericSpecs = (spec: any) => {
    const keys = ['capacityKwh', 'powerKw', 'torqueNm', 'voltage', 'efficiencyPct', 'weight', 'cost', 'cycleLife', 'energyDensity', 'trl'];
    return keys.filter(k => typeof spec[k] === 'number');
  };

  // Auto-select first available numeric param when component changes
  useEffect(() => {
    if (selectedComponent) {
      const item = components[selectedComponent];
      if (item) {
        const numericParams = getNumericSpecs(item.spec);
        if (numericParams.length > 0) {
          setSelectedTuningParam(numericParams[0]);
        } else {
          setSelectedTuningParam(null);
        }
      }
    } else {
      setSelectedTuningParam(null);
    }
  }, [selectedComponent]);

  // Save Design Modal States
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [designName, setDesignName] = useState(vehicle.name);
  const [designDescription, setDesignDescription] = useState('Custom optimized battery, powertrain, and aerodynamics configuration.');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Update state when vehicle changes (e.g. switching designs)
  useEffect(() => {
    setDesignName(vehicle.name);
    setComponents({ ...vehicle.components });
  }, [vehicle]);

  // Sub-accordions open/closed state
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Powertrain': true,
    'Suspension': false,
    'Wheels & Brakes': false,
    'Electronics': false,
    'ADAS & Autonomous': false,
    'Interior': false,
    'Exterior': false,
    'Thermal Systems': false,
    'Manufacturing & Process': false
  });

  // Library/Replace overlay state
  const [activeLibraryKey, setActiveLibraryKey] = useState<string | null>(null);

  // Merge Workbench States
  const [mergeSources, setMergeSources] = useState({
    battery: vehicle.id,
    motor: vehicle.id,
    suspension: vehicle.id,
    radar: vehicle.id,
    displays: vehicle.id,
  });

  // AI analysis predictions results state
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Saved versions milestones state
  const [versions, setVersions] = useState<SavedVersion[]>([
    {
      id: 'prod-baseline',
      name: 'Production Base Snapshot',
      description: 'Standard factory baseline settings pre-modification.',
      timestamp: new Date().toLocaleTimeString(),
      components: { ...vehicle.components }
    }
  ]);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>('prod-baseline');

  // Trigger real-time backend calculations via api/analyze
  const triggerAIAnalysis = async (
    lastReplaced?: { key: string; currentName: string; previousName: string },
    updatedComponents?: Record<string, EngineeringComponent>
  ) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          components: updatedComponents || components,
          originalVehicle: vehicle,
          lastReplaced
        })
      });
      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
      }
    } catch (e) {
      console.log('Failed to trigger AI calculation service:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run initial calculations
  useEffect(() => {
    triggerAIAnalysis();
  }, []);

  const toggleGroup = (grp: string) => {
    setExpandedGroups((prev) => ({ ...prev, [grp]: !prev[grp] }));
  };

  // Select alternative from library
  const handleSelectAlternative = (categoryKey: string, option: ComponentLibraryOption) => {
    const previous = components[categoryKey];

    // Create upgraded specification node
    const updatedComponent: EngineeringComponent = {
      id: option.id,
      name: option.name,
      category: previous.category,
      parentCategory: previous.parentCategory,
      spec: {
        id: option.id,
        name: option.name,
        manufacturer: option.manufacturer,
        cost: option.cost,
        weight: option.weight,
        trl: option.trl,
        ...option.specs
      }
    };

    // Launch CRISPR gene editing sequence loader
    setCrisprEditingTask({
      key: categoryKey,
      name: option.name,
      targetComponentKey: categoryKey,
      steps: CRISPR_STEPS,
      currentStepIndex: 0,
      payload: updatedComponent
    });
    setActiveLibraryKey(null);
  };

  // Build bespoke user-customized composition component
  const handleBuildCustomComponent = () => {
    if (!customBuilderKey) return;
    const previous = components[customBuilderKey];
    if (!previous) return;

    let specsObj: Record<string, any> = {
      id: `custom-${customBuilderKey}-${Date.now()}`,
      name: customName || `Bespoke ${previous.category || customBuilderKey}`,
      manufacturer: customManufacturer || 'Bespoke Engineering Lab',
    };

    if (customBuilderKey === 'battery') {
      specsObj = {
        ...specsObj,
        chemistry: batteryChemistry,
        capacityKwh: batteryCapacity,
        voltage: batteryVoltage,
        energyDensity: batteryDensity,
        cycleLife: batteryCycleLife,
        cost: Math.round(batteryCapacity * 135 + batteryCycleLife * 0.2),
        weight: Math.round(batteryCapacity * 4.3 + 45),
        trl: 8
      };
    } else if (customBuilderKey === 'motor') {
      specsObj = {
        ...specsObj,
        type: motorType,
        powerKw: motorPower,
        torqueNm: motorTorque,
        maxRpm: motorRpm,
        efficiencyPct: motorEfficiency,
        cost: Math.round(motorPower * 18 + motorTorque * 2.8),
        weight: Math.round(motorPower * 0.22 + 30),
        trl: 8
      };
    } else if (customBuilderKey === 'charger') {
      specsObj = {
        ...specsObj,
        composition: chargerComposition,
        powerKw: chargerPower,
        cost: Math.round(chargerPower * 7.5 + 180),
        weight: Math.round(chargerPower * 0.07 + 4),
        trl: 9
      };
    } else {
      specsObj = {
        ...specsObj,
        composition: generalComposition,
        cost: generalCost,
        weight: generalWeight,
        trl: generalTrl
      };
    }

    const updatedComponent: EngineeringComponent = {
      id: specsObj.id,
      name: specsObj.name,
      category: previous.category,
      parentCategory: previous.parentCategory,
      spec: specsObj as any
    };

    // Trigger CRISPR molecular gene editing animation
    setCrisprEditingTask({
      key: customBuilderKey,
      name: specsObj.name,
      targetComponentKey: customBuilderKey,
      steps: CRISPR_STEPS,
      currentStepIndex: 0,
      payload: updatedComponent
    });

    setCustomBuilderKey(null);
  };

  // Multi-model Tech Merging Workbench
  const handleMergeRun = () => {
    setIsAnalyzing(true);
    const newComponents = { ...components };

    Object.keys(mergeSources).forEach((key) => {
      const sourceVehicleId = mergeSources[key as keyof typeof mergeSources];
      const sourceVehicle = INITIAL_VEHICLES[sourceVehicleId];
      if (sourceVehicle && sourceVehicle.components[key]) {
        newComponents[key] = { ...sourceVehicle.components[key] };
      }
    });

    setComponents(newComponents);

    onAddModificationLog({
      vehicleName: vehicle.name,
      componentName: 'Evolved Hybrid Architecture',
      timestamp: new Date().toLocaleTimeString(),
      type: 'MERGE'
    });

    setTimeout(() => {
      triggerAIAnalysis(undefined, newComponents);
      setActiveTab('design');
    }, 100);
  };

  // Saved version controls
  const handleRestoreVersion = (id: string) => {
    const target = versions.find((v) => v.id === id);
    if (target) {
      const restoredComponents = { ...target.components };
      setComponents(restoredComponents);
      setCurrentVersionId(id);
      triggerAIAnalysis(undefined, restoredComponents);
    }
  };

  const handleDuplicateVersion = (id: string) => {
    const target = versions.find((v) => v.id === id);
    if (target) {
      const dup: SavedVersion = {
        id: `dup-${Date.now()}`,
        name: `${target.name} (Copy)`,
        description: `Duplicated from ${target.name}`,
        timestamp: new Date().toLocaleTimeString(),
        components: { ...target.components }
      };
      setVersions((prev) => [...prev, dup]);
    }
  };

  const handleDeleteVersion = (id: string) => {
    setVersions((prev) => prev.filter((v) => v.id !== id));
  };

  const handleSaveCurrentVersion = (name: string, description: string) => {
    const newVer: SavedVersion = {
      id: `ver-${Date.now()}`,
      name,
      description,
      timestamp: new Date().toLocaleTimeString(),
      components: { ...components }
    };
    setVersions((prev) => [...prev, newVer]);
    setCurrentVersionId(newVer.id);
  };

  const handleSpecChange = (componentKey: string, param: string, value: number) => {
    const updatedComponents = {
      ...components,
      [componentKey]: {
        ...components[componentKey],
        spec: {
          ...components[componentKey].spec,
          [param]: value
        }
      }
    };
    setComponents(updatedComponents);
  };

  const handleSpecFinish = (componentKey: string, param: string) => {
    if (analysisDebounceRef.current) {
      clearTimeout(analysisDebounceRef.current);
    }
    analysisDebounceRef.current = setTimeout(() => {
      triggerAIAnalysis({
        key: componentKey,
        currentName: `${components[componentKey].name} (${SPEC_CONFIGS[param]?.label || param} Calibrated)`,
        previousName: components[componentKey].name
      }, components);
    }, 600);
  };

  const renderKPI = (val: number | undefined, target: number, isLowerBetter = false) => {
    if (val === undefined) return 'N/A';
    const diff = val - target;
    const isFav = isLowerBetter ? diff < 0 : diff > 0;
    const isZero = diff === 0;

    return (
      <div className="flex items-center space-x-1.5 font-mono text-[10px]">
        <span className="font-bold text-slate-100">{val.toLocaleString()}</span>
        {!isZero && (
          <span className={isFav ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            ({diff > 0 ? '+' : ''}{diff.toLocaleString()})
          </span>
        )}
      </div>
    );
  };

  // Render specifications inside left panel accordion items
  const renderSpecDetailLine = (label: string, val: string | number | undefined) => {
    if (val === undefined) return null;
    return (
      <div className="flex items-center justify-between py-1 text-[10px] font-mono border-b border-slate-900/40">
        <span className="text-slate-500 uppercase">{label}</span>
        <span className="text-slate-300 font-semibold">{val}</span>
      </div>
    );
  };

  const handleRevertComponent = (key: string) => {
    const originalComp = vehicle.components[key];
    if (!originalComp) return;
    const newComponents = { ...components, [key]: originalComp };
    setComponents(newComponents);

    onAddModificationLog({
      vehicleName: vehicle.name,
      componentName: `Reverted ${originalComp.name} to Baseline`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'REVERT'
    });

    // Run dynamic calculations immediately
    setTimeout(() => {
      triggerAIAnalysis({
        key,
        currentName: originalComp.name,
        previousName: components[key].name
      }, newComponents);
    }, 50);
  };

  const handleResetAllModifications = () => {
    const restoredComponents = { ...vehicle.components };
    setComponents(restoredComponents);

    onAddModificationLog({
      vehicleName: vehicle.name,
      componentName: 'All components restored to baseline specifications',
      timestamp: new Date().toLocaleTimeString(),
      type: 'REVERT_ALL'
    });

    setTimeout(() => {
      triggerAIAnalysis(undefined, restoredComponents);
    }, 50);
  };

  const activeSpecs = analysis?.baseSpecs || vehicle.baseSpecs;

  return (
    <div className="space-y-4 animate-fade-in relative">
      {/* Top Deck Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-3 gap-3">
        <div>
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-slate-300 font-mono text-[9px] flex items-center space-x-1 uppercase tracking-widest mb-0.5 cursor-pointer"
          >
            <span>← Return to Platform Index</span>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="font-display font-bold text-lg text-slate-100 uppercase tracking-wide">
              {vehicle.name} <span className="text-blue-400 font-bold font-mono text-sm ml-1.5">GENOME_EDITOR</span>
            </h1>
            <button
              onClick={() => {
                setDesignName(vehicle.name);
                setIsSaveModalOpen(true);
              }}
              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold uppercase text-[9px] flex items-center space-x-1 cursor-pointer transition-all shadow-sm"
              title="Save current configuration as a persistent custom design"
            >
              <Bookmark className="w-3 h-3 text-white fill-white/20" />
              <span>Save Design</span>
            </button>
          </div>
        </div>

        {/* Console Workspace Tabs */}
        <div className="flex items-center space-x-1 bg-black/60 border border-white/10 p-0.5 rounded">
          {(['design', 'dependencies', 'compare', 'versions', 'merge'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Sandbox viewport */}
      {activeTab === 'design' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* LEFT PANEL: TECHNOLOGY GENOME EXPLORER */}
          <div className="lg:col-span-4 p-3.5 rounded bg-[#0A0A0C] border border-white/10 flex flex-col justify-between max-h-[580px] overflow-y-auto space-y-3">
            <div className="border-b border-white/10 pb-2 flex items-center justify-between">
              <h3 className="font-display font-bold text-[10px] text-slate-200 uppercase tracking-wider">
                Technology Genome Map explorer
              </h3>
              <span className="text-[8px] font-mono text-blue-400 bg-blue-950/40 border border-blue-900/50 px-1 py-0.5 rounded uppercase font-bold">
                Active
              </span>
            </div>

            <div className="space-y-1.5 flex-grow">
              {CATEGORY_GROUPS.map((group) => {
                const isOpen = expandedGroups[group.name];
                return (
                  <div key={group.name} className="border border-white/5 rounded overflow-hidden bg-black/20">
                    <button
                      onClick={() => toggleGroup(group.name)}
                      className="w-full px-2.5 py-1.5 bg-black/40 hover:bg-black/60 text-left flex items-center justify-between font-mono text-[10px] text-slate-300 font-bold cursor-pointer border-b border-white/5"
                    >
                      <span className="uppercase tracking-wider">{group.name}</span>
                      {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                    </button>

                    {isOpen && (
                      <div className="p-1 space-y-0.5 bg-black/10">
                        {group.items.map((key) => {
                          const item = components[key];
                          if (!item) return null;
                          const isSel = selectedComponent === key;

                          return (
                            <div
                              key={key}
                              onMouseEnter={() => setHoveredComponent(key)}
                              onMouseLeave={() => setHoveredComponent(null)}
                              onClick={() => setSelectedComponent(key)}
                              className={`p-2 rounded transition-all cursor-pointer ${
                                isSel
                                  ? 'bg-blue-950/15 border border-blue-500/30'
                                  : 'border border-transparent hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-mono text-slate-500 font-bold uppercase text-[8px]">
                                  {item.category}
                                </span>
                                <div className="flex items-center space-x-1.5">
                                  {COMPONENT_LIBRARY[key] && (
                                    <>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveLibraryKey(key);
                                        }}
                                        className="text-[8px] font-mono text-blue-400 hover:text-blue-300 uppercase tracking-tight bg-transparent border-none cursor-pointer"
                                      >
                                        REPLACE
                                      </button>
                                      <span className="text-slate-800 text-[8px] font-mono">|</span>
                                    </>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setCustomBuilderKey(key);
                                    }}
                                    className="text-[8px] font-mono text-cyan-400 hover:text-cyan-300 uppercase tracking-tight bg-transparent border-none cursor-pointer flex items-center space-x-0.5"
                                  >
                                    <Wrench className="w-2.5 h-2.5 text-cyan-500/80" />
                                    <span>BUILD CUSTOM</span>
                                  </button>
                                </div>
                              </div>
                              <h4 className="font-bold font-mono text-[#D1D5DB] text-[10px] mt-0.5 uppercase">
                                {item.name}
                              </h4>

                              {/* Accordion inner expanded spec specifications sheet */}
                              {isSel && (
                                <div className="mt-2 p-1.5 bg-black/50 rounded border border-white/5 text-[9px] text-slate-400 space-y-1 animate-fade-in">
                                  <div className="text-[8px] font-mono text-slate-500 pb-0.5 uppercase border-b border-white/5">
                                    Technical Data Sheet
                                  </div>
                                  {renderSpecDetailLine('Manufacturer', item.spec.manufacturer)}
                                  {renderSpecDetailLine('Cost Index', `$${item.spec.cost.toLocaleString()}`)}
                                  {renderSpecDetailLine('Weight Payload', `${item.spec.weight} kg`)}
                                  {renderSpecDetailLine('Capacity', item.spec.capacityKwh ? `${item.spec.capacityKwh} kWh` : undefined)}
                                  {renderSpecDetailLine('Voltage Peak', item.spec.voltage ? `${item.spec.voltage} V` : undefined)}
                                  {renderSpecDetailLine('Horsepower', item.spec.powerKw ? `${item.spec.powerKw} kW` : undefined)}
                                  {renderSpecDetailLine('Efficiency', item.spec.efficiencyPct ? `${item.spec.efficiencyPct}%` : undefined)}
                                  {renderSpecDetailLine('Technology Readiness', `TRL ${item.spec.trl}`)}

                                  {/* Dynamic parameter tuning dial */}
                                  {getNumericSpecs(item.spec).length > 0 && (
                                    <div className="mt-2.5 pt-2.5 border-t border-white/10 space-y-2">
                                      <div className="flex items-center justify-between text-[8px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                                        <span className="flex items-center space-x-1">
                                          <Gauge className="w-3 h-3" />
                                          <span>SPEC CALIBRATOR DIAL</span>
                                        </span>
                                        {selectedTuningParam && SPEC_CONFIGS[selectedTuningParam] && (
                                          <span className="text-slate-400">
                                            {SPEC_CONFIGS[selectedTuningParam].label}
                                          </span>
                                        )}
                                      </div>

                                      {/* Parameter Tabs */}
                                      <div className="flex flex-wrap gap-1">
                                        {getNumericSpecs(item.spec).map((param) => {
                                          const config = SPEC_CONFIGS[param] || { label: param, unit: '' };
                                          const isParamActive = selectedTuningParam === param;
                                          return (
                                            <button
                                              key={param}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTuningParam(param);
                                              }}
                                              className={`px-1.5 py-0.5 rounded text-[7.5px] font-mono uppercase border transition-all cursor-pointer ${
                                                isParamActive
                                                  ? 'bg-blue-900/40 border-blue-500/50 text-blue-300 font-bold'
                                                  : 'bg-black/30 border-white/5 text-slate-500 hover:text-slate-300'
                                              }`}
                                            >
                                              {config.label || param}
                                            </button>
                                          );
                                        })}
                                      </div>

                                      {/* Dial Tuning Element */}
                                      {selectedTuningParam && (
                                        <div onClick={(e) => e.stopPropagation()}>
                                          <VernierDial
                                            value={item.spec[selectedTuningParam] || 0}
                                            min={SPEC_CONFIGS[selectedTuningParam]?.min || 0}
                                            max={SPEC_CONFIGS[selectedTuningParam]?.max || 10000}
                                            step={SPEC_CONFIGS[selectedTuningParam]?.step || 1}
                                            unit={SPEC_CONFIGS[selectedTuningParam]?.unit || ''}
                                            onChange={(val) => handleSpecChange(key, selectedTuningParam, val)}
                                            onFinish={() => handleSpecFinish(key, selectedTuningParam)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER PANEL: INTERACTIVE VEHICLE BLUEPRINT */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="flex-grow min-h-[340px]">
              <VehicleVisualizer
                hoveredComponent={hoveredComponent}
                selectedComponent={selectedComponent}
                onSelectComponent={setSelectedComponent}
                activeComponents={components}
                vehicleCategory={vehicle.category}
              />
            </div>

            {/* Quick Live Logs panel */}
            <div className="p-3.5 rounded bg-[#0A0A0C] border border-white/10 space-y-1.5">
              <h4 className="font-mono text-[9px] text-slate-400 uppercase tracking-widest flex items-center space-x-1.5 border-b border-white/10 pb-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>INTELLIGENT DECISION EXPLANATION FEED</span>
              </h4>
              <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
                {isAnalyzing ? (
                  <span className="text-blue-400 font-mono flex items-center space-x-2">
                    <span className="w-1 h-1 rounded-full bg-blue-400 animate-ping" />
                    <span>SOLVING SYSTEM CONFLICT EQUATIONS...</span>
                  </span>
                ) : (
                  analysis?.explanation || 'All technology genome nodes successfully structural-matched. Review telemetry on the right.'
                )}
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: AI DECISION IMPACT, STATS & RECOMMENDATIONS */}
          <div className="lg:col-span-4 p-3.5 rounded bg-[#0A0A0C] border border-white/10 flex flex-col justify-between max-h-[580px] overflow-y-auto space-y-4">
            
            {/* Real-time Dynamic KPI Tracker */}
            <div className="space-y-2.5">
              <div className="border-b border-white/10 pb-1.5 flex items-center justify-between">
                <h4 className="font-display font-bold text-[10px] text-slate-200 uppercase tracking-wider">
                  Real-time System KPIs
                </h4>
                <div className="flex items-center space-x-2">
                  {analysis?.isAiCalculated ? (
                    <span className="text-[8px] font-mono text-blue-400 bg-blue-950/40 border border-blue-900/40 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
                      GEMINI-ACTIVE
                    </span>
                  ) : (
                    <span className="text-[8px] font-mono text-amber-500 bg-amber-950/40 border border-amber-900/40 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      LOCAL-PLM-SIM
                    </span>
                  )}
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[8px] font-mono text-slate-500 uppercase">LIVE</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-[8px] text-slate-500 font-mono uppercase block">Max Range</span>
                  {renderKPI(activeSpecs.rangeKm, vehicle.rangeKm)}
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-[8px] text-slate-500 font-mono uppercase block">Max Speed</span>
                  {renderKPI(activeSpecs.topSpeedKmh, vehicle.baseSpecs.topSpeedKmh)}
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-[8px] text-slate-500 font-mono uppercase block">Total Weight</span>
                  {renderKPI(activeSpecs.weightKg, vehicle.weightKg, true)}
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-[8px] text-slate-500 font-mono uppercase block">Acceleration</span>
                  {renderKPI(activeSpecs.accelerationSec, vehicle.baseSpecs.accelerationSec, true)}
                </div>
                <div className="p-2 rounded col-span-2 bg-black/40 border border-white/5 space-y-0.5">
                  <span className="text-[8px] text-slate-500 font-mono uppercase block">Power Output</span>
                  {renderKPI(activeSpecs.powerKw, vehicle.baseSpecs.powerKw)}
                </div>
              </div>
            </div>

            {/* DESIGN MODIFICATIONS WORKBENCH */}
            <div className="space-y-2 bg-[#0E0E12] border border-white/5 p-2.5 rounded">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <h4 className="font-display font-bold text-[10px] text-slate-200 uppercase tracking-wider">
                    Design Modifications
                  </h4>
                  <span className="px-1.5 py-0.2 text-[8px] font-mono bg-blue-950/50 border border-blue-900/50 text-blue-400 rounded-full font-bold">
                    {Object.keys(components).filter((key) => {
                      const original = vehicle.components[key];
                      return original && original.id !== components[key].id;
                    }).length}
                  </span>
                </div>
                {Object.keys(components).some((key) => {
                  const original = vehicle.components[key];
                  return original && original.id !== components[key].id;
                }) && (
                  <button
                    onClick={handleResetAllModifications}
                    className="text-[8px] font-mono text-red-400 hover:text-red-300 uppercase tracking-wider flex items-center space-x-1 hover:underline cursor-pointer bg-transparent border-none"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                {(() => {
                  const modified = Object.keys(components)
                    .filter((key) => {
                      const original = vehicle.components[key];
                      return original && original.id !== components[key].id;
                    })
                    .map((key) => ({
                      key,
                      current: components[key],
                      original: vehicle.components[key]
                    }));

                  if (modified.length === 0) {
                    return (
                      <div className="text-center py-4 text-slate-600 font-mono text-[9px] uppercase leading-normal">
                        No active modifications.<br />Use "REPLACE" in the left panel to customize.
                      </div>
                    );
                  }

                  return modified.map(({ key, current, original }) => (
                    <div
                      key={key}
                      className="p-1.5 rounded bg-black/50 border border-white/5 flex items-center justify-between hover:border-blue-900/30 transition-all text-[9px]"
                    >
                      <div className="space-y-0.5 max-w-[82%]">
                        <div className="flex items-center space-x-1">
                          <span className="font-mono text-slate-500 font-bold uppercase text-[7px] bg-white/5 px-1 py-0.2 rounded">
                            {current.category || key}
                          </span>
                        </div>
                        <h5 className="font-bold font-mono text-slate-200 uppercase tracking-tight text-[9px] truncate">
                          {current.name}
                        </h5>
                        <p className="font-mono text-slate-500 text-[8px] truncate">
                          Replaced: <span className="line-through">{original.name}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleRevertComponent(key)}
                        title="Revert to original component"
                        className="p-1 rounded bg-white/5 text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-all cursor-pointer border border-transparent hover:border-red-900/30"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* AI SYSTEM COMPATIBILITY BAR */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] font-mono">
                <span className="text-slate-400">COORDINATION FIT SCORE</span>
                <span className="text-emerald-400 font-bold">{activeSpecs.compatibilityScore}%</span>
              </div>
              <div className="w-full h-1 bg-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500"
                  style={{ width: `${activeSpecs.compatibilityScore}%` }}
                />
              </div>
            </div>

            {/* AI STRUCTURAL RECOMMENDATIONS FEED */}
            <div className="space-y-2.5 flex-grow">
              <div className="border-b border-white/10 pb-1.5">
                <h4 className="font-display font-bold text-[10px] text-slate-300 uppercase tracking-wider">
                  Automated Engineering recommendations
                </h4>
              </div>

              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {analysis?.recommendations && analysis.recommendations.length > 0 ? (
                  analysis.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-2 bg-black/40 border border-white/5 rounded space-y-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                          rec.priority === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-900/40' :
                          rec.priority === 'High' ? 'bg-orange-500/10 text-orange-400 border border-orange-900/20' : 'bg-white/5 text-slate-400 border border-white/10'
                        }`}>
                          {rec.priority}
                        </span>
                        <span className="text-[8px] text-slate-500 font-mono uppercase">{rec.system}</span>
                      </div>
                      <p className="text-[10px] text-slate-200 leading-normal font-sans">
                        {rec.reason}
                      </p>
                      <div className="flex items-center justify-between text-[8px] text-slate-500 font-mono pt-1 border-t border-white/5">
                        <span>EST. COST: ${rec.costUsd.toLocaleString()}</span>
                        <span>DIFFICULTY: {rec.difficulty.toUpperCase()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-600 font-mono text-xs">
                    Calculating structural fits...
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Visual replacement drawer sheet overlay */}
      {activeLibraryKey && COMPONENT_LIBRARY[activeLibraryKey] && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0A0A0C] border border-white/10 rounded p-4 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <h3 className="font-display font-bold text-xs uppercase text-slate-200">
                  Replace Component Subsystem
                </h3>
                <p className="text-[9px] text-slate-500 font-mono mt-0.5">CATEGORY: {activeLibraryKey.toUpperCase()}</p>
              </div>
              <button
                onClick={() => setActiveLibraryKey(null)}
                className="text-slate-500 hover:text-slate-300 font-mono text-[10px] cursor-pointer"
              >
                ESC_CLOSE
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {COMPONENT_LIBRARY[activeLibraryKey].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => handleSelectAlternative(activeLibraryKey, opt)}
                  className="p-2.5 rounded bg-black/40 border border-white/5 hover:border-blue-500/30 cursor-pointer transition-all flex justify-between items-start"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono font-bold text-[10px] uppercase text-slate-200">{opt.name}</span>
                      <span className="text-[8px] font-mono text-slate-500 uppercase bg-white/5 px-1.5 py-0.5 rounded">
                        {opt.manufacturer}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 text-[9px] text-slate-500 font-mono">
                      <span>Weight: {opt.weight} kg</span>
                      <span>Cost: ${opt.cost.toLocaleString()}</span>
                      <span>TRL {opt.trl}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[8px] font-mono text-slate-500 uppercase block">COMPATIBILITY</span>
                    <strong className="text-blue-400 font-mono text-[10px] font-bold">{opt.compatibilityRating}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom Component Builder Modal */}
      {customBuilderKey && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#08080B] border border-cyan-500/30 rounded-lg p-5 space-y-4 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative animate-fade-in text-slate-200">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-cyan-950/40 border border-cyan-500/30 rounded flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase tracking-wide text-cyan-300">
                    Bespoke Component Synthesizer
                  </h3>
                  <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
                    GENETIC BLUEPRINT COMPOSITION LAB • CATEGORY: {customBuilderKey}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCustomBuilderKey(null)}
                className="text-slate-500 hover:text-slate-300 font-mono text-[10px] cursor-pointer"
              >
                ESC_CLOSE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Form Input fields */}
              <div className="space-y-3.5 pr-2 border-r border-white/5 max-h-[350px] overflow-y-auto">
                <div className="space-y-1">
                  <label className="text-[8px] text-slate-500 font-mono uppercase tracking-widest block">Component Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="e.g. HyperDrive Quantum-9"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] text-slate-500 font-mono uppercase tracking-widest block">Manufacturer Node</label>
                  <input
                    type="text"
                    value={customManufacturer}
                    onChange={(e) => setCustomManufacturer(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Category specific controls */}
                {customBuilderKey === 'battery' && (
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[8px] text-slate-400 font-mono uppercase block">Battery Chemistry Composition</label>
                      <select
                        value={batteryChemistry}
                        onChange={(e) => setBatteryChemistry(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="Solid-State Quantum Cell">Solid-State Quantum Cell</option>
                        <option value="Silicon-Anode Ultra-Density">Silicon-Anode Ultra-Density</option>
                        <option value="NMC 811 Liquid Pouch">NMC 811 Liquid Pouch</option>
                        <option value="Lithium Iron Phosphate (LFP)">Lithium Iron Phosphate (LFP)</option>
                        <option value="Sodium-Ion Cryo-Resistant">Sodium-Ion Cryo-Resistant</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Target Capacity</span>
                        <span className="text-cyan-400 font-bold">{batteryCapacity} kWh</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="250"
                        step="1"
                        value={batteryCapacity}
                        onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">System Voltage Peak</span>
                        <span className="text-cyan-400 font-bold">{batteryVoltage} V</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        value={batteryVoltage}
                        onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Energy Density</span>
                        <span className="text-cyan-400 font-bold">{batteryDensity} Wh/kg</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="650"
                        step="10"
                        value={batteryDensity}
                        onChange={(e) => setBatteryDensity(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Target Cycle Life</span>
                        <span className="text-cyan-400 font-bold">{batteryCycleLife} cycles</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="15000"
                        step="250"
                        value={batteryCycleLife}
                        onChange={(e) => setBatteryCycleLife(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>
                  </div>
                )}

                {customBuilderKey === 'motor' && (
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[8px] text-slate-400 font-mono uppercase block">Engine Subtype</label>
                      <select
                        value={motorType}
                        onChange={(e) => setMotorType(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="Permanent Magnet Synchronous">Permanent Magnet Synchronous (PMSM)</option>
                        <option value="Electrically Excited Synchronous">Electrically Excited Synch (EESM)</option>
                        <option value="Axial Flux High-Torque Disk">Axial Flux High-Torque Disk</option>
                        <option value="AC Induction Heavy Duty">AC Induction Heavy Duty</option>
                        <option value="Synchronous Reluctance Core">Synchronous Reluctance Core</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Peak Output Power</span>
                        <span className="text-cyan-400 font-bold">{motorPower} kW</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="1500"
                        step="10"
                        value={motorPower}
                        onChange={(e) => setMotorPower(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Rotor Peak Torque</span>
                        <span className="text-cyan-400 font-bold">{motorTorque} Nm</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="2500"
                        step="10"
                        value={motorTorque}
                        onChange={(e) => setMotorTorque(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Maximum Rotor RPM</span>
                        <span className="text-cyan-400 font-bold">{motorRpm.toLocaleString()} RPM</span>
                      </div>
                      <input
                        type="range"
                        min="3000"
                        max="25000"
                        step="500"
                        value={motorRpm}
                        onChange={(e) => setMotorRpm(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Thermal Efficiency</span>
                        <span className="text-cyan-400 font-bold">{motorEfficiency} %</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="99.5"
                        step="0.5"
                        value={motorEfficiency}
                        onChange={(e) => setMotorEfficiency(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>
                  </div>
                )}

                {customBuilderKey === 'charger' && (
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[8px] text-slate-400 font-mono uppercase block">Solid-State Composition</label>
                      <select
                        value={chargerComposition}
                        onChange={(e) => setChargerComposition(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
                      >
                        <option value="Gallium Nitride (GaN) Multi-phase">Gallium Nitride (GaN) Multi-phase</option>
                        <option value="Silicon Carbide (SiC) High-Freq">Silicon Carbide (SiC) High-Freq</option>
                        <option value="IGBT Phase-Shifted Full Bridge">IGBT Phase-Shifted Full Bridge</option>
                        <option value="Liquid-Cooled Superconducting Loop">Liquid-Cooled Superconducting Loop</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Charging Speed (Watts/Power)</span>
                        <span className="text-cyan-400 font-bold">{chargerPower} kW</span>
                      </div>
                      <input
                        type="range"
                        min="11"
                        max="450"
                        step="5"
                        value={chargerPower}
                        onChange={(e) => setChargerPower(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>
                  </div>
                )}

                {customBuilderKey !== 'battery' && customBuilderKey !== 'motor' && customBuilderKey !== 'charger' && (
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[8px] text-slate-400 font-mono uppercase block">Core Composition</label>
                      <input
                        type="text"
                        value={generalComposition}
                        onChange={(e) => setGeneralComposition(e.target.value)}
                        className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                        placeholder="e.g. Ultra-Modulus Carbon Alloy"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Simulated Cost</span>
                        <span className="text-cyan-400 font-bold">${generalCost.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="15000"
                        step="100"
                        value={generalCost}
                        onChange={(e) => setGeneralCost(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Estimated Weight Payload</span>
                        <span className="text-cyan-400 font-bold">{generalWeight} kg</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="350"
                        step="1"
                        value={generalWeight}
                        onChange={(e) => setGeneralWeight(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono">
                        <span className="text-slate-400 uppercase">Technology Readiness Level (TRL)</span>
                        <span className="text-cyan-400 font-bold">TRL {generalTrl}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="9"
                        step="1"
                        value={generalTrl}
                        onChange={(e) => setGeneralTrl(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer h-1 bg-black rounded"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Synthesis Simulator / Preview Panel */}
              <div className="flex flex-col justify-between bg-black/40 border border-white/5 p-3.5 rounded text-xs">
                <div className="space-y-3">
                  <div className="text-[9px] font-mono text-cyan-400/80 uppercase pb-1.5 border-b border-white/5 flex items-center space-x-1">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SYNTHESIS SPECS CALCULATOR</span>
                  </div>

                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-500">SYSTEM CATEGORY</span>
                      <span className="text-slate-300 font-bold uppercase">{customBuilderKey}</span>
                    </div>

                    {customBuilderKey === 'battery' && (
                      <>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">CELL CHEMISTRY</span>
                          <span className="text-slate-300 truncate max-w-[120px]">{batteryChemistry}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">CALCULATED WEIGHT</span>
                          <span className="text-amber-400 font-bold">{Math.round(batteryCapacity * 4.3 + 45)} kg</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">CALCULATED COST</span>
                          <span className="text-emerald-400 font-bold">${Math.round(batteryCapacity * 135 + batteryCycleLife * 0.2).toLocaleString()} USD</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">ENERGY DENSITY</span>
                          <span className="text-slate-300">{batteryDensity} Wh/kg</span>
                        </div>
                      </>
                    )}

                    {customBuilderKey === 'motor' && (
                      <>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">MOTOR DESIGN</span>
                          <span className="text-slate-300 truncate max-w-[120px]">{motorType}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">TARGET RPM RANGE</span>
                          <span className="text-slate-300">{motorRpm.toLocaleString()} RPM</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">CALCULATED WEIGHT</span>
                          <span className="text-amber-400 font-bold">{Math.round(motorPower * 0.22 + 30)} kg</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">CALCULATED COST</span>
                          <span className="text-emerald-400 font-bold">${Math.round(motorPower * 18 + motorTorque * 2.8).toLocaleString()} USD</span>
                        </div>
                      </>
                    )}

                    {customBuilderKey === 'charger' && (
                      <>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">TRANSISTOR TECH</span>
                          <span className="text-slate-300 truncate max-w-[120px]">{chargerComposition}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">ESTIMATED WEIGHT</span>
                          <span className="text-amber-400 font-bold">{Math.round(chargerPower * 0.07 + 4)} kg</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">ESTIMATED COST</span>
                          <span className="text-emerald-400 font-bold">${Math.round(chargerPower * 7.5 + 180).toLocaleString()} USD</span>
                        </div>
                      </>
                    )}

                    {customBuilderKey !== 'battery' && customBuilderKey !== 'motor' && customBuilderKey !== 'charger' && (
                      <>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">MATERIAL COMPOSITION</span>
                          <span className="text-slate-300 truncate max-w-[120px]">{generalComposition}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">CHASSIS WEIGHT</span>
                          <span className="text-amber-400 font-bold">{generalWeight} kg</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">BUDGET COST INDEX</span>
                          <span className="text-emerald-400 font-bold">${generalCost.toLocaleString()} USD</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-500">MATURATION LEVEL</span>
                          <span className="text-cyan-400 font-bold">TRL {generalTrl}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-2 bg-cyan-950/20 border border-cyan-500/20 rounded text-[8px] text-cyan-300/90 font-mono leading-normal">
                    <span className="font-bold uppercase block mb-0.5 text-cyan-400">CRISPR INFUSION TARGET:</span>
                    This custom gene sequence will overwrite the target subsystem. The platform physics model will run automated vehicle integrations upon ligation.
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-3 border-t border-white/5 mt-4">
                  <button
                    onClick={() => setCustomBuilderKey(null)}
                    className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-slate-400 text-[10px] font-mono font-bold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBuildCustomComponent}
                    className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded text-[10px] font-mono font-bold uppercase flex items-center space-x-1.5 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                  >
                    <Cpu className="w-3.5 h-3.5 text-white animate-spin-slow" />
                    <span>INITIATE CRISPR SPLICING</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* CRISPR DNA Cutting & Splicing Loading Screen overlay */}
      {crisprEditingTask && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#070709] border border-cyan-500/20 rounded-xl p-6 space-y-6 shadow-[0_0_80px_rgba(6,182,212,0.25)] text-slate-200 text-center relative overflow-hidden">
            
            {/* Ambient bio grid scanner lines */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute inset-x-0 h-[1px] bg-cyan-500/10 top-1/4 animate-pulse pointer-events-none" />
            <div className="absolute inset-x-0 h-[1px] bg-cyan-500/10 top-3/4 animate-pulse pointer-events-none" />

            <div className="space-y-1.5 relative z-10">
              <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded-full inline-block">
                CRISPR-CAS9 ACTIVE PROTOCOL
              </span>
              <h2 className="font-display font-bold text-sm tracking-wide text-white uppercase">
                Molecular Technology Gene Splicing
              </h2>
              <p className="text-[9px] font-mono text-slate-400 uppercase">
                INJECTING BE-GENOME FOR {crisprEditingTask.key.toUpperCase()}: <span className="text-cyan-300 font-bold">{crisprEditingTask.name}</span>
              </p>
            </div>

            {/* CRISPR DNA Dynamic Scissors & Splicing Vector Animation */}
            <div className="relative h-32 bg-black/50 border border-white/5 rounded-lg flex items-center justify-center overflow-hidden z-10">
              
              {/* CRISPR CAS9 Scissors Indicator */}
              {(crisprEditingTask.currentStepIndex === 2 || crisprEditingTask.currentStepIndex === 3) && (
                <div className="absolute top-4 flex flex-col items-center animate-bounce z-20">
                  <Scissors className="w-6 h-6 text-red-500 animate-pulse rotate-90" />
                  <span className="text-[7px] font-mono bg-red-950/50 border border-red-500/30 text-red-400 px-1 rounded uppercase mt-1">
                    CAS9 CLEAVAGE
                  </span>
                </div>
              )}

              {/* CRISPR gRNA Inserting Segment */}
              {crisprEditingTask.currentStepIndex === 4 && (
                <div className="absolute top-2 flex flex-col items-center animate-bounce z-20">
                  <div className="h-4 w-1 bg-cyan-400 animate-pulse" />
                  <span className="text-[7px] font-mono bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 px-1.5 rounded uppercase">
                    DONOR COMPONENT GENE INJECTING
                  </span>
                </div>
              )}

              {/* Double helix SVG rendering */}
              <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100">
                <defs>
                  <linearGradient id="dna-backbone" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="50%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                </defs>

                {/* Draw 15 rungs of DNA helix */}
                {Array.from({ length: 17 }).map((_, index) => {
                  const x = 30 + index * 21;
                  // standard wave calculation
                  const angle = index * 0.45;
                  const yTop = 50 + Math.sin(angle) * 28;
                  const yBottom = 50 - Math.sin(angle) * 28;

                  const isTargetIndex = index >= 7 && index <= 9;
                  const currentStep = crisprEditingTask.currentStepIndex;

                  let rungColor = "rgba(100, 116, 139, 0.4)";
                  let isCleaved = false;
                  let isSpliced = false;

                  if (isTargetIndex) {
                    if (currentStep < 2) {
                      rungColor = "rgba(14, 116, 144, 0.5)"; // cyan targeting
                    } else if (currentStep === 2 || currentStep === 3) {
                      rungColor = "rgba(239, 68, 68, 0.8)"; // Red cleavage
                      isCleaved = true;
                    } else if (currentStep === 4) {
                      rungColor = "rgba(249, 115, 22, 0.7)"; // Orange insertion transition
                    } else {
                      rungColor = "rgba(34, 211, 238, 0.9)"; // Beautiful cyan ligation success
                      isSpliced = true;
                    }
                  } else {
                    rungColor = "rgba(59, 130, 246, 0.3)";
                  }

                  return (
                    <g key={index}>
                      {/* Base pair connection bar */}
                      {!isCleaved ? (
                        <line
                          x1={x}
                          y1={yTop}
                          x2={x}
                          y2={yBottom}
                          stroke={rungColor}
                          strokeWidth={isSpliced ? "3" : isTargetIndex ? "2" : "1"}
                          className={isSpliced ? "animate-pulse" : ""}
                        />
                      ) : (
                        // Draw split cleaved segments
                        <>
                          <line
                            x1={x}
                            y1={yTop}
                            x2={x}
                            y2={50 + Math.sin(angle) * 10}
                            stroke="rgba(239, 68, 68, 0.9)"
                            strokeWidth="2"
                          />
                          <line
                            x1={x}
                            y1={yBottom}
                            x2={x}
                            y2={50 - Math.sin(angle) * 10}
                            stroke="rgba(239, 68, 68, 0.9)"
                            strokeWidth="2"
                          />
                        </>
                      )}

                      {/* Top strand node */}
                      <circle
                        cx={x}
                        cy={yTop}
                        r={isSpliced ? "4.5" : isTargetIndex ? "3.5" : "2.5"}
                        fill={isSpliced ? "#06b6d4" : isTargetIndex && (currentStep === 2 || currentStep === 3) ? "#ef4444" : "#3b82f6"}
                        className={isTargetIndex ? "animate-pulse" : ""}
                      />

                      {/* Bottom strand node */}
                      <circle
                        cx={x}
                        cy={yBottom}
                        r={isSpliced ? "4.5" : isTargetIndex ? "3.5" : "2.5"}
                        fill={isSpliced ? "#06b6d4" : isTargetIndex && (currentStep === 2 || currentStep === 3) ? "#ef4444" : "#1d4ed8"}
                        className={isTargetIndex ? "animate-pulse" : ""}
                      />
                    </g>
                  );
                })}

                {/* Splicing particle markers */}
                {crisprEditingTask.currentStepIndex >= 4 && (
                  <g className="animate-pulse">
                    <circle cx="180" cy="50" r="12" fill="rgba(6, 182, 212, 0.15)" stroke="rgba(6, 182, 212, 0.3)" strokeDasharray="3" />
                    <circle cx="200" cy="50" r="8" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.3)" strokeDasharray="2" />
                  </g>
                )}
              </svg>

              {/* Matrix grid sensor readout overlay */}
              <div className="absolute bottom-2 left-3 font-mono text-[6.5px] text-slate-500 uppercase tracking-widest">
                INTEGRITY SCORE: {crisprEditingTask.currentStepIndex >= 5 ? '99.8% OK' : 'COMPOSING DNA'}
              </div>
              <div className="absolute bottom-2 right-3 font-mono text-[6.5px] text-slate-500 uppercase tracking-widest flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                <span>CAS9 COORD FOUND</span>
              </div>
            </div>

            {/* Steps & Progress Readout */}
            <div className="space-y-4">
              <div className="space-y-1 text-left font-mono">
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span className="uppercase">SPLICING VELOCITY</span>
                  <span className="text-cyan-400 font-bold">
                    {Math.round(((crisprEditingTask.currentStepIndex + 1) / CRISPR_STEPS.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${((crisprEditingTask.currentStepIndex + 1) / CRISPR_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Scrolling Live CLI Logs */}
              <div className="p-3 bg-black border border-white/5 rounded-lg text-left font-mono text-[8.5px] space-y-1 max-h-[85px] overflow-y-auto">
                {crisprEditingTask.steps.map((step, idx) => {
                  const isActive = idx === crisprEditingTask.currentStepIndex;
                  const isDone = idx < crisprEditingTask.currentStepIndex;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center space-x-2 ${
                        isActive ? 'text-cyan-300 font-bold scale-[1.01]' : isDone ? 'text-slate-500' : 'text-slate-700'
                      }`}
                    >
                      <span>[{isDone ? '✔' : isActive ? '▶' : ' '}]</span>
                      <span className="truncate">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TABS VIEWPORTS */}
      {activeTab === 'dependencies' && (
        <div className="h-[460px]">
          <DependencyGraph
            dependencies={analysis?.dependencies || []}
            selectedComponent={selectedComponent}
          />
        </div>
      )}

      {activeTab === 'compare' && (
        <DesignCompare
          originalName={vehicle.name}
          originalSpecs={vehicle.baseSpecs}
          modifiedSpecs={activeSpecs}
        />
      )}

      {activeTab === 'versions' && (
        <VersionTimeline
          versions={versions}
          currentVersionId={currentVersionId}
          onRestore={handleRestoreVersion}
          onDuplicate={handleDuplicateVersion}
          onDelete={handleDeleteVersion}
          onSaveCurrent={handleSaveCurrentVersion}
        />
      )}

      {activeTab === 'merge' && (
        <div className="p-4 rounded bg-[#0A0A0C] border border-white/10 space-y-4">
          <div className="border-b border-white/10 pb-2">
            <h3 className="font-display font-bold text-xs uppercase text-slate-100 flex items-center space-x-2">
              <Merge className="w-4 h-4 text-blue-400" />
              <span>Multi-Model Gene Synthesis Bench</span>
            </h3>
            <p className="text-slate-500 text-[10px] font-mono mt-0.5">
              Select specific subsystems from existing vehicles. The platform will automatically synthesize a custom evolved hybrid blueprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.keys(mergeSources).map((key) => (
              <div key={key} className="p-2.5 bg-black/40 border border-white/5 rounded space-y-1.5">
                <span className="text-[9px] font-mono text-blue-400 font-bold uppercase block">{key} technology gene</span>
                <select
                  value={mergeSources[key as keyof typeof mergeSources]}
                  onChange={(e) => setMergeSources((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full bg-black border border-white/10 rounded px-2 py-1.5 text-[11px] text-slate-200 focus:outline-none focus:border-blue-500 font-mono cursor-pointer"
                >
                  {Object.values(INITIAL_VEHICLES).map((v) => (
                    <option key={v.id} value={v.id}>{v.manufacturer} {v.name}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleMergeRun}
              className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-colors"
            >
              <GitMerge className="w-3.5 h-3.5" />
              <span>SYNTHESIZE EVOLVED DESIGN</span>
            </button>
          </div>
        </div>
      )}

      {/* Save Design Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0C0C0F] border border-white/10 rounded-lg p-5 space-y-4 shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div>
                <h3 className="font-display font-bold text-xs uppercase text-slate-100 flex items-center space-x-1.5">
                  <Bookmark className="w-4 h-4 text-blue-400" />
                  <span>COMMIT CUSTOM ARCHITECTURE</span>
                </h3>
                <p className="text-[8px] font-mono text-slate-500 mt-0.5">SAVE PROJECT DESIGN TO DECK DIRECTORY</p>
              </div>
              <button
                onClick={() => {
                  setIsSaveModalOpen(false);
                  setSaveSuccess(false);
                }}
                className="text-slate-500 hover:text-slate-300 font-mono text-[10px] cursor-pointer"
              >
                ESC_CLOSE
              </button>
            </div>

            {saveSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-200 uppercase font-mono">Design Committed Successfully</p>
                  <p className="text-[10px] text-slate-500 uppercase leading-relaxed font-mono">
                    Updated in Active Designs and Analytics Deck.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSaveModalOpen(false);
                    setSaveSuccess(false);
                  }}
                  className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] font-bold uppercase transition-all cursor-pointer"
                >
                  OK_RETURN
                </button>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">Design/Project Name</label>
                  <input
                    type="text"
                    value={designName}
                    onChange={(e) => setDesignName(e.target.value)}
                    placeholder="e.g. Model S Plaid - Performance Rig"
                    className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-[11px] text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">Design Log / Description</label>
                  <textarea
                    value={designDescription}
                    onChange={(e) => setDesignDescription(e.target.value)}
                    placeholder="Enter engineering goals or modifications summary..."
                    rows={3}
                    className="w-full bg-black border border-white/10 rounded px-2.5 py-1.5 text-[11px] text-slate-200 font-mono focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="p-3 bg-black/40 border border-white/5 rounded space-y-1 font-mono text-[9px] text-slate-400">
                  <span className="text-[8px] text-slate-500 uppercase block">Specs to Be Archived</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div>RANGE: <strong className="text-blue-400">{activeSpecs.rangeKm} KM</strong></div>
                    <div>TOP SPEED: <strong className="text-amber-400">{activeSpecs.topSpeedKmh} KM/H</strong></div>
                    <div>WEIGHT: <strong className="text-indigo-400">{activeSpecs.weightKg} KG</strong></div>
                    <div>ACCEL: <strong className="text-cyan-400">{activeSpecs.accelerationSec} SEC</strong></div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => setIsSaveModalOpen(false)}
                    className="px-3 py-1.5 border border-white/10 hover:bg-white/5 rounded text-slate-400 text-[10px] font-mono font-bold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onSaveDesign(designName, designDescription, components, activeSpecs);
                      setSaveSuccess(true);
                    }}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-mono font-bold uppercase flex items-center space-x-1.5 cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Save Design</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
