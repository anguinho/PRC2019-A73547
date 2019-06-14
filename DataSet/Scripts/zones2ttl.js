const jsonfile = require('jsonfile')
const file = 'zones.json'
jsonfile.readFile(file)
  .then(obj => {
    var zones = obj.zones
    for(i in zones) {
        var zone = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#z"+zones[i].id+"\n";
        zone += ":z"+zones[i].id+" rdf:type owl:NamedIndividual ; \n";
        if(zones[i].isDungeon == true)
            zone += "\t\trdf:type :Dungeon ;\n";
        if(zones[i].isRaid == true)
            zone += "\t\trdf:type :Raid ;\n";
        for(j in zones[i].availableModes){
          if(zones[i].availableModes[j].indexOf("NORMAL") !== -1)
            zone += '\t\t:hasMode :normal ; \n';
          if(zones[i].availableModes[j].indexOf("HEROIC") !== -1)
            zone += '\t\t:hasMode :heroic ; \n';
          if(zones[i].availableModes[j].indexOf("MYTHIC") !== -1)
            zone += '\t\t:hasMode :mythic ; \n';
        }
        zone += '\t\t:numPlayers "'+zones[i].numPlayers+'" ;\n';
        zone += '\t\t:maxLevel '+zones[i].advisedMaxLevel+' ;\n';
        zone += '\t\t:minLevel '+zones[i].advisedMinLevel+' ;\n';
        zone += '\t\t:floors '+zones[i].floors+' ;\n';
        zone += '\t\t:name "'+zones[i].name+'" ;\n';
        zone += '\t\t:description "'+zones[i].description+'" .\n';
        
        console.log(zone);
    }

  })
  .catch(error => console.error(error))
