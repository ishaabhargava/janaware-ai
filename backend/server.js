require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { generateMockAnalysis } = require("./mockAnalysis");

const { extractArticleFromURL } = require("./utils/extractArticleFromURL");

const app = express();

aapp.use(cors());
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

    const result = generateMockAnalysis(textToAnalyze);
    res.json(result);

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Analysis failed" });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});