import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './utils/logger.js';
import {
    ServerToClientEvents,
    ClientToServerEvents,
    InterServerEvents,
    SocketData,
    ExtendedSocket
} from './types/socket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

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
    pingTimeout: 60000,
    pingInterval: 25000,
});

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        message: 'Ephemeral Chat',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        connections: io.engine.clientsCount,
        memory: process.memoryUsage()
    });
});

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use((req, res, next) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
        res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    } else {
        next();
    }
});

const setupSocketHandlers = () => {
    import('./handlers/connection.js').then(({ handleConnection }) => {
        io.on('connection', (socket: ExtendedSocket) => {
            handleConnection(io, socket);
        });
    }).catch((error) => {
        logger.error('Server', 'Failed to load connection handlers', error);
    });
};

const startServer = (port: number = 3000): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            setupSocketHandlers();

            httpServer.listen(port, () => {
                logger.server('Server started', port);
                logger.info('Environment', `Running in ${process.env.NODE_ENV || 'development'} mode`);
                resolve();
            });

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

const stopServer = (): Promise<void> => {
    return new Promise((resolve) => {
        logger.info('Server', 'Shutting down server...');

        io.close(() => {
            httpServer.close(() => {
                logger.info('Server', 'Server closed gracefully');
                resolve();
            });
        });
    });
};

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

process.on('uncaughtException', (error) => {
    logger.error('Process', 'Uncaught Exception', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Process', 'Unhandled Rejection', { reason, promise });
    process.exit(1);
});

export { app, httpServer, io, startServer, stopServer };