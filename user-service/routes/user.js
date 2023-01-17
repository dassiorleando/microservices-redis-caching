/**
 * User route.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Some user routes
router.post('/', userController.create);

module.exports = router;
