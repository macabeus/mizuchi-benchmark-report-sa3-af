import logoUrl from '@ui-shared/assets/logo.png';

import rawData from './aggregated-data.json';
import { SuccessRateComparison } from './sections/SuccessRateComparison';
import { CostEfficiency } from './sections/CostEfficiency';
import { PhaseEffectiveness } from './sections/PhaseEffectiveness';
import { DifficultyScatter } from './sections/DifficultyScatter';
import { LlmVariance } from './sections/LlmVariance';
import { TimeoutPatterns } from './sections/TimeoutPatterns';
import { TokenEfficiency } from './sections/TokenEfficiency';
import { FailureAnalysis } from './sections/FailureAnalysis';
import { FirstTryAnalysis } from './sections/FirstTryAnalysis';
import { MatchByAttempt } from './sections/MatchByAttempt';
import { FlippedFunctions } from './sections/FlippedFunctions';
import type { AggregatedData } from './types';
import { PROJECT_COLORS } from './types';

const data = rawData as AggregatedData;

export function App() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Cross-Platform Benchmark Analysis</h1>
            <p className="text-slate-400">
              Comparing pipeline behavior on GBA/ARM/GCC vs N64/MIPS/IDO — 60 functions across 6 runs
            </p>
            <div className="flex gap-6 mt-4">
              {(
                [
                  ['sa3', data.projects.sa3],
                  ['af', data.projects.af],
                ] as const
              ).map(([key, proj]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: PROJECT_COLORS[key] }}
                  />
                  <span className="text-slate-300 text-sm font-medium">{proj.name}</span>
                  <span className="text-slate-500 text-xs">({proj.platform})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <img src={logoUrl} alt="Mizuchi" className="relative w-16 h-16 object-contain drop-shadow-lg" />
          </div>
        </div>

        {/* Summary cards */}
        <SummaryCards data={data} />

        <Section title="1. Success Rate Comparison" subtitle="Overall and per-tier match rates — SA3 vs AF">
          <SuccessRateComparison data={data} />
        </Section>

        <Section title="2. Cost & Efficiency" subtitle="Which platform is more expensive to decompile?">
          <CostEfficiency data={data} />
        </Section>

        <Section title="3. Pipeline Phase Effectiveness" subtitle="How does each pipeline phase contribute across platforms?">
          <PhaseEffectiveness data={data} />
        </Section>

        <Section title="4. Difficulty vs Outcome" subtitle="Does the difficulty curve differ between platforms?">
          <DifficultyScatter data={data} />
        </Section>

        <Section title="5. LLM Variance" subtitle="Is Claude more consistent on one platform?">
          <LlmVariance data={data} />
        </Section>

        <Section title="6. Timeout Patterns" subtitle="Are timeout distributions different across platforms?">
          <TimeoutPatterns data={data} />
        </Section>

        <Section title="7. Token Efficiency" subtitle="Token throughput and conversation growth patterns">
          <TokenEfficiency data={data} />
        </Section>

        <Section title="8. Failure Analysis" subtitle="What do permanently-failed functions have in common?">
          <FailureAnalysis data={data} />
        </Section>

        <Section title="9. Functions That Flipped" subtitle="Cross-run consistency comparison">
          <FlippedFunctions data={data} />
        </Section>

        <Section title="10. First-Try Match Rate" subtitle="How often does Claude match on the very first AI attempt?">
          <FirstTryAnalysis data={data} />
        </Section>

        <Section title="11. Cumulative Match by Attempt" subtitle="What percentage of functions are matched by attempt N?">
          <MatchByAttempt data={data} />
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

function SummaryCards({ data }: { data: AggregatedData }) {
  return (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {(
        [
          ['sa3', data.projects.sa3],
          ['af', data.projects.af],
        ] as const
      ).map(([key, proj]) => {
        const avgRate = proj.runs.reduce((s, r) => s + r.summary.successRate, 0) / proj.runs.length;
        const avgCost = proj.runs.reduce((s, r) => s + r.summary.totalCost, 0) / proj.runs.length;
        const avgAttempts = proj.runs.reduce((s, r) => s + r.summary.avgAttempts, 0) / proj.runs.length;
        const avgSuccessCount = proj.runs.reduce((s, r) => s + r.summary.successfulPrompts, 0) / proj.runs.length;
        const costPerMatch = avgCost / avgSuccessCount;
        const borderColor = key === 'sa3' ? 'border-cyan-500' : 'border-purple-500';

        return (
          <div key={key} className={`bg-slate-800/60 rounded-xl p-5 border-l-4 ${borderColor}`}>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-lg font-bold text-white">{proj.name}</h3>
              <span className="text-slate-500 text-sm">{proj.platform}</span>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <Stat label="Avg Match Rate" value={`${avgRate.toFixed(1)}%`} />
              <Stat label="Avg Cost/Run" value={`$${avgCost.toFixed(2)}`} />
              <Stat label="Cost/Match" value={`$${costPerMatch.toFixed(2)}`} />
              <Stat label="Avg Attempts" value={avgAttempts.toFixed(1)} />
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
