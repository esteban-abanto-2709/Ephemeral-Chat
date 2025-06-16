import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Cambiar en producción

function App() {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		// Recibir mensajes del servidor
		socket.on('chat:message', (msg) => {
			console.log('Mensaje recibido:', msg);
			setMessages((prev) => [...prev, msg]);
		});

		// Limpiar al desmontar
		return () => {
			socket.off('chat:message');
		};
	}, []);

	const handleSend = () => {
		if (message.trim() === '') return;
		socket.emit('chat:message', message);
		setMessages((prev) => [...prev, `(Tú): ${message}`]);
		setMessage('');
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-sky-200 to-indigo-400 text-center p-10">

			<h1 className="text-4xl font-bold text-white mb-4">Ephemeral Chat</h1>

			<div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
				<div className="mb-4 h-40 overflow-y-auto border rounded p-2 text-left text-sm bg-gray-100">
					{messages.map((msg, idx) => (
						<p key={idx} className="mb-1">{msg}</p>
					))}
				</div>
				<div className="flex gap-2">
					<input
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSend()}
						className="flex-1 px-3 py-2 border rounded"
						placeholder="Escribe un mensaje"
					/>
					<button
						onClick={handleSend}
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
					>
						Enviar
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
