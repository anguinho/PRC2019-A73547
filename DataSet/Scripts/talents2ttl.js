const jsonfile = require('jsonfile')
const file = 'talents.json'
jsonfile.readFile(file)
  .then(obj => {
    for(j in obj) {
      var wow_class = obj[j]
      var talents = wow_class.talents
      for(x in talents){
        for(y in talents[x]){
            for(z in talents[x][y]) {
                var spell = talents[x][y][z].spell
                var talent = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#s"+spell.id+"\n";
                talent += ":s"+spell.id+" rdf:type owl:NamedIndividual ,\n\t\t\t\t\t:Talent ;\n";
                if(talents[x][y][z].spec) {
                    var spec = talents[x][y][z].spec
                    talent += "\t\t:isTalentOf :"+wow_class.class+"Spec"+spec.name.replace(" ","")+" ;\n";
                } else
                    talent += "\t\t:isSharedTalentOf :"+wow_class.class+" ;\n"    
                talent += '\t\t:id '+spell.id+' ;\n';
                talent += '\t\t:icon "http://media.blizzard.com/wow/icons/56/'+spell.icon+'" ;\n';
                talent += '\t\t:description "'+spell.description+'" ;\n';
                talent += '\t\t:castTime "'+spell.castTime+'" ;\n';
                if(spell.cooldown)
                    talent += '\t\t:cooldown "'+spell.cooldown+'" ;\n';
                if(spell.range)
                    talent += '\t\t:range "'+spell.range+'" ;\n';
                if(spell.powerCost)
                    talent += '\t\t:powerCost "'+spell.powerCost+'" ;\n';
                talent += '\t\t:tier '+talents[x][y][z].tier+' ;\n';
                talent += '\t\t:column '+talents[x][y][z].column+' ;\n';
                talent += '\t\t:name "'+spell.name+'" .\n' 
                console.log(talent);
            }
        }
      }  
    }
  })
  .catch(error => console.error(error))
