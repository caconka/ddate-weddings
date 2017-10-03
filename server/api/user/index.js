const express = require('express');
const router = express.Router();
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./user.controller')

router.post('/:id/edit', checkIdParams, Controller.editPost); 

module.exports = router;