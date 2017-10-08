const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('connect-ensure-login');
const checkRole = require('../../middleware/check-role');
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./spot.controller');
const upload = require('../../config/multer');

router.post('/signup', ensureLoggedIn(), checkRole.isAdmin, Controller.signupPost); 
router.put('/:id/edit', ensureLoggedIn(), checkRole.isAdmin, checkIdParams, 
           upload.array('file', 5), Controller.editPut);
router.get('/:id/view', checkIdParams, Controller.viewGet); 
router.get('/list', Controller.listGet); 
router.get('/list-visit', Controller.listVisitGet); 

module.exports = router;