import type { Message } from '@/types/Message';

export const SystemMessageBubble = ({ message }: { message: Message }) => {

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
};