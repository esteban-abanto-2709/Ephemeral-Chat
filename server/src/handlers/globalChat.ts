import { Server } from 'socket.io';
import { logger } from '../utils/logger';
import { ExtendedSocket } from '../types/socket';

// Todo lo relacionado con el chat global
export const setupGlobalChatHandlers = (io: Server, socket: ExtendedSocket) => {
    // Unirse al chat global
    socket.on('chat:global:join', () => {
        socket.join('chat:global');
        socket.currentRoom = 'chat:global';
        socket.roomType = 'random';

        logger.room('JOIN', socket.id, 'chat:global');

        const roomSize = io.sockets.adapter.rooms.get('chat:global')?.size || 0;
        io.to('chat:global').emit('chat:global:count', roomSize);

        socket.to('chat:global').emit('chat:global:message', {
            content: `Alpharius#${socket.id.slice(0, 5)} se acaba de conectar`,
            senderId: 'system',
            timestamp: new Date().toISOString()
        });
    });

    // Salir del chat global
    socket.on('chat:global:leave', () => {
        socket.leave('chat:global');
        socket.currentRoom = undefined;
        socket.roomType = undefined;

        logger.room('LEAVE', socket.id, 'chat:global');

        const roomSize = io.sockets.adapter.rooms.get('chat:global')?.size || 0;
        io.to('chat:global').emit('chat:global:count', roomSize);

        socket.broadcast.to('chat:global').emit('chat:global:message', {
            content: `Alpharius#${socket.id.slice(0, 5)} se acaba de desconectar`,
            senderId: 'system',
            timestamp: new Date().toISOString()
        });
    });

    // Obtener conteo del chat global
    socket.on('chat:global:count:get', () => {
        const roomSize = io.sockets.adapter.rooms.get('chat:global')?.size || 0;
        socket.emit('chat:global:count', roomSize);
    });

    // Manejar mensajes del chat global
    socket.on('chat:global:message', (payload) => {
        handleGlobalMessage(io, socket, payload);
    });
};

// Función para manejar mensajes (la misma que tenías)
const handleGlobalMessage = (io: Server, socket: ExtendedSocket, payload: any) => {
    if (!payload || !payload.content || !payload.senderId) {
        socket.emit('error', 'Mensaje inválido: falta contenido o ID del remitente');
        logger.warn('Message', `Invalid message from ${socket.id}: missing content or senderId`);
        return;
    }

    if (payload.content.length > 500) {
        socket.emit('error', `Mensaje demasiado largo: máximo 500 caracteres`);
        logger.warn('Message', `Message too long from ${socket.id}: ${payload.content.length} chars`);
        return;
    }

    const trimmedContent = payload.content.trim();
    if (trimmedContent.length === 0) {
        socket.emit('error', 'El mensaje no puede estar vacío');
        logger.warn('Message', `Empty message from ${socket.id}`);
        return;
    }

    const isInGlobalRoom = socket.rooms.has('chat:global');
    if (!isInGlobalRoom) {
        socket.emit('error', 'Debes unirte al chat primero');
        logger.warn('Message', `User ${socket.id} tried to send message without being in room`);
        return;
    }

    logger.message(payload.senderId, trimmedContent, 'global');

    const message = {
        content: trimmedContent,
        senderId: payload.senderId,
        timestamp: new Date().toISOString()
    };

    io.to('chat:global').emit('chat:global:message', message);
};