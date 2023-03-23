import { Request, Response } from "express";
import { ChatGPTService } from "./chatGPT.service";

export class ChatGPTController {

    public constructor(private chatGPTService: ChatGPTService) {}

    public async createTestCase(req: Request, res: Response): Promise<void> {
        const fileName = req.body.fileName as string;
        const promptExpression = req.body.prompt as string;
        console.log(`[ChatGPTController] Prompt expression: ${promptExpression}`)
        
        try {
          const response = await this.chatGPTService.createTestCase(fileName, promptExpression);
          console.log(`[ChatGPTController] Finished getting the response!`);
          res.status(200).send({ text: response });
        }
        catch(err) {
            console.error(err);
            res.status(400).send({ err });
            return;
        }
    }

    public async createTestCaseFromScript(req: Request, res: Response): Promise<void> {
        try {
            const scriptsDir = "scripts";
            await this.chatGPTService.createTestCaseFromScripts(scriptsDir);
            console.log(`[ChatGPTController] Finished writing files!`);
            res.status(204).send();
        }
        catch(err) {
            console.error(err);
            res.status(400).send({ err });
            return;
        }
    }
}