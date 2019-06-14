const jsonfile = require('jsonfile')
const file = 'talents.json'
jsonfile.readFile(file)
  .then(obj => {
    for(j in obj) {
      var wow_class = obj[j]
      var specs = wow_class.specs
      for(i in specs){
        var name = specs[i].name.replace(" ","");
        var spec = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#"+wow_class.class+"Spec"+name+"\n";
        spec += ":"+wow_class.class+"Spec"+name+" rdf:type owl:NamedIndividual ,\n\t\t\t\t\t:Spec ;\n";
        spec += "\t\t:hasRole :"+specs[i].role+" ;\n";
        spec += '\t\t:icon "http://media.blizzard.com/wow/icons/56/'+specs[i].icon+'.jpg" ;\n';
        spec += '\t\t:description "'+specs[i].description+'" ;\n'
        spec += '\t\t:isSpecOf :'+wow_class.class+" .\n"
        console.log(spec);
      }  
    }
  })
  .catch(error => console.error(error))
