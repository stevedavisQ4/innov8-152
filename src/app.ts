import express from "express";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import * as config from "./config";
import cors from "cors";

const app = express();
const port = 4000;

const configuration = new Configuration({
  apiKey: config.API_KEY,
});
const openai = new OpenAIApi(configuration);

async function readFiles(dirname, onFileContent) {
  const filenames = await fs.promises.readdir(dirname);

  for await (const filename of filenames) {
    const content = await fs.promises.readFile(dirname + filename, 'utf-8')
    onFileContent(filename, content);
  }
}

app.use(cors());
  
app.get("/", async (req, res) => {
  const promptExpression = req.query.prompt as string;
  console.log(`Prompt expression: ${promptExpression}`)
  
  const prompts: Record<string, string> = {};
  
  try {
    await readFiles('src/testPrompts/', function(filename, content) {
      prompts[filename] = content;
    })

    for await ( const [key, value] of Object.entries(prompts)) {
      console.log(`Getting AI E2E for ${key}`);

      const response = await openai.createCompletion({
        model: config.MODEL,
        prompt: value,
        temperature: 0.7,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log(`Got response for ${key}`);

      const outputFileName = `tests/${key.split(".txt")[0]}.e2e.js`;

      // Cut off text prior to module exports
      const aiText = response.data.choices[0].text;
      const testCode = aiText.slice(aiText.indexOf("module.exports"));
      fs.writeFileSync(outputFileName, testCode);
      console.log(`Finished writing for ${outputFileName}`);
    }
  }
  catch(err) {
    console.error(err);
    res.status(400).send({ err });
    return;
  }

  res.status(200).send("Finished writing files!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
