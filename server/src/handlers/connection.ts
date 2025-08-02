import { Server } from 'socket.io';
import { logger } from '../utils/logger.js';
import { ExtendedSocket } from '../types/socket.js';
import { setupGlobalChatHandlers } from './globalChat.js';

export const handleConnection = (io: Server, socket: ExtendedSocket) => {
    
    logger.connection(socket.id);

    io.emit('users:count', io.engine.clientsCount);

    setupUserHandlers(io, socket);
    setupGlobalChatHandlers(io, socket);
    setupDisconnectHandler(io, socket);
};

const setupUserHandlers = (io: Server, socket: ExtendedSocket) => {
    socket.on('users:count:get', () => {
        socket.emit('users:count', io.engine.clientsCount);
    });
};

const setupDisconnectHandler = (io: Server, socket: ExtendedSocket) => {

    socket.on('disconnect', (reason) => {

        logger.disconnection(socket.id);
        logger.debug('Disconnect', `Reason: ${reason}`);

        io.emit('users:count', io.engine.clientsCount);

        if (socket.currentRoom === 'chat:global') {
            logger.debug('Cleanup', `Cleaning up room: ${socket.currentRoom} for ${socket.id}`);

            const roomSize = io.sockets.adapter.rooms.get('chat:global')?.size || 0;
            io.to('chat:global').emit('chat:global:count', roomSize);

            socket.broadcast.to('chat:global').emit('chat:global:messages:delete', socket.id);

            socket.broadcast.to('chat:global').emit('chat:global:message', {
                content: `Alpharius#${socket.id.slice(0, 5)} se acaba de desconectar`,
                senderId: 'system',
                timestamp: new Date().toISOString()
            });
        }
    });
};