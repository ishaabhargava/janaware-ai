import { useState } from 'react'
import Navbar from './components/Navbar'
import InputSection from './components/InputSection'
import FeatureCards from './components/FeatureCards'
import SubmittedPreview from './components/SubmittedPreview'
import AnalysisLoader from './components/AnalysisLoader'
import ResultsDashboard from './components/ResultsDashboard'
import AboutSection from './components/AboutSection'
import HistoryPanel from './components/HistoryPanel'

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
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])

  const handleAnalyze = async () => {
    if (!articleInput.trim()) return

    setSubmittedText(articleInput)
    setIsAnalyzing(true)
    setAnalysisResult(null)

    console.log('CLICKED')
    console.log('API:', import.meta.env.VITE_API_URL)

    try {
      const requestBody =
        inputType === 'url'
          ? { url: articleInput }
          : { article: articleInput }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Backend error:', errorText)
        throw new Error('Request failed')
      }

      const data: AnalysisResult = await response.json()
      console.log('Backend response:', data)

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        input: articleInput,
        result: data,
        timestamp: Date.now(),
      }

      setHistory((prev) => [newItem, ...prev].slice(0, 6))
      setAnalysisResult(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Check console.')
    } finally {
      setIsAnalyzing(false)
    }
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

        {analysisResult && (
          <ResultsDashboard analysisResult={analysisResult} />
        )}

        <HistoryPanel history={history} onSelect={handleSelectHistory} />

        <AboutSection />
      </main>
    </div>
  )
}

export default App