import type { Message } from '@/types/Message';

export const ReceiverMessageBubble = ({ message }: { message: Message }) => {

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