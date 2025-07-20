import { Socket } from 'socket.io';

// Interfaz base para mensajes de chat
export interface ChatMessage {
    content: string;
    senderId: string;
    timestamp: string;
}

// Datos que pueden venir del cliente al enviar mensaje
export interface MessagePayload {
    content: string;
    senderId: string;
}

// Datos extendidos del socket con información de usuario
export interface ExtendedSocket extends Socket {
    userId?: string;
    currentRoom?: string;
    roomType?: 'random' | 'private';
    partnerId?: string; // Para el modo aleatorio
}

// Eventos que el servidor puede emitir
export interface ServerToClientEvents {
    // Conteo de usuarios
    'users:count': (count: number) => void;
    'chat:global:count': (count: number) => void;

    // Mensajes de chat
    'chat:global:message': (message: ChatMessage) => void;
    'random:message': (message: ChatMessage) => void;
    'private:message': (message: ChatMessage) => void;

    // Estados de conexión
    'random:matched': (roomId: string) => void;
    'random:partner_left': () => void;
    'private:waiting': () => void;
    'private:connected': () => void;
    'private:partner_left': () => void;

    // Sistema
    'system:message': (message: string) => void;
    'error': (message: string) => void;
}

// Eventos que el cliente puede emitir
export interface ClientToServerEvents {
    // Conteo de usuarios
    'users:count:get': () => void;
    'chat:global:count:get': () => void;

    // Chat global (actual)
    'chat:global:join': () => void;
    'chat:global:leave': () => void;
    'chat:global:message': (payload: MessagePayload) => void;

    // Modo aleatorio
    'random:join_queue': () => void;
    'random:leave_queue': () => void;
    'random:message': (payload: MessagePayload) => void;

    // Modo enlace privado
    'private:create': () => void;
    'private:join': (roomId: string) => void;
    'private:message': (payload: MessagePayload) => void;
}

// Datos inter-servidor (para futuro uso con múltiples instancias)
export interface InterServerEvents {
    userId?: string; // solo para evitar el error de Eslint
    // Por ahora vacío, para futuro escalamiento
}

// Datos del socket (metadata que podemos almacenar)
export interface SocketData {
    userId?: string;
    username?: string; // Para futuro uso
    currentRoom?: string;
    joinedAt?: Date;
}