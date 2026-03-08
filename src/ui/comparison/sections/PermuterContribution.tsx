import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import type { ComparisonData } from '../types';
import { RUN_COLORS } from '../types';

echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

interface Props {
  data: ComparisonData;
  runLabels: string[];
}

export function PermuterContribution({ data, runLabels }: Props) {
  // Aggregate permuter stats per run
  const runStats = runLabels.map((_, ri) => {
    let totalTasks = 0;
    let improved = 0;
    let solved = 0;
    let totalImprovement = 0;
    const perFunc: { name: string; baseScore: number; bestScore: number; improvement: number; tasks: number }[] = [];

    for (const func of data.functions) {
      const run = func.runs[ri];
      if (!run) continue;
      let funcBestImprovement = 0;
      let funcTasks = 0;
      let funcBestBase = 0;
      let funcBestBest = 0;

      for (const pt of run.permuterTasks) {
        totalTasks++;
        funcTasks++;
        const imp = pt.baseScore - pt.bestScore;
        if (imp > 0) {
          improved++;
          totalImprovement += imp;
        }
        if (pt.perfectMatch) solved++;
        if (imp > funcBestImprovement) {
          funcBestImprovement = imp;
          funcBestBase = pt.baseScore;
          funcBestBest = pt.bestScore;
        }
      }

      if (funcTasks > 0) {
        perFunc.push({
          name: func.functionName,
          baseScore: funcBestBase,
          bestScore: funcBestBest,
          improvement: funcBestImprovement,
          tasks: funcTasks,
        });
      }
    }

    return { totalTasks, improved, solved, totalImprovement, perFunc };
  });

  // Per-function permuter improvement chart (Run 1 only as representative)
  // Show all runs side by side: best improvement per function
  const allFuncs = new Set<string>();
  for (const rs of runStats) {
    for (const pf of rs.perFunc) allFuncs.add(pf.name);
  }
  const funcNames = [...allFuncs].sort();

  const improvementOption: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Best Permuter Score Improvement per Function',
      textStyle: { color: '#e2e8f0', fontSize: 14 },
      left: 10,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderColor: '#334155',
      textStyle: { color: '#e2e8f0', fontSize: 11 },
    },
    legend: { data: runLabels, textStyle: { color: '#94a3b8' }, top: 0 },
    grid: { left: 120, right: 30, top: 40, bottom: 20 },
    xAxis: {
      type: 'value',
      name: 'Score improvement (base - best)',
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
    yAxis: {
      type: 'category',
      data: funcNames,
      axisLabel: { color: '#cbd5e1', fontSize: 10 },
      inverse: true,
    },
    series: runLabels.map((label, i) => ({
      name: label,
      type: 'bar' as const,
      data: funcNames.map((fn) => {
        const pf = runStats[i].perFunc.find((p) => p.name === fn);
        return pf ? pf.improvement : 0;
      }),
      itemStyle: { color: RUN_COLORS[i] },
    })),
  };

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {runLabels.map((label, i) => (
          <div key={i} className="bg-slate-800/60 rounded-lg p-4">
            <div className="text-slate-400 text-sm mb-2" style={{ color: RUN_COLORS[i] }}>
              {label}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Total Tasks</div>
                <div className="text-white font-medium">{runStats[i].totalTasks}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Improved</div>
                <div className="text-white font-medium">
                  {runStats[i].improved} ({runStats[i].totalTasks > 0 ? ((runStats[i].improved / runStats[i].totalTasks) * 100).toFixed(0) : 0}%)
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Solved (perfect)</div>
                <div className="text-white font-medium">{runStats[i].solved}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Total Score Gain</div>
                <div className="text-white font-medium">{runStats[i].totalImprovement}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
        <ReactEChartsCore echarts={echarts} option={improvementOption} style={{ height: 800 }} />
      </div>

      {/* Note about background permuter */}
      <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700">
        <h4 className="text-white font-medium mb-2">Background Permuter Notes</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>No permuter task achieved a perfect match in any run.</li>
          <li>
            The permuter ran as a background task during Claude attempts, but never found a match
            that short-circuited the AI phase.
          </li>
          <li>
            Score improvements indicate the permuter found better register allocation or instruction
            ordering, but never fully solved a function.
          </li>
        </ul>
      </div>
    </div>
  );
}
