import express from 'express';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
const port = 3000;

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "You are a brilliant Software Developer.\n\nWrite me a Nightwatch tests for the following scenario: \n- Navigate to the Facebook login page\n- Enter valid username and password\n- Click the “Login” button\n- Verify that the user is successfully logged in\n\n//Test: Login\nmodule.exports = {\n  'Navigate to the Facebook login page': function (browser) {\n    browser\n      .url('https://www.facebook.com/')\n      .waitForElementVisible('body', 1000)\n      .assert.title('Facebook - Log In or Sign Up')\n  },\n  'Enter valid username and password': function (browser) {\n    browser\n      .setValue('#email', 'test@example.com')\n      .setValue('#pass', 'testpass')\n  },\n  'Click the “Login” button': function (browser) {\n    browser\n      .click('#u_0_b')\n  },\n  'Verify that the user is successfully logged in': function (browser) {\n    browser\n      .waitForElementVisible('#userNavigationLabel', 1000)\n      .end();\n  }\n};",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    console.log(response);
    res.send("hello world");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});