const jsonfile = require('jsonfile')
const file = 'races.json'
jsonfile.readFile(file)
  .then(obj => {
    var races = obj.races;
    for(i in races){
      var race = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#r"+races[i].id+"\n";
      race += ":r" + races[i].id +" rdf:type owl:NamedIndividual ,\n\t\t\t\t\t:Race ;\n";
      race += "\t\t:hasFaction :" + races[i].side + " ;\n";
      for(j in races[i].classes) {
        race += "\t\t:hasClass :"+ races[i].classes[j] + " ;\n";
      }
      for(j in races[i].traits){
        race += "\t\t:hasTrait :s"+races[i].traits[j].id+" ; \n"
      }
      race += '\t\t:id '+races[i].id+' ;\n'
      race += '\t\t:name "' + races[i].name + '" .\n'
      console.log(race);

      var spells = races[i].traits
      for(j in spells){
        var spell = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#s" + spells[j].id+"\n";
        spell += ":s"+spells[j].id +" rdf:type owl:NamedIndividual ,\n\t\t\t\t\t:Spell ;\n";
        spell += "\t\t:id "+ spells[j].id +" ;\n";
        spell += '\t\t:description "'+spells[j].description + '" ;\n';
        spell += '\t\t:castTime "'+spells[j].castTime + '" ;\n';
        if(spells[j].cooldown)
          spell += '\t\t:cooldown "'+spells[j].cooldown + '" ;\n';
        spell += '\t\t:name "'+spells[j].name + '" .\n';

        console.log(spell);
      }
    }   
  })
  .catch(error => console.error(error))
