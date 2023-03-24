import { Request, Response } from "express";
import { ChatGPTService } from "./chatGPT.service";
import { exec } from "child_process";
import path from "path";
export class ChatGPTController {
  public constructor(private chatGPTService: ChatGPTService) {}

  public async createTestCase(req: Request, res: Response): Promise<void> {
    const fileName = req.body.fileName as string;
    const promptExpression = req.body.prompt as string;
    console.log(`[ChatGPTController] Prompt expression: ${promptExpression}`);

    try {
      const response = await this.chatGPTService.createTestCase(
        fileName,
        promptExpression
      );
      console.log(`[ChatGPTController] Finished getting the response!`);
      res.status(200).send({ text: response });
    } catch (err) {
      console.error(err);
      res.status(400).send({ err });
      return;
    }
  }

  public async createTestCaseFromScript(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const scriptsDir = "scripts";
      await this.chatGPTService.createTestCaseFromScripts(scriptsDir);
      console.log(`[ChatGPTController] Finished writing files!`);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(400).send({ err });
      return;
    }
  }

  public async nightwatch(req: Request, res: Response): Promise<void> {
    console.log("DIRNAME", __dirname);
    console.log(
      "PATH",
      path.resolve(
        __dirname + "/../../../tests_output/nightwatch-html-report/index.html"
      )
    );
    try {
      const fileName = req.body.fileName as string;
      const command = `npm run test --test tests\\${fileName}.e2e.js`;
      console.log("Command: " + command);
      var child = exec(command);
      child.stdout.pipe(process.stdout);
      child.on("exit", function () {
        console.log("EXITED");
        res.sendFile(
          path.resolve(
            __dirname +
              "/../../../tests_output/nightwatch-html-report/index.html"
          )
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
}
