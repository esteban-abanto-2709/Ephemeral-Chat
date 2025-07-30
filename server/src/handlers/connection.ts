import { Server } from 'socket.io';
import { logger } from '../utils/logger';
import { ExtendedSocket } from '../types/socket';
import { setupGlobalChatHandlers } from './globalChat';

// Función principal - MUCHO más simple
export const handleConnection = (io: Server, socket: ExtendedSocket) => {
    logger.connection(socket.id);

    // Emitir conteo actual al conectarse
    io.emit('users:count', io.engine.clientsCount);

    // Configurar todos los handlers
    setupUserHandlers(io, socket);
    setupGlobalChatHandlers(io, socket);  // ← Importado del otro archivo
    setupDisconnectHandler(io, socket);
};

// Handlers para conteo de usuarios - mismo código
const setupUserHandlers = (io: Server, socket: ExtendedSocket) => {
    socket.on('users:count:get', () => {
        socket.emit('users:count', io.engine.clientsCount);
    });
};

const setupDisconnectHandler = (io: Server, socket: ExtendedSocket) => {
    socket.on('disconnect', (reason) => {
        logger.disconnection(socket.id);
        logger.debug('Disconnect', `Reason: ${reason}`);

        if (socket.currentRoom) {
            logger.debug('Cleanup', `Cleaning up room: ${socket.currentRoom} for ${socket.id}`);
        }

        io.emit('users:count', io.engine.clientsCount);

        // Si estaba en el chat global, manejar la limpieza
        if (socket.rooms.has('chat:global')) {
            const roomSize = io.sockets.adapter.rooms.get('chat:global')?.size || 0;
            io.to('chat:global').emit('chat:global:count', roomSize);

            logger.debug('Cleanup', `Cleaning up room: chat:global for ${socket.id}`);
        }

        // NUEVO: Eliminar mensajes del usuario que se desconectó
        socket.broadcast.to('chat:global').emit('chat:global:messages:delete', socket.id);

        // Mensaje de desconexión
        socket.broadcast.to('chat:global').emit('chat:global:message', {
            content: `Alpharius#${socket.id.slice(0, 5)} se acaba de desconectar`,
            senderId: 'system',
            timestamp: new Date().toISOString()
        });
    });
};