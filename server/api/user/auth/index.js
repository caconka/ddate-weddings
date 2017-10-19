const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const checkRole = require('../../../middleware/check-role');
const Controller = require('./auth.controller')

router.post('/signup', Controller.signupPost); 
router.post('/provider-signup', checkRole.isAdmin, Controller.signupPost); 
router.post('/login', Controller.loginPost);
router.get('/logout', Controller.logoutGet);

router.get('/loggedin', Controller.loggedin);

module.exports = router;