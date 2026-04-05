import type { ComparisonItem } from '../types/analysis'

type PerspectiveComparisonProps = {
  comparisons: ComparisonItem[]
}

function PerspectiveComparison({
  comparisons,
}: PerspectiveComparisonProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h4 className="text-xl font-semibold text-blue-300">
        Perspective Comparison
      </h4>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {comparisons.map((item) => (
          <div
            key={item.outlet}
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4"
          >
            <div className="flex items-center justify-between">
              <h5 className="font-semibold text-white">{item.outlet}</h5>
              <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs text-blue-300">
                {item.leaning}
              </span>
            </div>

            <p className="mt-3 text-sm font-medium text-white/90">
              {item.headline}
            </p>

            <p className="mt-3 text-sm text-white/70">
              <span className="text-white/40">Tone:</span> {item.tone}
            </p>

            <p className="mt-2 text-sm leading-6 text-white/70">
              <span className="text-white/40">Framing:</span> {item.framing}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerspectiveComparison