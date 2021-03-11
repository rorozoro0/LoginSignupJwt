const express = require('express');
const router = express.Router();
const userController = require('./../controllers/UserController');
const requireToken = require('./../middlewares/requireToken');

router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

router.get('/detail', requireToken, userController.getDetails);

module.exports = router;