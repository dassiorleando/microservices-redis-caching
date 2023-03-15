const Util = require('./util');
const constant = require('../config/constant');
const redisClient = require('../lib/redis')();

exports.cacheOrder = async (order) => {
    if (!order) return Promise.resolve(null);
    const orderId = order?._id;
    if (!orderId) return Promise.reject('invalid order data provided');
    const orderData = JSON.parse(JSON.stringify(order));
    await redisClient.hmsetAsync(constant.order + ':' + orderId, Util.objectToArray(orderData));
    return Promise.resolve('order data saved successfully');
}

exports.readOrder = async (orderId) => {
    if (!orderId) return Promise.resolve(null);
    const order = await redisClient.hgetallAsync(constant.order + ':' + orderId);
    if (!order) return Promise.resolve(null);

    // Parsed fields values
    Object.keys(order).forEach(function (field) {
        try {
            order[field] = JSON.parse(order[field]);
        } catch (error) {}
    });

    return order;
}

exports.readOrderField = async (orderId, field) => {
    if (!orderId || !field) return Promise.resolve('');
    return redisClient.hgetAsync(constant.order + ':' + orderId, field);
}

exports.deleteOrder = (order) => {
    // Object validation
    if (!order || typeof order !== 'object' || !order._id) return Promise.reject('invalid order provided!');

    order = JSON.parse(JSON.stringify(order));
    const orderId = order._id;
    
    // Deleting all order fields
    const orderFields = Object.keys(order);
    
    // Deleting all order fields
    deleteModelFields(orderId, orderFields);

    console.log(`order of id ${orderId} was deleted from cache.`);
}

/**
 * Deleting model fields.
 * @param {string} id the targeted model.
 * @param {string} fields the fields to delete.
 * @returns {void}
 */
function deleteModelFields(id, fields = [], model = constant.order) {
    if (!id) return;
    fields.forEach(function (field) {
        redisClient.hdel(model + ':' + id, field);
    });
}

// ===============

exports.readUser = async (userId) => {
    if (!userId) return Promise.resolve(null);
    const user = await redisClient.hgetallAsync(constant.user + ':' + userId);
    if (!user) return Promise.resolve(null);

    // Parsed fields values
    Object.keys(user).forEach(function (field) {
        try {
            user[field] = JSON.parse(user[field]);
        } catch (error) {}
    });

    return user;
}
