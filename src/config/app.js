const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const { logger } = require('../controllers/logger')


dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        SERVER_PORT: Joi.number().default(3000),
        PHOTOS_API: Joi.string().required(),
        IMAGES_API: Joi.string().required(),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    logger.error("Config validation error. from config file")
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    serverPort: envVars.SERVER_PORT,
    photosApi: envVars.PHOTOS_API,
    imagesApi: envVars.IMAGES_API
    
};