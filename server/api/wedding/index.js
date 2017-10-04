const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./wedding.controller');

router.post('/:id/add', checkIdParams, ensureLoggedIn(), checkRole.isUser, 
            Controller.addFavoritPost); 

router.post('/:id/edit', checkIdParams, ensureLoggedIn(), checkRole.isUser, 
            Controller.editPost); 

router.post('/:id/delete', checkIdParams, ensureLoggedIn(), checkRole.isUser, 
            Controller.deleteFavoritPost); 

router.get('/:id/list', checkIdParams, ensureLoggedIn(), checkRole.isUser, 
            Controller.listFavoritesGet); 

module.exports = router;