const OpenAI = require("openai").default;

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function analyzeArticleWithAI(text) {
  const prompt = `
You are an expert media-analysis system.

Analyze the article and return STRICT JSON ONLY.
No markdown. No explanation outside JSON.

Use these scoring rules carefully:

credibilityScore (0-100):
- 0-20: unsupported opinion, no evidence, unreliable
- 21-40: weak support, vague sourcing
- 41-60: some evidence, mixed reliability
- 61-80: mostly supported, reasonably credible
- 81-100: strong evidence, clear sourcing, high credibility

biasScore (0-100):
- 0-20: neutral and balanced
- 21-40: mild framing
- 41-60: noticeable bias
- 61-80: strong bias in tone/selection
- 81-100: extreme ideological/emotional bias

emotionalTone (0-100):
- 0-20: dry and factual
- 21-40: mildly expressive
- 41-60: somewhat emotional
- 61-80: strongly emotional
- 81-100: highly dramatic or inflammatory

confidence (0-100):
- how confident you are in the analysis

leaning:
- "Left", "Right", or "Neutral"
- choose "Neutral" unless the framing clearly suggests otherwise

evidenceStrength:
- "Weak", "Moderate", or "Strong"

neutralSummary:
- 2-3 lines, neutral and factual

explanationPoints:
- give 3 to 5 short bullet-style points as an array of strings

claims:
- extract 2 to 4 key claims
- each item must be:
{
  "claim": "string",
  "support": "string",
  "evidenceType": "data | opinion | anecdote | expert statement | none",
  "confidence": number
}

comparisons:
- include exactly 2 examples of how different outlets might frame this
- each item must be:
{
  "outlet": "string",
  "leaning": "Left | Right | Neutral",
  "headline": "string",
  "tone": "string",
  "framing": "string"
}

Important instructions:
- Do not assign very low scores unless the article is clearly extremely weak
- For ordinary opinionated political writing, biasScore is often 50-80
- For ordinary reporting with some evidence, credibilityScore is often 45-75
- emotionalTone should reflect wording intensity, not topic severity alone
- Return all fields
- Return valid JSON only
You are a highly precise media analysis AI.

Your task is to analyze a news article across multiple dimensions and return STRICT JSON ONLY.

Do NOT include any explanation outside JSON.

----------------------------------------

SCORING GUIDELINES:

credibilityScore (0-100):
- 0–20 → no evidence, opinion-based, unreliable
- 21–50 → weak support, unclear sources
- 51–80 → moderate evidence, somewhat reliable
- 81–100 → strong evidence, well-supported

biasScore (0-100):
- 0–20 → neutral, balanced reporting
- 21–50 → slight framing or subtle bias
- 51–80 → clear bias in tone or selection
- 81–100 → strong ideological or emotional bias

emotionalTone (0-100):
- 0–20 → purely factual
- 21–50 → mildly expressive
- 51–80 → emotionally charged
- 81–100 → highly dramatic or persuasive

confidence (0-100):
- how confident you are in your analysis

----------------------------------------

FIELD DEFINITIONS:

leaning:
- "Left", "Right", or "Neutral"
- based on framing, tone, and perspective

evidenceStrength:
- "Weak", "Moderate", "Strong"
- based on presence of data, sources, or verification

neutralSummary:
- Rewrite the article in a neutral, factual tone (2–3 lines)

explanationPoints:
- Key reasoning points explaining scores

claims:
- Extract 2–4 key claims from the article
- For each claim include:
  {
    "claim": "...",
    "support": "what supports or challenges it",
    "evidenceType": "data / opinion / anecdote / none",
    "confidence": number (0-100)
  }

comparisons:
- Compare how different outlets might present this
- Include 2 examples:
  {
    "outlet": "...",
    "leaning": "...",
    "headline": "...",
    "tone": "...",
    "framing": "..."
  }

----------------------------------------

IMPORTANT RULES:

- Always return ALL fields
- Do NOT leave anything empty
- If unsure, make reasonable estimates
- Output MUST be valid JSON only (no markdown, no text outside JSON)

----------------------------------------

Article:
${text}
`;


  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const content = response.choices[0].message.content;
    const parsed = JSON.parse(content.trim());

    return {
      credibilityScore: parsed.credibilityScore ?? 50,
      biasScore: parsed.biasScore ?? 50,
      emotionalTone: parsed.emotionalTone ?? 50,
      leaning: parsed.leaning ?? "Unknown",
      evidenceStrength: parsed.evidenceStrength ?? "Unknown",
      confidence: parsed.confidence ?? 50,
      neutralSummary: parsed.neutralSummary ?? "No summary available.",
      explanationPoints: Array.isArray(parsed.explanationPoints)
        ? parsed.explanationPoints
        : typeof parsed.explanationPoints === "string"
          ? [parsed.explanationPoints]
          : [],
      claims: Array.isArray(parsed.claims)
        ? parsed.claims
        : parsed.claims
          ? [parsed.claims]
          : [],
      comparisons: Array.isArray(parsed.comparisons)
        ? parsed.comparisons
        : parsed.comparisons
          ? [parsed.comparisons]
          : [],
    };
  } catch (err) {
    console.error("AI Service Error:", err.message);
    return {
      credibilityScore: 50,
      biasScore: 50,
      emotionalTone: 50,
      leaning: "Unknown",
      evidenceStrength: "Unknown",
      confidence: 50,
      neutralSummary: "Could not analyze article.",
      explanationPoints: [],
      claims: [],
      comparisons: [],
    };
  }
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    
    const content = response.choices[0].message.content;

    try {
      const parsed = JSON.parse(content.trim());

      // ✅ NORMALIZE DATA HERE
      return {
        credibilityScore: parsed.credibilityScore ?? 50,
        biasScore: parsed.biasScore ?? 50,
        emotionalTone: parsed.emotionalTone ?? 50,
        leaning: parsed.leaning ?? "Unknown",
        evidenceStrength: parsed.evidenceStrength ?? "Unknown",
        confidence: parsed.confidence ?? 50,
        neutralSummary: parsed.neutralSummary ?? "No summary available.",

        explanationPoints: Array.isArray(parsed.explanationPoints)
          ? parsed.explanationPoints
          : typeof parsed.explanationPoints === "string"
            ? [parsed.explanationPoints]
            : [],

        claims: Array.isArray(parsed.claims)
          ? parsed.claims
          : parsed.claims
            ? [parsed.claims]
            : [],

        comparisons: Array.isArray(parsed.comparisons)
          ? parsed.comparisons
          : parsed.comparisons
            ? [parsed.comparisons]
            : [],
      };

    } catch (err) {
      console.error("❌ JSON Parse Error:", content);
      return fallbackResponse();
    }

  } catch (err) {
    console.error("❌ AI API Error:", err.message);
    return fallbackResponse();
  }
}

// fallback (VERY IMPORTANT)
function fallbackResponse() {
  return {
    credibilityScore: 50,
    biasScore: 50,
    emotionalTone: 50,
    leaning: "Unknown",
    evidenceStrength: "Unknown",
    confidence: 50,
    neutralSummary: "Could not analyze article.",
    explanationPoints: [],
    claims: [],
    comparisons: [],
  };
}

module.exports = { analyzeArticleWithAI };