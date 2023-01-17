/**
 * User service for CRUD operations.
 */
const cacheService = require('./cache');
const UserModel = require("../models/user");

exports.create = function (data) {
  return new Promise(async (resolve, reject) => {
    const user = new UserModel(data);
    await user.save().catch(reject);
    await cacheService.cacheUser(user);   // Update cache once the DB change is done
    resolve(user);
  })
}

exports.findById = function (userId) {
  return UserModel.findById(userId);
}

exports.update = function (userId, data) {
  delete data._id;
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, data).catch(reject);
    await cacheService.cacheUser(user);   // Update cache once the DB change is done
    resolve(user);
  })
}

exports.findAll = function () {
  return UserModel.findAll();
}
