import { useState } from 'react'
import Navbar from './components/Navbar'
import InputSection from './components/InputSection'
import FeatureCards from './components/FeatureCards'
import SubmittedPreview from './components/SubmittedPreview'
import AnalysisLoader from './components/AnalysisLoader'
import ResultsDashboard from './components/ResultsDashboard'
import AboutSection from './components/AboutSection'
import HistoryPanel from './components/HistoryPanel'

import { generateMockAnalysis } from './utils/mockAnalysis'
import type {
  AnalysisResult,
  InputType,
  SampleArticle,
  HistoryItem,
} from './types/analysis'

const sampleArticles: SampleArticle[] = [
  {
    label: 'Political Article',
    content:
      'The government announced a major election reform today. Critics called it a dangerous power move, while supporters said it would improve transparency and voter confidence. The report cited one government spokesperson and mentioned rising national tensions.',
  },
  {
    label: 'Climate Article',
    content:
      'A new climate study published this week found that average temperatures have continued to rise over the past decade. Researchers cited satellite data, long-term field observations, and peer-reviewed evidence to support their conclusions.',
  },
  {
    label: 'Conflict Article',
    content:
      'International tensions escalated after overnight strikes near the border. Officials from both sides issued conflicting statements, while early reports from journalists suggested civilian disruption and uncertainty about the full scale of the incident.',
  },
]

function App() {
  const [inputType, setInputType] = useState<InputType>('url')
  const [articleInput, setArticleInput] = useState('')
  const [submittedText, setSubmittedText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  )

  const [history, setHistory] = useState<HistoryItem[]>([]) // ✅ fixed position

  const handleAnalyze = () => {
    if (!articleInput.trim()) return

    setSubmittedText(articleInput)
    setIsAnalyzing(true)
    setAnalysisResult(null)

    setTimeout(() => {
      const result = generateMockAnalysis(articleInput)

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        input: articleInput,
        result,
        timestamp: Date.now(),
      }

      setHistory((prev) => [newItem, ...prev].slice(0, 6)) // ✅ history update

      setAnalysisResult(result)
      setIsAnalyzing(false)
    }, 1800)
  }

  const loadSample = (text: string) => {
    setInputType('text')
    setArticleInput(text)
    setSubmittedText('')
    setAnalysisResult(null)
  }

  const handleSelectHistory = (item: HistoryItem) => {
    setSubmittedText(item.input)
    setAnalysisResult(item.result)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        <InputSection
          inputType={inputType}
          articleInput={articleInput}
          setInputType={setInputType}
          setArticleInput={setArticleInput}
          handleAnalyze={handleAnalyze}
          loadSample={loadSample}
          sampleArticles={sampleArticles}
        />

        <FeatureCards />

        <SubmittedPreview submittedText={submittedText} />

        {isAnalyzing && <AnalysisLoader />}

        <ResultsDashboard analysisResult={analysisResult} />

        {/* ✅ NEW HISTORY PANEL */}
        <HistoryPanel history={history} onSelect={handleSelectHistory} />

        <AboutSection />
      </main>
    </div>
  )
}

export default App