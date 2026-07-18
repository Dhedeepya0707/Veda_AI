/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, Cpu, Activity } from 'lucide-react';

interface VehicleVisualizerProps {
  hoveredComponent: string | null;
  selectedComponent: string | null;
  onSelectComponent: (key: string) => void;
  activeComponents: Record<string, any>;
  vehicleCategory?: 'Sedan' | 'SUV' | 'Sports Car' | 'Hypercar' | 'Truck' | 'Motorcycle';
}

export default function VehicleVisualizer({
  hoveredComponent,
  selectedComponent,
  onSelectComponent,
  activeComponents,
  vehicleCategory = 'Sedan'
}: VehicleVisualizerProps) {
  const activeKey = hoveredComponent || selectedComponent;

  // Helper to determine highlight styles
  const getHighlightProps = (key: string, baseStroke = 'rgba(255,255,255,0.12)', baseFill = 'none') => {
    const isActive = activeKey === key;
    return {
      stroke: isActive ? '#06B6D4' : baseStroke,
      fill: isActive ? 'rgba(6, 182, 212, 0.22)' : baseFill,
      strokeWidth: isActive ? '2.5' : '1.5',
      className: `transition-all duration-300 ${isActive ? 'filter drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]' : ''}`
    };
  };

  const getSystemHighlightColor = (key: string, defaultColor = 'rgba(255, 255, 255, 0.25)') => {
    return activeKey === key ? '#06B6D4' : defaultColor;
  };

  const isCategoryMotorcycle = vehicleCategory === 'Motorcycle';
  const isCategoryTruck = vehicleCategory === 'Truck';

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#0A0A0C] border border-white/10 rounded relative overflow-hidden">
      {/* Background CAD Graph Matrix */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Top Header Controls */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 relative z-10">
        <div className="flex items-center space-x-1.5">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-[10px] text-slate-300 font-bold tracking-wider uppercase">
            X-RAY CAD GENOME SCHEMATIC - {vehicleCategory}
          </span>
        </div>
        <div className="flex items-center space-x-2 font-mono text-[8px] text-slate-400 bg-cyan-950/20 border border-cyan-900/30 px-2 py-0.5 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="tracking-wide uppercase">{vehicleCategory} DIGITAL TWIN ONLINE</span>
        </div>
      </div>

      {/* Center Interactive SVG Chassis Model */}
      <div className="flex-grow flex items-center justify-center py-4 relative z-10 overflow-auto">
        <svg
          viewBox="0 0 800 400"
          className="w-full max-w-[700px] h-auto overflow-visible select-none"
        >
          {/* DEFINITIONS & GRIDS */}
          <defs>
            <pattern id="diagonalHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            </pattern>
            <pattern id="activeHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1.5" />
            </pattern>
          </defs>

          {/* BACKGROUND STRUCTURE REFERENCE GRID */}
          <g opacity="0.15">
            <line x1="100" y1="200" x2="700" y2="200" stroke="#fff" strokeWidth="0.5" strokeDasharray="5,5" />
            <line x1="210" y1="30" x2="210" y2="370" stroke="#fff" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="390" y1="30" x2="390" y2="370" stroke="#fff" strokeWidth="0.5" strokeDasharray="3,3" />
            <line x1="590" y1="30" x2="590" y2="370" stroke="#fff" strokeWidth="0.5" strokeDasharray="3,3" />
          </g>

          {/* ========================================================================= */}
          {/* ======================= CASE 1: MOTORCYCLE SCHEMATIC =================== */}
          {/* ========================================================================= */}
          {isCategoryMotorcycle && (
            <g id="motorcycle-schematic">
              {/* Background Reference Lines */}
              <line x1="200" y1="270" x2="590" y2="265" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4,4" />

              {/* Body Panels Aero fairings */}
              <g onClick={() => onSelectComponent('body-panels')} className="cursor-pointer">
                <path
                  d="M 170,120 Q 230,80 300,105 Q 360,95 440,110 Q 520,110 580,180 Q 610,210 580,240 Q 510,245 440,250 Q 340,250 250,230 Q 185,210 170,120 Z"
                  fill="none"
                  stroke={activeKey === 'body-panels' ? '#06B6D4' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={activeKey === 'body-panels' ? '3' : '1'}
                  strokeDasharray={activeKey === 'body-panels' ? '0' : '4,4'}
                  className="transition-all duration-300"
                />
              </g>

              {/* Chassis Material trellis frame */}
              <g onClick={() => onSelectComponent('chassis-material')} className="cursor-pointer">
                <path
                  d="M 240,120 L 330,115 L 470,150 L 430,240 L 300,240 L 260,165 Z"
                  fill="none"
                  stroke={activeKey === 'chassis-material' ? '#06B6D4' : 'rgba(255, 255, 255, 0.18)'}
                  strokeWidth={activeKey === 'chassis-material' ? '4' : '2'}
                  className="transition-all duration-300"
                />
                <line x1="330" y1="115" x2="300" y2="240" stroke={getSystemHighlightColor('chassis-material', 'rgba(255,255,255,0.1)')} strokeWidth="1.5" />
                <line x1="330" y1="115" x2="430" y2="240" stroke={getSystemHighlightColor('chassis-material', 'rgba(255,255,255,0.1)')} strokeWidth="1.5" />
              </g>

              {/* Battery Pack block */}
              <g onClick={() => onSelectComponent('battery')} className="cursor-pointer">
                <rect x="295" y="130" width="125" height="100" rx="6" {...getHighlightProps('battery', 'rgba(255, 255, 255, 0.15)', 'rgba(255,255,255,0.02)')} />
                <g opacity="0.2" stroke="#fff" strokeWidth="1">
                  <line x1="335" y1="130" x2="335" y2="230" />
                  <line x1="375" y1="130" x2="375" y2="230" />
                  <line x1="295" y1="165" x2="420" y2="165" />
                  <line x1="295" y1="195" x2="420" y2="195" />
                </g>
              </g>

              {/* Motor */}
              <g onClick={() => onSelectComponent('motor')} className="cursor-pointer">
                <circle cx="445" cy="205" r="28" {...getHighlightProps('motor', 'rgba(255, 255, 255, 0.15)', '#111')} />
                <path d="M 425,205 L 465,205 M 445,185 L 445,225" stroke={getSystemHighlightColor('motor')} strokeWidth="1" opacity="0.3" />
              </g>

              {/* Inverter */}
              <g onClick={() => onSelectComponent('inverter')} className="cursor-pointer">
                <rect x="400" y="105" width="45" height="22" rx="2" {...getHighlightProps('inverter', 'rgba(255, 255, 255, 0.15)', '#0D0D11')} />
              </g>

              {/* Charger */}
              <g onClick={() => onSelectComponent('charger')} className="cursor-pointer">
                <circle cx="490" cy="115" r="9" {...getHighlightProps('charger', 'rgba(255,255,255,0.2)', '#111')} />
                <path d="M 490,115 L 420,135" stroke={getSystemHighlightColor('charger')} strokeWidth="1.5" strokeDasharray="3,3" fill="none" />
              </g>

              {/* Transmission chain/belt */}
              <g onClick={() => onSelectComponent('transmission')} className="cursor-pointer">
                <path d="M 445,205 L 590,265" stroke={getSystemHighlightColor('transmission')} strokeWidth="4" strokeDasharray="4,4" fill="none" className="transition-all" />
              </g>

              {/* Front suspension telescopic forks */}
              <g onClick={() => onSelectComponent('front-suspension')} className="cursor-pointer">
                <line x1="270" y1="90" x2="200" y2="270" stroke={getSystemHighlightColor('front-suspension')} strokeWidth="5" />
              </g>

              {/* Rear suspension swingarm */}
              <g onClick={() => onSelectComponent('rear-suspension')} className="cursor-pointer">
                <line x1="440" y1="210" x2="590" y2="265" stroke={getSystemHighlightColor('rear-suspension')} strokeWidth="5" />
              </g>

              {/* Shock absorbers (monoshock) */}
              <g onClick={() => onSelectComponent('shock-absorbers')} className="cursor-pointer">
                <line x1="420" y1="160" x2="455" y2="215" stroke={getSystemHighlightColor('shock-absorbers')} strokeWidth="3" strokeDasharray="2,2" />
              </g>

              {/* Front Wheel (Tyre, Rim, Brakes) */}
              <g onClick={() => onSelectComponent('tyres')} className="cursor-pointer">
                <circle cx="200" cy="270" r="58" {...getHighlightProps('tyres', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.01)')} />
              </g>
              <g onClick={() => onSelectComponent('rim-size')} className="cursor-pointer">
                <circle cx="200" cy="270" r="40" {...getHighlightProps('rim-size', 'rgba(255,255,255,0.2)', 'none')} />
              </g>

              {/* Rear Wheel (Tyre, Rim, Brakes) */}
              <g onClick={() => onSelectComponent('tyres')} className="cursor-pointer">
                <circle cx="590" cy="265" r="62" {...getHighlightProps('tyres', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.01)')} />
              </g>
              <g onClick={() => onSelectComponent('rim-size')} className="cursor-pointer">
                <circle cx="590" cy="265" r="42" {...getHighlightProps('rim-size', 'rgba(255,255,255,0.2)', 'none')} />
              </g>

              {/* Braking System discs & calipers */}
              <g onClick={() => onSelectComponent('braking-system')} className="cursor-pointer">
                <circle cx="200" cy="270" r="30" stroke={getSystemHighlightColor('braking-system')} strokeWidth="2" fill="none" strokeDasharray="4,2" />
                <rect x="180" y="235" width="12" height="18" rx="2" fill={getSystemHighlightColor('braking-system', '#E11D48')} />
                <circle cx="590" cy="265" r="32" stroke={getSystemHighlightColor('braking-system')} strokeWidth="2" fill="none" strokeDasharray="4,2" />
                <rect x="575" y="230" width="12" height="18" rx="2" fill={getSystemHighlightColor('braking-system', '#E11D48')} />
              </g>

              {/* Steering handlebars */}
              <g onClick={() => onSelectComponent('steering')} className="cursor-pointer">
                <line x1="270" y1="90" x2="295" y2="80" stroke={getSystemHighlightColor('steering')} strokeWidth="4.5" />
                <circle cx="295" cy="80" r="5" fill={getSystemHighlightColor('steering')} />
              </g>

              {/* Smart displays */}
              <g onClick={() => onSelectComponent('displays')} className="cursor-pointer">
                <rect x="250" y="75" width="22" height="14" rx="2" transform="rotate(-15 250 75)" {...getHighlightProps('displays', 'rgba(255, 255, 255, 0.25)', '#0A0A0E')} />
              </g>

              {/* Rider seats saddle */}
              <g onClick={() => onSelectComponent('seats')} className="cursor-pointer">
                <path d="M 430,140 Q 460,135 500,180 L 430,175 Z" {...getHighlightProps('seats', 'rgba(255,255,255,0.15)', 'none')} />
              </g>

              {/* HVAC system climate mock target (Heated Grip controllers) */}
              <g onClick={() => onSelectComponent('hvac')} className="cursor-pointer">
                <circle cx="295" cy="80" r="10" stroke={getSystemHighlightColor('hvac')} strokeWidth="1" fill="none" strokeDasharray="2,2" />
              </g>

              {/* ECU central computer */}
              <g onClick={() => onSelectComponent('ecu')} className="cursor-pointer">
                <rect x="330" y="105" width="35" height="16" rx="2" {...getHighlightProps('ecu', 'rgba(255, 255, 255, 0.25)', '#0D0D11')} />
              </g>

              {/* Headlights and Tail-lights */}
              <g onClick={() => onSelectComponent('headlights')} className="cursor-pointer">
                <polygon points="140,110 165,100 165,135 140,125" {...getHighlightProps('headlights', 'rgba(255, 255, 255, 0.2)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('tail-lights')} className="cursor-pointer">
                <polygon points="615,165 635,170 630,190 610,185" {...getHighlightProps('tail-lights', 'rgba(255, 255, 255, 0.2)', '#111')} />
              </g>

              {/* ADAS sensors: Camera, Radar, LiDAR */}
              <g onClick={() => onSelectComponent('camera')} className="cursor-pointer">
                <circle cx="280" cy="115" r="4.5" {...getHighlightProps('camera', 'rgba(255,255,255,0.3)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('radar')} className="cursor-pointer">
                <rect x="155" y="170" width="8" height="18" rx="1" {...getHighlightProps('radar', 'rgba(255,255,255,0.25)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('lidar')} className="cursor-pointer">
                <circle cx="380" cy="95" r="5" {...getHighlightProps('lidar', 'rgba(255, 255, 255, 0.25)', '#0D0D11')} />
              </g>
              <g onClick={() => onSelectComponent('ultrasonic-sensors')} className="cursor-pointer">
                <circle cx="160" cy="195" r="2.5" fill={getSystemHighlightColor('ultrasonic-sensors', 'rgba(255,255,255,0.2)')} />
                <circle cx="610" cy="215" r="2.5" fill={getSystemHighlightColor('ultrasonic-sensors', 'rgba(255,255,255,0.2)')} />
              </g>

              {/* GPS Antenna */}
              <g onClick={() => onSelectComponent('gps')} className="cursor-pointer">
                <path d="M 520,135 L 535,135 L 528,125 Z" {...getHighlightProps('gps', 'rgba(255,255,255,0.25)', '#111')} />
              </g>

              {/* Thermal battery cooling and motor cooling */}
              <g onClick={() => onSelectComponent('battery-cooling')} className="cursor-pointer">
                <path d="M 310,150 Q 355,160 410,150" fill="none" stroke={getSystemHighlightColor('battery-cooling', 'rgba(34, 211, 238, 0.25)')} strokeWidth="3" />
              </g>
              <g onClick={() => onSelectComponent('motor-cooling')} className="cursor-pointer">
                <circle cx="445" cy="205" r="34" stroke={getSystemHighlightColor('motor-cooling', 'rgba(34, 211, 238, 0.2)')} strokeWidth="2.5" fill="none" />
              </g>
              <g onClick={() => onSelectComponent('cooling-pipes')} className="cursor-pointer">
                <path d="M 400,115 Q 350,130 310,150" fill="none" stroke={getSystemHighlightColor('cooling-pipes', 'rgba(34, 211, 238, 0.2)')} strokeWidth="2" />
              </g>
              <g onClick={() => onSelectComponent('heat-pump')} className="cursor-pointer">
                <circle cx="360" cy="115" r="8" {...getHighlightProps('heat-pump', 'rgba(255,255,255,0.25)', '#111')} />
              </g>

              {/* Manufacturing processes overlays */}
              <g onClick={() => onSelectComponent('chassis-design')} className="cursor-pointer">
                {activeKey === 'chassis-design' && (
                  <rect x="235" y="100" width="245" height="150" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4,4" />
                )}
              </g>
              <g onClick={() => onSelectComponent('welding-process')} className="cursor-pointer">
                {activeKey === 'welding-process' && (
                  <g>
                    <circle cx="240" cy="120" r="5" fill="#06B6D4" />
                    <circle cx="330" cy="115" r="5" fill="#06B6D4" />
                    <circle cx="470" cy="150" r="5" fill="#06B6D4" />
                    <circle cx="430" cy="240" r="5" fill="#06B6D4" />
                  </g>
                )}
              </g>
              <g onClick={() => onSelectComponent('assembly-method')} className="cursor-pointer">
                {activeKey === 'assembly-method' && (
                  <g stroke="#06B6D4" strokeWidth="2" opacity="0.8">
                    <path d="M 120,60 L 100,60 L 100,120" fill="none" />
                    <path d="M 660,60 L 680,60 L 680,120" fill="none" />
                  </g>
                )}
              </g>
              <g onClick={() => onSelectComponent('manufacturing-process')} className="cursor-pointer">
                {activeKey === 'manufacturing-process' && (
                  <rect x="90" y="20" width="620" height="360" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="6,4" className="animate-pulse" />
                )}
              </g>
              <g onClick={() => onSelectComponent('materials')} className="cursor-pointer">
                {activeKey === 'materials' && (
                  <rect x="295" y="130" width="125" height="100" fill="url(#activeHatch)" opacity="0.3" />
                )}
              </g>

              {/* Electronics wire routes */}
              <g onClick={() => onSelectComponent('wiring-harness')} className="cursor-pointer">
                <path d="M 330,110 L 250,75 L 200,270" fill="none" stroke={getSystemHighlightColor('wiring-harness', 'rgba(255,100,0,0.15)')} strokeWidth="2.5" />
              </g>
              <g onClick={() => onSelectComponent('can-bus')} className="cursor-pointer">
                <rect x="240" y="70" width="370" height="210" rx="10" fill="none" stroke={getSystemHighlightColor('can-bus', 'rgba(168, 85, 247, 0.15)')} strokeWidth="1.5" strokeDasharray="3,3" />
              </g>
              <g onClick={() => onSelectComponent('ethernet-network')} className="cursor-pointer">
                <path d="M 250,75 Q 380,60 520,135" fill="none" stroke={getSystemHighlightColor('ethernet-network', 'rgba(16, 185, 129, 0.15)')} strokeWidth="1.5" />
              </g>
              <g onClick={() => onSelectComponent('driver-monitoring')} className="cursor-pointer">
                <circle cx="260" cy="90" r="3.5" {...getHighlightProps('driver-monitoring', 'rgba(255,255,255,0.25)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('buttons')} className="cursor-pointer">
                <circle cx="288" cy="85" r="3" {...getHighlightProps('buttons', 'rgba(255,255,255,0.2)', '#fff')} />
              </g>
              <g onClick={() => onSelectComponent('infotainment')} className="cursor-pointer">
                <rect x="335" y="170" width="18" height="18" rx="2" {...getHighlightProps('infotainment', 'rgba(255,255,255,0.18)', '#0D0D11')} />
              </g>
              <g onClick={() => onSelectComponent('doors')} className="cursor-pointer">
                {/* Motorcycle "fairing mounts" instead of doors */}
                <rect x="230" y="115" width="20" height="20" rx="3" {...getHighlightProps('doors', 'rgba(255,255,255,0.15)', 'none')} />
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* ======================= CASE 2: HEAVY DUTY TRUCK SCHEMATIC ============== */}
          {/* ========================================================================= */}
          {isCategoryTruck && (
            <g id="truck-schematic">
              {/* Body Panels Cab & Bed boundary */}
              <g onClick={() => onSelectComponent('body-panels')} className="cursor-pointer">
                <path
                  d="M 120,200 C 120,110 160,65 240,65 L 300,65 L 300,105 L 610,105 Q 650,105 670,140 C 680,160 680,240 670,260 Q 650,295 610,295 L 300,295 L 300,335 L 240,335 C 160,335 120,290 120,200 Z"
                  fill="none"
                  stroke={activeKey === 'body-panels' ? '#06B6D4' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={activeKey === 'body-panels' ? '3' : '1'}
                  strokeDasharray={activeKey === 'body-panels' ? '0' : '4,4'}
                  className="transition-all duration-300"
                />
              </g>

              {/* Chassis Material rails structure */}
              <g onClick={() => onSelectComponent('chassis-material')} className="cursor-pointer">
                <rect x="140" y="100" width="480" height="200" rx="4" fill="none" stroke={getHighlightProps('chassis-material').stroke} strokeWidth="3.5" />
                <line x1="140" y1="130" x2="620" y2="130" stroke={getSystemHighlightColor('chassis-material', 'rgba(255,255,255,0.15)')} strokeWidth="2" />
                <line x1="140" y1="270" x2="620" y2="270" stroke={getSystemHighlightColor('chassis-material', 'rgba(255,255,255,0.15)')} strokeWidth="2" />
              </g>

              {/* Battery Pack: Mega pack modular array */}
              <g onClick={() => onSelectComponent('battery')} className="cursor-pointer">
                <rect x="260" y="135" width="230" height="130" rx="8" {...getHighlightProps('battery', 'rgba(255, 255, 255, 0.15)', 'rgba(255,255,255,0.02)')} />
                <g opacity="0.25" stroke="#fff" strokeWidth="1">
                  <line x1="306" y1="135" x2="306" y2="265" />
                  <line x1="352" y1="135" x2="352" y2="265" />
                  <line x1="398" y1="135" x2="398" y2="265" />
                  <line x1="444" y1="135" x2="444" y2="265" />
                  <line x1="260" y1="178" x2="490" y2="178" />
                  <line x1="260" y1="221" x2="490" y2="221" />
                </g>
              </g>

              {/* Motors: dual traction rear motors */}
              <g onClick={() => onSelectComponent('motor')} className="cursor-pointer">
                <rect x="510" y="145" width="45" height="48" rx="3" {...getHighlightProps('motor', 'rgba(255, 255, 255, 0.15)', '#111')} />
                <rect x="580" y="145" width="45" height="48" rx="3" {...getHighlightProps('motor', 'rgba(255, 255, 255, 0.15)', '#111')} />
                <line x1="532" y1="80" x2="532" y2="320" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                <line x1="602" y1="80" x2="602" y2="320" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
              </g>

              {/* Multi-Axle Tyres & Rims */}
              <g onClick={() => onSelectComponent('tyres')} className="cursor-pointer">
                {[
                  { x: 170, y: 35 }, { x: 170, y: 325 },
                  { x: 495, y: 35 }, { x: 495, y: 325 },
                  { x: 565, y: 35 }, { x: 565, y: 325 }
                ].map((wheel, idx) => (
                  <rect
                    key={`truck-tyre-${idx}`}
                    x={wheel.x}
                    y={wheel.y}
                    width="75"
                    height="40"
                    rx="5"
                    {...getHighlightProps('tyres', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)')}
                  />
                ))}
              </g>
              <g onClick={() => onSelectComponent('rim-size')} className="cursor-pointer">
                {[
                  { x: 182, y: 41 }, { x: 182, y: 331 },
                  { x: 507, y: 41 }, { x: 507, y: 331 },
                  { x: 577, y: 41 }, { x: 577, y: 331 }
                ].map((rim, idx) => (
                  <rect
                    key={`truck-rim-${idx}`}
                    x={rim.x}
                    y={rim.y}
                    width="51"
                    height="28"
                    rx="3.5"
                    {...getHighlightProps('rim-size', 'rgba(255,255,255,0.2)', 'none')}
                  />
                ))}
              </g>

              {/* Heavy Duty Braking System discs */}
              <g onClick={() => onSelectComponent('braking-system')} className="cursor-pointer">
                {[
                  { dx: 220, dy: 42, cx: 215, cy: 38 },
                  { dx: 220, dy: 332, cx: 215, cy: 352 },
                  { dx: 545, dy: 42, cx: 540, cy: 38 },
                  { dx: 545, dy: 332, cx: 540, cy: 352 },
                  { dx: 615, dy: 42, cx: 610, cy: 38 },
                  { dx: 615, dy: 332, cx: 610, cy: 352 }
                ].map((brk, idx) => (
                  <g key={`truck-brake-${idx}`}>
                    <rect x={brk.dx} y={brk.dy} width="6" height="26" {...getHighlightProps('braking-system', 'rgba(255,255,255,0.25)', '#fff')} />
                    <rect x={brk.cx} y={brk.cy} width="12" height="10" rx="1.5" {...getHighlightProps('braking-system', 'rgba(255,255,255,0.3)', '#E11D48')} />
                  </g>
                ))}
              </g>

              {/* Suspension components */}
              <g onClick={() => onSelectComponent('front-suspension')} className="cursor-pointer">
                <line x1="210" y1="75" x2="250" y2="120" stroke={getSystemHighlightColor('front-suspension')} strokeWidth="4" />
                <line x1="210" y1="325" x2="250" y2="280" stroke={getSystemHighlightColor('front-suspension')} strokeWidth="4" />
              </g>
              <g onClick={() => onSelectComponent('rear-suspension')} className="cursor-pointer">
                <line x1="530" y1="75" x2="490" y2="120" stroke={getSystemHighlightColor('rear-suspension')} strokeWidth="4" />
                <line x1="600" y1="75" x2="560" y2="120" stroke={getSystemHighlightColor('rear-suspension')} strokeWidth="4" />
              </g>
              <g onClick={() => onSelectComponent('shock-absorbers')} className="cursor-pointer">
                <line x1="200" y1="75" x2="230" y2="120" stroke={getSystemHighlightColor('shock-absorbers')} strokeWidth="2.5" strokeDasharray="2,2" />
                <line x1="520" y1="75" x2="490" y2="120" stroke={getSystemHighlightColor('shock-absorbers')} strokeWidth="2.5" strokeDasharray="2,2" />
                <line x1="590" y1="75" x2="560" y2="120" stroke={getSystemHighlightColor('shock-absorbers')} strokeWidth="2.5" strokeDasharray="2,2" />
              </g>

              {/* Inverter, Charger & Transmission */}
              <g onClick={() => onSelectComponent('inverter')} className="cursor-pointer">
                <rect x="210" y="175" width="22" height="50" rx="2" {...getHighlightProps('inverter', 'rgba(255,255,255,0.18)', '#0D0D11')} />
              </g>
              <g onClick={() => onSelectComponent('charger')} className="cursor-pointer">
                <rect x="618" y="115" width="16" height="16" rx="2" {...getHighlightProps('charger', 'rgba(255,255,255,0.2)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('transmission')} className="cursor-pointer">
                <rect x="548" y="150" width="16" height="38" rx="1.5" {...getHighlightProps('transmission', 'rgba(255,255,255,0.18)', '#0D0D11')} />
              </g>

              {/* Steering wheel & Seats */}
              <g onClick={() => onSelectComponent('steering')} className="cursor-pointer">
                <circle cx="210" cy="120" r="14" {...getHighlightProps('steering', 'rgba(255,255,255,0.25)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('seats')} className="cursor-pointer">
                <rect x="230" y="140" width="30" height="30" rx="4" {...getHighlightProps('seats', 'rgba(255,255,255,0.15)', 'none')} />
                <rect x="230" y="230" width="30" height="30" rx="4" {...getHighlightProps('seats', 'rgba(255,255,255,0.15)', 'none')} />
              </g>

              {/* Displays */}
              <g onClick={() => onSelectComponent('displays')} className="cursor-pointer">
                <rect x="195" y="130" width="4" height="140" rx="1.5" {...getHighlightProps('displays', 'rgba(255, 255, 255, 0.25)', '#0A0A0E')} />
              </g>

              {/* Headlights and Tail-lights */}
              <g onClick={() => onSelectComponent('headlights')} className="cursor-pointer">
                <rect x="130" y="80" width="12" height="14" rx="2" {...getHighlightProps('headlights', 'rgba(255, 255, 255, 0.2)', '#111')} />
                <rect x="130" y="306" width="12" height="14" rx="2" {...getHighlightProps('headlights', 'rgba(255, 255, 255, 0.2)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('tail-lights')} className="cursor-pointer">
                <rect x="655" y="110" width="10" height="15" rx="1" {...getHighlightProps('tail-lights', 'rgba(255, 255, 255, 0.2)', '#111')} />
                <rect x="655" y="275" width="10" height="15" rx="1" {...getHighlightProps('tail-lights', 'rgba(255, 255, 255, 0.2)', '#111')} />
              </g>

              {/* ADAS Sensors */}
              <g onClick={() => onSelectComponent('camera')} className="cursor-pointer">
                <circle cx="150" cy="200" r="4.5" {...getHighlightProps('camera', 'rgba(255,255,255,0.3)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('radar')} className="cursor-pointer">
                <rect x="122" y="190" width="8" height="20" rx="1" {...getHighlightProps('radar', 'rgba(255,255,255,0.25)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('lidar')} className="cursor-pointer">
                <rect x="220" y="66" width="15" height="15" rx="2" {...getHighlightProps('lidar', 'rgba(255, 255, 255, 0.25)', '#0D0D11')} />
              </g>
              <g onClick={() => onSelectComponent('ultrasonic-sensors')} className="cursor-pointer">
                <circle cx="128" cy="110" r="2" fill={getSystemHighlightColor('ultrasonic-sensors')} />
                <circle cx="128" cy="290" r="2" fill={getSystemHighlightColor('ultrasonic-sensors')} />
              </g>
              <g onClick={() => onSelectComponent('gps')} className="cursor-pointer">
                <path d="M 290,120 L 305,120 L 298,110 Z" {...getHighlightProps('gps', 'rgba(255,255,255,0.25)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('driver-monitoring')} className="cursor-pointer">
                <circle cx="215" cy="140" r="3" {...getHighlightProps('driver-monitoring', 'rgba(255, 255, 255, 0.25)', '#222')} />
              </g>

              {/* Thermal battery cooling and motor cooling */}
              <g onClick={() => onSelectComponent('battery-cooling')} className="cursor-pointer">
                <path d="M 280,150 Q 375,170 470,150" fill="none" stroke={getSystemHighlightColor('battery-cooling', 'rgba(34, 211, 238, 0.25)')} strokeWidth="3" />
              </g>
              <g onClick={() => onSelectComponent('motor-cooling')} className="cursor-pointer">
                <rect x="520" y="200" width="30" height="15" rx="1" {...getHighlightProps('motor-cooling', 'rgba(34, 211, 238, 0.2)', '#111')} />
              </g>
              <g onClick={() => onSelectComponent('cooling-pipes')} className="cursor-pointer">
                <path d="M 232,200 Q 300,180 470,180" fill="none" stroke={getSystemHighlightColor('cooling-pipes', 'rgba(34, 211, 238, 0.2)')} strokeWidth="2" />
              </g>
              <g onClick={() => onSelectComponent('heat-pump')} className="cursor-pointer">
                <circle cx="210" cy="180" r="10" {...getHighlightProps('heat-pump', 'rgba(255,255,255,0.25)', '#111')} />
              </g>

              {/* Manufacturing Overlays */}
              <g onClick={() => onSelectComponent('chassis-design')} className="cursor-pointer">
                {activeKey === 'chassis-design' && (
                  <rect x="145" y="105" width="470" height="190" fill="none" stroke="#06B6D4" strokeWidth="2" strokeDasharray="4,4" />
                )}
              </g>
              <g onClick={() => onSelectComponent('welding-process')} className="cursor-pointer">
                {activeKey === 'welding-process' && (
                  <g>
                    <circle cx="145" cy="105" r="5" fill="#06B6D4" />
                    <circle cx="615" cy="105" r="5" fill="#06B6D4" />
                  </g>
                )}
              </g>
              <g onClick={() => onSelectComponent('assembly-method')} className="cursor-pointer">
                {activeKey === 'assembly-method' && (
                  <g stroke="#06B6D4" strokeWidth="2" opacity="0.8">
                    <path d="M 120,60 L 100,60 L 100,120" fill="none" />
                    <path d="M 660,60 L 680,60 L 680,120" fill="none" />
                  </g>
                )}
              </g>
              <g onClick={() => onSelectComponent('manufacturing-process')} className="cursor-pointer">
                {activeKey === 'manufacturing-process' && (
                  <rect x="90" y="20" width="620" height="360" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="6,4" className="animate-pulse" />
                )}
              </g>
              <g onClick={() => onSelectComponent('materials')} className="cursor-pointer">
                {activeKey === 'materials' && (
                  <rect x="260" y="135" width="230" height="130" fill="url(#activeHatch)" opacity="0.3" />
                )}
              </g>

              {/* Electronics wire routes */}
              <g onClick={() => onSelectComponent('wiring-harness')} className="cursor-pointer">
                <path d="M 230,140 Q 300,150 490,150" fill="none" stroke={getSystemHighlightColor('wiring-harness', 'rgba(255,100,0,0.15)')} strokeWidth="3" />
              </g>
              <g onClick={() => onSelectComponent('can-bus')} className="cursor-pointer">
                <rect x="150" y="110" width="460" height="180" rx="12" fill="none" stroke={getSystemHighlightColor('can-bus', 'rgba(168, 85, 247, 0.15)')} strokeWidth="1.5" strokeDasharray="4,4" />
              </g>
              <g onClick={() => onSelectComponent('ethernet-network')} className="cursor-pointer">
                <path d="M 210,140 Q 350,120 490,170" fill="none" stroke={getSystemHighlightColor('ethernet-network', 'rgba(16, 185, 129, 0.15)')} strokeWidth="1.5" />
              </g>
              <g onClick={() => onSelectComponent('buttons')} className="cursor-pointer">
                <circle cx="210" cy="140" r="3" {...getHighlightProps('buttons', 'rgba(255,255,255,0.2)', '#fff')} />
              </g>
              <g onClick={() => onSelectComponent('infotainment')} className="cursor-pointer">
                <rect x="230" y="190" width="20" height="20" rx="2" {...getHighlightProps('infotainment', 'rgba(255,255,255,0.18)', '#0D0D11')} />
              </g>
              <g onClick={() => onSelectComponent('doors')} className="cursor-pointer">
                {/* Truck Heavy Doors */}
                <rect x="230" y="90" width="40" height="12" rx="3" {...getHighlightProps('doors', 'rgba(255,255,255,0.15)', 'none')} />
                <rect x="230" y="298" width="40" height="12" rx="3" {...getHighlightProps('doors', 'rgba(255,255,255,0.15)', 'none')} />
              </g>
            </g>
          )}

          {/* ========================================================================= */}
          {/* ======================= CASE 3: STANDARD CAR SCHEMATIC =================== */}
          {/* ========================================================================= */}
          {!isCategoryMotorcycle && !isCategoryTruck && (
            <g id="car-schematic">
              {/* 1. Body Panels Aero Boundary */}
              <g onClick={() => onSelectComponent('body-panels')} className="cursor-pointer">
                <path
                  d="M 120,200 C 120,130 190,80 300,75 C 410,70 520,70 610,80 C 660,86 690,140 690,200 C 690,260 660,314 610,320 C 520,330 410,330 300,325 C 190,320 120,270 120,200 Z"
                  fill="none"
                  stroke={activeKey === 'body-panels' ? '#06B6D4' : 'rgba(255, 255, 255, 0.08)'}
                  strokeWidth={activeKey === 'body-panels' ? '3' : '1'}
                  strokeDasharray={activeKey === 'body-panels' ? '0' : '4,4'}
                  className="transition-all duration-300"
                />
              </g>

              {/* 2. Chassis Material Spaceframe / Skeleton */}
              <g onClick={() => onSelectComponent('chassis-material')} className="cursor-pointer">
                <path
                  d="M 155,200 L 180,105 L 290,105 L 490,105 L 600,105 L 625,200 L 600,295 L 490,295 L 290,295 L 180,295 Z"
                  fill="none"
                  stroke={activeKey === 'chassis-material' ? '#06B6D4' : 'rgba(255, 255, 255, 0.18)'}
                  strokeWidth={activeKey === 'chassis-material' ? '4' : '2'}
                  className="transition-all duration-300"
                />
                {/* Torsional Frame cross-members */}
                <line x1="290" y1="105" x2="290" y2="295" stroke={activeKey === 'chassis-material' ? '#06B6D4' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />
                <line x1="490" y1="105" x2="490" y2="295" stroke={activeKey === 'chassis-material' ? '#06B6D4' : 'rgba(255,255,255,0.1)'} strokeWidth="1.5" />
              </g>

              {/* 3. Gullwing Doors Cut / Hinges */}
              <g onClick={() => onSelectComponent('doors')} className="cursor-pointer">
                <line x1="310" y1="105" x2="470" y2="105" stroke={activeKey === 'doors' ? '#06B6D4' : 'rgba(255, 255, 255, 0.25)'} strokeWidth="3" className="transition-all duration-300" />
                <line x1="310" y1="295" x2="470" y2="295" stroke={activeKey === 'doors' ? '#06B6D4' : 'rgba(255, 255, 255, 0.25)'} strokeWidth="3" className="transition-all duration-300" />
              </g>

              {/* 4. Headlights (Laser Matrix Matrix LED) */}
              <g onClick={() => onSelectComponent('headlights')} className="cursor-pointer">
                <rect x="135" y="95" width="18" height="8" rx="2" {...getHighlightProps('headlights', 'rgba(255, 255, 255, 0.2)', '#111')} />
                <rect x="135" y="297" width="18" height="8" rx="2" {...getHighlightProps('headlights', 'rgba(255, 255, 255, 0.2)', '#111')} />
              </g>

              {/* 5. Tail-lights */}
              <g onClick={() => onSelectComponent('tail-lights')} className="cursor-pointer">
                <path d="M 625,102 L 635,102 L 631,115 Z" {...getHighlightProps('tail-lights', 'rgba(255, 255, 255, 0.2)', '#111')} />
                <path d="M 625,298 L 635,298 L 631,285 Z" {...getHighlightProps('tail-lights', 'rgba(255, 255, 255, 0.2)', '#111')} />
              </g>

              {/* 6. Chassis Design / Megacast front/rear blocks */}
              <g onClick={() => onSelectComponent('chassis-design')} className="cursor-pointer">
                <rect x="165" y="115" width="115" height="170" rx="4"
                  fill={activeKey === 'chassis-design' ? 'url(#activeHatch)' : 'none'}
                  stroke={activeKey === 'chassis-design' ? '#06B6D4' : 'none'}
                  strokeWidth="1.5"
                  className="transition-all duration-300 opacity-60"
                />
                <rect x="500" y="115" width="110" height="170" rx="4"
                  fill={activeKey === 'chassis-design' ? 'url(#activeHatch)' : 'none'}
                  stroke={activeKey === 'chassis-design' ? '#06B6D4' : 'none'}
                  strokeWidth="1.5"
                  className="transition-all duration-300 opacity-60"
                />
              </g>

              {/* 7. Welding Process Fusion Nodes */}
              <g onClick={() => onSelectComponent('welding-process')} className="cursor-pointer">
                {[
                  { cx: 280, cy: 105 }, { cx: 280, cy: 295 },
                  { cx: 500, cy: 105 }, { cx: 500, cy: 295 },
                  { cx: 180, cy: 105 }, { cx: 180, cy: 295 }
                ].map((node, idx) => (
                  <circle
                    key={`weld-${idx}`}
                    cx={node.cx}
                    cy={node.cy}
                    r="4.5"
                    fill={activeKey === 'welding-process' ? '#06B6D4' : 'rgba(255,255,255,0.15)'}
                    stroke={activeKey === 'welding-process' ? '#fff' : 'none'}
                    strokeWidth="1"
                    className="transition-all duration-300"
                  />
                ))}
              </g>

              {/* 8. Materials Overlay */}
              <g onClick={() => onSelectComponent('materials')} className="cursor-pointer">
                {activeKey === 'materials' && (
                  <g opacity="0.3">
                    <rect x="180" y="105" width="100" height="190" fill="url(#activeHatch)" />
                    <rect x="500" y="105" width="100" height="190" fill="url(#activeHatch)" />
                  </g>
                )}
              </g>

              {/* 9. Assembly Method */}
              <g onClick={() => onSelectComponent('assembly-method')} className="cursor-pointer">
                {activeKey === 'assembly-method' && (
                  <g stroke="#06B6D4" strokeWidth="1.5" opacity="0.8">
                    <path d="M 150,50 L 130,50 L 130,100" fill="none" />
                    <path d="M 650,50 L 670,50 L 670,100" fill="none" />
                    <path d="M 150,350 L 130,350 L 130,300" fill="none" />
                    <path d="M 650,350 L 670,350 L 670,300" fill="none" />
                  </g>
                )}
              </g>

              {/* 10. Manufacturing Process */}
              <g onClick={() => onSelectComponent('manufacturing-process')} className="cursor-pointer">
                {activeKey === 'manufacturing-process' && (
                  <rect x="110" y="25" width="580" height="350" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="6,4" className="animate-pulse" />
                )}
              </g>

              {/* 11. Battery Pack Block */}
              <g onClick={() => onSelectComponent('battery')} className="cursor-pointer group">
                <rect
                  x="295"
                  y="115"
                  width="190"
                  height="170"
                  rx="6"
                  {...getHighlightProps('battery', 'rgba(255, 255, 255, 0.15)', 'rgba(255,255,255,0.02)')}
                />
                <g opacity="0.2">
                  <line x1="342" y1="115" x2="342" y2="285" stroke="#fff" strokeWidth="1" />
                  <line x1="390" y1="115" x2="390" y2="285" stroke="#fff" strokeWidth="1" />
                  <line x1="438" y1="115" x2="438" y2="285" stroke="#fff" strokeWidth="1" />
                  <line x1="295" y1="172" x2="485" y2="172" stroke="#fff" strokeWidth="1" />
                  <line x1="295" y1="228" x2="485" y2="228" stroke="#fff" strokeWidth="1" />
                </g>
              </g>

              {/* 12. Motors: Front & Rear */}
              <g onClick={() => onSelectComponent('motor')} className="cursor-pointer">
                <rect x="180" y="165" width="40" height="70" rx="3" {...getHighlightProps('motor', 'rgba(255, 255, 255, 0.15)', '#111')} />
                <rect x="560" y="165" width="40" height="70" rx="3" {...getHighlightProps('motor', 'rgba(255, 255, 255, 0.15)', '#111')} />
                <line x1="200" y1="80" x2="200" y2="320" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <line x1="580" y1="80" x2="580" y2="320" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              </g>

              {/* 13. Inverter Power Stage */}
              <g onClick={() => onSelectComponent('inverter')} className="cursor-pointer">
                <rect x="225" y="175" width="18" height="50" rx="2" {...getHighlightProps('inverter', 'rgba(255,255,255,0.18)', '#0D0D11')} />
                <rect x="537" y="175" width="18" height="50" rx="2" {...getHighlightProps('inverter', 'rgba(255,255,255,0.18)', '#0D0D11')} />
              </g>

              {/* 14. Transmission / Gearboxes */}
              <g onClick={() => onSelectComponent('transmission')} className="cursor-pointer">
                <rect x="162" y="180" width="14" height="40" rx="1" {...getHighlightProps('transmission', 'rgba(255,255,255,0.18)', '#0D0D11')} />
                <rect x="604" y="180" width="14" height="40" rx="1" {...getHighlightProps('transmission', 'rgba(255,255,255,0.18)', '#0D0D11')} />
              </g>

              {/* 15. Charger Unit Receptacle */}
              <g onClick={() => onSelectComponent('charger')} className="cursor-pointer">
                <rect x="618" y="115" width="15" height="15" rx="2" {...getHighlightProps('charger', 'rgba(255,255,255,0.2)', '#111')} />
                <path d="M 618,122 L 485,140" stroke={getSystemHighlightColor('charger')} strokeWidth="1" strokeDasharray="3,3" fill="none" />
              </g>

              {/* 16. Tyres */}
              <g onClick={() => onSelectComponent('tyres')} className="cursor-pointer">
                {[
                  { x: 160, y: 35 }, { x: 160, y: 325 },
                  { x: 540, y: 35 }, { x: 540, y: 325 }
                ].map((wheel, idx) => (
                  <rect
                    key={`tyre-${idx}`}
                    x={wheel.x}
                    y={wheel.y}
                    width="80"
                    height="40"
                    rx="4"
                    {...getHighlightProps('tyres', 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)')}
                  />
                ))}
              </g>

              {/* 17. Rim Size */}
              <g onClick={() => onSelectComponent('rim-size')} className="cursor-pointer">
                {[
                  { x: 175, y: 41 }, { x: 175, y: 331 },
                  { x: 555, y: 41 }, { x: 555, y: 331 }
                ].map((rim, idx) => (
                  <rect
                    key={`rim-${idx}`}
                    x={rim.x}
                    y={rim.y}
                    width="50"
                    height="28"
                    rx="3"
                    {...getHighlightProps('rim-size', 'rgba(255,255,255,0.2)', 'none')}
                  />
                ))}
              </g>

              {/* 18. Braking System */}
              <g onClick={() => onSelectComponent('braking-system')} className="cursor-pointer">
                {[
                  { dx: 215, dy: 42, cx: 210, cy: 38 },
                  { dx: 215, dy: 332, cx: 210, cy: 352 },
                  { dx: 565, dy: 42, cx: 560, cy: 38 },
                  { dx: 565, dy: 332, cx: 560, cy: 352 }
                ].map((brk, idx) => (
                  <g key={`brake-${idx}`}>
                    <rect x={brk.dx} y={brk.dy} width="6" height="26" {...getHighlightProps('braking-system', 'rgba(255,255,255,0.25)', '#fff')} opacity="0.8" />
                    <rect x={brk.cx} y={brk.cy} width="12" height="10" rx="1.5" {...getHighlightProps('braking-system', 'rgba(255,255,255,0.3)', '#E11D48')} />
                  </g>
                ))}
              </g>

              {/* 19. Front Suspension Arms */}
              <g onClick={() => onSelectComponent('front-suspension')} className="cursor-pointer">
                <line x1="200" y1="75" x2="240" y2="115" stroke={getSystemHighlightColor('front-suspension')} strokeWidth="3" />
                <line x1="200" y1="325" x2="240" y2="285" stroke={getSystemHighlightColor('front-suspension')} strokeWidth="3" />
              </g>

              {/* 20. Rear Suspension Arms */}
              <g onClick={() => onSelectComponent('rear-suspension')} className="cursor-pointer">
                <line x1="580" y1="75" x2="540" y2="115" stroke={getSystemHighlightColor('rear-suspension')} strokeWidth="3" />
                <line x1="580" y1="325" x2="540" y2="285" stroke={getSystemHighlightColor('rear-suspension')} strokeWidth="3" />
              </g>

              {/* 21. Shock Absorbers */}
              <g onClick={() => onSelectComponent('shock-absorbers')} className="cursor-pointer">
                {[
                  { x1: 190, y1: 75, x2: 220, y2: 115 },
                  { x1: 190, y1: 325, x2: 220, y2: 285 },
                  { x1: 590, y1: 75, x2: 560, y2: 115 },
                  { x1: 590, y1: 325, x2: 560, y2: 285 }
                ].map((spring, idx) => (
                  <line
                    key={`spring-${idx}`}
                    x1={spring.x1}
                    y1={spring.y1}
                    x2={spring.x2}
                    y2={spring.y2}
                    stroke={activeKey === 'shock-absorbers' ? '#06B6D4' : 'rgba(255,255,255,0.4)'}
                    strokeWidth="2"
                    strokeDasharray="2,2"
                    className="transition-all duration-300"
                  />
                ))}
              </g>

              {/* 22. Battery Cooling */}
              <g onClick={() => onSelectComponent('battery-cooling')} className="cursor-pointer">
                <path
                  d="M 305,130 C 330,130 330,260 355,260 C 380,260 380,130 405,130 C 430,130 430,260 455,260 C 480,260 480,130 482,130"
                  fill="none"
                  stroke={activeKey === 'battery-cooling' ? '#06B6D4' : 'rgba(34, 211, 238, 0.15)'}
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />
              </g>

              {/* 23. Motor Cooling */}
              <g onClick={() => onSelectComponent('motor-cooling')} className="cursor-pointer">
                <rect x="145" y="160" width="8" height="80" rx="1" {...getHighlightProps('motor-cooling', 'rgba(34, 211, 238, 0.2)', '#111')} />
                <path d="M 153,170 L 180,170" fill="none" stroke={getSystemHighlightColor('motor-cooling')} strokeWidth="1.5" />
                <path d="M 153,230 L 180,230" fill="none" stroke={getSystemHighlightColor('motor-cooling')} strokeWidth="1.5" />
              </g>

              {/* 24. Heat Pump */}
              <g onClick={() => onSelectComponent('heat-pump')} className="cursor-pointer">
                <circle cx="250" cy="140" r="9.5" {...getHighlightProps('heat-pump', 'rgba(255, 255, 255, 0.25)', '#111')} />
                <line x1="250" y1="130.5" x2="250" y2="149.5" stroke={getSystemHighlightColor('heat-pump')} strokeWidth="1" />
                <line x1="240.5" y1="140" x2="259.5" y2="140" stroke={getSystemHighlightColor('heat-pump')} strokeWidth="1" />
              </g>

              {/* 25. Cooling Pipes */}
              <g onClick={() => onSelectComponent('cooling-pipes')} className="cursor-pointer">
                <path
                  d="M 153,200 L 250,149.5 M 250,130.5 L 305,130"
                  fill="none"
                  stroke={activeKey === 'cooling-pipes' ? '#06B6D4' : 'rgba(34, 211, 238, 0.25)'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              </g>

              {/* 26. ECU Central Brain */}
              <g onClick={() => onSelectComponent('ecu')} className="cursor-pointer">
                <rect x="270" y="185" width="18" height="28" rx="2" {...getHighlightProps('ecu', 'rgba(255, 255, 255, 0.25)', '#0D0D11')} />
                <rect x="274" y="189" width="10" height="20" fill="none" stroke={getSystemHighlightColor('ecu')} strokeWidth="1" />
              </g>

              {/* 27. Wiring Harness */}
              <g onClick={() => onSelectComponent('wiring-harness')} className="cursor-pointer">
                <path
                  d="M 288,198 C 300,198 330,198 360,198 M 270,198 L 225,198"
                  fill="none"
                  stroke={activeKey === 'wiring-harness' ? '#06B6D4' : 'rgba(255, 100, 0, 0.15)'}
                  strokeWidth="3"
                  className="transition-all duration-300"
                />
              </g>

              {/* 28. CAN Bus Redundant Loop */}
              <g onClick={() => onSelectComponent('can-bus')} className="cursor-pointer">
                <rect
                  x="170"
                  y="110"
                  width="460"
                  height="180"
                  rx="12"
                  fill="none"
                  stroke={activeKey === 'can-bus' ? '#06B6D4' : 'rgba(168, 85, 247, 0.15)'}
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="transition-all duration-300"
                />
              </g>

              {/* 29. Gigabit Ethernet Network */}
              <g onClick={() => onSelectComponent('ethernet-network')} className="cursor-pointer">
                <path
                  d="M 315,200 L 385,200 L 400,112 M 270,185 L 137,195"
                  fill="none"
                  stroke={activeKey === 'ethernet-network' ? '#06B6D4' : 'rgba(16, 185, 129, 0.15)'}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
              </g>

              {/* 30. Optical Cameras */}
              <g onClick={() => onSelectComponent('camera')} className="cursor-pointer">
                <circle cx="315" cy="200" r="4.5" {...getHighlightProps('camera', 'rgba(255,255,255,0.3)', '#111')} />
                <circle cx="400" cy="107" r="3.5" {...getHighlightProps('camera', 'rgba(255,255,255,0.3)', '#111')} />
                <circle cx="400" cy="293" r="3.5" {...getHighlightProps('camera', 'rgba(255,255,255,0.3)', '#111')} />
                <circle cx="638" cy="200" r="3.5" {...getHighlightProps('camera', 'rgba(255,255,255,0.3)', '#111')} />
              </g>

              {/* 31. Radar Sensors */}
              <g onClick={() => onSelectComponent('radar')} className="cursor-pointer">
                <rect x="122" y="190" width="8" height="20" rx="1" {...getHighlightProps('radar', 'rgba(255,255,255,0.25)', '#111')} />
                <rect x="639" y="190" width="8" height="20" rx="1" {...getHighlightProps('radar', 'rgba(255,255,255,0.25)', '#111')} />
              </g>

              {/* 32. Roof Pod LiDAR */}
              <g onClick={() => onSelectComponent('lidar')} className="cursor-pointer">
                <rect x="385" y="191" width="14" height="18" rx="3" {...getHighlightProps('lidar', 'rgba(255, 255, 255, 0.25)', '#0D0D11')} />
                <circle cx="392" cy="200" r="4" fill={getSystemHighlightColor('lidar')} opacity="0.8" />
              </g>

              {/* 33. Ultrasonic Sensors Grid */}
              <g onClick={() => onSelectComponent('ultrasonic-sensors')} className="cursor-pointer">
                {[
                  { cx: 133, cy: 110 }, { cx: 130, cy: 150 }, { cx: 130, cy: 250 }, { cx: 133, cy: 290 },
                  { cx: 636, cy: 110 }, { cx: 639, cy: 150 }, { cx: 639, cy: 250 }, { cx: 636, cy: 290 }
                ].map((us, idx) => (
                  <circle
                    key={`us-${idx}`}
                    cx={us.cx}
                    cy={us.cy}
                    r="2"
                    fill={activeKey === 'ultrasonic-sensors' ? '#06B6D4' : 'rgba(255,255,255,0.12)'}
                    className="transition-all duration-300"
                  />
                ))}
              </g>

              {/* 34. GPS Antenna */}
              <g onClick={() => onSelectComponent('gps')} className="cursor-pointer">
                <path d="M 510,195 L 525,195 L 518,187 Z" {...getHighlightProps('gps', 'rgba(255,255,255,0.25)', '#111')} />
              </g>

              {/* 35. Driver Monitoring System */}
              <g onClick={() => onSelectComponent('driver-monitoring')} className="cursor-pointer">
                <circle cx="295" cy="172" r="3" {...getHighlightProps('driver-monitoring', 'rgba(255, 255, 255, 0.25)', '#222')} />
              </g>

              {/* 36. Smart Cabin Displays */}
              <g onClick={() => onSelectComponent('displays')} className="cursor-pointer">
                <rect x="274" y="125" width="4" height="150" rx="1.5" {...getHighlightProps('displays', 'rgba(255, 255, 255, 0.25)', '#0A0A0E')} />
                <line x1="276" y1="135" x2="276" y2="265" stroke={activeKey === 'displays' ? '#06B6D4' : 'rgba(34, 211, 238, 0.3)'} strokeWidth="1" />
              </g>

              {/* 37. Interior Comfort Seats */}
              <g onClick={() => onSelectComponent('seats')} className="cursor-pointer">
                <rect x="340" y="130" width="35" height="40" rx="5" {...getHighlightProps('seats', 'rgba(255,255,255,0.15)', 'none')} />
                <rect x="340" y="230" width="35" height="40" rx="5" {...getHighlightProps('seats', 'rgba(255,255,255,0.15)', 'none')} />
                <rect x="445" y="130" width="35" height="140" rx="5" {...getHighlightProps('seats', 'rgba(255,255,255,0.15)', 'none')} />
              </g>

              {/* 38. Steering Wheel Yoke */}
              <g onClick={() => onSelectComponent('steering')} className="cursor-pointer">
                <line x1="275" y1="160" x2="300" y2="160" stroke={getSystemHighlightColor('steering')} strokeWidth="1.5" />
                <path d="M 300,152 C 298,155 298,165 300,168 L 305,160 Z" {...getHighlightProps('steering', 'rgba(255,255,255,0.25)', '#111')} />
              </g>

              {/* 39. Buttons Panels Console */}
              <g onClick={() => onSelectComponent('buttons')} className="cursor-pointer">
                <rect x="345" y="185" width="16" height="30" rx="1" {...getHighlightProps('buttons', 'rgba(255,255,255,0.15)', '#0F0F12')} />
              </g>

              {/* 40. HVAC System Climate */}
              <g onClick={() => onSelectComponent('hvac')} className="cursor-pointer">
                <rect x="245" y="145" width="18" height="30" rx="2" {...getHighlightProps('hvac', 'rgba(255, 255, 255, 0.18)', '#0D0D11')} />
              </g>

              {/* 41. Infotainment Processor */}
              <g onClick={() => onSelectComponent('infotainment')} className="cursor-pointer">
                <rect x="312" y="188" width="15" height="24" rx="2" {...getHighlightProps('infotainment', 'rgba(255, 255, 255, 0.18)', '#0D0D11')} />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Footer Indicator */}
      <div className="border-t border-white/10 pt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 font-mono text-[9px] text-slate-400">
          <Activity className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
          <span>HIGHLIGHTED COMPONENT: <strong className="text-cyan-400 font-bold uppercase">{activeKey || 'STANDBY / IDLE'}</strong></span>
        </div>
        <div className="text-[9px] text-slate-400 font-mono font-bold bg-cyan-950/20 border border-cyan-900/30 px-2 py-0.5 rounded">
          TRL: {activeComponents[activeKey || '']?.spec?.trl || 'N/A'}
        </div>
      </div>
    </div>
  );
}
