/**
 * User service for CRUD operations.
 */
const cacheService = require('./cache');
const UserModel = require("../models/user");

exports.create = async (data) => {
    const user = new UserModel(data);
    await user.save();
    await cacheService.cacheUser(user); // Update cache once the DB change is done
    return user;
}

exports.findById = async (userId) => {
    const cachedUser = await cacheService.readUser(userId);
    if (!cachedUser) {
        await new Promise(resolve => setTimeout(resolve, 3500));    // Wait for 5 seconds to show cache miss event

        console.log(`Cache miss for findById on user#${userId}`);
        const userFound = await UserModel.findById(userId);

        console.log('Data loaded from the DB and cached')
        await cacheService.cacheUser(userFound); // Update cache once the DB change is done

        return userFound;
    }
    console.log(`Cache hit for findById on user#${userId}`);
    return cachedUser;
}

exports.findAll = async () => {
    return UserModel.find();
}

exports.update = async (userId, data) => {
    if (!data) return;
    delete data._id;
    await UserModel.findByIdAndUpdate(userId, data);
    const userFound = await UserModel.findById(userId);
    await cacheService.cacheUser(userFound); // Update cache once the DB change is done

    // TODO: event push ... 

    return userFound;
}

exports.delete = async (userId) => {
    const userFound = await UserModel.findById(userId);
    if (userFound) {
        await userFound.remove();
        console.log('user deleted from DB');
        cacheService.deleteUser(userFound); // Delete cache once the DB change is done
    }
}
