const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const checkRole = require('../../../middleware/check-role');
const checkIdParams = require('../../../middleware/check-id');
const Controller = require('./diary.controller')

router.get('/create/:id', checkIdParams, Controller.createDiaryGet);
router.get('/:id/diary', ensureLoggedIn(), checkRole.isUser, Controller.getDiaryGet);

module.exports = router;