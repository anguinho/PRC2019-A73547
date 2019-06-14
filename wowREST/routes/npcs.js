var express = require('express');
var router = express.Router();
var WoW = require('../controllers/wow')

/* GET home page. */

router.get('/:npc', async function(req, res, next) {
  var dados = await WoW.getNPC(req.params.npc)
  res.jsonp(dados)
})

module.exports = router;
