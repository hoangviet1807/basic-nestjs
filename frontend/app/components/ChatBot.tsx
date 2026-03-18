'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  drinks?: any[];
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your drink recommendation assistant. Tell me about your mood, preferences, or what you're looking for, and I'll recommend the perfect drink for you!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        drinks: data.drinks || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 shadow-lg p-4 border-b border-orange-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
          <span className="text-3xl">🍹</span>
          Drink Recommendation Chatbot
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-md'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.drinks && msg.drinks.length > 0 && (
                <div className="mt-4 space-y-2">
                  {msg.drinks.map((drink: any) => (
                    <div
                      key={drink.id}
                      className="bg-orange-50 dark:bg-gray-600 p-3 rounded-lg border border-orange-200 dark:border-gray-500"
                    >
                      <h3 className="font-semibold text-orange-700 dark:text-orange-300">
                        {drink.name}
                      </h3>
                      {drink.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {drink.description}
                        </p>
                      )}
                      {drink.price && (
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400 mt-1">
                          ${drink.price}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-md">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-orange-200 dark:border-gray-700">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me about your mood or preferences..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
