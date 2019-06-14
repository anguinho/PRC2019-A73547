var express = require('express');
var router = express.Router();
var WoW = require('../controllers/wow')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var dados = await WoW.listClasses()
  res.jsonp(dados)
});

router.get('/:c', async function(req, res, next) {
  var dados = await WoW.getClass(req.params.c)
  res.jsonp(dados)
})

router.get('/:c/specs', async function(req, res, next) {
  var dados = await WoW.specsClass(req.params.c)
  res.jsonp(dados)
})

router.get('/:c/talents/:column', async function(req, res, next) {
  var dados = await WoW.talentsPerColumnClass(req.params.c, req.params.column)
  res.jsonp(dados)
})

module.exports = router;
