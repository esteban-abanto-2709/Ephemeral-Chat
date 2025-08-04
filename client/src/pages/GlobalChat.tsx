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
  const [connectedCount, setConnectedCount] = useState<number>(0);

  useEffect(() => {
    if (!socket) return;

    socket.emit('chat:global:join');
    socket.emit('chat:global:count:get');

    socket.on('chat:global:message', ({ content, senderId, timestamp, isDeleted, originalSender }) => {
      const receivedMessage: Message = {
        sender: senderId,
        content,
        timestamp: new Date(timestamp),
        isDeleted,
        originalSender
      };

      setMessages((prev) => [...prev, receivedMessage]);
    });

    // Nuevo: Manejar eliminación de mensajes cuando un usuario sale
    socket.on('chat:global:messages:delete', (userId: string) => {
      setMessages((prevMessages) =>
        prevMessages.map((message) => {

          if (message.sender === userId && !message.isDeleted) {
            return {
              ...message,
              isDeleted: true,
              originalSender: userId,
              sender: 'deleted', // Cambiar el sender para que no se muestre como propio
              content: '' // Limpiar el contenido original
            };
          }
          return message;
        })
      );
    });

    socket.on('chat:global:count', (count: number) => {
      setConnectedCount(count);
    });

    return () => {
      socket.emit('chat:global:leave');
      socket.off('chat:global:message');
      socket.off('chat:global:messages:delete');
      socket.off('chat:global:count');
    };

  }, [socket]);

  const handleSendMessage = (content: string) => {
    console.log('[GlobalChat] Sending message:', content);

    if (content.trim() === '' || !socket || !socket.id) return;

    socket.emit('chat:global:message', {
      senderId: socket.id,
      content,
    });
  };

  if (!socket || !socket.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Conectando con el chat...
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-sky-200 via-purple-200 to-violet-300 flex justify-center overflow-hidden">
      <div className="w-full max-w-md flex flex-col h-dvh overflow-hidden" style={{ maxWidth: '600px' }}>

        <ChatHeader
          title="Global Chat"
          icon={<Globe className="h-5 w-5" />}
          connectedCount={connectedCount}
        />
        <ChatArea messages={messages} ownId={socket.id} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default GlobalChat;