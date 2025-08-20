import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="glass-strong md:rounded-b-3xl p-4 md:p-6 shadow-2xl">
      <form onSubmit={handleSubmit} className="flex gap-3 items-center">

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 rounded-2xl chat-input border-0 px-4 py-2.5 
             text-slate-800 placeholder-slate-500 focus:outline-none 
             focus:ring-2 focus:ring-indigo-300 text-base font-medium
             h-10 min-h-[40px] max-h-20 transition-all duration-200"
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className="h-10 w-10 flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 transform disabled:opacity-50 disabled:hover:scale-100"
        >
          <Send className="h-5 w-5" />
        </button>

      </form>
    </div>
  );
};