const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const checkRole = require('../../../middleware/check-role');
const checkIdParams = require('../../../middleware/check-id');
const Controller = require('./diary.controller')

router.get('/:id/events', checkIdParams, Controller.getDiaryGet);
router.post('/:id/add-event', checkIdParams, Controller.addEventPost);

module.exports = router;