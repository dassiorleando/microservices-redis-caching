/**
 * Order routes.
 */
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

router.post('/', orderController.create);
router.get('/', orderController.findAll);
router.get('/:orderId', orderController.findOne);
router.put('/:orderId', orderController.update);
router.delete('/:orderId', orderController.delete);

module.exports = router;
