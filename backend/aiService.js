const OpenAI = require("openai").default;

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

/* ----------------------------- MAIN FUNCTION ----------------------------- */

async function analyzeArticleWithAI(text) {
  const prompt = buildPrompt(text);

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty AI response");

    console.log("🔍 RAW AI RESPONSE:\n", content);

    const parsed = safeJSONParse(content);

    return normalize(parsed);

  } catch (err) {
    console.error("❌ AI ERROR:", err.message);
    return fallbackResponse();
  }
}

/* ----------------------------- PROMPT BUILDER ----------------------------- */

function buildPrompt(text) {
  return `
You are an expert media analysis AI.

Analyze the article and return STRICT JSON ONLY.

----------------------------------------

SCORING GUIDELINES:

credibilityScore (0-100):
- 0–30 → weak / unsupported
- 31–60 → moderate reliability
- 61–85 → credible
- 86–100 → highly reliable

biasScore (0-100):
- 0–20 → neutral
- 21–50 → mild bias
- 51–80 → clear bias
- 81–100 → strong bias

emotionalTone (0-100):
- 0–20 → factual
- 21–50 → mildly expressive
- 51–80 → emotional
- 81–100 → highly dramatic

----------------------------------------

OUTPUT FORMAT:

{
  "credibilityScore": number,
  "biasScore": number,
  "emotionalTone": number,
  "confidence": number,
  "leaning": "Left | Right | Neutral",
  "evidenceStrength": "Weak | Moderate | Strong",
  "neutralSummary": "2-3 line summary",
  "explanationPoints": ["point1", "point2", "point3"],
  "claims": [
    {
      "claim": "string",
      "support": "string",
      "evidenceType": "data | opinion | anecdote | expert statement | none",
      "confidence": number
    }
  ],
  "comparisons": [
    {
      "outlet": "string",
      "leaning": "Left | Right | Neutral",
      "headline": "string",
      "tone": "string",
      "framing": "string"
    },
    {
      "outlet": "string",
      "leaning": "Left | Right | Neutral",
      "headline": "string",
      "tone": "string",
      "framing": "string"
    }
  ]
}

----------------------------------------

RULES:
- JSON ONLY
- No markdown
- No explanation outside JSON
- Fill all fields
- Keep values realistic

----------------------------------------

Article:
${text}
`;
}

/* ----------------------------- SAFE PARSER ----------------------------- */

function safeJSONParse(content) {
  try {
    return JSON.parse(content);
  } catch {
    //fallback extraction 
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Invalid JSON format");

    return JSON.parse(match[0]);
  }
}

/* ----------------------------- NORMALIZATION ----------------------------- */

function normalize(parsed) {
  return {
    credibilityScore: parsed.credibilityScore ?? 50,
    biasScore: parsed.biasScore ?? 50,
    emotionalTone: parsed.emotionalTone ?? 50,
    confidence: parsed.confidence ?? 50,
    leaning: parsed.leaning ?? "Unknown",
    evidenceStrength: parsed.evidenceStrength ?? "Unknown",
    neutralSummary: parsed.neutralSummary ?? "No summary available.",

    explanationPoints: Array.isArray(parsed.explanationPoints)
      ? parsed.explanationPoints
      : [],

    claims: Array.isArray(parsed.claims)
      ? parsed.claims
      : [],

    comparisons: Array.isArray(parsed.comparisons)
      ? parsed.comparisons
      : [],
  };
}

/* ----------------------------- FALLBACK ----------------------------- */

function fallbackResponse() {
  return {
    credibilityScore: 50,
    biasScore: 50,
    emotionalTone: 50,
    confidence: 50,
    leaning: "Unknown",
    evidenceStrength: "Unknown",
    neutralSummary: "AI analysis unavailable.",
    explanationPoints: [],
    claims: [],
    comparisons: [],
  };
}

module.exports = { analyzeArticleWithAI };