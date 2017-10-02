const express = require('express');
const router = express.Router();
const Controller = require('./auth.controller')

router.post('/signup', Controller.signupPost); 
router.post('/login', Controller.loginPost);
router.get('/logout', Controller.logoutGet);

router.get('/loggedin', Controller.loggedin);

module.exports = router;