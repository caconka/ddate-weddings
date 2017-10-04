const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./comment.controller');

router.post('/:id/create', checkIdParams, ensureLoggedIn(), checkRole.isUser,
            Controller.createPost); 

router.post('/:id/edit', checkIdParams, ensureLoggedIn(), checkRole.isUser,
            Controller.editPost); 
            
router.get('/:id/list', checkIdParams, ensureLoggedIn(), checkRole.isUser,
            Controller.listGet); 

module.exports = router;