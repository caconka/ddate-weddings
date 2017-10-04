const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Controller = require('./auth.controller')

router.post('/signup', ensureLoggedOut(), Controller.signupPost); 
router.post('/login', ensureLoggedOut(), Controller.loginPost);
router.get('/logout', ensureLoggedIn(), Controller.logoutGet);

router.get('/loggedin', Controller.loggedin);

module.exports = router;