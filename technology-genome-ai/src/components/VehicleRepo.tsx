/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search, Filter, SortAsc, Star, ChevronRight, Fuel, Weight, Zap,
  Car, Layers, Activity, Truck, ChevronLeft, BookOpen, Gauge
} from 'lucide-react';
import { VehicleModel } from '../types';

interface VehicleRepoProps {
  vehicles: Record<string, VehicleModel>;
  onSelectVehicle: (id: string) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function VehicleRepo({
  vehicles,
  onSelectVehicle,
  favorites,
  onToggleFavorite
}: VehicleRepoProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'range' | 'weight'>('score');

  const categories = ['All', 'Sedan', 'SUV', 'Sports Car', 'Hypercar', 'Truck', 'Motorcycle'];

  // Detail definition for visual directory categories
  const categoryDetails = [
    {
      id: 'Sedan',
      title: 'Sedan Platforms',
      subtitle: 'Executive & Long Range',
      icon: Car,
      color: 'from-blue-500/20 to-cyan-500/5',
      borderColor: 'hover:border-blue-500/40',
      textColor: 'text-blue-400',
      description: 'Aerodynamic executive platforms featuring ultra-efficient battery configurations, intelligent chassis damping, and advanced digital twin cockpits.'
    },
    {
      id: 'SUV',
      title: 'Smart SUV',
      subtitle: 'All-Terrain Utility',
      icon: Layers,
      color: 'from-purple-500/20 to-indigo-500/5',
      borderColor: 'hover:border-purple-500/40',
      textColor: 'text-purple-400',
      description: 'Rugged high-clearance smart vehicles engineered with multi-motor terrain management, reinforced structural safety cells, and maximum energy storage capacity.'
    },
    {
      id: 'Sports Car',
      title: 'Sports Car',
      subtitle: 'High-Performance R&D',
      icon: Zap,
      color: 'from-amber-500/20 to-orange-500/5',
      borderColor: 'hover:border-amber-500/40',
      textColor: 'text-amber-400',
      description: 'Precision performance drivers with active torque vectoring, carbon-sleeved high-RPM rotors, adaptive active suspension, and extreme weight-to-power density ratios.'
    },
    {
      id: 'Hypercar',
      title: 'Hypercar',
      subtitle: 'Experimental Mega-Watt',
      icon: Activity,
      color: 'from-rose-500/20 to-pink-500/5',
      borderColor: 'hover:border-rose-500/40',
      textColor: 'text-rose-400',
      description: 'Next-generation hypercars utilizing carbon monocoque safety designs, mega-watt dual-inverter powertrains, and multi-sensor active ADAS/LiDAR arrays.'
    },
    {
      id: 'Truck',
      title: 'Heavy Duty Truck',
      subtitle: 'Logistics & Hauling',
      icon: Truck,
      color: 'from-emerald-500/20 to-teal-500/5',
      borderColor: 'hover:border-emerald-500/40',
      textColor: 'text-emerald-400',
      description: 'Heavy logistics haulers incorporating modular mega-pack battery arrays, multi-axle air-ride frames, heavy-duty braking discs, and active safety autopilot.'
    },
    {
      id: 'Motorcycle',
      title: 'Motorcycle',
      subtitle: 'Urban Agility & Speed',
      icon: Fuel,
      color: 'from-cyan-500/20 to-teal-500/5',
      borderColor: 'hover:border-cyan-500/40',
      textColor: 'text-cyan-400',
      description: 'Ultra-agile electric motorcycles integrating compact high-voltage battery modules, direct drive chains, trellis spaceframes, and central ECU intelligence.'
    }
  ];

  const countByCategory = (catId: string) => {
    return Object.values(vehicles).filter((v) => v.category === catId).length;
  };

  // Filter and sort list
  const filteredVehicles = Object.values(vehicles).filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
                          v.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
                          v.platform.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === null || categoryFilter === 'All' || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'score') return b.performanceScore - a.performanceScore;
    if (sortBy === 'range') return b.rangeKm - a.rangeKm;
    if (sortBy === 'weight') return a.weightKg - b.weightKg; // Lighter is often preferred
    return 0;
  });

  // Prompt View for choosing category before listing
  if (categoryFilter === null) {
    return (
      <div className="space-y-6 animate-fade-in py-2">
        {/* Futuristic Directory Landing Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-8">
          <div className="inline-flex items-center space-x-2 bg-blue-950/40 border border-blue-900/40 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-[9px] text-blue-400 font-bold uppercase tracking-wider">
              AUTHORIZED R&D SPECIFICATION DATABASE
            </span>
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-100 uppercase tracking-tight">
            Select Genome Directory Vertical
          </h2>
          <p className="text-slate-400 font-mono text-[10px] leading-relaxed">
            Choose an engineering category vertical to load its corresponding digital twins, CAD blueprints, and sub-system specifications.
          </p>
        </div>

        {/* Categories Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryDetails.map((cat) => {
            const IconComponent = cat.icon;
            const count = countByCategory(cat.id);
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -3, scale: 1.01 }}
                className={`group relative p-5 rounded bg-[#0A0A0C] border border-white/10 flex flex-col justify-between cursor-pointer transition-all duration-300 ${cat.borderColor} hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]`}
                onClick={() => setCategoryFilter(cat.id)}
              >
                {/* Background ambient glow matching category color */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br ${cat.color} transition-opacity duration-300 rounded pointer-events-none`} />

                {/* Grid Lines simulation inside card */}
                <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* Icon & Count Badges */}
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 ${cat.textColor} group-hover:border-blue-500/30 transition-colors`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/50 border border-white/5 font-mono text-[9px] text-slate-500 font-bold group-hover:text-blue-400 group-hover:border-blue-900/30 transition-all">
                      {count} PLATFORM{count !== 1 ? 'S' : ''} RESOLVED
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5">
                    <h3 className="font-display font-extrabold text-base text-slate-200 uppercase tracking-wide group-hover:text-slate-100">
                      {cat.title}
                    </h3>
                    <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wider">
                      {cat.subtitle}
                    </p>
                    <p className="text-slate-400 font-sans text-xs leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Interactive Prompt */}
                <div className="relative z-10 pt-4 mt-5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-blue-400 transition-colors">
                  <span className="uppercase">INITIALIZE CAD PIPELINE</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global bypass back option */}
        <div className="text-center pt-6">
          <button
            onClick={() => setCategoryFilter('All')}
            className="px-4 py-2 border border-white/10 hover:border-blue-500/30 text-[10px] font-mono text-slate-400 hover:text-blue-400 rounded bg-[#0A0A0C]/50 hover:bg-[#0A0A0C] transition-all cursor-pointer uppercase tracking-wider"
          >
            Bypass to All Categories (Full Fleet View)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCategoryFilter(null)}
            className="p-1.5 rounded border border-white/10 bg-black/40 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-pointer flex items-center justify-center"
            title="Change directory vertical"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="font-display font-bold text-lg text-slate-100 uppercase">
                {categoryFilter === 'All' ? 'Full Fleet Catalog' : `${categoryFilter} Specifications`}
              </h2>
              <span className="px-2 py-0.5 text-[8px] font-mono bg-blue-950/40 border border-blue-900/40 text-blue-400 rounded font-bold uppercase">
                {categoryFilter.toUpperCase()} VERTICAL
              </span>
            </div>
            <p className="text-slate-500 text-[9px] font-mono mt-0.5">SELECT A CORE ARCHITECTURE TO INITIALIZE RE-ENGINEERING</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search platform index..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 w-56 bg-[#0A0A0C] border border-white/10 rounded text-slate-200 text-[11px] focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 font-mono"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-1 bg-[#0A0A0C] border border-white/10 rounded p-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-colors ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort Selection */}
          <div className="flex items-center space-x-1 bg-[#0A0A0C] border border-white/10 rounded p-1.5 text-[10px] text-slate-400">
            <SortAsc className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-200 focus:outline-none text-[9px] font-mono cursor-pointer"
            >
              <option value="score">SORT BY PERFORMANCE</option>
              <option value="range">SORT BY RANGE</option>
              <option value="weight">SORT BY WEIGHT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Flash Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle) => {
          const isFav = favorites.includes(vehicle.id);
          return (
            <div
              key={vehicle.id}
              className="rounded bg-[#0A0A0C] relative overflow-hidden border border-white/10 flex flex-col justify-between group transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            >
              {/* Card Header (Manufacturer, Favorite Button, Categories) */}
              <div className="p-3.5 pb-2 flex items-start justify-between">
                <div>
                  <span className="font-mono text-[8px] font-bold tracking-wider uppercase bg-white/5 border border-white/10 text-blue-400 px-1.5 py-0.5 rounded">
                    {vehicle.manufacturer}
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-200 mt-1.5 group-hover:text-blue-400 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-[9px] text-slate-500 font-mono">PLATFORM: {vehicle.platform}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(vehicle.id);
                  }}
                  className={`p-1.5 rounded border transition-all ${
                    isFav
                      ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                      : 'bg-black/40 border-white/10 text-slate-600 hover:text-slate-400'
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                </button>
              </div>

              {/* Blueprint Blueprint Vector Simulation */}
              <div className="px-3.5 py-1">
                <div className="w-full h-20 rounded bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:bg-black/60 transition-colors">
                  {/* Subtle Grid Lines inside image canvas */}
                  <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:8px_8px]" />
                  
                  {/* EV Outline SVG representing Dassault PLM Style */}
                  <svg className="w-36 h-16 text-slate-800 group-hover:text-blue-500/20 transition-colors" viewBox="0 0 100 50">
                    <path
                      d="M10 35 L12 28 Q15 20 22 20 L40 18 Q55 14 65 20 L78 22 Q85 24 88 30 L90 35 L86 35 A6 6 0 0 0 74 35 L30 35 A6 6 0 0 0 18 35 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeDasharray="1.5,1.5"
                    />
                    {/* Front Wheel */}
                    <circle cx="24" cy="35" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="24" cy="35" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
                    {/* Rear Wheel */}
                    <circle cx="80" cy="35" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="80" cy="35" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
                    {/* Battery indicator bottom center */}
                    <rect x="34" y="32" width="36" height="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  </svg>

                  {/* Rating Label on Blueprint */}
                  <div className="absolute bottom-1 right-1.5 font-mono text-[8px] text-slate-600 uppercase tracking-wide">
                    CAD RESOLVED
                  </div>
                </div>
              </div>

              {/* Primary Specs Grid */}
              <div className="p-3.5 pt-1.5 pb-2 grid grid-cols-2 gap-2 border-t border-b border-white/5 font-mono text-[9px]">
                <div className="space-y-0.5">
                  <p className="text-slate-500 uppercase text-[8px]">BATTERY</p>
                  <p className="text-slate-300 font-medium truncate">{vehicle.batteryType}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-slate-500 uppercase text-[8px]">PROPULSION</p>
                  <p className="text-slate-300 font-medium truncate">{vehicle.motorType}</p>
                </div>
              </div>

              {/* Secondary Metrics Card Footer */}
              <div className="p-3.5 pt-2 pb-2.5 bg-black/20 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Fuel className="w-3 h-3 text-blue-400" />
                    <span className="font-mono text-[10px] text-slate-200 font-bold">{vehicle.rangeKm}</span>
                    <span className="text-[7px] text-slate-500 font-mono">KM</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Weight className="w-3 h-3 text-indigo-400" />
                    <span className="font-mono text-[10px] text-slate-200 font-bold">{vehicle.weightKg}</span>
                    <span className="text-[7px] text-slate-500 font-mono">KG</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <Gauge className="w-3 h-3 text-amber-400" />
                    <span className="font-mono text-[10px] text-slate-200 font-bold">{vehicle.baseSpecs.topSpeedKmh}</span>
                    <span className="text-[7px] text-slate-500 font-mono">KM/H</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="font-mono text-xs text-emerald-400 font-extrabold">{vehicle.performanceScore}/100</div>
                    <div className="text-[8px] text-slate-500 font-mono uppercase">PERF SCORE</div>
                  </div>
                  <button
                    onClick={() => onSelectVehicle(vehicle.id)}
                    className="p-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
