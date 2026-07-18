/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car, LayoutDashboard, Database, Dna, Settings, Power,
  ShieldCheck, HelpCircle, Terminal, User
} from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import VehicleRepo from './components/VehicleRepo';
import GenomeEditor from './components/GenomeEditor';
import { INITIAL_VEHICLES } from './data/vehicles';
import { SavedDesign, EngineeringComponent, BaseSpecs } from './types';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'repo'>('dashboard');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  // Modification history shared log context
  const [recentModifications, setRecentModifications] = useState<Array<{
    vehicleName: string;
    componentName: string;
    timestamp: string;
    type: string;
  }>>([
    {
      vehicleName: 'Model S Plaid',
      componentName: 'Mega-Casting Aluminum/Steel Hybrid',
      timestamp: '11:15 AM',
      type: 'BASELINE'
    }
  ]);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(['tesla-s', 'porsche-taycan']);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleAddModificationLog = (log: {
    vehicleName: string;
    componentName: string;
    timestamp: string;
    type: string;
  }) => {
    setRecentModifications((prev) => [log, ...prev]);
  };

  // Switch to vehicle genome editor
  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
    setSelectedDesignId(null);
  };

  // Saved designs & active projects state
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>(() => {
    const local = localStorage.getItem('genome_saved_designs');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        // Fallback
      }
    }
    // Initialize with a default saved design
    const defaultDesign: SavedDesign = {
      id: 'design-tesla-s-perf',
      vehicleId: 'tesla-s',
      name: 'Model S Plaid - Hyper-Battery Edition',
      description: 'Modified with Solid State battery and custom cooling lines.',
      timestamp: '11:15 AM',
      specs: { ...INITIAL_VEHICLES['tesla-s'].baseSpecs, rangeKm: 820, weightKg: 2050, innovationScore: 98 },
      components: { ...INITIAL_VEHICLES['tesla-s'].components }
    };
    return [defaultDesign];
  });

  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);

  // Persist saved designs
  useEffect(() => {
    localStorage.setItem('genome_saved_designs', JSON.stringify(savedDesigns));
  }, [savedDesigns]);

  const handleSaveDesign = (
    name: string,
    description: string,
    components: Record<string, EngineeringComponent>,
    specs: BaseSpecs
  ) => {
    if (selectedDesignId) {
      // Edit existing saved design
      setSavedDesigns((prev) =>
        prev.map((d) =>
          d.id === selectedDesignId
            ? {
                ...d,
                name,
                description,
                components,
                specs,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }
            : d
        )
      );
      handleAddModificationLog({
        vehicleName: name,
        componentName: 'Saved Design Updated',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'SAVE'
      });
    } else if (selectedVehicleId) {
      // Save as new design
      const newDesign: SavedDesign = {
        id: `design-${Date.now()}`,
        vehicleId: selectedVehicleId,
        name,
        description,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        specs,
        components,
      };
      setSavedDesigns((prev) => [newDesign, ...prev]);
      setSelectedDesignId(newDesign.id);
      setSelectedVehicleId(null);
      handleAddModificationLog({
        vehicleName: name,
        componentName: 'New Design Committed',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'SAVE'
      });
    }
  };

  const handleDeleteDesign = (id: string) => {
    setSavedDesigns((prev) => prev.filter((d) => d.id !== id));
    if (selectedDesignId === id) {
      setSelectedDesignId(null);
    }
  };

  // Find vehicle being edited (either a base vehicle or from a saved design)
  let activeVehicle: any = null;
  if (selectedDesignId) {
    const design = savedDesigns.find((d) => d.id === selectedDesignId);
    if (design) {
      const baseVehicle = INITIAL_VEHICLES[design.vehicleId];
      if (baseVehicle) {
        activeVehicle = {
          ...baseVehicle,
          name: design.name, // Display the custom name
          components: design.components,
          baseSpecs: design.specs,
        };
      }
    }
  } else if (selectedVehicleId) {
    activeVehicle = INITIAL_VEHICLES[selectedVehicleId];
  }

  if (!isStarted) {
    return <LandingPage onStart={() => setIsStarted(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#050507] text-[#D1D5DB] font-sans selection:bg-blue-600/40 select-none overflow-x-hidden flex flex-col justify-between">
      {/* Background ambient network arrays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-900/5 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-900/5 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.015] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:25px_25px]" />
      </div>

      {/* Primary Header */}
      <header className="relative z-20 h-14 border-b border-white/10 bg-black/60 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setSelectedVehicleId(null)}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded flex items-center justify-center font-bold text-white italic">
            G
          </div>
          <div>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-blue-400 block">
              Technology Genome AI
            </span>
            <span className="font-mono text-[8px] text-slate-400/80 tracking-wide uppercase block">
              Enterprise Engineering Design Evolution Platform
            </span>
          </div>
        </div>

        {/* Global User status/system information */}
        <div className="flex items-center space-x-6 text-[10px] font-mono">
          <div className="hidden md:flex flex-col border-l border-white/20 pl-4">
            <span className="opacity-40 uppercase">Cluster Session</span>
            <span className="text-blue-200">Suryacharan R&D [EV-900]</span>
          </div>
          <div className="hidden md:flex flex-col border-l border-white/20 pl-4">
            <span className="opacity-40 uppercase">System Integrity</span>
            <span className="text-emerald-400 font-bold">STABLE SHIELD_OK</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsStarted(false)}
              className="px-3 py-1.5 border border-white/20 text-[10px] font-bold rounded hover:bg-white/5 transition-colors cursor-pointer text-[#D1D5DB] flex items-center space-x-1.5"
              title="Terminate session"
            >
              <Power className="w-3 h-3 text-rose-400" />
              <span>EXIT CONSOLE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Console Layout */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Rail Sidebar - Hidden when inside editor to maximize workspace focus */}
        {!activeVehicle && (
          <aside className="lg:col-span-3 p-3.5 rounded bg-[#0A0A0C] border border-white/10 space-y-4">
            <div className="border-b border-white/10 pb-2 flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">R&D CLUSTER RAILS</span>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`w-full px-3 py-2 rounded text-left flex items-center space-x-2.5 transition-colors text-[11px] font-mono font-bold uppercase cursor-pointer ${
                  currentTab === 'dashboard'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-[#D1D5DB]/60 hover:text-[#D1D5DB] hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                <span>ANALYTICS DECK</span>
              </button>

              <button
                onClick={() => setCurrentTab('repo')}
                className={`w-full px-3 py-2 rounded text-left flex items-center space-x-2.5 transition-colors text-[11px] font-mono font-bold uppercase cursor-pointer ${
                  currentTab === 'repo'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-[#D1D5DB]/60 hover:text-[#D1D5DB] hover:bg-white/5'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span>PLATFORM INDEX</span>
              </button>
            </nav>

            <div className="pt-3 border-t border-white/10 text-[9px] text-slate-500 font-mono space-y-1 leading-normal uppercase">
              <p>WORKSPACE STATUS: SECURE</p>
              <p>INTELLIGENT RE-ENGINEERING: OK</p>
              <p>SESSION TOKEN: SHA256_ACTIVE</p>
            </div>
          </aside>
        )}

        {/* Dynamic Viewports Content */}
        <section className={activeVehicle ? 'lg:col-span-12 w-full' : 'lg:col-span-9 w-full'}>
          {activeVehicle ? (
            <GenomeEditor
              vehicle={activeVehicle}
              onBack={() => { setSelectedVehicleId(null); setSelectedDesignId(null); }}
              onAddModificationLog={handleAddModificationLog}
              onSaveDesign={handleSaveDesign}
            />
          ) : currentTab === 'dashboard' ? (
            <Dashboard
              onNavigateToRepo={() => setCurrentTab('repo')}
              vehiclesCount={Object.keys(INITIAL_VEHICLES).length}
              versionsCount={savedDesigns.length}
              predictionsCount={recentModifications.length}
              recentModifications={recentModifications}
              savedDesigns={savedDesigns}
              onSelectDesign={(id) => { setSelectedDesignId(id); setSelectedVehicleId(null); }}
              onDeleteDesign={handleDeleteDesign}
            />
          ) : (
            <VehicleRepo
              vehicles={INITIAL_VEHICLES}
              onSelectVehicle={handleSelectVehicle}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-4 text-center text-[9px] text-slate-500 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono">
          <p>© 2026 Technology Genome AI. Licensed for Tier-1 Industrial R&D and Aerospace Operations.</p>
          <div className="flex items-center space-x-1.5 text-blue-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>ISO 26262 ROAD VEHICLES FUNCTIONAL SAFETY COMPLIANT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
