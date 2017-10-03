const express = require('express');
const router = express.Router();
const Controller = require('./comment.controller')

router.post('/create', Controller.createPost); 

module.exports = router;