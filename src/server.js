const app = require('./app');
const config = require('./config/app');
const { logger } = require('./controllers/logger')


let server = app.listen(config.serverPort, () => {
        console.info(`Listening to port ${config.serverPort}`);
    });

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('server closed')
            console.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(`unexpected or unhandled rejection the cause server to shut down
                 with error:${error}`)
    console.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    console.info('SIGTERM received');
    if (server) {
        server.close();
    }
});