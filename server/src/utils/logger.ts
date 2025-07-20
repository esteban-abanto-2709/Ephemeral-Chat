// Colores para consola
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m',
};

// Tipos de log
type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'socket';

// Función para formatear timestamp
const getTimestamp = (): string => {
    return new Date().toISOString().replace('T', ' ').slice(0, 19);
};

// Función base de log
const log = (level: LogLevel, category: string, message: string, data?: unknown) => {
    const timestamp = getTimestamp();

    let colorCode = colors.reset;
    let levelText = level.toUpperCase();

    switch (level) {
        case 'error':
            colorCode = colors.red;
            break;
        case 'warn':
            colorCode = colors.yellow;
            break;
        case 'info':
            colorCode = colors.green;
            break;
        case 'debug':
            colorCode = colors.gray;
            break;
        case 'socket':
            colorCode = colors.cyan;
            levelText = 'SOCKET';
            break;
    }

    const prefix = `${colors.gray}[${timestamp}]${colors.reset} ${colorCode}[${levelText}]${colors.reset} ${colors.magenta}[${category}]${colors.reset}`;

    console.log(`${prefix} ${message}`);

    // Si hay data adicional, la mostramos
    if (data !== undefined) {
        console.log(`${colors.gray}Data:${colors.reset}`, data);
    }
};

// Exportamos las funciones específicas
export const logger = {
    info: (category: string, message: string, data?: unknown) => {
        log('info', category, message, data);
    },

    warn: (category: string, message: string, data?: unknown) => {
        log('warn', category, message, data);
    },

    error: (category: string, message: string, data?: unknown) => {
        log('error', category, message, data);
    },

    debug: (category: string, message: string, data?: unknown) => {
        // Solo mostrar debug en desarrollo
        if (process.env.NODE_ENV !== 'production') {
            log('debug', category, message, data);
        }
    },

    socket: (message: string, socketId?: string, data?: unknown) => {
        const fullMessage = socketId ? `${message} (${socketId})` : message;
        log('socket', 'Socket', fullMessage, data);
    },

    // Helpers específicos para casos comunes
    connection: (socketId: string) => {
        log('socket', 'Connection', `User connected: ${socketId}`);
    },

    disconnection: (socketId: string) => {
        log('socket', 'Connection', `User disconnected: ${socketId}`);
    },

    message: (from: string, content: string, roomType: string = 'unknown') => {
        log('socket', 'Message', `[${roomType}] ${from}: ${content}`);
    },

    room: (action: string, socketId: string, roomId: string) => {
        log('socket', 'Room', `${action}: ${socketId} -> ${roomId}`);
    },

    server: (message: string, port?: number) => {
        const fullMessage = port ? `${message} on port ${port}` : message;
        log('info', 'Server', fullMessage);
    }
};

// Exportar también el tipo para uso externo
export type Logger = typeof logger;