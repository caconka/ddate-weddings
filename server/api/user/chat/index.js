const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkIdParams = require('../../../middleware/check-id');
const Controller = require('./chat.controller')

router.get('/:id/chats', checkIdParams, ensureLoggedIn(), Controller.getChatsGet);
router.get('/:id/messages', checkIdParams, ensureLoggedIn(), Controller.getMessagesGet);
router.post('/:id/add-message', checkIdParams, ensureLoggedIn(), Controller.createMessPost);
router.get('/:userId/:spotId/create-chat', ensureLoggedIn(), Controller.createChatGet);

module.exports = router;