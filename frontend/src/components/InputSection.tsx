import type { InputType, SampleArticle } from '../types/analysis'

type InputSectionProps = {
  inputType: InputType
  articleInput: string
  setInputType: (type: InputType) => void
  setArticleInput: (value: string) => void
  handleAnalyze: () => void
  loadSample: (text: string) => void
  sampleArticles: SampleArticle[]
}

function InputSection({
  inputType,
  articleInput,
  setInputType,
  setArticleInput,
  handleAnalyze,
  loadSample,
  sampleArticles,
}: InputSectionProps) {
  return (
    <section
      id="home"
      className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center"
    >
      <div className="mb-6 inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1 text-sm text-blue-300">
        AI-powered media transparency
      </div>

      <h2 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
        See beyond the headline.
      </h2>

      <p className="mt-6 max-w-2xl text-lg text-white/70">
        ArticleIQ analyzes news articles for bias, emotional tone,
        credibility, and evidence quality to help users read more critically.
      </p>

      <div
        id="analyze"
        className="mt-12 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"
      >
        <div className="mb-4 flex gap-3">
          <button
            onClick={() => setInputType('url')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              inputType === 'url'
                ? 'bg-blue-500 text-white'
                : 'border border-white/10 text-white/70'
            }`}
          >
            URL
          </button>

          <button
            onClick={() => setInputType('text')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              inputType === 'text'
                ? 'bg-blue-500 text-white'
                : 'border border-white/10 text-white/70'
            }`}
          >
            Text
          </button>
        </div>

        {inputType === 'url' ? (
          <input
            type="text"
            value={articleInput}
            onChange={(e) => setArticleInput(e.target.value)}
            placeholder="Paste article URL here..."
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-white/30"
          />
        ) : (
          <textarea
            value={articleInput}
            onChange={(e) => setArticleInput(e.target.value)}
            placeholder="Paste article text here..."
            rows={6}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-white/30"
          />
        )}

        <button
          onClick={handleAnalyze}
          className="mt-4 w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Analyze Article
        </button>

        <div className="mt-6">
          <p className="mb-3 text-sm text-white/50">Try sample articles:</p>
          <div className="flex flex-wrap gap-3">
            {sampleArticles.map((article) => (
              <button
                key={article.label}
                onClick={() => loadSample(article.content)}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-blue-400/50 hover:text-white"
              >
                {article.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InputSection