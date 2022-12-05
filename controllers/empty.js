/**
 * Empty controller that handles empty API endpoints.
 */
const status = require('http-status');
const emptyService = require('../services/empty');

/**
 * A public action.
 * @param {*} req 
 * @param {*} res 
 */
exports.public = async (req, res) => {
    res.status(status.OK).json({ success: true, message: emptyService.aFunction(true) });
}
