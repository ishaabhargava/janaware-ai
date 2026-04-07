function FeatureCards() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-blue-300">Bias Detection</h3>
        <p className="mt-3 text-sm text-white/70">
          Identify political leaning, framing patterns, and sensationalism in
          article language.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-blue-300">
          Evidence Quality
        </h3>
        <p className="mt-3 text-sm text-white/70">
          Measure how well claims are supported through sources, quotes, data,
          and references.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-blue-300">
          Neutral Summary
        </h3>
        <p className="mt-3 text-sm text-white/70">
          Generate a calmer, clearer rewrite that preserves the key facts
          without loaded wording.
        </p>
      </div>
    </section>
  )
}

export default FeatureCards