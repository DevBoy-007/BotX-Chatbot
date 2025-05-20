const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/ask", async (req, res) => {
  const { prompt } = req.body;
 
  try {
    const model = genAI.getGenerativeModel({  model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    res.status(200).json({ response: text });
  } catch (err) {
    console.error("Gemini Error:", err.message);
    res.status(500).json({ error: "Gemini API Error", details: err.message });
  }
});

module.exports = router;
