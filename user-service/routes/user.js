/**
 * User routes.
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:userId', userController.findOne);
router.put('/:userId', userController.update);
router.delete('/:userId', userController.delete);

module.exports = router;
