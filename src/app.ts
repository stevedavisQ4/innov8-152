import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = 3000;

const configuration = new Configuration({
    apiKey: "SOME_TOKEN",
});
const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "You are world-class software engineer.\n\nWrite a test in Nightwatch for the following scenario:\nTest Scenario: Netflix IR Website\n\nObjective: To ensure that the Netflix IR website is working as expected and all its features are functional.\n\nPre-requisites:\n\nA web browser (e.g., Chrome, Firefox)\nA stable internet connection\nTest account credentials\nSteps:\n1. Open the web browser and navigate to the Netflix IR website: https://ir.netflix.net/.\n2. Verify that the website's homepage is displayed with the latest news and events related to Netflix.\n\n",
        temperature: 0.7,
        max_tokens: 2200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    console.log(response);

    res.status(200).send({
        bot: response.data.choices[0].text
    });    
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});