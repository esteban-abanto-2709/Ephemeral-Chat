import type { Message } from '@/types/Message';

interface ChatBubbleProps {
	message: Message;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
	const { isOwn, content, timestamp, senderId } = message;

	return (
		<div className={`flex w-full mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>

			<div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${isOwn
				? 'bg-blue-500 text-white rounded-br-md'
				: 'bg-white text-gray-800 rounded-bl-md border border-gray-200'}
      `}>

				{/* <div className="text-xs font-semibold text-gray-500 mb-1"> */}

				<div className={`text-xs font-semibold mb-1
          ${isOwn ? ' text-white' : 'text-gray-500'}
        `}>
					{`Alpharius#${senderId.slice(-5)}`}
				</div>

				<p className="text-sm leading-relaxed">{content}</p>

				<span className={`text-xs mt-1 block ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
					{timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</span>

			</div>
		</div>
	);
};