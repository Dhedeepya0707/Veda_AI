/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GitBranch, ShieldAlert } from 'lucide-react';
import { DependencyLink } from '../types';

interface DependencyGraphProps {
  dependencies: DependencyLink[];
  selectedComponent: string | null;
}

export default function DependencyGraph({ dependencies, selectedComponent }: DependencyGraphProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handle = requestAnimationFrame(function animate() {
      setOffset((prev) => (prev - 0.4) % 20);
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Standard graph layout configuration
  // Let's lay out nodes in a structured ring or grid depending on the dependencies
  // We'll map the unique nodes in the dependencies
  const uniqueNodeNames = Array.from(
    new Set(dependencies.flatMap((d) => [d.source, d.target]))
  );

  // Fallback to basic map if empty
  const activeNodes = uniqueNodeNames.length > 0 ? uniqueNodeNames : ['Battery', 'Cooling System', 'Chassis', 'Suspension', 'Inverter'];

  // Map nodes to coordinates
  const nodePositions = activeNodes.reduce<Record<string, { x: number; y: number }>>((acc, node, idx) => {
    // Lay out around a central node (often Battery or Motor)
    if (idx === 0) {
      acc[node] = { x: 300, y: 180 }; // Central hub
    } else {
      const angle = ((idx - 1) / (activeNodes.length - 1)) * Math.PI * 2;
      acc[node] = {
        x: 300 + Math.cos(angle) * 160,
        y: 180 + Math.sin(angle) * 110,
      };
    }
    return acc;
  }, {});

  // Generate connection lists matching node coords
  const linksToRender = dependencies.length > 0 ? dependencies : [
    { source: 'Battery', target: 'Cooling System', type: 'Cooling' as const, severity: 'High' as const },
    { source: 'Battery', target: 'Chassis', type: 'Structural' as const, severity: 'High' as const },
    { source: 'Battery', target: 'Suspension', type: 'Structural' as const, severity: 'Medium' as const },
    { source: 'Battery', target: 'Inverter', type: 'Power' as const, severity: 'High' as const }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 bg-[#0A0A0C] border border-white/10 rounded relative overflow-hidden">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 relative z-10">
        <div className="flex items-center space-x-1.5">
          <GitBranch className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono text-[10px] text-slate-400 font-bold tracking-wider">CROSS-SYSTEM DEPENDENCY SOLVER</span>
        </div>
        <span className="text-[8px] font-mono text-blue-400 bg-blue-950/40 border border-blue-900/50 px-1.5 py-0.5 rounded font-bold uppercase">
          Active Links: {linksToRender.length}
        </span>
      </div>

      {/* Interactive Flow Graph Area */}
      <div className="flex-grow flex items-center justify-center py-4 relative z-10">
        {activeNodes.length > 0 ? (
          <svg viewBox="0 0 600 360" className="w-full max-w-[550px] h-auto overflow-visible select-none">
            {/* Draw flowing link wires */}
            {linksToRender.map((link, idx) => {
              const start = nodePositions[link.source] || { x: 100, y: 100 };
              const end = nodePositions[link.target] || { x: 250, y: 180 };

              // Connection color based on type
              let strokeColor = 'rgba(59, 130, 246, 0.4)';
              if (link.type === 'Cooling') strokeColor = 'rgba(6, 182, 212, 0.5)';
              if (link.type === 'Power') strokeColor = 'rgba(16, 185, 129, 0.5)';
              if (link.type === 'Data' || link.type === 'Signal') strokeColor = 'rgba(168, 85, 247, 0.5)';
              if (link.severity === 'High') strokeColor = 'rgba(239, 68, 68, 0.6)';

              return (
                <g key={`link-${idx}`}>
                  {/* Outer glow trace line */}
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={strokeColor}
                    strokeWidth="2"
                  />
                  {/* Flow dots overlay animation */}
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#FFF"
                    strokeWidth="1.2"
                    strokeDasharray="6,12"
                    strokeDashoffset={offset}
                    className="opacity-70"
                  />
                </g>
              );
            })}

            {/* Draw System Nodes */}
            {Object.keys(nodePositions).map((nodeName, idx) => {
              const pos = nodePositions[nodeName];
              const isCenter = idx === 0;

              return (
                <g key={`node-${idx}`} className="transition-transform duration-300">
                  {/* Outer Pulsing Aura for center focus node */}
                  {isCenter && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={24}
                      fill="none"
                      stroke="rgba(59, 130, 246, 0.2)"
                      strokeWidth="1"
                      className="animate-ping"
                      style={{ animationDuration: '4s' }}
                    />
                  )}
                  {/* Node Circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isCenter ? 16 : 11}
                    fill={isCenter ? '#3B82F6' : '#0F172A'}
                    stroke={isCenter ? '#60A5FA' : 'rgba(255, 255, 255, 0.15)'}
                    strokeWidth="1.5"
                    className="shadow-xl"
                  />
                  {/* Text labels */}
                  <text
                    x={pos.x}
                    y={pos.y + (isCenter ? 28 : 20)}
                    textAnchor="middle"
                    fill="#F1F5F9"
                    className="font-mono text-[8px] font-bold tracking-wide"
                  >
                    {nodeName.toUpperCase()}
                  </text>
                  {/* Small ID Badge Inside Node */}
                  <text
                    x={pos.x}
                    y={pos.y + 3}
                    textAnchor="middle"
                    fill={isCenter ? '#FFF' : '#64748B'}
                    className="font-mono text-[7px] font-bold"
                  >
                    {isCenter ? 'HUB' : `N${idx}`}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="text-center py-10 text-slate-500 font-mono text-xs">
            Awaiting component modification to compute dependencies...
          </div>
        )}
      </div>

      {/* Warning Alert Legend */}
      <div className="border-t border-white/10 pt-2 flex items-center justify-between font-mono text-[8px] text-slate-500 font-bold uppercase">
        <div className="flex items-center space-x-1">
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span>REAL-TIME VOLTAGE/THERMAL LINK MUTATIONS MONITORED</span>
        </div>
        <span>COMPILER OK</span>
      </div>
    </div>
  );
}
