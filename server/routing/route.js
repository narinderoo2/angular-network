const express = require('express');
const router = express.Router();


const authentication = require('../login/login');
// router.post('/profile',  loginUser.login)

router.get('/emailCheck',authentication.emailClheck)

module.exports = router;