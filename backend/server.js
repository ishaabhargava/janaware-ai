require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { generateMockAnalysis } = require("./mockAnalysis");
const { extractArticleFromURL } = require("./utils/extractArticleFromURL");

const app = express();

/* ✅ CORS CONFIGURATION (IMPORTANT) */
const allowedOrigins = [
  "http://localhost:5174",
  "https://articleiq-1.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

/* ✅ HANDLE PREFLIGHT REQUESTS */
app.options("*", cors());

app.use(express.json());

/* ✅ HEALTH CHECK ROUTE */
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

/* ✅ MAIN API */
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

/* ✅ PORT FIX FOR RENDER */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});