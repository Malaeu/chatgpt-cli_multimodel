import React, { useState, useEffect } from 'react';
import { AIProvider } from '../services/AIService';
import { createAIService } from '../services/AIServiceFactory';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [aiProvider, setAiProvider] = useState<AIProvider>(AIProvider.OpenAI);

  const aiService = createAIService(aiProvider);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, `You: ${input}`]);
    const response = await aiService.generateResponse(input);
    setMessages(prev => [...prev, `AI: ${response}`]);
    setInput('');
  };

  return (
    <div>
      <select value={aiProvider} onChange={e => setAiProvider(Number(e.target.value) as AIProvider)}>
        <option value={AIProvider.OpenAI}>OpenAI</option>
        <option value={AIProvider.Anthropic}>Anthropic</option>
        <option value={AIProvider.GoogleAI}>Google AI</option>
      </select>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;