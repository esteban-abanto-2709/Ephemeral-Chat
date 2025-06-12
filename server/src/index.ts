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
	console.log('A user connected:', socket.id);

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
	});
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
