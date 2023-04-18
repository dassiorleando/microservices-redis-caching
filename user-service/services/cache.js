const Util = require('./util');
const constant = require('../config/constant');
const redisClient = require('../lib/redis')();

exports.cacheUser = async (user) => {
    if (!user) return Promise.resolve(null);
    const userId = user?._id;
    if (!userId) return Promise.reject('invalid user data provided');
    const userData = JSON.parse(JSON.stringify(user));
    await redisClient.hmsetAsync(constant.user + ':' + userId, Util.objectToArray(userData));
    return Promise.resolve('user data saved successfully');
}

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

exports.readUserField = async (userId, field) => {
    if (!userId || !field) return Promise.resolve('');
    return redisClient.hgetAsync(constant.user + ':' + userId, field);
}

exports.deleteUser = (user) => {
    // Object validation
    if (!user || typeof user !== 'object' || !user._id) return Promise.reject('invalid user provided!');

    user = JSON.parse(JSON.stringify(user));
    const userId = user._id;
    
    // Deleting all user fields
    const userFields = Object.keys(user);
    
    // Deleting all user fields
    deleteModelFields(userId, userFields);

    console.log(`user of id ${userId} was deleted from cache.`);
}

/**
 * Deleting model fields.
 * @param {string} id the targeted model.
 * @param {string} fields the fields to delete.
 * @returns {void}
 */
function deleteModelFields(id, fields = [], model = constant.user) {
    if (!id) return;
    fields.forEach(function (field) {
        redisClient.hdel(model + ':' + id, field);
    });
}
