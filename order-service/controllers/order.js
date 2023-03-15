/**
 * Order controller that handles order API endpoints.
 */
const status = require('http-status');
const mongoose = require('mongoose');
const orderService = require('../services/order');

/**
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
    const orderCreated = await orderService.create(req.body);
    res.status(status.OK).json({ success: true, data: orderCreated });
}

/**
 * @param {*} req
 * @param {*} res
 */
exports.findOne = async (req, res) => {
    const orderId = req.params.orderId;

    // Check first if it is a valid Id
    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: 'Invalid id provided!'
        });
    }

    const orderFound = await orderService.findById(orderId);
    res.status(status.OK).json({ success: true, data: orderFound });
}

/**
 * @param {*} req
 * @param {*} res
 */
exports.findAll = async (req, res) => {
    const ordersFound = await orderService.findAll();
    res.status(status.OK).json({ success: true, data: ordersFound });
}

/**
 * @param {*} req
 * @param {*} res
 */
exports.update = async (req, res) => {
    const orderId = req.params.orderId;

    // Check first if it is a valid Id
    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: 'Invalid id provided!'
        });
    }

    try {
        const orderUpdated = await orderService.update(orderId, req.body);
        res.status(status.OK).json({ success: true, data: orderUpdated });
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
    const orderId = req.params.orderId;

    // Check first if it is a valid Id
    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(status.BAD_REQUEST).json({
            success: false,
            message: 'Invalid id provided!'
        });
    }

    await orderService.delete(orderId);
    res.status(status.OK).json({ success: true });
}
