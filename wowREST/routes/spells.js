var express = require('express');
var router = express.Router();
var WoW = require('../controllers/wow')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var dados = await WoW.listSpells()
  res.jsonp(dados)
});

router.get('/mounts', async function(req, res, next) {
  var dados = await WoW.listMounts()
  res.jsonp(dados)
})

router.get('/aquatic', async function(req, res, next) {
  var dados = await WoW.listAquaticMounts()
  res.jsonp(dados)
})

router.get('/ground', async function(req, res, next) {
  var dados = await WoW.listGroundMounts()
  res.jsonp(dados)
})

router.get('/flying', async function(req, res, next) {
  var dados = await WoW.listFlyingMounts()
  res.jsonp(dados)
})

router.get('/:s', async function(req, res, next) {
  var dados = await WoW.getSpell(req.params.s)
  res.jsonp(dados)
})

module.exports = router;
