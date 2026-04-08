require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { generateMockAnalysis } = require("./mockAnalysis");
const { extractArticleFromURL } = require("./utils/extractArticleFromURL");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://articleiq-1.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
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
    return res.json(result);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      error: "Analysis failed",
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});