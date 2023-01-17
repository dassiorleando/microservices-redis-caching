/**
 * Empty route.
 */
const express = require('express');
const router = express.Router();
const emptyController = require('../controllers/empty');

// Some empty routes
router.get('/public', emptyController.public);

module.exports = router;
