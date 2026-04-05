type CircularProgressProps = {
  value: number
  label: string
  color?: string
}

function CircularProgress(props: CircularProgressProps) {
  const { value, label, color = '#3b82f6' } = props

  const safeValue = Math.max(0, Math.min(100, value))

  const size = 120
  const strokeWidth = 10
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (safeValue / 100) * circumference

  return (
    <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90 transform">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>

        <div className="absolute text-center">
          <p className="text-xl font-bold text-white">{safeValue}%</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-white/60">{label}</p>
    </div>
  )
}

export default CircularProgress