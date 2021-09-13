const express = require('express');
const router = express.Router();

const authentication = require('../controller/authController');

router.get('/login', authentication.getLoginController)

router.post('/user/login' , authentication.postLoginController)

router.post('/logout',authentication.postLogoutController)

module.exports = router