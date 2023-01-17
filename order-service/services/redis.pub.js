/**
 * Redis pub service: for server (ec2) deployment.
 * Useful to communicate (publish) between microservices.
 */
const redisClient = require('../lib/redis')(true);

/**
 * Pushing the event
 */
exports.send = function (topic, data) {
    if (topic && data) {
        return redisClient.publishAsync(topic, JSON.stringify(data));
    } else {
        return Promise.reject({ success: false, message: 'Bad parameters provided for Redis pub!' });
    }
}
