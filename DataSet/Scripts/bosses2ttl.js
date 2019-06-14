const jsonfile = require('jsonfile')
const file = 'zones.json'
jsonfile.readFile(file)
  .then(obj => {
    var zones = obj.zones
    for(i in zones) {
        var bosses = zones[i].bosses
        for(j in bosses){
            
            var boss = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#n"+bosses[j].id+"\n";
            boss += ":n"+bosses[j].id+" rdf:type owl:NamedIndividual , \n\t\t\t\t\t:Boss ;\n";
            if(bosses[j].description != undefined)
                boss += '\t\t:description "'+bosses[j].description.replace(/"/g,'') +'" ;\n';
            boss += '\t\t:level '+bosses[j].level+' ;\n';
            boss += '\t\t:health '+bosses[j].health+' ;\n';
            boss += '\t\t:isNPCOf :z'+bosses[j].zoneId+' ;\n';
            boss += '\t\t:name "'+bosses[j].name.replace(/"/g,'') +'" .\n';

            console.log(boss)
        }
    }
  })
  .catch(error => console.error(error))
