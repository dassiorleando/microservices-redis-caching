/**
 * User controller that handles user API endpoints.
 */
const status = require('http-status');
const mongoose = require('mongoose');
const userService = require('../services/user');

/**
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
    const userCreated = await userService.create(req.body);
    res.status(status.OK).json({ success: true, data: userCreated });
}

/**
 * @param {*} req
 * @param {*} res
 */
exports.findOne = async (req, res) => {
    const userId = req.params.userId;

    // Check first if it is a valid Id
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: 'User Id is invalid'
        });
    }

    const userFound = await userService.findById(userId);
    res.status(status.OK).json({ success: true, data: userFound });
}

/**
 * @param {*} req
 * @param {*} res
 */
exports.findAll = async (req, res) => {
    const usersFound = await userService.findAll();
    res.status(status.OK).json({ success: true, data: usersFound });
}

/**
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
    const userId = req.params.userId;

    // Check first if it is a valid Id
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: 'User Id is invalid'
        });
    }

    try {
        const userUpdated = await userService.update(userId, req.body);
        res.status(status.OK).json({ success: true, data: userUpdated });
    } catch (e) {
        console.log(e);
        res.status(status.INTERNAL_SERVER_ERROR).json(e);
    }
}

/**
 * @param {*} req
 * @param {*} res
 */
exports.delete = async (req, res) => {
    const userId = req.params.userId;

    // Check first if it is a valid Id
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: 'User Id is invalid'
        });
    }

    await userService.delete(userId);
    res.status(status.OK).json({ success: true });
}
