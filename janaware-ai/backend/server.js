require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { generateMockAnalysis } = require("./mockAnalysis");
const { analyzeArticleWithAI } = require("./aiService");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("JanAware backend is running 🚀");
});

// Analyze route
app.post("/analyze", async (req, res) => {
  const { article } = req.body;

  if (!article) {
    return res.status(400).json({ error: "Article text is required" });
  }

  try {
    const result = await analyzeArticleWithAI(article);
    res.json(result);
  } catch (error) {
    console.error("AI Error:", error.message);

    // fallback to mock (VERY IMPORTANT)
    const fallback = generateMockAnalysis(article);
    res.json(fallback);
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});