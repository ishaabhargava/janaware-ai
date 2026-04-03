import type { ClaimItem } from '../types/analysis'

type ClaimBreakdownProps = {
  claims: ClaimItem[]
}

function ClaimBreakdown({ claims }: ClaimBreakdownProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h4 className="text-xl font-semibold text-blue-300">Claim Breakdown</h4>

      <div className="mt-4 space-y-4">
        {claims.map((claim) => (
          <div
            key={claim.claim}
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4"
          >
            <p className="font-medium text-white">{claim.claim}</p>
            <div className="mt-3 grid gap-3 text-sm text-white/70 md:grid-cols-3">
              <div>
                <span className="text-white/40">Support:</span>{' '}
                {claim.support}
              </div>
              <div>
                <span className="text-white/40">Evidence:</span>{' '}
                {claim.evidenceType}
              </div>
              <div>
                <span className="text-white/40">Confidence:</span>{' '}
                {claim.confidence}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClaimBreakdown