type ScoreCardProps = {
  title: string
  value: string
  subtitle: string
}

function ScoreCard({ title, value, subtitle }: ScoreCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-white/50">{title}</p>

      <h4
        className={`mt-2 text-3xl font-bold ${
          title.includes('Bias')
            ? 'text-red-400'
            : title.includes('Credibility')
            ? 'text-green-400'
            : 'text-blue-300'
        }`}
      >
        {value} {/* ✅ THIS WAS MISSING */}
      </h4>

      <p className="mt-2 text-sm text-white/70">{subtitle}</p>
    </div>
  )
}

export default ScoreCard