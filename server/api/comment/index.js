const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./comment.controller');

router.post('/:id/create', checkIdParams, Controller.createPost); 

router.post('/:id/edit', checkIdParams, Controller.editPost); 
            
router.get('/:id/list', checkIdParams, Controller.listGet); 

module.exports = router;