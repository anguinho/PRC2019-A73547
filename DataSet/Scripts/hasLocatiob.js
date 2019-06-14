const jsonfile = require('jsonfile')
const file = 'zones.json'
jsonfile.readFile(file)
  .then(obj => {
    var zones = obj.zones
    for(i in zones) {
        var zid = zones[i].id
        var lid = zones[i].location.id

        console.log(':z'+zid+' :isZoneOf :l'+lid+' .')

    }
  })
  .catch(error => console.error(error))
