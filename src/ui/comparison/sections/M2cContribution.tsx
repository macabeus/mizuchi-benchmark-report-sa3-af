import { useState } from 'react';

import m2cRefsData from '../m2c-refs.json';
import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

interface M2cRefRun {
  runIndex: number;
  success: boolean;
  totalRefs: number;
  references: { attempt: number; pattern: string; context: string }[];
}

interface M2cRefEntry {
  tier: string;
  runs: M2cRefRun[];
}

const m2cRefs = m2cRefsData as Record<string, M2cRefEntry>;

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

export function M2cContribution({ data, runLabels }: Props) {
  const [expandedFunc, setExpandedFunc] = useState<string | null>(null);

  // Split functions into those with and without m2c references
  const funcsWithRefs: string[] = [];
  const funcsWithoutRefs: string[] = [];

  for (const func of data.functions) {
    const ref = m2cRefs[func.functionName];
    const hasAnyRef = ref?.runs.some((r) => r.totalRefs > 0);
    if (hasAnyRef) {
      funcsWithRefs.push(func.functionName);
    } else {
      funcsWithoutRefs.push(func.functionName);
    }
  }

  // Sort refs by total references descending
  funcsWithRefs.sort((a, b) => {
    const totalA = m2cRefs[a].runs.reduce((s, r) => s + r.totalRefs, 0);
    const totalB = m2cRefs[b].runs.reduce((s, r) => s + r.totalRefs, 0);
    return totalB - totalA;
  });

  // Compute success rates for with/without ref groups per run
  const refStats = runLabels.map((_, ri) => {
    let withRefMatch = 0, withRefTotal = 0;
    let withoutRefMatch = 0, withoutRefTotal = 0;

    for (const func of data.functions) {
      const ref = m2cRefs[func.functionName];
      const run = func.runs[ri];
      const hasRef = ref?.runs[ri]?.totalRefs > 0;

      if (hasRef) {
        withRefTotal++;
        if (run.success) { withRefMatch++; }
      } else {
        withoutRefTotal++;
        if (run.success) { withoutRefMatch++; }
      }
    }

    return { withRefMatch, withRefTotal, withoutRefMatch, withoutRefTotal };
  });

  return (
    <div>
      {/* Summary */}
      <div className="bg-slate-800/60 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-2">m2c Coverage & Usage</h4>
        <p className="text-slate-400 text-sm">
          All 30 functions received m2c output in all three runs. The m2c output is presented to Claude as
          "Initial Decompilation" with the instruction to "use it as a starting point and improve upon it."
          However, most m2c outputs don't compile (29/30 have null diff count), so the starting quality is
          generally poor. Below we analyze whether Claude explicitly referenced the m2c output in its reasoning.
        </p>
      </div>

      {/* Success rate comparison: with refs vs without refs */}
      <div className="bg-slate-800/40 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Claude's m2c References vs Match Outcome</h4>
        <p className="text-slate-500 text-xs mb-3">
          Functions where Claude explicitly mentioned "initial decompilation" or similar in its reasoning,
          compared with functions where it did not. Only Run 1 and Run 2 had references (Run 3 had too many
          timeouts to produce meaningful responses).
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-3 text-slate-400">Group</th>
              {runLabels.map((label, i) => (
                <th key={i} className="text-center py-2 px-3" style={{ color: RUN_COLORS[i] }}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800">
              <td className="py-2 px-3 text-slate-300">
                Referenced m2c
              </td>
              {refStats.map((s, i) => (
                <td key={i} className="py-2 px-3 text-center text-slate-300">
                  {s.withRefTotal > 0 ? (
                    <span>
                      <span className="text-emerald-400">{s.withRefMatch}</span>
                      <span className="text-slate-500">/{s.withRefTotal}</span>
                      <span className="text-slate-500 ml-1">
                        ({(s.withRefMatch / s.withRefTotal * 100).toFixed(0)}%)
                      </span>
                    </span>
                  ) : (
                    <span className="text-slate-600">0 refs</span>
                  )}
                </td>
              ))}
            </tr>
            <tr className="border-b border-slate-800">
              <td className="py-2 px-3 text-slate-300">
                Did not reference m2c
              </td>
              {refStats.map((s, i) => (
                <td key={i} className="py-2 px-3 text-center text-slate-300">
                  <span className="text-emerald-400">{s.withoutRefMatch}</span>
                  <span className="text-slate-500">/{s.withoutRefTotal}</span>
                  <span className="text-slate-500 ml-1">
                    ({(s.withoutRefMatch / s.withoutRefTotal * 100).toFixed(0)}%)
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Functions WITH m2c references - detailed table with quotes */}
      <div className="bg-slate-800/40 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">
          Functions Where Claude Referenced m2c Output ({funcsWithRefs.length} functions)
        </h4>
        <p className="text-slate-500 text-xs mb-3">
          Click a function to see the exact quotes where Claude referenced the initial decompilation.
        </p>
        <div className="space-y-2">
          {funcsWithRefs.map((fn) => {
            const ref = m2cRefs[fn];
            const func = data.functions.find((f) => f.functionName === fn);
            const isExpanded = expandedFunc === fn;
            const totalRefs = ref.runs.reduce((s, r) => s + r.totalRefs, 0);

            return (
              <div key={fn} className="border border-slate-700 rounded-lg overflow-hidden">
                <button
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-800/30 transition-colors"
                  onClick={() => setExpandedFunc(isExpanded ? null : fn)}
                >
                  <span className="text-slate-400 text-xs">{isExpanded ? '\u25BC' : '\u25B6'}</span>
                  <span className="text-slate-200 font-mono text-sm">{fn}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    ref.tier === 'easy' ? 'bg-green-500/20 text-green-400' :
                    ref.tier === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{ref.tier}</span>
                  <span className="text-cyan-400 text-xs font-medium">{totalRefs} reference{totalRefs !== 1 ? 's' : ''}</span>
                  <div className="flex-1" />
                  {ref.runs.map((r, ri) => (
                    <span key={ri} className="text-xs">
                      <span style={{ color: RUN_COLORS[ri] }}>
                        {r.success ? 'M' : 'F'}
                      </span>
                      {r.totalRefs > 0 && (
                        <span className="text-slate-500 ml-0.5">({r.totalRefs})</span>
                      )}
                    </span>
                  ))}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    {ref.runs.map((run, ri) => {
                      if (run.totalRefs === 0) { return null; }

                      // Deduplicate by pattern
                      const uniqueRefs: typeof run.references = [];
                      const seenPatterns = new Set<string>();
                      for (const r of run.references) {
                        if (!seenPatterns.has(r.context)) {
                          seenPatterns.add(r.context);
                          uniqueRefs.push(r);
                        }
                      }

                      return (
                        <div key={ri}>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: RUN_COLORS[ri] }} />
                            <span className="text-sm font-medium" style={{ color: RUN_COLORS[ri] }}>
                              {runLabels[ri]}
                            </span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              run.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {run.success ? 'MATCH' : 'FAIL'}
                            </span>
                            <span className="text-slate-500 text-xs">{run.totalRefs} reference{run.totalRefs !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="space-y-1.5 ml-4">
                            {uniqueRefs.map((r, j) => (
                              <div key={j} className="bg-slate-900/60 rounded px-3 py-2 text-xs">
                                <div className="text-slate-500 mb-1">
                                  Attempt {r.attempt} — matched: <span className="text-cyan-400 font-mono">"{r.pattern}"</span>
                                </div>
                                <div className="text-slate-300 font-mono leading-relaxed">
                                  {r.context}
                                </div>
                              </div>
                            ))}
                            {run.totalRefs > uniqueRefs.length && (
                              <div className="text-slate-600 text-xs ml-3">
                                + {run.totalRefs - uniqueRefs.length} more references with same context (later attempts repeating conversation)
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Functions WITHOUT m2c references */}
      <div className="bg-slate-800/40 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">
          Functions Where Claude Never Referenced m2c ({funcsWithoutRefs.length} functions)
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-2 text-slate-400">Function</th>
              <th className="text-left py-2 px-2 text-slate-400">Tier</th>
              {runLabels.map((label, i) => (
                <th key={i} className="text-center py-2 px-2" style={{ color: RUN_COLORS[i] }}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {funcsWithoutRefs.map((fn) => {
              const func = data.functions.find((f) => f.functionName === fn);
              const ref = m2cRefs[fn];
              return (
                <tr key={fn} className="border-b border-slate-800">
                  <td className="py-2 px-2 text-slate-200 font-mono text-xs">{fn}</td>
                  <td className="py-2 px-2">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      ref.tier === 'easy' ? 'bg-green-500/20 text-green-400' :
                      ref.tier === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{ref.tier}</span>
                  </td>
                  {func?.runs.map((run, ri) => (
                    <td key={ri} className="py-2 px-2 text-center">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        run.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {run.success ? 'MATCH' : 'FAIL'}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
