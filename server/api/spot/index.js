const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const Controller = require('./spot.controller');

router.post('/signup', ensureLoggedIn(), checkRole.isAdmin, Controller.signupPost); 

module.exports = router;