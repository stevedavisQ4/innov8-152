import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";
import * as config from "../../../config";

export interface OpenAIService {
  query(expression: string): Promise<CreateCompletionResponse>;
}

export class OpenAIIntegration implements OpenAIService {
  private readonly openai: OpenAIApi;

  public constructor(configuration: Configuration) {
    this.openai = new OpenAIApi(configuration);
  }

  public async query(expression: string): Promise<CreateCompletionResponse> {
    try {
      const response = await this.openai.createCompletion({
        model: config.MODEL,
        prompt: expression,
        temperature: 0,
        max_tokens: 2200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      console.log("RESPONSE", response.data);

      return response.data;
    } catch (err) {
      console.error(
        `[OpenAIIntegration] It was not possible to fetch prompt response due: ${err.message}`
      );
      return null;
    }
  }
}
