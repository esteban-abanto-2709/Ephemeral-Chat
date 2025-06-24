import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@/context/SocketContext';

import { MessageInput } from '@/components/MessageInput';
import { ChatBubble } from '@/components/ChatBubble';
import type { Message } from '@/types/Message';


function GlobalChat() {
    const socket = useContext(SocketContext);

	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (!socket) return;

		socket.on('chat:message', ({ content, senderId }) => {
			const receivedMessage: Message = {
				id: Date.now().toString(),
				content,
				timestamp: new Date(),
				isOwn: senderId === socket.id,
				senderId,
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
			id: Date.now().toString(),
			content,
			timestamp: new Date(),
			isOwn: true,
			senderId: socket.id,
		};

		socket.emit('chat:message', {
			content,
			senderId: socket.id,
		});

		setMessages((prev) => [...prev, newMessage]);
	};

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

				{/* Messages Area */}
				<div className="flex-1 overflow-y-auto p-4 space-y-2">
					{messages.map((message) => (
						<ChatBubble key={message.id} message={message} />
					))}
				</div>

				<MessageInput onSendMessage={handleSendMessage} />
			</div>
		</div>
	);
}

export default GlobalChat;
