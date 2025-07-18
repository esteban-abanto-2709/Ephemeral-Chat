import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/SocketContext';

import type { Message } from '@/types/Message';
import { ChatHeader } from "@/components/Chat/ChatHeader";
import { ChatArea } from '@/components/Chat/ChatArea';
import { ChatInput } from '@/components/Chat/ChatInput';

import { Globe } from 'lucide-react';

function GlobalChat() {
  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat:message', ({ content, senderId, timestamp }) => {

      const receivedMessage: Message = {
        sender: senderId,
        content,
        timestamp: new Date(timestamp),
      };

      setMessages((prev) => [...prev, receivedMessage]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat:message');
    };

  }, [socket]);

  const handleSendMessage = (content: string) => {
    console.log('[GlobalChat] Sending message:', content);
    if (content.trim() === '' || !socket || !socket.id) return;

    const newMessage: Message = {
      sender: socket.id,
      content,
      timestamp: new Date(),
    };

    socket.emit('chat:message', {
      senderId: socket.id,
      content,
    });

    setMessages((prev) => [...prev, newMessage]);
  };

  // ✅ Guard clause para evitar errores
  if (!socket || !socket.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Conectando con el chat...
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-sky-200 via-purple-200 to-violet-300 flex justify-center'>
      <div className="flex flex-col h-screen bg-gray-50" style={{ width: '100%', maxWidth: '600px' }}>

        <ChatHeader
          title="Global Chat"
          icon={<Globe className="h-5 w-5" />}
          connectedCount={45}
        />
        <ChatArea messages={messages} ownId={socket.id} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default GlobalChat;
