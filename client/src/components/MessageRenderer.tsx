import type { Message } from '@/types/Message';

import { SystemMessageBubble } from '@/components/Chat/SystemMessageBubble';
import { EmitterMessageBubble } from '@/components/Chat/EmitterMessageBubble';
import { ReceiverMessageBubble } from '@/components/Chat/ReceiverMessageBubble';

interface MessageRendererProps {
  message: Message;
  ownId: string;
}

export const MessageRenderer = ({ message, ownId }: MessageRendererProps) => {
  if (message.sender === 'system') {
    return <SystemMessageBubble message={message} />;
  }

  if (message.sender === ownId) {
    return <EmitterMessageBubble message={message} />;
  }

  return <ReceiverMessageBubble message={message} />;
};