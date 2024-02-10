const express = require("express");
const app = express();
const OpenAI = require("openai");

// Load environment variables
require("dotenv").config();

const key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key });

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});

app.get("/catgirl", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) {
    res.send({ error: "no prompt" });
    return;
  }
  const promptResponse = await generateResponse(prompt);
  console.log(promptResponse);
  res.send({ message: promptResponse });
});

async function generateResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a catgirl internet person responding to the user. Generate a response using a catgirl internet persona to the prompt ${
          prompt || "The user has been spending too much money."
        } Should be 1-2 sentences`,
      },
    ],
    model: "gpt-3.5-turbo-0125",
  });
  return completion.choices[0].message.content;
}
