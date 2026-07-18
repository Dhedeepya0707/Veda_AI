/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid
} from 'recharts';
import {
  Cpu, GitPullRequest, Bookmark, ShieldCheck, FileText, Clock,
  Car, Eye, Flame, ArrowUpRight, TrendingUp, Edit, Trash2
} from 'lucide-react';
import { SavedDesign } from '../types';

interface DashboardProps {
  onNavigateToRepo: () => void;
  vehiclesCount: number;
  versionsCount: number;
  predictionsCount: number;
  recentModifications: Array<{
    vehicleName: string;
    componentName: string;
    timestamp: string;
    type: string;
  }>;
  savedDesigns: SavedDesign[];
  onSelectDesign: (id: string) => void;
  onDeleteDesign: (id: string) => void;
}

export default function Dashboard({
  onNavigateToRepo,
  vehiclesCount,
  versionsCount,
  predictionsCount,
  recentModifications,
  savedDesigns,
  onSelectDesign,
  onDeleteDesign
}: DashboardProps) {
  // Mock tracking chart data
  const predictionActivityData = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 19 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 28 },
    { day: 'Fri', count: predictionsCount || 34 },
  ];

  const categoryData = [
    { name: 'Sedan', value: 2, color: '#3B82F6' },
    { name: 'SUV', value: 1, color: '#6366F1' },
    { name: 'Sports Car', value: 1, color: '#10B981' },
    { name: 'Truck', value: 1, color: '#06B6D4' },
  ];

  const modifiedComponentsData = [
    { category: 'Battery', count: 18 },
    { category: 'Motor', count: 14 },
    { category: 'ECU', count: 9 },
    { category: 'ADAS', count: 11 },
    { category: 'Thermal', count: 15 },
  ];

  const favoriteDesigns = [
    { id: 'tesla-s', name: 'Model S Plaid', platform: 'Palladium', performance: 98 },
    { id: 'porsche-taycan', name: 'Taycan Turbo S', platform: 'J1 Premium', performance: 97 },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Top Welcome Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 pb-4 border-b border-white/10">
        <div>
          <h1 className="font-display font-bold text-xl text-slate-100 tracking-tight uppercase">
            Engineering Console
          </h1>
          <p className="text-slate-500 text-[9px] font-mono tracking-widest uppercase mt-0.5">
            INDUSTRIAL DESIGN SIMULATOR & PLM GENOME GATEWAY
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onNavigateToRepo}
            className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <Car className="w-3.5 h-3.5" />
            <span>OPEN VEHICLE REPOSITORY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-3 rounded bg-[#0A0A0C] border border-white/10 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">TOTAL VEHICLES</p>
            <h3 className="font-display font-bold text-xl text-slate-100 tracking-tight">
              {vehiclesCount}
            </h3>
            <span className="text-[9px] text-emerald-400 font-mono flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>+3 platforms added</span>
            </span>
          </div>
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded">
            <Car className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="p-3 rounded bg-[#0A0A0C] border border-white/10 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">ACTIVE DESIGNS</p>
            <h3 className="font-display font-bold text-xl text-slate-100 tracking-tight">
              {savedDesigns.length}
            </h3>
            <span className="text-[9px] text-emerald-400 font-mono">
              Ready for Simulation
            </span>
          </div>
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded">
            <GitPullRequest className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="p-3 rounded bg-[#0A0A0C] border border-white/10 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">SAVED VERSIONS</p>
            <h3 className="font-display font-bold text-xl text-slate-100 tracking-tight">
              {versionsCount}
            </h3>
            <span className="text-[9px] text-indigo-400 font-mono">
              Audit Logs Intact
            </span>
          </div>
          <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded">
            <Bookmark className="w-4.5 h-4.5" />
          </div>
        </div>

        <div className="p-3 rounded bg-[#0A0A0C] border border-white/10 relative overflow-hidden flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">AI PREDICTIONS RUN</p>
            <h3 className="font-display font-bold text-xl text-slate-100 tracking-tight">
              {predictionsCount}
            </h3>
            <span className="text-[9px] text-cyan-400 font-mono flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Real-time Active Model</span>
            </span>
          </div>
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded">
            <Cpu className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* Graphs / Analytics Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Prediction Activity (Line Chart) */}
        <div className="lg:col-span-8 p-4 rounded bg-[#0A0A0C] border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Evolution Request Traffic Log</span>
            </h4>
            <span className="text-[9px] text-slate-500 font-mono">REAL-TIME TELEMETRY</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#050507',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: '#FFF'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', stroke: '#3B82F6', strokeWidth: 1.5, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Distribution (Pie Chart) */}
        <div className="lg:col-span-4 p-4 rounded bg-[#0A0A0C] border border-white/10 space-y-3 flex flex-col justify-between">
          <div>
            <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-white/10 pb-2">
              <Car className="w-3.5 h-3.5 text-blue-400" />
              <span>Platform Categories</span>
            </h4>
            <div className="h-36 mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={54}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-xl font-bold text-slate-200">5</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-wide">Vehicles</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono text-slate-400">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: cat.color }} />
                <span>{cat.name} ({cat.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Recently Modified Components (Bar Chart) */}
        <div className="lg:col-span-4 p-4 rounded bg-[#0A0A0C] border border-white/10 space-y-3">
          <h4 className="font-display font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center space-x-2 border-b border-white/10 pb-2">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Gene Replacement Frequency</span>
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modifiedComponentsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="category" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#050507',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: '#FFF'
                  }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[2, 2, 0, 0]} barSize={20}>
                  {modifiedComponentsData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={idx % 2 === 0 ? '#3B82F6' : '#6366F1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Favorite Designs & Recent Modification Log */}
        <div className="lg:col-span-8 p-4 rounded bg-[#0A0A0C] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Favorite Designs List */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 border-b border-white/10 pb-1.5">
              <Bookmark className="w-3.5 h-3.5 text-blue-400" />
              <span>Saved Designs & Projects</span>
            </h5>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {savedDesigns.length > 0 ? (
                savedDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between hover:border-white/10 transition-all group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-1.5">
                        <h6 className="text-[11px] font-bold text-slate-200 font-mono uppercase truncate max-w-[130px] sm:max-w-[180px]">
                          {design.name}
                        </h6>
                      </div>
                      <p className="text-[8px] text-slate-500 font-mono uppercase">
                        RANGE: {design.specs.rangeKm}KM | WT: {design.specs.weightKg}KG | SPD: {design.specs.topSpeedKmh} KM/H
                      </p>
                      {design.description && (
                        <p className="text-[9px] text-slate-400 truncate max-w-[150px] sm:max-w-[200px]">
                          {design.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectDesign(design.id)}
                        className="p-1 rounded bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-all cursor-pointer"
                        title="Edit design"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteDesign(design.id)}
                        className="p-1.5 rounded bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white transition-all cursor-pointer"
                        title="Delete design"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-[10px] font-mono uppercase">
                  No active saved designs.
                </div>
              )}
            </div>
          </div>

          {/* Recent Audited Modification Timeline */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-[10px] text-slate-400 uppercase tracking-wider flex items-center space-x-1.5 border-b border-white/10 pb-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>R&D Audit Timeline</span>
            </h5>
            <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
              {recentModifications.length > 0 ? (
                recentModifications.map((mod, idx) => (
                  <div key={idx} className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-blue-400 font-mono font-bold uppercase">{mod.type}</span>
                      <span className="text-[8px] text-slate-500 font-mono">{mod.timestamp}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-tight">
                      Modified <strong className="text-slate-100 font-mono text-[9px]">{mod.componentName}</strong> in {mod.vehicleName}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs font-mono">
                  No active session modifications detected.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
