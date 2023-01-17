/**
 * User controller that handles user API endpoints.
 */
const status = require('http-status');
const userService = require('../services/user');

/**
 * @param {*} req 
 * @param {*} res 
 */
exports.create = async (req, res) => {
    const userAdded = await userService.create(req.body);
    res.status(status.OK).json({ success: true, data: userAdded });
}
