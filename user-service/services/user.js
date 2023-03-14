/**
 * User service for CRUD operations.
 */
const cacheService = require('./cache');
const UserModel = require("../models/user");

exports.create = function (data) {
    return new Promise(async(resolve, reject) => {
        const user = new UserModel(data);
        await user.save().catch(reject);
        await cacheService.cacheUser(user); // Update cache once the DB change is done
        resolve(user);
    })
}

exports.findById = async function (userId) {
    const cachedUser = await cacheService.readUser(userId);
    if (cachedUser) {
        console.log(`Cache hit for findById on user#${userId}`);
        return cachedUser;
    }
    console.log(`Cache miss for findById on user#${userId}`);
    return UserModel.findById(userId);
}

exports.findAll = function () {
    return UserModel.find();
}

exports.update = function (userId, data) {
    delete data._id;
    return new Promise(async(resolve, reject) => {
		await UserModel.findByIdAndUpdate(userId, data).catch(reject);
		const userFound = await UserModel.findById(userId).catch(reject);
        await cacheService.cacheUser(userFound).catch(reject); // Update cache once the DB change is done
		resolve(userFound);
    })
}

exports.delete = function (userId) {
    return new Promise(async(resolve, reject) => {
        const userFound = UserModel.findById(userId).catch(reject);
        await userFound.remove().catch(reject);
        cacheService.deleteUser(userFound); // Delete cache once the DB change is done
        resolve(userFound);
    })
}
