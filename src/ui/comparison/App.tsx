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
import { TierPredictability } from './sections/TierPredictability';
import { TokensPerSecond } from './sections/TokensPerSecond';
import type { ComparisonData } from './types';

const data = rawData as ComparisonData;

export function App() {
  const runLabels = useMemo(() => data.runs.map((r) => r.label), []);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">SA3 Benchmark Comparison Dashboard</h1>
            <p className="text-slate-400">
              Comparing {data.runs.length} runs across {data.functions.length} functions
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

        {/* Summary Cards */}
        <SummaryCards data={data} />

        {/* 1. Comparison Table */}
        <Section title="Per-Function Comparison" subtitle="Outcome, best match, attempts, and duration across all runs">
          <ComparisonTable data={data} />
        </Section>

        {/* 2. Duration Comparison */}
        <Section
          title="Duration Comparison"
          subtitle="Per-function duration across runs, highlighting functions that account for most time differences"
        >
          <DurationComparison data={data} runLabels={runLabels} />
        </Section>

        {/* 3. Attempt Trajectory */}
        <Section
          title="Attempt Trajectory per Function"
          subtitle="Match progress (difference count) across attempts, all runs overlaid"
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
          subtitle="Output throughput and how it changes over time within each run"
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
          subtitle="How much did the decomp-permuter help across runs?"
        >
          <PermuterContribution data={data} runLabels={runLabels} />
        </Section>

        {/* 8. m2c Contribution */}
        <Section title="m2c Contribution" subtitle="Starting point quality from m2c and its effect on AI success">
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
        const tokensPerSec = totalOutputTokens / (totalAiDuration / 1000);
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
