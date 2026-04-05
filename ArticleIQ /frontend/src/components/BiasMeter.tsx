type BiasMeterProps = {
  biasScore: number
}

function BiasMeter({ biasScore }: BiasMeterProps) {
  const getLabel = () => {
    if (biasScore < 30) return 'Low Bias'
    if (biasScore < 60) return 'Moderate Bias'
    return 'High Bias'
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h4 className="text-lg font-semibold text-blue-300">Bias Meter</h4>

      <div className="mt-4">
        <div className="h-3 w-full rounded-full bg-white/10">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
            style={{ width: `${biasScore}%` }}
          ></div>
        </div>

        <div className="mt-3 flex justify-between text-sm text-white/70">
          <span>Neutral</span>
          <span>{getLabel()}</span>
          <span>Biased</span>
        </div>
      </div>
    </div>
  )
}

export default BiasMeter