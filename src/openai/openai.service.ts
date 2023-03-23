import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import * as config from "../config";

export class ChatGPTService {

    private readonly openai: OpenAIApi;

    constructor() {
        const configuration = new Configuration({
            apiKey: config.API_KEY,
        });
        this.openai = new OpenAIApi(configuration);
    }

    public async createCompletetion(promptExpression: string): Promise<CreateCompletionResponse> {
        try {
            const response = await this.openai.createCompletion({
                model: config.MODEL,
                prompt: promptExpression,
                temperature: 0.7,
                max_tokens: 2200,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
    
            return response.data;
        } catch(err) {
            console.error(`It was not possible to fetch prompt response due: ${err.message}`);
            return null;
        }
    }
}