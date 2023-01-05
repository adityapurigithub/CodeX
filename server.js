import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.status(200).send("hello Ady");
});
//now creating api call using express...
app.post("/", async (req, res) => {
  const { message, model } = req.body;
  console.log("message", message + "currmodel", model);

  try {
    const response = await openai.createCompletion({
      model: `${model}`,
      prompt: `${message}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    res.status(200).json({
      data: response.data.choices[0].text.trim(), //trim the white spaces at both end of string..
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).send(err.message);
  }
});

app.get("/models", async (req, res) => {
  const response = await openai.listModels();
  res.json({
    models: response.data.data,
  });
  // console.log(response.data);
});

app.listen(port, (err) => {
  if (err) {
    console.log("err in setting up server", err);
  }
  console.log(`server up on port.. http://localhost:${port}`);
});
