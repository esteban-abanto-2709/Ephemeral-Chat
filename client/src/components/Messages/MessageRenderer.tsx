import type { Message } from '@/types/Message';

import { SystemMessageBubble } from '@/components/Messages/SystemMessageBubble';
import { EmitterMessageBubble } from '@/components/Messages/EmitterMessageBubble';
import { ReceiverMessageBubble } from '@/components/Messages/ReceiverMessageBubble';

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