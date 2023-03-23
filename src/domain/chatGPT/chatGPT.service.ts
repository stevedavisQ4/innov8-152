import { CreateCompletionResponse } from "openai";
import { OpenAIService } from "../../infrastructure/integration/openai/openai.service";
import { FileUtils } from "../../infrastructure/utils/file.utils";

export interface ChatGPTService {
    createTestCase(fileName: string, promptExpression: string): Promise<string>
    createTestCaseFromScripts(scriptDir: string): Promise<void>
}

export class ChatGTPExecutor {
    public constructor(private openAIService: OpenAIService) {}

    public async createTestCase(fileName: string, promptExpression: string): Promise<string> {
        try {
            console.log(`[ChatGTPExecutor] Getting AI E2E for ${fileName}`);
            const response = await this.openAIService.query(promptExpression);

            if(response) {
                console.log(`[ChatGTPExecutor] Got response for ${fileName}`);
            
                // Cut off text prior to module exports
                const aiText = response.choices[0].text;
                const testCode = aiText.slice(aiText.indexOf("module.exports"));
            
                FileUtils.createSource("prompts", `${fileName}.prompt.txt`, promptExpression);
                FileUtils.createSource("tests", `${fileName}.e2e.js`, testCode);

                return testCode;
            }

            return null;
        } catch(err) {
            console.error(`[ChatGTPExecutor] It was not possible to create completetion due: ${err.message}`);
            return null;
        }
    }

    public async createTestCaseFromScripts(scriptDir: string): Promise<void> {
        const prompts = FileUtils.readFiles(scriptDir);
        const existingCases = Object.entries(prompts).map(([key, value]) => this.createTestCase(key, value));
        await Promise.allSettled(existingCases);
    }
}