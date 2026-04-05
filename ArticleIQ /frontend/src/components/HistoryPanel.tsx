import type { HistoryItem } from '../types/analysis'

type HistoryPanelProps = {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  if (history.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-6 pb-10">
      <h3 className="mb-4 text-2xl font-semibold text-white">
        Recent Analyses
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-blue-400/40"
          >
            <p className="line-clamp-3 text-sm text-white/80">
              {item.input}
            </p>

            <div className="mt-3 flex justify-between text-xs text-white/50">
              <span>Cred: {item.result.credibilityScore}</span>
              <span>Bias: {item.result.biasScore}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HistoryPanel