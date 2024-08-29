export interface AIService {
  generateResponse(prompt: string): Promise<string>;
}

export enum AIProvider {
  OpenAI,
  Anthropic,
  GoogleAI
}