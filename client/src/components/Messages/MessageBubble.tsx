import type { Message } from '@/types/Message';

interface MessageBubbleProps {
  message: Message;
  ownId: string;
}

export const MessageBubble = ({ message, ownId }: MessageBubbleProps) => {
  // Mensaje del sistema
  if (message.sender === 'system') {
    return (
      <div className="flex justify-center mb-4">
        <div className="bg-muted text-muted-foreground px-4 py-2 rounded-full text-sm max-w-[80%] text-center border">
          <p className="text-xs leading-relaxed">{message.content}</p>
          {message.timestamp && (
            <span className="text-xs opacity-60 mt-1 block">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Mis mensajes (derecha)
  if (message.sender === ownId) {
    return (
      <div className="flex w-full mb-4 justify-end">
        <div className="max-w-[70%] px-4 py-3 rounded-2xl shadow-sm bg-primary text-primary-foreground rounded-br-md">
          <p className="text-sm leading-relaxed">{message.content}</p>
          {message.timestamp && (
            <span className="text-xs mt-1 block opacity-60">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Mensajes de otros (izquierda)
  return (
    <div className="flex w-full mb-4 justify-start">
      <div className="max-w-[70%] px-4 py-3 rounded-2xl shadow-sm bg-card text-card-foreground rounded-bl-md border">
        {message.sender && (
          <p className="text-xs font-medium opacity-70 mb-1">{`Alpharius#${message.sender.slice(0, 5)}`}</p>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        {message.timestamp && (
          <span className="text-xs mt-1 block opacity-60">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};