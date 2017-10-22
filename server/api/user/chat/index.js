const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkIdParams = require('../../../middleware/check-id');
const Controller = require('./chat.controller')

router.get('/:userId/chats', checkIdParams, ensureLoggedIn(), Controller.getChatsGet);
router.get('/:chatId/messages', checkIdParams, ensureLoggedIn(), Controller.getMessagesGet);


module.exports = router;