import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { MessageInput } from '@/components/MessageInput';
import { ChatBubble } from '@/components/ChatBubble';
import type { Message } from '@/types/Message';

const socket = io('http://localhost:3000'); // Cambiar en producción

function App() {

	const [socketId, setSocketId] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {

		socket.on('connect', () => {
			console.log('[Socket] Connected with ID:', socket.id);
			setSocketId(socket.id ?? null);
		});

		socket.on('chat:message', ({ content, senderId }) => {
			const receivedMessage: Message = {
				id: Date.now().toString(),
				content,
				timestamp: new Date(),
				isOwn: senderId === socketId,
				senderId,
			};

			setMessages((prev) => [...prev, receivedMessage]);
		});

		return () => {
			socket.off('connect');
			socket.off('chat:message');
		};

	}, [socketId]);

	const handleSendMessage = (content: string) => {
		if (content.trim() === '' || !socketId) return;

		const newMessage: Message = {
			id: Date.now().toString(),
			content,
			timestamp: new Date(),
			isOwn: true,
			senderId: socketId,
		};

		socket.emit('chat:message', {
			content,
			senderId: socketId,
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

export default App;
