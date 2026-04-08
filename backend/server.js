require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { analyzeArticleWithAI } = require("./aiService");
const { extractArticleFromURL } = require("./utils/extractArticleFromURL");

const app = express();

/* ✅ CORS */
const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://articleiq-1.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

/* ✅ HEALTH */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ✅ MAIN API */
app.post("/analyze", async (req, res) => {
  const { article, url } = req.body;
  let textToAnalyze = article;

  try {
    if (url) {
      textToAnalyze = await extractArticleFromURL(url);
    }

    console.log("🚨 TEXT LENGTH:", textToAnalyze?.length);
    console.log("🚨 TEXT PREVIEW:", textToAnalyze?.slice(0, 300));

    if (!textToAnalyze || !textToAnalyze.trim()) {
      return res.status(400).json({
        error: "Article text or URL is required",
      });
    }

    // 🔥 REAL AI CALL
    const result = await analyzeArticleWithAI(textToAnalyze);

    res.json(result);

  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.status(500).json({
      error: "Analysis failed",
    });
  }
});

/* ✅ PORT */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
