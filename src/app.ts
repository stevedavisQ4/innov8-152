import express from "express";
import { CreateCompletionResponse } from "openai";
import fs from "fs";
import cors from "cors";
import { ChatGPTService } from "./openai/openai.service";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const chatGPTService = new ChatGPTService();

const readFiles = async (dirname, onFileContent) => {
  const filenames = await fs.promises.readdir(dirname);

  for await (const filename of filenames) {
    const content = await fs.promises.readFile(dirname + filename, 'utf-8')
    onFileContent(filename, content);
  }
}

const createSource = (dir: string, fileName: string, content: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(`${dir}/${fileName}`, content);
}

const createTestCase = async (fileName: string, promptExpression: string): Promise<CreateCompletionResponse> => {
  console.log(`Getting AI E2E for ${fileName}`);
  const outputFileName = `${fileName.slice(fileName.indexOf(".txt"))[0]}.e2e.js`;

  if (fs.existsSync(`tests/${outputFileName}`)) {
    return;
  }

  const response = await chatGPTService.createCompletetion(promptExpression);

  if(response) {
    console.log(`Got response for ${fileName}`);
  
    // Cut off text prior to module exports
    const aiText = response.choices[0].text;
    const testCode = aiText.slice(aiText.indexOf("module.exports"));
  
    const dir = `tests/${fileName}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  
    createSource("prompts", `${fileName}.prompt.txt`, promptExpression);
    createSource("tests", `${fileName}.e2e.js`, testCode);
  
    console.log(`Finished writing for ${dir}`);
    return response;
  }

  return null;
}

const generateCasesFromExistingPrompts = async () => {
  const prompts: Record<string, string> = {};

  const existingCasesDir = "src/testPrompts/";
  await readFiles(existingCasesDir, function (filename, content) {
    prompts[filename] = content;
  });

  const existingCases = Object.entries(prompts).map(([key, value]) => createTestCase(key, value));
  await Promise.allSettled(existingCases);
}
  
app.post("/", async (req, res) => {
  const fileName = req.body.fileName as string;
  const promptExpression = req.body.prompt as string;
  console.log(`Prompt expression: ${promptExpression}`)
  
  try {
    await generateCasesFromExistingPrompts();

    const response = await createTestCase(fileName, promptExpression);
    
    console.log(`Finished writing files!`);
    res.status(200).send(response);
  }
  catch(err) {
    console.error(err);
    res.status(400).send({ err });
    return;
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});