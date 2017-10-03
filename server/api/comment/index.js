const express = require('express');
const router = express.Router();
const Controller = require('./comment.controller')

router.post('/create', Controller.createPost); 
router.post('/edit', Controller.editPost); 

module.exports = router;