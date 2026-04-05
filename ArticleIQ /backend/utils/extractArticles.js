const axios = require("axios");
const cheerio = require("cheerio");

async function extractArticleFromURL(url) {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    // Extract all paragraph text
    const text = $("p")
      .map((i, el) => $(el).text())
      .get()
      .join(" ");

    return text;
  } catch (err) {
    console.error("❌ URL Extraction Error:", err.message);
    throw new Error("Failed to extract article");
  }
}

module.exports = { extractArticleFromURL };