const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./spot.controller');

router.post('/signup', ensureLoggedIn(), checkRole.isAdmin, Controller.signupPost); 
router.get('/:id/view', checkIdParams, Controller.viewGet); 

module.exports = router;