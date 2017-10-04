const express = require('express');
const router = express.Router();
const checkIdParams = require('../../middleware/check-id');
const Controller = require('./wedding.controller');

router.post('/:id/add', checkIdParams, Controller.addFavoritPost); 
router.post('/:id/edit', checkIdParams, Controller.editPost); 
router.post('/:id/delete', checkIdParams, Controller.deleteFavoritPost); 
router.get('/:id/list', checkIdParams, Controller.listFavoritesGet); 

module.exports = router;