/**
 * Redis sub service.
 * Useful to communicate (receive) between microservices.
 */
const Util = require('./util');
const orderService = require('./order');
const constant = require('../config/constant');
const redisClient = require('../lib/redis')(true);

/**
 * Ingesting incoming App Events to save.
 * Coming from different sources (microservices).
 */
exports.ingestingEvents = (callback = Util.noop) => {
    redisClient.on('message', async (channel, data) => {
        console.log('New event received');
        console.log('Microservice Events ---> Message: ' + data + ' on channel: ' + channel + ' just arrived!');

        const eventData = JSON.parse(data);

        if (channel === constant.EVENTS[0]) {
            callback(null, 'Processed topic A event.');
        } else if (channel === constant.EVENTS[1]) {
            callback(null, 'Processed topic B event.');
        } else if (channel === constant.EVENTS[2]) {
            console.log('----> USER_UPDATED event <----');
            await orderService.populateOrderWithUpdatedUser(eventData?.userId);
            callback(null, 'Orders populated with updated user data.');
        } else {
            console.error('Unknown filter policy!');
        }
    });
}

/**
 * Subscribes to events
 * @returns {void}
 */
exports.subscribing = () => {
    const events = constant.EVENTS || [];
    events.forEach(event => {
        redisClient.subscribe(event);
    });
}
