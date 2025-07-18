import { useEffect, useRef } from 'react';
import type { Message } from '@/types/Message';

import { MessageRenderer } from '@/components/Messages/MessageRenderer';

interface ChatAreaProps {
    messages: Message[];
    ownId: string;
}

export const ChatArea = ({ messages, ownId }: ChatAreaProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll cuando cambia la lista de mensajes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message, i) => (
                <MessageRenderer key={i} message={message} ownId={ownId} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};
