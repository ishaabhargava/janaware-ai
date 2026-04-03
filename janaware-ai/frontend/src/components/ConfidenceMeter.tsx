type Props = {
  value: number
}

function ConfidenceMeter({ value }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h4 className="text-lg font-semibold text-blue-300">
        Analysis Confidence
      </h4>

      <div className="mt-4">
        <div className="h-3 w-full rounded-full bg-white/10">
          <div
            className="h-3 rounded-full bg-blue-500"
            style={{ width: `${value}%` }}
          ></div>
        </div>

        <p className="mt-3 text-sm text-white/70">{value}% confidence</p>
      </div>
    </div>
  )
}

export default ConfidenceMeter