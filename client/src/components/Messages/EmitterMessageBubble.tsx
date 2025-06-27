import type { Message } from '@/types/Message';

export const EmitterMessageBubble = ({ message }: { message: Message }) => {

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
};