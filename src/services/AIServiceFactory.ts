import { AIService, AIProvider } from './AIService';
import { OpenAIService } from './OpenAIService';
import { AnthropicService } from './AnthropicService';
import { GoogleAIService } from './GoogleAIService';

export function createAIService(provider: AIProvider): AIService {
  switch (provider) {
    case AIProvider.OpenAI:
      return new OpenAIService();
    case AIProvider.Anthropic:
      return new AnthropicService();
    case AIProvider.GoogleAI:
      return new GoogleAIService();
    default:
      throw new Error("Ungültiger AI-Anbieter");
  }
}