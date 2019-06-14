var express = require('express');
var router = express.Router();
var WoW = require('../controllers/wow')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var dados = await WoW.listFactions()
  for(i in dados){
    dados[i].races = await WoW.racesPerFaction(dados[i].faction)
  }
  res.jsonp(dados)
});

router.get('/:f', async function(req, res, next) {
  var dados = await WoW.getFaction(req.params.f)
  res.jsonp(dados)
})

router.get('/:f/races/', async function(req, res, next) {
  var dados = await WoW.racesPerFaction(req.params.f)
  res.jsonp(dados)
})

router.get('/:f/capitals/', async function(req, res, next) {
  var dados = await WoW.locationsPerFaction(req.params.f)
  res.jsonp(dados)
})

module.exports = router;
