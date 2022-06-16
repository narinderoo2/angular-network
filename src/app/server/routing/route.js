const express = require('express');
const router = express.Router();


const authentication = require('../login/login');
const setupModule = require('../setup/userModule');
// router.post('/profile',  loginUser.login)


router.get('/emailCheck',authentication.emailClheck)
router.get('/setup/user-listing',setupModule.getUserListing)
router.post('/setup/create-user',setupModule.createUser)

module.exports = router;