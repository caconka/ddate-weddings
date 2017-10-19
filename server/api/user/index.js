const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./user.controller');
const upload = require('../../config/multer');

router.put('/:id/edit', checkIdParams, upload.single('file'), Controller.editPut);
router.get('/providers', Controller.providersGet);

module.exports = router;