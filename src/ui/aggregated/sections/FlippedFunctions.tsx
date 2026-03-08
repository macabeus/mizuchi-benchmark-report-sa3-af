import type { AggregatedData, ProjectData } from '../types';
import { PROJECT_COLORS, TIERS, TIER_COLORS } from '../types';

interface FlippedFunc {
  name: string;
  tier: string;
  outcomes: boolean[];
  matchSources: (string | null)[];
}

function getFlippedFunctions(proj: ProjectData): FlippedFunc[] {
  const funcNames = proj.runs[0].functions.map((f) => f.functionName);
  const flipped: FlippedFunc[] = [];
  for (const name of funcNames) {
    const runsData = proj.runs.map((r) => r.functions.find((f) => f.functionName === name)!);
    const outcomes = runsData.map((r) => r.success);
    if (outcomes.some((o) => o) && outcomes.some((o) => !o)) {
      flipped.push({
        name,
        tier: runsData[0].tier,
        outcomes,
        matchSources: runsData.map((r) => r.matchSource),
      });
    }
  }
  return flipped;
}

export function FlippedFunctions({ data }: { data: AggregatedData }) {
  const sa3Flipped = getFlippedFunctions(data.projects.sa3);
  const afFlipped = getFlippedFunctions(data.projects.af);

  const sa3FlipRate = (sa3Flipped.length / 30) * 100;
  const afFlipRate = (afFlipped.length / 30) * 100;

  // Flip by tier
  const flipByTier = (flipped: FlippedFunc[]) =>
    TIERS.map((t) => ({ tier: t, count: flipped.filter((f) => f.tier === t).length }));

  const sa3ByTier = flipByTier(sa3Flipped);
  const afByTier = flipByTier(afFlipped);

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {([['sa3', sa3Flipped, sa3FlipRate], ['af', afFlipped, afFlipRate]] as const).map(([key, flipped, rate]) => (
          <div key={key} className="bg-slate-800/60 rounded-lg p-4" style={{ borderLeft: `4px solid ${PROJECT_COLORS[key]}` }}>
            <h4 className="font-medium mb-2" style={{ color: PROJECT_COLORS[key] }}>{data.projects[key].name}</h4>
            <div className="flex items-baseline gap-4">
              <div>
                <span className="text-2xl font-bold text-white">{flipped.length}</span>
                <span className="text-slate-400 text-sm ml-1">functions flipped</span>
              </div>
              <div className="text-slate-500 text-sm">({rate.toFixed(1)}% of 30)</div>
            </div>
          </div>
        ))}
      </div>

      {/* Flipped by tier */}
      <div className="bg-slate-800/40 rounded-lg p-4 mb-6">
        <h4 className="text-white font-medium mb-3">Flip Rate by Tier</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 px-3 text-slate-400">Tier</th>
              <th className="text-center py-2 px-3" style={{ color: PROJECT_COLORS.sa3 }}>{data.projects.sa3.name}</th>
              <th className="text-center py-2 px-3" style={{ color: PROJECT_COLORS.af }}>{data.projects.af.name}</th>
            </tr>
          </thead>
          <tbody>
            {TIERS.map((t, i) => (
              <tr key={t} className="border-b border-slate-800/50">
                <td className="py-2 px-3">
                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: TIER_COLORS[t] + '20', color: TIER_COLORS[t] }}>
                    {t}
                  </span>
                </td>
                <td className="py-2 px-3 text-center text-slate-300">{sa3ByTier[i].count}/10</td>
                <td className="py-2 px-3 text-center text-slate-300">{afByTier[i].count}/10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed flipped functions */}
      <div className="grid grid-cols-2 gap-4">
        {([['sa3', sa3Flipped], ['af', afFlipped]] as const).map(([key, flipped]) => (
          <div key={key} className="bg-slate-800/40 rounded-lg p-4">
            <h4 className="font-medium mb-3" style={{ color: PROJECT_COLORS[key] }}>
              {data.projects[key].name} — Flipped Functions
            </h4>
            {flipped.length === 0 ? (
              <p className="text-slate-500 text-sm">No functions flipped.</p>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-1 px-2 text-slate-400">Function</th>
                    <th className="text-left py-1 px-2 text-slate-400">Tier</th>
                    <th className="text-center py-1 px-2 text-slate-400">Run 1</th>
                    <th className="text-center py-1 px-2 text-slate-400">Run 2</th>
                    <th className="text-center py-1 px-2 text-slate-400">Run 3</th>
                  </tr>
                </thead>
                <tbody>
                  {flipped.map((f) => (
                    <tr key={f.name} className="border-b border-slate-800/50">
                      <td className="py-1 px-2 text-slate-200 font-mono">{f.name}</td>
                      <td className="py-1 px-2 text-slate-400">{f.tier}</td>
                      {f.outcomes.map((o, i) => (
                        <td key={i} className="py-1 px-2 text-center">
                          <span className={`px-1.5 py-0.5 rounded ${o ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {o ? (f.matchSources[i] === 'decomp-permuter' ? 'PERM' : f.matchSources[i] === 'programmatic-phase' ? 'M2C' : 'AI') : 'FAIL'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
