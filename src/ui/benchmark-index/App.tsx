import logoUrl from '@ui-shared/assets/logo.png';

import indexData from './index-data.json';

interface RunSummary {
  label: string;
  successRate: number;
  successCount: number;
  totalPrompts: number;
  totalDurationMs: number;
  totalCost: number;
  tokensPerSec: number;
  totalAttempts: number;
  avgAttempts: number;
  softTimeouts: number;
  hardTimeouts: number;
  ttftTimeouts: number;
  m2cMatches: number;
  permuterMatches: number;
  claudeMatches: number;
}

interface ProjectSummary {
  project: string;
  platform: string;
  totalFunctions: number;
  runs: RunSummary[];
  flipped: number;
  alwaysSuccess: number;
  alwaysFail: number;
}

const projects = indexData as { sa3: ProjectSummary; af: ProjectSummary };
const base = import.meta.env.BASE_URL;

export function App() {
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-150" />
            <img src={logoUrl} alt="Mizuchi" className="relative w-24 h-24 object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Mizuchi
            </span>
            <span className="text-white ml-3">Benchmark Results</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Automated decompilation pipeline performance across retro game projects.
            Each project runs 30 functions through the pipeline multiple times to measure
            success rate, cost, and consistency.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-2 gap-8">
          <ProjectCard project={projects.sa3} href={`${base}comparison/`} accentFrom="#06b6d4" accentTo="#0891b2" />
          <ProjectCard project={projects.af} href={`${base}comparison-af/`} accentFrom="#a855f7" accentTo="#7c3aed" />
        </div>

        {/* Cross-Platform Analysis Card */}
        <div className="mt-8">
          <a
            href={`${base}aggregated/`}
            className="block bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600/70 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 group"
          >
            <div className="h-1.5" style={{ background: 'linear-gradient(to right, #06b6d4, #a855f7)' }} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  Cross-Platform Analysis
                </h2>
                <svg
                  className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm mb-4">
                Head-to-head comparison of pipeline behavior on GBA/ARM/GCC vs N64/MIPS/IDO
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-slate-300">SA3: {(projects.sa3.runs.reduce((s, r) => s + r.successRate, 0) / projects.sa3.runs.length).toFixed(1)}% match rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="text-slate-300">AF: {(projects.af.runs.reduce((s, r) => s + r.successRate, 0) / projects.af.runs.length).toFixed(1)}% match rate</span>
                </div>
                <span className="text-slate-500">{projects.sa3.totalFunctions + projects.af.totalFunctions} functions across 6 runs</span>
              </div>
            </div>
          </a>
        </div>

        {/* Cross-Project Summary */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Cross-Project Comparison</h2>
          <div className="bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-5 text-slate-400 font-medium">Metric</th>
                  <th className="text-center py-3 px-5 text-cyan-400 font-medium">{projects.sa3.project}</th>
                  <th className="text-center py-3 px-5 text-purple-400 font-medium">{projects.af.project}</th>
                </tr>
              </thead>
              <tbody>
                <CompRow label="Platform" sa3={projects.sa3.platform} af={projects.af.platform} />
                <CompRow
                  label="Best Success Rate"
                  sa3={`${Math.max(...projects.sa3.runs.map((r) => r.successRate)).toFixed(1)}%`}
                  af={`${Math.max(...projects.af.runs.map((r) => r.successRate)).toFixed(1)}%`}
                />
                <CompRow
                  label="Avg Cost / Run"
                  sa3={`$${(projects.sa3.runs.reduce((s, r) => s + r.totalCost, 0) / projects.sa3.runs.length).toFixed(2)}`}
                  af={`$${(projects.af.runs.reduce((s, r) => s + r.totalCost, 0) / projects.af.runs.length).toFixed(2)}`}
                />
                <CompRow
                  label="Avg Cost / Match"
                  sa3={`$${(projects.sa3.runs.reduce((s, r) => s + r.totalCost, 0) / projects.sa3.runs.reduce((s, r) => s + r.successCount, 0)).toFixed(2)}`}
                  af={`$${(projects.af.runs.reduce((s, r) => s + r.totalCost, 0) / projects.af.runs.reduce((s, r) => s + r.successCount, 0)).toFixed(2)}`}
                />
                <CompRow
                  label="m2c Matches (avg)"
                  sa3={`${(projects.sa3.runs.reduce((s, r) => s + r.m2cMatches, 0) / projects.sa3.runs.length).toFixed(0)}`}
                  af={`${(projects.af.runs.reduce((s, r) => s + r.m2cMatches, 0) / projects.af.runs.length).toFixed(0)}`}
                />
                <CompRow
                  label="Permuter Matches (avg)"
                  sa3={`${(projects.sa3.runs.reduce((s, r) => s + r.permuterMatches, 0) / projects.sa3.runs.length).toFixed(0)}`}
                  af={`${(projects.af.runs.reduce((s, r) => s + r.permuterMatches, 0) / projects.af.runs.length).toFixed(0)}`}
                />
                <CompRow
                  label="Outcome Stability"
                  sa3={`${projects.sa3.flipped} flipped / ${projects.sa3.totalFunctions} total`}
                  af={`${projects.af.flipped} flipped / ${projects.af.totalFunctions} total`}
                />
                <CompRow
                  label="Always Matched"
                  sa3={`${projects.sa3.alwaysSuccess} (${((projects.sa3.alwaysSuccess / projects.sa3.totalFunctions) * 100).toFixed(0)}%)`}
                  af={`${projects.af.alwaysSuccess} (${((projects.af.alwaysSuccess / projects.af.totalFunctions) * 100).toFixed(0)}%)`}
                />
                <CompRow
                  label="Never Matched"
                  sa3={`${projects.sa3.alwaysFail} (${((projects.sa3.alwaysFail / projects.sa3.totalFunctions) * 100).toFixed(0)}%)`}
                  af={`${projects.af.alwaysFail} (${((projects.af.alwaysFail / projects.af.totalFunctions) * 100).toFixed(0)}%)`}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-slate-600 text-xs">
          Generated by Mizuchi — Plugin-based pipeline runner for matching decompilation projects
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  href,
  accentFrom,
  accentTo,
}: {
  project: ProjectSummary;
  href: string;
  accentFrom: string;
  accentTo: string;
}) {
  const avgSuccessRate = project.runs.reduce((s, r) => s + r.successRate, 0) / project.runs.length;
  const totalCost = project.runs.reduce((s, r) => s + r.totalCost, 0);
  const avgCost = totalCost / project.runs.length;

  return (
    <a
      href={href}
      className="block bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600/70 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 group"
    >
      {/* Gradient accent bar */}
      <div className="h-1.5" style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }} />

      <div className="p-6">
        {/* Title */}
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
            {project.project}
          </h2>
          <svg
            className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
        <p className="text-slate-500 text-sm mb-5">{project.platform}</p>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <MetricBox
            label="Avg Match Rate"
            value={`${avgSuccessRate.toFixed(1)}%`}
            color={avgSuccessRate >= 75 ? 'text-emerald-400' : avgSuccessRate >= 50 ? 'text-yellow-400' : 'text-red-400'}
          />
          <MetricBox label="Avg Cost / Run" value={`$${avgCost.toFixed(2)}`} color="text-white" />
          <MetricBox label="Runs" value={String(project.runs.length)} color="text-white" />
        </div>

        {/* Per-run mini table */}
        <div className="bg-slate-900/40 rounded-lg p-3">
          <div className="grid grid-cols-4 gap-2 text-xs mb-2">
            <div className="text-slate-500">Run</div>
            <div className="text-slate-500 text-center">Matched</div>
            <div className="text-slate-500 text-center">Cost</div>
            <div className="text-slate-500 text-center">Duration</div>
          </div>
          {project.runs.map((run, i) => (
            <div key={i} className="grid grid-cols-4 gap-2 text-xs py-1 border-t border-slate-800/50">
              <div className="text-slate-400 truncate">{run.label}</div>
              <div className="text-center text-slate-300">
                {run.successCount}/{run.totalPrompts}
              </div>
              <div className="text-center text-slate-300">${run.totalCost.toFixed(2)}</div>
              <div className="text-center text-slate-300">{formatDuration(run.totalDurationMs)}</div>
            </div>
          ))}
        </div>

        {/* Stability badge */}
        <div className="mt-4 flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              project.flipped <= 2
                ? 'bg-emerald-500/15 text-emerald-400'
                : project.flipped <= 5
                  ? 'bg-yellow-500/15 text-yellow-400'
                  : 'bg-red-500/15 text-red-400'
            }`}
          >
            {project.flipped === 0 ? 'Perfectly stable' : `${project.flipped} function${project.flipped !== 1 ? 's' : ''} flipped between runs`}
          </span>
        </div>
      </div>
    </a>
  );
}

function MetricBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-slate-500 text-xs mt-0.5">{label}</div>
    </div>
  );
}

function CompRow({ label, sa3, af }: { label: string; sa3: string; af: string }) {
  return (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/20">
      <td className="py-2.5 px-5 text-slate-300 font-medium">{label}</td>
      <td className="py-2.5 px-5 text-center text-slate-300">{sa3}</td>
      <td className="py-2.5 px-5 text-center text-slate-300">{af}</td>
    </tr>
  );
}

function formatDuration(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}
