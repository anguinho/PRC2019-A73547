const jsonfile = require('jsonfile')
const file = 'zones.json'
jsonfile.readFile(file)
  .then(obj => {
    var zones = obj.zones
    var zonesArray = {}
    for(i in zones) {
        if(zonesArray[zones[i].location.id] == undefined){
            var location = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#l"+zones[i].location.id+"\n";
            location += ":l"+zones[i].location.id+" rdf:type owl:NamedIndividual , \n\t\t\t\t\t:Location ;\n";
            location += '\t\t:name "'+zones[i].location.name+'" .\n';

            zonesArray[zones[i].location.id] = zones[i].location.name;
            console.log(location);
        }
    }
  })
  .catch(error => console.error(error))
