import dotenv from 'dotenv';
import { startServer } from './server';
import { logger } from './utils/logger';

dotenv.config();

async function main() {
	try {
		const PORT = parseInt(process.env.PORT || '3000', 10);

		if (isNaN(PORT) || PORT < 1 || PORT > 65535) {
			throw new Error(`Invalid port: ${process.env.PORT}. Must be a number between 1 and 65535`);
		}

		logger.info('App', '🚀 Starting Ephemeral Chat Server...');
		logger.info('Config', `Port: ${PORT}`);
		logger.info('Config', `Environment: ${process.env.NODE_ENV || 'development'}`);

		await startServer(PORT);

		logger.info('App', '✅ Ephemeral Chat Server started successfully!');
		logger.info('App', `🌐 Server running on http://localhost:${PORT}`);
		logger.info('App', `📊 Health check: http://localhost:${PORT}/api/health`);

	} catch (error) {
		logger.error('App', 'Failed to start application', error);
		process.exit(1);
	}
}

main();

export { main };