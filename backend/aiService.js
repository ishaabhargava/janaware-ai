const OpenAI = require("openai").default;

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

/* ----------------------------- MAIN FUNCTION ----------------------------- */
async function analyzeArticleWithAI(text) {
  const cleanedText = preprocessText(text);
  const prompt = buildPrompt(cleanedText);

  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.35,
      response_format: { type: "json_object" },
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) throw new Error("Empty AI response");

    console.log("🔍 RAW AI RESPONSE:\n", content.slice(0, 500));

    const parsed = safeJSONParse(content);

    return normalize(parsed);

  } catch (err) {
    console.error("❌ AI ERROR:", err.message);
    return fallbackResponse();
  }
}

/* ----------------------------- TEXT PREPROCESS ----------------------------- */
function preprocessText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/(subscribe|advertisement|cookie policy)/gi, "")
    .trim()
    .slice(0, 8000); // prevent overload
}

/* ----------------------------- PROMPT BUILDER ----------------------------- */
function buildPrompt(text) {
  return `
You are a professional media analyst.

Your job is to critically evaluate the article — not summarize lazily.

----------------------------------------
CRITICAL THINKING RULES:

- DO NOT default to mid scores (50-60)
- Use FULL range (0–100)
- If weak evidence → go BELOW 40
- If strong evidence → go ABOVE 75
- Scores must vary based on content
- Avoid safe/generic answers

----------------------------------------
SCORING GUIDELINES:

credibilityScore:
- Low if no sources, vague claims
- High if data, experts, verifiable facts

biasScore:
- High if emotional, one-sided, loaded language
- Low if balanced, multiple perspectives

emotionalTone:
- High if dramatic, persuasive
- Low if factual and calm

----------------------------------------
OUTPUT JSON ONLY:

{
  "credibilityScore": number,
  "biasScore": number,
  "emotionalTone": number,
  "confidence": number,
  "leaning": "Left | Right | Neutral",
  "evidenceStrength": "Weak | Moderate | Strong",
  "neutralSummary": "2-3 line factual summary",
  "explanationPoints": ["specific reasoning 1", "specific reasoning 2", "specific reasoning 3"],
  "claims": [
    {
      "claim": "specific claim from article",
      "support": "what supports or challenges it",
      "evidenceType": "data | opinion | anecdote | expert statement | none",
      "confidence": number
    }
  ],
  "comparisons": [
    {
      "outlet": "realistic outlet name",
      "leaning": "Left | Right | Neutral",
      "headline": "how they would frame it",
      "tone": "tone description",
      "framing": "what angle they emphasize"
    },
    {
      "outlet": "another outlet",
      "leaning": "Left | Right | Neutral",
      "headline": "alternative framing",
      "tone": "tone description",
      "framing": "angle difference"
    }
  ]
}

----------------------------------------
IMPORTANT:

- Avoid generic phrases like "this article discusses..."
- Be SPECIFIC to the content
- Extract REAL claims, not vague summaries
- Scores MUST reflect actual content differences

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
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Invalid JSON format");
    return JSON.parse(match[0]);
  }
}

/* ----------------------------- NORMALIZATION ----------------------------- */
function normalize(parsed) {
  return {
    credibilityScore: clamp(parsed.credibilityScore),
    biasScore: clamp(parsed.biasScore),
    emotionalTone: clamp(parsed.emotionalTone),
    confidence: clamp(parsed.confidence),
    leaning: parsed.leaning ?? "Unknown",
    evidenceStrength: parsed.evidenceStrength ?? "Unknown",
    neutralSummary: parsed.neutralSummary ?? "No summary available.",

    explanationPoints: Array.isArray(parsed.explanationPoints)
      ? parsed.explanationPoints.slice(0, 5)
      : [],

    claims: Array.isArray(parsed.claims)
      ? parsed.claims.slice(0, 4)
      : [],

    comparisons: Array.isArray(parsed.comparisons)
      ? parsed.comparisons.slice(0, 2)
      : [],
  };
}

/* ----------------------------- UTIL ----------------------------- */
function clamp(val) {
  if (typeof val !== "number") return 50;
  return Math.max(0, Math.min(100, val));
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
