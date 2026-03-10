import logoUrl from '@ui-shared/assets/logo.png';
import { useMemo } from 'react';

import rawData from './comparison-data.json';
import { AttemptTrajectoryCharts } from './sections/AttemptTrajectory';
import { ComparisonTable } from './sections/ComparisonTable';
import { DurationComparison } from './sections/DurationComparison';
import { M2cContribution } from './sections/M2cContribution';
import { PermuterContribution } from './sections/PermuterContribution';
import { PipelinePhaseBreakdown } from './sections/PipelinePhaseBreakdown';
import { TimeoutSummary } from './sections/TimeoutSummary';
import { TokenConsumption } from './sections/TokenConsumption';
import { FirstTryAnalysis } from './sections/FirstTryAnalysis';
import { MatchByAttempt } from './sections/MatchByAttempt';
import { TierPredictability } from './sections/TierPredictability';
import { TokensPerSecond } from './sections/TokensPerSecond';
import type { ComparisonData } from './types';

const data = rawData as ComparisonData;

const REPORT_BASE_URL =
  'https://github.com/macabeus/mizuchi-benchmark-report-sa3-af/releases/download/run-reports';

const AF_REPORTS = [
  { label: 'Run 1 (Mar 7)', file: 'af-run-report-2026-03-07T20-03-42.html' },
  { label: 'Run 2 (Mar 8a)', file: 'af-run-report-2026-03-08T00-55-50.html' },
  { label: 'Run 3 (Mar 8b)', file: 'af-run-report-2026-03-08T02-12-45.html' },
];

export function App() {
  const runLabels = useMemo(() => data.runs.map((r) => r.label), []);

  // Count match sources
  const matchSources = useMemo(() => {
    const sources: Record<string, number[]> = {};
    for (const func of data.functions) {
      for (let i = 0; i < func.runs.length; i++) {
        const src = func.runs[i].matchSource || 'unmatched';
        if (!sources[src]) {
          sources[src] = new Array(data.runs.length).fill(0);
        }
        sources[src][i]++;
      }
    }
    return sources;
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Individual Run Report Links */}
        <div className="mb-6 flex items-center gap-3 text-sm">
          <span className="text-slate-500">Individual run reports:</span>
          {AF_REPORTS.map((r, i) => (
            <a
              key={i}
              href={`${REPORT_BASE_URL}/${r.file}`}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
            >
              {r.label}
            </a>
          ))}
          <span className="text-slate-600 mx-1">|</span>
          <a href="../" className="text-slate-400 hover:text-slate-300 underline underline-offset-2">
            Back to index
          </a>
        </div>

        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Animal Forest Benchmark Comparison Dashboard</h1>
            <p className="text-slate-400">
              Comparing {data.runs.length} runs across {data.functions.length} functions (N64 / MIPS / IDO)
            </p>
            <p className="text-slate-500 text-xs mt-1">
              All runs use the same Mizuchi version — variation is purely from LLM stochasticity and API conditions
            </p>
            <div className="flex gap-6 mt-4">
              {data.runs.map((run, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: ['#06b6d4', '#a855f7', '#f59e0b'][i] }}
                  />
                  <span className="text-slate-300 text-sm">{run.label}</span>
                  <span className="text-slate-500 text-xs">
                    ({run.summary.successfulPrompts}/{run.summary.totalPrompts} matched,{' '}
                    {formatDuration(run.summary.totalDurationMs)})
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <img src={logoUrl} alt="Mizuchi" className="relative w-16 h-16 object-contain drop-shadow-lg" />
          </div>
        </div>

        {/* Match Source Summary — unique to AF */}
        <div className="bg-slate-800/40 rounded-xl p-5 mb-8 border border-slate-700/50">
          <h3 className="text-white font-semibold mb-3">Match Sources</h3>
          <p className="text-slate-500 text-xs mb-3">
            Unlike SA3 (GBA/ARM/GCC), Animal Forest (N64/MIPS/IDO) has functions solved by m2c and permuter alone.
          </p>
          <div className="grid grid-cols-4 gap-4 text-sm">
            {[
              { key: 'programmatic-phase', label: 'm2c (no AI)', color: 'text-emerald-400' },
              { key: 'decomp-permuter', label: 'Permuter (background + programmatic)', color: 'text-purple-400' },
              { key: 'claude', label: 'Claude (AI)', color: 'text-cyan-400' },
              { key: 'unmatched', label: 'Unmatched', color: 'text-red-400' },
            ].map(({ key, label, color }) => (
              <div key={key}>
                <div className={`text-xs ${color} mb-1`}>{label}</div>
                <div className="flex gap-2">
                  {(matchSources[key] || new Array(data.runs.length).fill(0)).map((count, i) => (
                    <span key={i} className="text-white font-medium">
                      {count}
                      {i < data.runs.length - 1 && <span className="text-slate-600 ml-2">/</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCards data={data} />

        {/* 1. Comparison Table */}
        <Section title="Per-Function Comparison" subtitle="Outcome, best match, attempts, and duration across all runs">
          <ComparisonTable data={data} />
        </Section>

        {/* 2. Duration Comparison */}
        <Section
          title="Duration Comparison"
          subtitle="Per-function duration across runs — differences reflect API conditions and LLM variance only"
        >
          <DurationComparison data={data} runLabels={runLabels} />
        </Section>

        {/* 3. Attempt Trajectory */}
        <Section
          title="Attempt Trajectory per Function"
          subtitle="Difference count across attempts, all runs overlaid — how consistent is Claude's approach?"
        >
          <AttemptTrajectoryCharts data={data} runLabels={runLabels} />
        </Section>

        {/* 4. Token Consumption */}
        <Section title="Token Consumption" subtitle="Per-function and aggregate token usage across runs">
          <TokenConsumption data={data} runLabels={runLabels} />
        </Section>

        {/* 5. Tokens/Second */}
        <Section
          title="Tokens/Second per Run"
          subtitle="Output throughput — reflects API performance since Mizuchi version is constant"
        >
          <TokensPerSecond data={data} runLabels={runLabels} />
        </Section>

        {/* 6. Pipeline Phase Breakdown */}
        <Section
          title="Pipeline Phase Breakdown"
          subtitle="Time spent in Claude Runner vs Compiler vs Objdiff per function"
        >
          <PipelinePhaseBreakdown data={data} runLabels={runLabels} />
        </Section>

        {/* 7. Permuter Contribution */}
        <Section
          title="Permuter Contribution"
          subtitle="decomp-permuter solved 3-4 functions per run — a major difference from SA3"
        >
          <PermuterContribution data={data} runLabels={runLabels} />
        </Section>

        {/* 8. m2c Contribution */}
        <Section
          title="m2c Contribution"
          subtitle="4 functions matched by m2c alone (0 AI attempts) — MIPS/IDO decompilation is more effective"
        >
          <M2cContribution data={data} runLabels={runLabels} />
        </Section>

        {/* 9. Timeout Summary */}
        <Section title="Timeout Summary" subtitle="Timeout types and distribution across runs and functions">
          <TimeoutSummary data={data} runLabels={runLabels} />
        </Section>

        {/* 10. Tier Predictability */}
        <Section
          title="Tier Predictability"
          subtitle="Are easy functions really faster and more likely to match than harder ones?"
        >
          <TierPredictability data={data} runLabels={runLabels} />
        </Section>

        {/* 11. First-Try Analysis */}
        <Section
          title="First-Try Match Rate"
          subtitle="How often does Claude match on the first attempt, excluding programmatic-phase matches?"
        >
          <FirstTryAnalysis data={data} runLabels={runLabels} />
        </Section>

        {/* 12. Cumulative Match by Attempt */}
        <Section
          title="Cumulative Match by Attempt"
          subtitle="What percentage of AI-solvable functions are matched by attempt N?"
        >
          <MatchByAttempt data={data} runLabels={runLabels} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
      <p className="text-slate-400 text-sm mb-4">{subtitle}</p>
      {children}
    </section>
  );
}

function SummaryCards({ data }: { data: ComparisonData }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {data.runs.map((run, i) => {
        const totalAttempts = data.functions.reduce((sum, f) => sum + (f.runs[i]?.numAttempts || 0), 0);
        const totalOutputTokens = data.functions.reduce((sum, f) => sum + (f.runs[i]?.totalOutputTokens || 0), 0);
        const totalAiDuration = data.functions.reduce((sum, f) => sum + (f.runs[i]?.aiDurationMs || 0), 0);
        const totalCost = data.functions.reduce((sum, f) => sum + (f.runs[i]?.totalCostUsd || 0), 0);
        const tokensPerSec = totalAiDuration > 0 ? totalOutputTokens / (totalAiDuration / 1000) : 0;
        const borderColor = ['border-cyan-500', 'border-purple-500', 'border-amber-500'][i];

        return (
          <div key={i} className={`bg-slate-800/60 rounded-xl p-5 border-l-4 ${borderColor}`}>
            <h3 className="text-lg font-semibold text-white mb-3">{run.label}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Stat label="Success Rate" value={`${run.summary.successRate.toFixed(1)}%`} />
              <Stat label="Duration" value={formatDuration(run.summary.totalDurationMs)} />
              <Stat label="Attempts" value={String(totalAttempts)} />
              <Stat label="Avg Attempts" value={run.summary.avgAttempts.toFixed(1)} />
              <Stat label="Total Cost" value={`$${totalCost.toFixed(2)}`} />
              <Stat label="Tokens/sec" value={tokensPerSec.toFixed(1)} />
              <Stat label="Output Tokens" value={formatNumber(totalOutputTokens)} />
              <Stat label="Model" value={run.config.model.replace('claude-', '')} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-slate-500 text-xs">{label}</div>
      <div className="text-white font-medium">{value}</div>
    </div>
  );
}

export function formatDuration(ms: number): string {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return String(n);
}
