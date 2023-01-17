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
            resolve('user data saved successfully')
        }
    })
}

exports.readUser = function (userId) {

}

