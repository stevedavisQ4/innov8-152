import express from "express";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import * as config from "./config";

const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: config.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: config.MODEL,
      prompt:
        "You are world-class software engineer.\n\nWrite a test in Nightwatch for the following scenario:\nTest Scenario: Netflix IR Website\n\nObjective: To ensure that the Netflix IR website is working as expected and all its features are functional.\n\nPre-requisites:\n\nA web browser (e.g., Chrome, Firefox)\nA stable internet connection\nTest account credentials\nSteps:\n1. Open the web browser and navigate to the Netflix IR website: https://ir.netflix.net/.\n2. Verify that the website's homepage is displayed with the latest news and events related to Netflix.\n\n",
      temperature: 0.7,
      max_tokens: 2200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
  
    const time = new Date().getTime();
    fs.writeFileSync(`tests/${time}.js`, response.data.choices[0].text);
  
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch(err) {
    console.error(err);
    res.status(400).send({
      err,
    });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
