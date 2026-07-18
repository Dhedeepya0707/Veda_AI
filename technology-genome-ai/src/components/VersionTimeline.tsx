/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bookmark, Clock, RotateCcw, Trash2, Copy, FileCode, Check } from 'lucide-react';
import { SavedVersion } from '../types';

interface VersionTimelineProps {
  versions: SavedVersion[];
  currentVersionId: string | null;
  onRestore: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveCurrent: (name: string, description: string) => void;
}

export default function VersionTimeline({
  versions,
  currentVersionId,
  onRestore,
  onDuplicate,
  onDelete,
  onSaveCurrent
}: VersionTimelineProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSaveCurrent(name, description);
    setName('');
    setDescription('');
  };

  const handleCopyHash = (id: string) => {
    navigator.clipboard.writeText(`sha256:d8c0b89f_${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 animate-fade-in">
      {/* Left panel: Save new version snapshot */}
      <div className="lg:col-span-4 p-3.5 rounded bg-[#0A0A0C] border border-white/10 space-y-3">
        <h3 className="font-mono font-bold text-[11px] text-slate-200 uppercase tracking-wider border-b border-white/10 pb-1.5">
          Commit Design Milestone
        </h3>
        <p className="text-[10px] leading-relaxed text-slate-400">
          Capture the current technology genome map as an immutable snapshot in the Product Lifecycle Management (PLM) repository.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[9px] text-slate-500 font-mono block font-bold">SNAPSHOT NAME</label>
            <input
              type="text"
              placeholder="e.g., Experimental Solid-State Prototype"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-2 py-1.5 bg-black/40 border border-white/10 rounded text-slate-200 text-[11px] focus:outline-none focus:border-blue-500 font-mono placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] text-slate-500 font-mono block font-bold">DESCRIPTION / ENGINEERING LOG</label>
            <textarea
              placeholder="Record changes, structural reinforcement updates, and thermal loop parameters..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 py-1.5 bg-black/40 border border-white/10 rounded text-slate-200 text-[11px] focus:outline-none focus:border-blue-500 font-sans resize-none placeholder:text-slate-600"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-slate-100 font-bold font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center space-x-1.5 shadow"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Design Milestone</span>
          </button>
        </form>
      </div>

      {/* Right panel: Version history list */}
      <div className="lg:col-span-8 p-3.5 rounded bg-[#0A0A0C] border border-white/10 space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <h3 className="font-mono font-bold text-[11px] text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Product Lifecycle Timeline Ledger</span>
          </h3>
          <span className="text-[9px] text-slate-500 font-mono">CAD SHA256 ENABLED</span>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {versions.length > 0 ? (
            versions.map((version, idx) => {
              const activeCount = Object.keys(version.components).length;
              const isCurrent = version.id === currentVersionId;

              return (
                <div
                  key={version.id}
                  className={`p-2.5 rounded border relative transition-all duration-200 ${
                    isCurrent
                      ? 'bg-blue-950/10 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.05)]'
                      : 'bg-black/20 border-white/5 hover:bg-black/35 hover:border-white/10'
                  }`}
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 bottom-0 left-0 w-0.5 rounded-l ${isCurrent ? 'bg-blue-500' : 'bg-slate-800'}`} />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1 pl-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[11px] text-slate-200">
                          {version.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-900 px-1.5 py-0.5 rounded uppercase">
                            Active Design Workspace
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-normal">
                        {version.description || 'No engineering log recorded for this revision.'}
                      </p>
                      <div className="flex items-center space-x-2 pt-0.5 text-[9px] text-slate-500 font-mono">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-600" />
                          <span>{version.timestamp}</span>
                        </span>
                        <span>•</span>
                        <span>{activeCount} active genes mapped</span>
                        <span>•</span>
                        <button
                          onClick={() => handleCopyHash(version.id)}
                          className="hover:text-slate-300 flex items-center space-x-1 cursor-pointer"
                        >
                          <FileCode className="w-3 h-3 text-slate-600" />
                          <span>
                            {copiedId === version.id ? 'Copied' : `sha:d8c0b89f_${version.id.slice(0, 4)}`}
                          </span>
                          {copiedId === version.id && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 self-start md:self-center font-mono">
                      {/* Restore */}
                      <button
                        onClick={() => onRestore(version.id)}
                        title="Restore design"
                        className="p-1.5 rounded bg-black/60 border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => onDuplicate(version.id)}
                        title="Duplicate snapshot"
                        className="p-1.5 rounded bg-black/60 border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 transition-colors cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDelete(version.id)}
                        title="Delete snapshot"
                        disabled={versions.length === 1}
                        className="p-1.5 rounded bg-black/60 border border-white/10 text-rose-500/80 hover:text-rose-400 hover:border-rose-900/40 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-slate-500 font-mono text-xs">
              Timeline ledger is empty. Commit your first design milestone.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
