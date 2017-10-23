const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkIdParams = require('../../../middleware/check-id');
const Controller = require('./chat.controller')

router.get('/:id/chats', checkIdParams, ensureLoggedIn(), Controller.getChatsGet);
router.get('/:id/messages', checkIdParams, ensureLoggedIn(), Controller.getMessagesGet);
router.get('/:providerId/:userId/:title/create-chat', ensureLoggedIn(), Controller.createChatGet);

module.exports = router;