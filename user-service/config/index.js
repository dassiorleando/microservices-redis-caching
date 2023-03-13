/**
 * Config file depending on the env.
 */
module.exports = {
    // Process config
    PORT: process.env.PORT || '3000',
    ENV: process.env.NODE_ENV || 'dev',

    // Redis credentials
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_AUTH: process.env.REDIS_AUTH,

    // MongoDB uri
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1/user_service_db'

}
