const express = require("express");
const app = express();
const OpenAI = require("openai");
const cors = require("cors");
const axios = require("axios");
// Load environment variables
require("dotenv").config();
app.use(express.json());
const key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key });
app.use(cors());
app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
  //test();
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

async function test(url, method, body) {
  try {
    let response;
    console.log(url);
    console.log("in req, ee", method, body);
    if (method === "GET") {
      response = await axios.get(url);
    } else if (method === "POST") {
      response = await axios.post(url, body);
    }

    console.log(response.data);
    return response.data;
    // Send the response data back to the client
  } catch (error) {
    // Handle any errors
    console.log(error.message);
    console.log(error.response.data);
    return error.response.data || error.message;
  }
}

app.get("/nessie", async (req, res) => {
  try {
    const body = req.body;
    const url = req.query.url;
    const data = await test(url, "GET", body);
    res.json(data);
  } catch (error) {
    // Handle any errors
    console.log(error);
    res
      .status(500)
      .json({ error: "Unable to retrieve data from the external API" });
  }
});

app.post("/nessie", async (req, res) => {
  try {
    console.log("POST REQ RCIEVED");
    const body = req.body;
    console.log("Body", body);

    const url = req.query.url;
    const data = await test(url, "POST", body);

    res.json(data);
  } catch (error) {
    // Handle any errors
    console.log(error);
    res
      .status(500)
      .json({ error: "Unable to retrieve data from the external API" });
  }
});

async function generateResponse(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "assistant",
        content: `You are a catgirl internet person responding to the user. Generate a response using internet catgirl lingo and dialect ${
          prompt || "The user has been spending too much money."
        } Should be 1-2 sentences.`,
      },
    ],
    model: "gpt-3.5-turbo-0125",
  });
  return completion.choices[0].message.content;
}
