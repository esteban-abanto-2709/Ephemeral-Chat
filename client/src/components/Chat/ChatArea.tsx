import { useEffect, useRef } from 'react';
import type { Message } from '@/types/Message';

import { MessageBubble } from '@/components/Messages/MessageBubble';

interface ChatAreaProps {
    messages: Message[];
    ownId: string;
}

export const ChatArea = ({ messages, ownId }: ChatAreaProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="glass flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, i) => (
                <MessageBubble key={i} message={message} ownId={ownId} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};
