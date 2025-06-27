import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/SocketContext';

import type { Message } from '@/types/Message';
import { MessagesArea } from '@/components/MessagesArea';
import { MessageInput } from '@/components/MessageInput';

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

        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  Chat Global
                </h1>
                <div className="flex items-center">
                </div>
              </div>
            </div>
          </div>
        </header>

        <MessagesArea messages={messages} ownId={socket.id} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default GlobalChat;
