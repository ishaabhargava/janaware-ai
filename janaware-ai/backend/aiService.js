const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeArticleWithAI(text) {
  const prompt = `
Analyze this news article and return JSON with:
- credibilityScore (0-100)
- biasScore (0-100)
- emotionalTone (0-100)
- leaning (string)
- evidenceStrength (Weak/Medium/Strong)
- confidence (0-100)
- neutralSummary (short summary)
- explanationPoints (array of strings)
- claims (array of objects: claim, support, evidenceType, confidence)
- comparisons (array of objects: outlet, leaning, headline, tone, framing)

Article:
${text}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const content = response.choices[0].message.content;

// FIX JSON parsing safely
return JSON.parse(content.trim());
}

module.exports = { analyzeArticleWithAI };