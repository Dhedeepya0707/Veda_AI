/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, GitBranch, Layers, ShieldCheck, Zap, ArrowRight, Dna, Database, Terminal, Settings } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const genomeNodes = [
    { x: 200, y: 150, label: 'PWR-TX Powertrain', color: '#10B981' },
    { x: 350, y: 80, label: 'BAT-4680 Energy Core', color: '#3B82F6' },
    { x: 500, y: 120, label: 'DRV-MON Driver Analytics', color: '#A855F7' },
    { x: 500, y: 280, label: 'NAV-RTK Guidance System', color: '#F43F5E' },
    { x: 350, y: 320, label: 'CHAS-AL Mega-Casting', color: '#EC4899' },
    { x: 200, y: 250, label: 'THM-OCTO Intelligent Valve', color: '#06B6D4' },
    { x: 350, y: 200, label: 'SYS-ECU Neural Compute', color: '#6366F1' },
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 font-sans selection:bg-purple-600/40 select-none overflow-x-hidden relative">
      {/* Dynamic Background Network Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-800/60 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px]">
            <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              TECHNOLOGY GENOME AI
            </div>
            <div className="text-[9px] font-mono tracking-widest text-cyan-400">
              ENTERPRISE PLATFORM v4.8
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs font-mono text-slate-400">
          <span className="flex items-center space-x-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AI CORE LIVE</span>
          </span>
          <button
            onClick={onStart}
            className="px-4 py-2 rounded-md bg-indigo-600/30 border border-indigo-500/40 hover:bg-indigo-600/50 hover:border-indigo-400 text-indigo-200 transition-all font-semibold"
          >
            Launch Core Console
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-indigo-950/40 border border-indigo-500/30 rounded-full px-3.5 py-1 text-xs text-indigo-300 font-mono">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>OEM Industrial PLM & Design Synthesis</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-100 to-slate-400">
            Evolve Automotive Design via <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">
              Technology Genomes
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
            Treat individual engineering subsystems as digital "genes". Edit, replace, combine, and inherit components from multiple vehicle designs. AI dynamically calculates safety ratings, thermal loops, manufacturing costs, and recommendations in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onStart}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:opacity-90 font-medium tracking-wide shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center space-x-3 cursor-pointer group"
            >
              <span>Open Engineering Workspace</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center space-x-4 text-xs font-mono text-slate-500 px-4">
              <span>99.8% Reliability Model</span>
              <span>•</span>
              <span>Tesla & Porsche Specs Preloaded</span>
            </div>
          </div>
        </div>

        {/* Dynamic Genome Animation Area */}
        <div className="lg:col-span-6 flex justify-center relative">
          <div className="w-full max-w-[550px] aspect-square rounded-2xl glass-panel border border-slate-800/80 p-6 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute inset-0 bg-radial-gradient(from_center,rgba(59,130,246,0.05)_0%,transparent_100%) pointer-events-none" />

            {/* Header within block */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-xs text-slate-400 font-bold">SYSTEM-MUTATION-GRAPH_MAP</span>
              </div>
              <div className="flex items-center space-x-1.5 font-mono text-[10px] text-cyan-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>DYNAMIC INTEGRATION SCANNER</span>
              </div>
            </div>

            {/* SVG Genome Network */}
            <div className="relative flex-grow flex items-center justify-center py-6">
              <svg width="100%" height="100%" viewBox="0 0 700 400" className="w-full h-full overflow-visible">
                {/* Connector Lines */}
                {genomeNodes.map((node, idx) => {
                  const targetNode = genomeNodes[(idx + 1) % genomeNodes.length];
                  return (
                    <line
                      key={`line-${idx}`}
                      x1={node.x}
                      y1={node.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke="rgba(99, 102, 241, 0.15)"
                      strokeWidth="2"
                      strokeDasharray={idx % 2 === 0 ? '5,5' : '0'}
                      className="transition-all"
                    />
                  );
                })}

                {/* Inner Central CPU Hub Links */}
                {genomeNodes.map((node, idx) => (
                  <line
                    key={`hub-line-${idx}`}
                    x1={350}
                    y1={200}
                    x2={node.x}
                    y2={node.y}
                    stroke={activeNode === idx ? node.color : 'rgba(56, 189, 248, 0.08)'}
                    strokeWidth={activeNode === idx ? '2.5' : '1'}
                    className="transition-all duration-300"
                  />
                ))}

                {/* Pulsing Radiation Ring */}
                <circle
                  cx={350}
                  cy={200}
                  r={80 + Math.sin(pulse * 0.05) * 15}
                  fill="none"
                  stroke="rgba(168, 85, 247, 0.06)"
                  strokeWidth="2"
                />

                {/* Nodes */}
                {genomeNodes.map((node, idx) => (
                  <g
                    key={`node-${idx}`}
                    onMouseEnter={() => setActiveNode(idx)}
                    onMouseLeave={() => setActiveNode(null)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={activeNode === idx ? 14 : 9}
                      fill={activeNode === idx ? node.color : '#0F172A'}
                      stroke={node.color}
                      strokeWidth="3"
                      className="transition-all duration-300 shadow-lg"
                    />
                    {/* Ring highlight */}
                    {activeNode === idx && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={22}
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1"
                        className="animate-ping"
                      />
                    )}
                    <text
                      x={node.x}
                      y={node.y - 18}
                      textAnchor="middle"
                      fill={activeNode === idx ? '#FFF' : 'rgba(255,255,255,0.6)'}
                      className="font-mono text-[9px] font-medium select-none pointer-events-none transition-colors"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Footer Specifications Info */}
            <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between font-mono text-[10px] text-slate-500">
              <div className="flex items-center space-x-1.5">
                <Settings className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                <span>GENE: {activeNode !== null ? genomeNodes[activeNode].label.split(' ')[0] : 'STANDBY'}</span>
              </div>
              <div>COORDINATION MATCH: 100% SECURE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Architecture Demonstration */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-800/50 bg-[#0A0E1A]/40">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Automotive PLM Architecture
          </h2>
          <p className="text-slate-400 text-sm">
            Evolve complex engineering specifications inside a sandboxed industrial simulation layer backed by deep artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl glass-panel relative overflow-hidden flex flex-col justify-between h-48 border border-slate-800/80">
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold font-display text-slate-200">AI Reasoning Core</h3>
              <p className="text-xs text-slate-400">
                Calculates thermal dissipation coefficients, weight balance changes, safety envelopes, and battery charging curves.
              </p>
            </div>
            <div className="font-mono text-[9px] text-emerald-400">MODEL: gemini-3.5-flash</div>
          </div>

          <div className="p-6 rounded-xl glass-panel relative overflow-hidden flex flex-col justify-between h-48 border border-slate-800/80">
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 w-fit">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold font-display text-slate-200">Gene Inheritance</h3>
              <p className="text-xs text-slate-400">
                Inherit subsystems from multiple platforms. Swap a motor, battery, or chassis mold and immediately review physical fit.
              </p>
            </div>
            <div className="font-mono text-[9px] text-blue-400">PLATFORM: Palladium & CLAR</div>
          </div>

          <div className="p-6 rounded-xl glass-panel relative overflow-hidden flex flex-col justify-between h-48 border border-slate-800/80">
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 w-fit">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold font-display text-slate-200">Dependency Graph</h3>
              <p className="text-xs text-slate-400">
                Tracks cross-system linkages. Alerts engineers instantly when battery voltage swaps alter the thermal water flow loop.
              </p>
            </div>
            <div className="font-mono text-[9px] text-purple-400">CONNECTIONS: Auto-Mapped</div>
          </div>

          <div className="p-6 rounded-xl glass-panel relative overflow-hidden flex flex-col justify-between h-48 border border-slate-800/80">
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold font-display text-slate-200">Version Timeline</h3>
              <p className="text-xs text-slate-400">
                Complete audit control. Save production snapshots, duplicate prototypes, or restore experimental battery designs.
              </p>
            </div>
            <div className="font-mono text-[9px] text-cyan-400">PERSISTENCE: Active Tracking</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/40 py-10 text-center text-xs text-slate-500 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p>© 2026 Technology Genome AI Inc. Developed for automotive R&D clusters and tier-1 suppliers.</p>
        <p className="font-mono text-[10px] text-cyan-500">INDUSTRIAL-STRENGTH CAD COMPLIANT SYSTEM</p>
      </footer>
    </div>
  );
}
