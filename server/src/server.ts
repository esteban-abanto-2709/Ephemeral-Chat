import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './utils/logger';
import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    ExtendedSocket
} from './types/socket';

// Crear aplicación Express
const app = express();

// Crear servidor HTTP
const httpServer = createServer(app);

// Crear servidor Socket.IO con tipos
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : '*',
        methods: ['GET', 'POST']
    },
    // Configuraciones adicionales
    pingTimeout: 60000,
    pingInterval: 25000,
});

// Middleware de Express
app.use(express.json());

// Rutas básicas de Express
app.get('/', (req, res) => {
    res.json({
        message: 'Ephemeral Chat Server',
        status: 'running',
        timestamp: new Date().toISOString(),
        connections: io.engine.clientsCount
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        uptime: process.uptime(),
        connections: io.engine.clientsCount,
        memory: process.memoryUsage()
    });
});

// Función para configurar los handlers de Socket.IO
const setupSocketHandlers = () => {
    // Importar el handler de conexión
    import('./handlers/connection.js').then(({ handleConnection }) => {
        io.on('connection', (socket: ExtendedSocket) => {
            handleConnection(io, socket);
        });
    }).catch((error) => {
        logger.error('Server', 'Failed to load connection handlers', error);
    });
};

// Función para iniciar el servidor
const startServer = (port: number = 3000): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            // Configurar handlers
            setupSocketHandlers();

            // Iniciar servidor
            httpServer.listen(port, () => {
                logger.server('Server started', port);
                logger.info('Environment', `Running in ${process.env.NODE_ENV || 'development'} mode`);
                resolve();
            });

            // Manejo de errores del servidor
            httpServer.on('error', (error) => {
                logger.error('Server', 'Failed to start server', error);
                reject(error);
            });

        } catch (error) {
            logger.error('Server', 'Error during server setup', error);
            reject(error);
        }
    });
};

// Función para cerrar el servidor gracefully
const stopServer = (): Promise<void> => {
    return new Promise((resolve) => {
        logger.info('Server', 'Shutting down server...');

        // Cerrar todas las conexiones de socket
        io.close(() => {
            // Cerrar servidor HTTP
            httpServer.close(() => {
                logger.info('Server', 'Server closed gracefully');
                resolve();
            });
        });
    });
};

// Manejo de señales del sistema para cierre graceful
process.on('SIGTERM', async () => {
    logger.info('Server', 'Received SIGTERM signal');
    await stopServer();
    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.info('Server', 'Received SIGINT signal');
    await stopServer();
    process.exit(0);
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
    logger.error('Process', 'Uncaught Exception', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Process', 'Unhandled Rejection', { reason, promise });
    process.exit(1);
});

// Exportar instancias y funciones
export { app, httpServer, io, startServer, stopServer };