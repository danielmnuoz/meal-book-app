const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/signup', userController.createUser);
router.get('/:id', userController.getUserById);
router.post('/login', userController.loginUser);
module.exports = router;