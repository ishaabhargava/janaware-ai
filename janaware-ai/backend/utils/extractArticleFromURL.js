const axios = require("axios");
const cheerio = require("cheerio");

async function extractArticleFromURL(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    const text = $("p")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(Boolean)
      .join(" ");
    const cleanedText = text.replace(/\s+/g, " ").trim();
return cleanedText;
    if (!text || text.length < 100) {
      throw new Error("Could not extract enough article text");
    }

    return text;
  } catch (error) {
    console.error("URL Extraction Error:", error.message);
    throw new Error("Failed to extract article from URL");
  }
}

module.exports = { extractArticleFromURL };