var express = require('express');
var router = express.Router();
var WoW = require('../controllers/wow')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var dados = await WoW.listRaces()
  res.jsonp(dados)
});

router.get('/:r', async function(req, res, next) {
  var dados = await WoW.getRace(req.params.r)
  res.jsonp(dados)
})

router.get('/:r/traits/', async function(req, res, next) {
  var dados = await WoW.traitsRace(req.params.r)
  res.jsonp(dados)
})

router.get('/:r/location/', async function(req, res, next) {
  var dados = await WoW.locationRace(req.params.r)
  res.jsonp(dados)
})

router.get('/:r/classes/', async function(req, res, next) {
  var dados = await WoW.classesRace(req.params.r)
  res.jsonp(dados)
})

module.exports = router;
