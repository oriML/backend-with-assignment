const { createLogger, format, transports } = require("winston");

// ------ logging function ------

const logger = createLogger({

    // creates log files

    transports: [
    new transports.File({
        filename: "process-info.log",
        level:'info',
        format: format.combine(format.timestamp(), format.json()),
    }),
        
    new transports.File({
        filename: "errors.log",
        level:'error',
        format: format.combine(format.timestamp(), format.json()),
    })
]
});

module.exports = {logger}