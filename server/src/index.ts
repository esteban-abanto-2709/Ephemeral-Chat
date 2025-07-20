import dotenv from 'dotenv';
import { startServer } from './server';
import { logger } from './utils/logger';

// Cargar variables de entorno
dotenv.config();

// Función principal
async function main() {
	try {
		// Obtener puerto desde variables de entorno
		const PORT = parseInt(process.env.PORT || '3000', 10);

		// Validar puerto
		if (isNaN(PORT) || PORT < 1 || PORT > 65535) {
			throw new Error(`Invalid port: ${process.env.PORT}. Must be a number between 1 and 65535`);
		}

		// Mostrar información de inicio
		logger.info('App', '🚀 Starting Ephemeral Chat Server...');
		logger.info('Config', `Port: ${PORT}`);
		logger.info('Config', `Environment: ${process.env.NODE_ENV || 'development'}`);

		// Iniciar servidor
		await startServer(PORT);

		logger.info('App', '✅ Ephemeral Chat Server started successfully!');
		logger.info('App', `🌐 Server running on http://localhost:${PORT}`);
		logger.info('App', `📊 Health check: http://localhost:${PORT}/health`);

	} catch (error) {
		logger.error('App', 'Failed to start application', error);

		// Salir con código de error
		process.exit(1);
	}
}

// Ejecutar aplicación directamente (en ES modules es más directo)
main();

// Exportar main para testing
export { main };