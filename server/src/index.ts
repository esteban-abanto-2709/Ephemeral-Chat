import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: '*', // Se remueve en producción
	}
});

app.get('/', (req, res) => {
	res.send('Hello from server!');
});

io.on('connection', (socket) => {
	console.log(`[Socket] User connected: ${socket.id}`);
	io.emit('users:count', io.engine.clientsCount);

	// Handle user count requests
	socket.on('users:count:get', () => {
		socket.emit('users:count', io.engine.clientsCount);
	});

	socket.on('chat:message', handleChatMessage);

	socket.on('disconnect', () => {
		console.log(`[Socket] User disconnected: ${socket.id}`);
		io.emit('users:count', io.engine.clientsCount);
	});

	function handleChatMessage({ content, senderId }: { content: string; senderId: string }) {
		console.log(`[Socket] Message from ${socket.id}: ${content}`);
		console.log(`[Chat] From ${senderId}: ${content}`);

		const timestamp = new Date().toISOString();
		socket.broadcast.emit('chat:message', { content, senderId, timestamp });
	}
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
