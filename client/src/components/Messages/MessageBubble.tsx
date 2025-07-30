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
        <div className="message-system px-4 py-2 rounded-full text-sm max-w-[80%] text-center shadow-lg">
          <p className="text-slate-200 text-xs font-medium leading-relaxed">{message.content}</p>
          {message.timestamp && (
            <span className="text-slate-300 text-xs mt-1 block">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Mensaje eliminado - Mantener estructura de mensaje normal pero con contenido modificado
  if (message.isDeleted) {
    const deletedContent = "Mensaje eliminado, el usuario salió del chat";

    return (
      <div className="flex w-full mb-4 justify-start">
        <div className="message-deleted max-w-[75%] px-5 py-3 rounded-2xl rounded-bl-md shadow-xl">
          {message.originalSender && (
            <p className="text-xs font-semibold text-slate-500 mb-1">{`Alpharius#${message.originalSender.slice(0, 5)}`}</p>
          )}
          <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{deletedContent}</p>
          {message.timestamp && (
            <span className="text-xs text-slate-400 mt-2 block">
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
        <div className="message-own max-w-[75%] px-5 py-3 rounded-2xl rounded-br-md shadow-xl">
          <p className="text-sm text-white leading-relaxed font-medium">{message.content}</p>
          {message.timestamp && (
            <span className="text-xs text-white/90 mt-2 block">
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
      <div className="message-other max-w-[75%] px-5 py-3 rounded-2xl rounded-bl-md shadow-xl">
        {message.sender && (
          <p className="text-xs font-semibold text-slate-600 mb-1">{`Alpharius#${message.sender.slice(0, 5)}`}</p>
        )}
        <p className="text-sm text-slate-800 leading-relaxed font-medium">{message.content}</p>
        {message.timestamp && (
          <span className="text-xs text-slate-500 mt-2 block">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </div>
  );
};