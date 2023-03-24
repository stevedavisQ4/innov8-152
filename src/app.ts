import express from "express";
import { Configuration } from "openai";
import * as config from "./config";
import cors from "cors";
import {
  OpenAIIntegration,
  OpenAIService,
} from "./infrastructure/integration/openai/openai.service";
import {
  ChatGPTService,
  ChatGTPExecutor,
} from "./domain/chatGPT/chatGPT.service";
import { ChatGPTController } from "./domain/chatGPT/chatGPT.controller";

const configuration = new Configuration({
  apiKey: config.API_KEY,
});

const setup = (): void => {
  const openAIService: OpenAIService = new OpenAIIntegration(configuration);
  const chatGPTService: ChatGPTService = new ChatGTPExecutor(openAIService);
  const chatGPTController = new ChatGPTController(chatGPTService);

  const app = express();
  const port = 4000;

  app.use(cors());
  app.use(express.json());

  app.post("/", (req, res) => chatGPTController.createTestCase(req, res));
  app.patch("/", (req, res) =>
    chatGPTController.createTestCaseFromScript(req, res)
  );
  app.post("/nightwatch", (req, res) => chatGPTController.nightwatch(req, res));

  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
};

setup();
