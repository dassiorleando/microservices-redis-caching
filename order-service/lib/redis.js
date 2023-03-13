/**
 * Singleton Redis connection lib.
 */
const config = require('../config');
const Redis = require('bluebird').promisifyAll(require('redis'));

/**
 * Explicit connection to Redis server both for authenticated (prod) and unauthenticated (dev) ways
 * @returns {void}
 */
function connect() {
    const options = { host: config.REDIS_HOST, port: config.REDIS_PORT, password: config.REDIS_AUTH, tls: {}, retryStrategy };
    if (!config.REDIS_AUTH) {
        delete options.tls;
        delete options.password;
    }
    return Redis.createClient(options);
}

// Redis.debug_mode = true;
global.singletonRedisClient = connect();

// Redis events
global.singletonRedisClient.on('connect', function() {
    console.log('✅ Connected to Redis');
});

global.singletonRedisClient.on('error', function (e) {
    console.error('❌ Redis Connection Error: ', e);
    global.singletonRedisClient = connect();
});

/**
 * Redis retry strategy
 * @param {*} options The strategy's options (error, total_retry_time & attempt)
 * @see https://github.com/NodeRedis/node-redis
 */
function retryStrategy (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
}

/**
 * Connecting to the defined Redis server.
 * @param {boolean} force Force gettina new client, required for pub/sub.
 * @returns {void}
 */
module.exports = (force) => {
    if (force) return connect();

    if (global.singletonRedisClient) return global.singletonRedisClient;
    
    // Connecting to redis again ...
    global.singletonRedisClient = connect();

    return global.singletonRedisClient;
}
