const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./user.controller');

router.post('/:id/edit', checkIdParams, ensureLoggedIn(), checkRole.isUser, 
            Controller.editPost);
router.get('/providers', checkRole.isAdmin, Controller.providersGet);

module.exports = router;