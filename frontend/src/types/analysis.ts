export type InputType = 'url' | 'text'

export type ClaimItem = {
  claim: string
  support: string
  evidenceType: string
  confidence: number
}

export type ComparisonItem = {
  outlet: string
  leaning: string
  headline: string
  tone: string
  framing: string
}

export type AnalysisResult = {
  credibilityScore: number
  biasScore: number
  leaning: string
  emotionalTone: number
  evidenceStrength: string
  confidence: number
  neutralSummary: string
  explanationPoints: string[]
  claims: ClaimItem[]
  comparisons: ComparisonItem[]
}

export type SampleArticle = {
  label: string
  content: string
}
export type HistoryItem = {
  id: string
  input: string
  result: AnalysisResult
  timestamp: number
}