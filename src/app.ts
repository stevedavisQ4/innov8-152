import express from "express";
import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import * as config from "./config";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: config.API_KEY,
});
const openai = new OpenAIApi(configuration);

const readFiles = async (dirname, onFileContent) => {
  const filenames = await fs.promises.readdir(dirname);

  for await (const filename of filenames) {
    const content = await fs.promises.readFile(dirname + filename, 'utf-8')
    onFileContent(filename, content);
  }
}

const createTestCase = async (fileName: string, promptExpression: string) => {
  console.log(`Getting AI E2E for ${fileName}`);

  const response = await openai.createCompletion({
    model: config.MODEL,
    prompt: promptExpression,
    temperature: 0.7,
    max_tokens: 3500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(`Got response for ${fileName}`);

  // Cut off text prior to module exports
  const aiText = response.data.choices[0].text;
  const testCode = aiText.slice(aiText.indexOf("module.exports"));

  const dir = `cases/${fileName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(`${dir}/${fileName}.prompt.txt`, promptExpression);
  fs.writeFileSync(`${dir}/${fileName}.e2e.js`, testCode);

  console.log(`Finished writing for ${dir}`);
}
  
app.post("/", async (req, res) => {
  const fileName = req.body.fileName as string;
  const promptExpression = req.body.prompt as string;
  console.log(`Prompt expression: ${promptExpression}`)
  
  const prompts: Record<string, string> = {};
  
  try {
    const existingCasesDir = "src/testPrompts/"
    await readFiles(existingCasesDir, function(filename, content) {
      prompts[filename] = content;
    })

    for await ( const [key, value] of Object.entries(prompts)) {
      await createTestCase(key, value);
    }

    await createTestCase(fileName, promptExpression);
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

