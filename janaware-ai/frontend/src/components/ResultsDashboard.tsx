import ScoreCard from './ScoreCard'
import ClaimBreakdown from './ClaimBreakdown'
import PerspectiveComparison from './PerspectiveComparison'
import BiasMeter from './BiasMeter'
import ConfidenceMeter from './ConfidenceMeter'
import CircularProgress from './CircularProgress'
import type { AnalysisResult } from '../types/analysis'

type ResultsDashboardProps = {
  analysisResult: AnalysisResult | null
}

function ResultsDashboard({ analysisResult }: ResultsDashboardProps) {
  if (!analysisResult) return null

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="mb-6">
        <h3 className="text-3xl font-bold">Analysis Dashboard</h3>
        <p className="mt-2 text-white/60">
          Explainable article assessment based on tone, evidence, and framing
          signals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ScoreCard
          title="Credibility Score"
          value={`${analysisResult.credibilityScore}/100`}
          subtitle="Estimated overall credibility"
        />
        <ScoreCard
          title="Bias Score"
          value={`${analysisResult.biasScore}/100`}
          subtitle="Higher means stronger bias signals"
        />
        <ScoreCard
          title="Emotional Tone"
          value={`${analysisResult.emotionalTone}/100`}
          subtitle="Detected emotional intensity"
        />
        <ScoreCard
          title="Leaning"
          value={analysisResult.leaning}
          subtitle="Estimated framing direction"
        />
        <ScoreCard
          title="Evidence Strength"
          value={analysisResult.evidenceStrength}
          subtitle="Support quality in article"
        />
        <ScoreCard
          title="Confidence"
          value={`${analysisResult.confidence}%`}
          subtitle="Confidence in this analysis"
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <BiasMeter biasScore={analysisResult.biasScore} />
        <ConfidenceMeter value={analysisResult.confidence} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <CircularProgress
          value={analysisResult.credibilityScore}
          label="Credibility"
          color="#22c55e"
        />
        <CircularProgress
          value={analysisResult.biasScore}
          label="Bias"
          color="#ef4444"
        />
        <CircularProgress
          value={analysisResult.emotionalTone}
          label="Emotion"
          color="#3b82f6"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h4 className="text-xl font-semibold text-blue-300">
            Neutral Summary
          </h4>
          <p className="mt-4 leading-7 text-white/80">
            {analysisResult.neutralSummary}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h4 className="text-xl font-semibold text-blue-300">
            Why this result?
          </h4>
          <ul className="mt-4 space-y-3 text-white/80">
            {analysisResult.explanationPoints.map((point) => (
              <li
                key={point}
                className="rounded-lg border border-white/10 bg-slate-900/60 p-3"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <ClaimBreakdown claims={analysisResult.claims} />
      </div>

      <div className="mt-6">
        <PerspectiveComparison comparisons={analysisResult.comparisons} />
      </div>
    </section>
  )
}

export default ResultsDashboard