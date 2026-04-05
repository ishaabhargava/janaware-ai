const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function analyzeArticleWithAI(text) {
  const prompt = `
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