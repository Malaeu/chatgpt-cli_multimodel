import { AIService } from './AIService';

export class AnthropicService implements AIService {
  async generateResponse(prompt: string): Promise<string> {
    // Implementierung für Anthropic
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is not set');
    }

    const response = await fetch('https://api.anthropic.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        model: 'claude-2',
        messages: [{ role: 'user', content: prompt }],
        max_tokens_to_sample: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.content[0].text.trim();
  }
}