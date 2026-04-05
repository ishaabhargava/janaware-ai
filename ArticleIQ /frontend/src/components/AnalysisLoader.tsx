function AnalysisLoader() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-10">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold text-blue-300">
          Analyzing article...
        </h3>
        <div className="mt-6 space-y-4">
          <div className="animate-pulse rounded-lg bg-white/10 p-4 text-white/70">
            Extracting article structure
          </div>
          <div className="animate-pulse rounded-lg bg-white/10 p-4 text-white/70">
            Detecting tone and framing
          </div>
          <div className="animate-pulse rounded-lg bg-white/10 p-4 text-white/70">
            Evaluating evidence signals
          </div>
          <div className="animate-pulse rounded-lg bg-white/10 p-4 text-white/70">
            Generating credibility report
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnalysisLoader