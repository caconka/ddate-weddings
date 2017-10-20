const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkIdParams = require('../../../middleware/check-id');
const Controller = require('./diary.controller')

router.get('/:id/events', checkIdParams, Controller.getDiaryGet);
router.post('/:id/add-event', checkIdParams, ensureLoggedIn(), Controller.addEventPost);

module.exports = router;