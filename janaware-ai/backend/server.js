require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { generateMockAnalysis } = require("./mockAnalysis");
const { analyzeArticleWithAI } = require("./aiService");
const { extractArticleFromURL } = require("./utils/extractArticleFromURL");

const app = express();

app.use(cors({
  origin: true, // allow all localhost/dev origins
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
 app.use(cors());
 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

app.post("/analyze", async (req, res) => {
  const { article, url } = req.body;
  let textToAnalyze = article;

  try {
    if (url) {
      textToAnalyze = await extractArticleFromURL(url);
    }

    if (!textToAnalyze || !textToAnalyze.trim()) {
      return res.status(400).json({
        error: "Article text or URL is required",
      });
    }

    const result = await analyzeArticleWithAI(textToAnalyze);
    res.json(result);
  } catch (error) {
    console.error("AI/Error:", error.message);
    const fallback = generateMockAnalysis(textToAnalyze || "");
    res.json(fallback);
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});