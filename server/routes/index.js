const express = require('express');
const router = express.Router();
const fuzzyis = require('fuzzyis');
const system = new fuzzyis.FIS('Tip system');
const LinguisticVariable = fuzzyis.LinguisticVariable;
const Term = fuzzyis.Term;
const Rule = fuzzyis.Rule;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
