const express = require('express');
const router = express.Router();
const Controller = require('./spot.controller')

router.post('/signup', Controller.signupPost); 

module.exports = router;