const Util = require('./util');
const constant = require('../config/constant');
const redisClient = require('../lib/redis')();

exports.cacheUser = async function (user) {
    return new Promise(async (resolve, reject) => {
        const userId = user?._id;
        if (!userId) {
            reject('invalid user data provided');
        } else {
            const userData = JSON.parse(JSON.stringify(user));
            await redisClient.hmsetAsync(constant.user + ':' + userId, Util.objectToArray(userData));
            resolve('user data saved successfully');
        }
    })
}

exports.readUser = function (userId) {
    if (!userId) return Promise.resolve(null);
    return redisClient.hgetallAsync(constant.user + ':' + userId).then(user => {
        if (!user) return Promise.resolve(null);

        // Parsed fields values
        Object.keys(user).forEach(function (field) {
            try {
                user[field] = JSON.parse(user[field]);
            } catch (error) {}
        });

        return user;
    });
}

exports.readUserField = function (userId, field) {
    if (!userId || !field) return Promise.resolve('');
    return redisClient.hgetAsync(constant.user + ':' + userId, field);
}

exports.deleteUser = function (user) {
    // Object validation
    if (!user || typeof user !== 'object' || !user._id) return;

    user = JSON.parse(JSON.stringify(user));

    const userId = user._id;
    console.log(`Deleting user#${userId} fields.`);
    
    // Deleting all user fields
    const userFields = Object.keys(user);

    // Deleting all user fields
    deleteModelFields(userId, userFields);
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
