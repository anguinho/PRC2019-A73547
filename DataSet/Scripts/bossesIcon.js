const jsonfile = require('jsonfile')
const file = 'zones.json'
jsonfile.readFile(file)
  .then(obj => {
    var zones = obj.zones
    for(i in zones) {
        var bosses = zones[i].bosses
        for(j in bosses){
            if(typeof bosses[j].npcs !== 'undefined' && bosses[j].npcs && typeof bosses[j].npcs[0].creatureDisplayId !== 'undefined') {
                var icon = ':n'+bosses[j].id+' :icon "'+bosses[j].npcs[0].creatureDisplayId +'" .\n'


            console.log(icon)
        }
        }
    }
  })
  .catch(error => console.error(error))
