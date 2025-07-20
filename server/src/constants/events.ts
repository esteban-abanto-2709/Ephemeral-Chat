export const EVENTS = {
    // Eventos globales
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',

    // Sistema de usuarios
    USERS: {
        COUNT: 'users:count',
        COUNT_GET: 'users:count:get',
    },

    // Modo aleatorio (chat global)
    RANDOM_CHAT: {
        JOIN_QUEUE: 'random:join_queue',
        LEAVE_QUEUE: 'random:leave_queue',
        MATCHED: 'random:matched',
        MESSAGE: 'random:message',
        PARTNER_LEFT: 'random:partner_left',
    },

    // Modo enlace privado
    PRIVATE_ROOM: {
        CREATE: 'private:create',
        JOIN: 'private:join',
        MESSAGE: 'private:message',
        WAITING: 'private:waiting',
        CONNECTED: 'private:connected',
        PARTNER_LEFT: 'private:partner_left',
    },
};