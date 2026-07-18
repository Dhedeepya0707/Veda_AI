/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { Scale, TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';
import { BaseSpecs } from '../types';

interface DesignCompareProps {
  originalName: string;
  originalSpecs: BaseSpecs;
  modifiedSpecs: BaseSpecs;
}

export default function DesignCompare({
  originalName,
  originalSpecs,
  modifiedSpecs
}: DesignCompareProps) {
  // Normalize stats (1-100) for the Radar chart
  const radarData = [
    { subject: 'Safety', original: originalSpecs.safetyScore, modified: modifiedSpecs.safetyScore },
    { subject: 'Comfort', original: originalSpecs.comfortRating, modified: modifiedSpecs.comfortRating },
    { subject: 'Reliability', original: originalSpecs.reliabilityPct, modified: modifiedSpecs.reliabilityPct },
    { subject: 'Innovation', original: originalSpecs.innovationScore, modified: modifiedSpecs.innovationScore },
    { subject: 'Compatibility', original: originalSpecs.compatibilityScore, modified: modifiedSpecs.compatibilityScore },
    { subject: 'Thermal Opt', original: originalSpecs.thermalPerformancePct, modified: modifiedSpecs.thermalPerformancePct },
  ];

  // Raw physical stats comparison for the Bar chart
  const barData = [
    { name: 'Range (km)', original: originalSpecs.rangeKm, modified: modifiedSpecs.rangeKm },
    { name: 'Weight (10kg)', original: Math.round(originalSpecs.weightKg / 10), modified: Math.round(modifiedSpecs.weightKg / 10) },
    { name: 'Power (kW)', original: originalSpecs.powerKw, modified: modifiedSpecs.powerKw },
    { name: 'Mfg Cost ($100)', original: Math.round(originalSpecs.manufacturingCostUsd / 100), modified: Math.round(modifiedSpecs.manufacturingCostUsd / 100) },
    { name: 'CO2 (100kg)', original: Math.round(originalSpecs.carbonFootprintCo2 / 100), modified: Math.round(modifiedSpecs.carbonFootprintCo2 / 100) }
  ];

  // Helper to calculate delta and pick colors
  const renderDelta = (field: keyof BaseSpecs, label: string, isLowerBetter = false) => {
    const orig = originalSpecs[field] as number;
    const mod = modifiedSpecs[field] as number;
    const diff = mod - orig;
    const pct = ((diff / orig) * 100).toFixed(1);

    const isFavorable = isLowerBetter ? diff < 0 : diff > 0;
    const isZero = diff === 0;

    return (
      <div className="p-2.5 rounded bg-[#0A0A0C] border border-white/10 flex items-center justify-between font-mono text-[11px]">
        <div>
          <span className="text-slate-500 text-[9px] uppercase block tracking-wider">{label}</span>
          <span className="text-slate-300 font-bold">
            {orig.toLocaleString()} → <strong className="text-slate-100">{mod.toLocaleString()}</strong>
          </span>
        </div>
        {!isZero ? (
          <div className={`flex items-center space-x-1 font-bold ${isFavorable ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isFavorable ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{diff > 0 ? '+' : ''}{diff.toLocaleString()} ({pct}%)</span>
          </div>
        ) : (
          <span className="text-slate-600 font-bold text-[9px]">STABLE</span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center space-x-1.5">
          <Scale className="w-4 h-4 text-blue-400" strokeWidth={2} />
          <h3 className="font-mono font-bold text-[11px] text-slate-100 uppercase tracking-wider">DESIGN ARCHITECTURE METRIC COMPARATOR</h3>
        </div>
        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
          SIMULATING OVERLAY DELTAS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Radar Overlay Map (Normalized) */}
        <div className="lg:col-span-6 p-3.5 rounded bg-[#0A0A0C] border border-white/10 space-y-3 flex flex-col justify-between">
          <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-wider border-b border-white/10 pb-1.5 font-bold">
            Normalized Performance Indices (1-100 Matrix)
          </h4>
          <div className="h-56 mt-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.03)" />
                <PolarAngleAxis dataKey="subject" stroke="#64748B" fontSize={8} />
                <PolarRadiusAxis stroke="rgba(255,255,255,0.05)" angle={30} domain={[0, 100]} fontSize={8} />
                <Radar name={originalName} dataKey="original" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.12} />
                <Radar name="Evolved Design" dataKey="modified" stroke="#10B981" fill="#10B981" fillOpacity={0.18} />
                <Legend wrapperStyle={{ fontSize: '9px', color: '#64748B', fontFamily: 'monospace' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart overlay (Physical stats) */}
        <div className="lg:col-span-6 p-3.5 rounded bg-[#0A0A0C] border border-white/10 space-y-3 flex flex-col justify-between">
          <h4 className="font-mono text-[10px] text-slate-400 uppercase tracking-wider border-b border-white/10 pb-1.5 font-bold">
            Physical System Specifications Comparison
          </h4>
          <div className="h-56 mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={8} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={8} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#050507',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    color: '#FFF',
                    fontSize: '10px',
                    fontFamily: 'monospace'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '9px', color: '#64748B', fontFamily: 'monospace' }} />
                <Bar dataKey="original" name={originalName} fill="#3B82F6" opacity={0.6} radius={[2, 2, 0, 0]} />
                <Bar dataKey="modified" name="Evolved Design" fill="#10B981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Delta KPI Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {renderDelta('rangeKm', 'Vehicle Range', false)}
        {renderDelta('weightKg', 'Total Weight', true)}
        {renderDelta('manufacturingCostUsd', 'Manufacturing Cost', true)}
        {renderDelta('carbonFootprintCo2', 'Carbon Footprint', true)}
      </div>
    </div>
  );
}
