import { Server } from 'socket.io';
import { logger } from '../utils/logger';
import { ExtendedSocket } from '../types/socket';

// Función principal que maneja todas las conexiones
export const handleConnection = (io: Server, socket: ExtendedSocket) => {
    logger.connection(socket.id);

    // Emitir conteo actual al conectarse
    io.emit('users:count', io.engine.clientsCount);

    // Registrar todos los event listeners
    registerUserHandlers(io, socket);
    registerGlobalChatHandlers(io, socket);
    registerDisconnectHandler(io, socket);
};

// Handlers para conteo de usuarios
const registerUserHandlers = (io: Server, socket: ExtendedSocket) => {
    socket.on('users:count:get', () => {
        socket.emit('users:count', io.engine.clientsCount);
    });
};

// Handlers para el chat global (lógica actual)
const registerGlobalChatHandlers = (io: Server, socket: ExtendedSocket) => {
    // Unirse al chat global
    socket.on('chat:global:join', () => {
        socket.join('chat:global');
        socket.currentRoom = 'chat:global';
        socket.roomType = 'random'; // Por ahora usamos 'random' para el global

        logger.room('JOIN', socket.id, 'chat:global');

        const roomSize = io.sockets.adapter.rooms.get('chat:global')?.size || 0;
        io.to('chat:global').emit('chat:global:count', roomSize);

        // Emitir mensaje de bienvenida
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

        // Emitir mensaje de desconexión
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

// Handler específico para mensajes del chat global
const handleGlobalMessage = (io: Server, socket: ExtendedSocket, payload: any) => {
    // Validaciones básicas
    if (!payload || !payload.content || !payload.senderId) {
        socket.emit('error', 'Mensaje inválido: falta contenido o ID del remitente');
        logger.warn('Message', `Invalid message from ${socket.id}: missing content or senderId`);
        return;
    }

    // Validar longitud del mensaje
    const maxLength = 500;
    if (payload.content.length > maxLength) {
        socket.emit('error', `Mensaje demasiado largo: máximo ${maxLength} caracteres`);
        logger.warn('Message', `Message too long from ${socket.id}: ${payload.content.length} chars`);
        return;
    }

    // Validar que el contenido no esté vacío después del trim
    const trimmedContent = payload.content.trim();
    if (trimmedContent.length === 0) {
        socket.emit('error', 'El mensaje no puede estar vacío');
        logger.warn('Message', `Empty message from ${socket.id}`);
        return;
    }

    // Verificar que el socket esté en la sala correcta
    const isInGlobalRoom = socket.rooms.has('chat:global');
    if (!isInGlobalRoom) {
        socket.emit('error', 'Debes unirte al chat primero');
        logger.warn('Message', `User ${socket.id} tried to send message without being in room`);
        return;
    }

    // Log del mensaje
    logger.message(payload.senderId, trimmedContent, 'global');

    // Crear el mensaje con timestamp
    const message = {
        content: trimmedContent,
        senderId: payload.senderId,
        timestamp: new Date().toISOString()
    };

    // Enviar mensaje a todos en la sala
    io.to('chat:global').emit('chat:global:message', message);
};

// Handler para desconexión
const registerDisconnectHandler = (io: Server, socket: ExtendedSocket) => {
    socket.on('disconnect', (reason) => {
        logger.disconnection(socket.id);
        logger.debug('Disconnect', `Reason: ${reason}`);

        // Limpiar datos del socket
        if (socket.currentRoom) {
            logger.debug('Cleanup', `Cleaning up room: ${socket.currentRoom} for ${socket.id}`);
        }

        // Emitir nuevo conteo general
        io.emit('users:count', io.engine.clientsCount);

        // Actualizar conteo del chat global si estaba ahí
        if (socket.rooms.has('chat:global')) {
            const roomSize = io.sockets.adapter.rooms.get('chat:global')?.size || 0;
            io.to('chat:global').emit('chat:global:count', roomSize);
        }
        
        // Emitir mensaje de desconexión
        socket.broadcast.to('chat:global').emit('chat:global:message', {
            content: `Alpharius#${socket.id.slice(0, 5)} se acaba de desconectar`,
            senderId: 'system',
            timestamp: new Date().toISOString()
        });
        
        // TODO: Aquí agregaremos lógica para limpiar salas privadas y emparejamientos
    });
};