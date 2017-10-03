const express = require('express');
const router = express.Router();
const Controller = require('./user.controller')

router.post('/edit', Controller.editPost); 

module.exports = router;