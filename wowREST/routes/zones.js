var express = require('express');
var router = express.Router();
var WoW = require('../controllers/wow')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var dados = await WoW.listZones()
  res.jsonp(dados)
});

router.get('/raids', async function(req, res, next) {
  var dados = await WoW.listRaids()
  res.jsonp(dados)
})

router.get('/dungeons', async function(req, res, next) {
  var dados = await WoW.listDungeons()
  res.jsonp(dados)
})

router.get('/:z', async function(req, res, next) {
  var dados = await WoW.getZone(req.params.z)
  res.jsonp(dados)
})


router.get('/:z/bosses', async function(req, res, next) {
  var dados = await WoW.bossPerZone(req.params.z)
  res.jsonp(dados)
})

module.exports = router;
