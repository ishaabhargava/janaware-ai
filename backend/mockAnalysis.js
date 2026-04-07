
function generateMockAnalysis(text){
  const lowerText = text.toLowerCase()

  let credibilityScore = 70
  let biasScore = 40
  let emotionalTone = 35
  let confidence = 78
  let leaning = 'Center'
  let evidenceStrength = 'Medium'
  let neutralSummary =
    'This article discusses a recent event and presents multiple viewpoints with a moderate level of supporting detail.'

  const explanationPoints = []

  let claims = [
    {
      claim: 'The article describes a recent public event or development.',
      support: 'Partially Supported',
      evidenceType: 'General reporting',
      confidence: 74,
    },
    {
      claim: 'The article contains reactions or interpretations from involved groups.',
      support: 'Supported',
      evidenceType: 'Quoted or attributed statements',
      confidence: 79,
    },
    {
      claim: 'The language may shape how readers perceive the issue.',
      support: 'Supported',
      evidenceType: 'Tone and framing signals',
      confidence: 84,
    },
  ]

  let comparisons = [
    {
      outlet: 'Daily Current',
      leaning: 'Left',
      headline: 'Critics warn reform may shift balance of power',
      tone: 'Concerned',
      framing: 'Emphasizes institutional risk and public accountability.',
    },
    {
      outlet: 'World Ledger',
      leaning: 'Center',
      headline: 'Government announces reform amid mixed public reaction',
      tone: 'Measured',
      framing: 'Focuses on the event, reactions, and procedural details.',
    },
    {
      outlet: 'National Wire',
      leaning: 'Right',
      headline: 'Reform plan hailed as bold move for transparency',
      tone: 'Supportive',
      framing: 'Highlights leadership intent and promised improvements.',
    },
  ]

  const emotionalWords = [
    'dangerous',
    'shocking',
    'outrage',
    'threat',
    'crisis',
    'tensions',
    'escalated',
  ]

  const evidenceWords = [
    'study',
    'data',
    'report',
    'researchers',
    'satellite',
    'peer-reviewed',
    'evidence',
    'observations',
  ]

  const politicalWords = [
    'government',
    'election',
    'policy',
    'minister',
    'party',
    'reform',
  ]

  const conflictWords = [
    'strike',
    'border',
    'officials',
    'conflicting',
    'civilian',
    'military',
  ]

  const emotionalMatches = emotionalWords.filter((word) =>
    lowerText.includes(word)
  ).length

  const evidenceMatches = evidenceWords.filter((word) =>
    lowerText.includes(word)
  ).length

  const politicalMatches = politicalWords.filter((word) =>
    lowerText.includes(word)
  ).length

  const conflictMatches = conflictWords.filter((word) =>
    lowerText.includes(word)
  ).length

  emotionalTone += emotionalMatches * 10
  biasScore += emotionalMatches * 6

  if (evidenceMatches >= 3) {
    credibilityScore += 18
    biasScore -= 8
    evidenceStrength = 'Strong'
    neutralSummary =
      'This article reports on findings supported by research, data, and cited evidence, using relatively measured language.'
    explanationPoints.push(
      'Multiple evidence-related terms increased the evidence strength score.'
    )
    explanationPoints.push(
      'Research-based phrasing improved the credibility estimate.'
    )

    claims = [
      {
        claim: 'The article presents findings supported by structured evidence.',
        support: 'Supported',
        evidenceType: 'Research and data references',
        confidence: 90,
      },
      {
        claim: 'The core argument relies on cited studies or observations.',
        support: 'Supported',
        evidenceType: 'Peer-reviewed or observational evidence',
        confidence: 88,
      },
      {
        claim: 'The wording is relatively restrained compared with political or conflict coverage.',
        support: 'Supported',
        evidenceType: 'Language pattern analysis',
        confidence: 82,
      },
    ]

    comparisons = [
      {
        outlet: 'Climate Monitor',
        leaning: 'Left',
        headline: 'Study adds urgency to climate response debate',
        tone: 'Urgent',
        framing: 'Emphasizes social responsibility and policy action.',
      },
      {
        outlet: 'Global Brief',
        leaning: 'Center',
        headline: 'New climate study reports continued temperature rise',
        tone: 'Measured',
        framing: 'Focuses on findings, methods, and evidence.',
      },
      {
        outlet: 'Economic Post',
        leaning: 'Right',
        headline: 'Researchers publish new climate data as policy debate continues',
        tone: 'Cautious',
        framing: 'Balances scientific findings with economic implications.',
      },
    ]
  } else if (evidenceMatches >= 1) {
    credibilityScore += 8
    evidenceStrength = 'Medium'
    explanationPoints.push(
      'Some supporting evidence or references were detected in the article.'
    )
  } else {
    credibilityScore -= 12
    evidenceStrength = 'Weak'
    explanationPoints.push(
      'Few clear evidence indicators were found, lowering the credibility estimate.'
    )
  }

  if (politicalMatches >= 2) {
    biasScore += 18
    leaning = 'Moderate Political Framing'
    neutralSummary =
      'This article covers a political development and includes competing reactions, though the wording may influence reader perception.'
    explanationPoints.push(
      'Political framing terms increased the bias risk score.'
    )

    claims = [
      {
        claim: 'A political reform or policy action was announced.',
        support: 'Supported',
        evidenceType: 'Direct event reporting',
        confidence: 86,
      },
      {
        claim: 'The article presents the event through competing reactions.',
        support: 'Supported',
        evidenceType: 'Attributed political responses',
        confidence: 81,
      },
      {
        claim: 'The wording may encourage readers toward a particular interpretation.',
        support: 'Supported',
        evidenceType: 'Framing and tone analysis',
        confidence: 85,
      },
    ]

    comparisons = [
      {
        outlet: 'Civic Voice',
        leaning: 'Left',
        headline: 'Opposition raises alarm over sweeping reform move',
        tone: 'Critical',
        framing: 'Focuses on risk, power concentration, and accountability.',
      },
      {
        outlet: 'Public Ledger',
        leaning: 'Center',
        headline: 'Election reform announced as debate intensifies',
        tone: 'Balanced',
        framing: 'Presents the reform and competing reactions side by side.',
      },
      {
        outlet: 'Nation First',
        leaning: 'Right',
        headline: 'Government unveils reform aimed at cleaner elections',
        tone: 'Favorable',
        framing: 'Highlights intent, reform goals, and institutional trust.',
      },
    ]
  }

  if (conflictMatches >= 2) {
    emotionalTone += 12
    confidence -= 8
    credibilityScore -= 5
    leaning = 'Conflict / Uncertain'
    neutralSummary =
      'This article describes a developing conflict situation with early reports and incomplete verification from multiple sides.'
    explanationPoints.push(
      'Conflicting and developing-event language reduced analysis confidence.'
    )

    claims = [
      {
        claim: 'A conflict-related incident has been reported.',
        support: 'Partially Supported',
        evidenceType: 'Early reports and official statements',
        confidence: 72,
      },
      {
        claim: 'Different sides are offering conflicting versions of events.',
        support: 'Supported',
        evidenceType: 'Competing official accounts',
        confidence: 83,
      },
      {
        claim: 'The full situation remains uncertain.',
        support: 'Supported',
        evidenceType: 'Incomplete verification signals',
        confidence: 88,
      },
    ]

    comparisons = [
      {
        outlet: 'Global Watch',
        leaning: 'Left',
        headline: 'Civilian disruption reported after overnight border strikes',
        tone: 'Concerned',
        framing: 'Emphasizes human impact and uncertainty.',
      },
      {
        outlet: 'World Desk',
        leaning: 'Center',
        headline: 'Conflicting reports emerge after strikes near border',
        tone: 'Measured',
        framing: 'Focuses on verification gaps and official statements.',
      },
      {
        outlet: 'Strategic Times',
        leaning: 'Right',
        headline: 'Security tensions rise after cross-border escalation',
        tone: 'Assertive',
        framing: 'Highlights strategic and military implications.',
      },
    ]
  }

  if (emotionalMatches >= 2) {
    explanationPoints.push(
      'Emotionally charged wording increased the emotional tone score.'
    )
  }

  if (explanationPoints.length === 0) {
    explanationPoints.push(
      'The article appears moderately neutral with no strong signals in one direction.'
    )
  }

  credibilityScore = Math.max(0, Math.min(100, credibilityScore))
  biasScore = Math.max(0, Math.min(100, biasScore))
  emotionalTone = Math.max(0, Math.min(100, emotionalTone))
  confidence = Math.max(0, Math.min(100, confidence))

  return {
    credibilityScore,
    biasScore,
    leaning,
    emotionalTone,
    evidenceStrength,
    confidence,
    neutralSummary,
    explanationPoints,
    claims,
    comparisons,
  }
}
module.exports = { generateMockAnalysis };