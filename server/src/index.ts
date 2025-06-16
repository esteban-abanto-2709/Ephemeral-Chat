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

// Configuración de Socket.IO
io.on('connection', (socket) => {
	console.log(`[Socket] User connected: ${socket.id}`);

	socket.on('chat:message', handleChatMessage);
	socket.on('disconnect', () => {
		console.log(`[Socket] User disconnected: ${socket.id}`);
	});
	
	function handleChatMessage(message: string) {
		console.log(`[Chat] From ${socket.id}: ${message}`);
		socket.broadcast.emit('chat:message', message);
	}
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
