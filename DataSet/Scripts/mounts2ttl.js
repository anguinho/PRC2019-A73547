const jsonfile = require('jsonfile')
const file = 'mounts.json'
jsonfile.readFile(file)
  .then(obj => {
    var mounts = obj.mounts;
    for(i in mounts){
      var mount = "###  http://prc.di.uminho.pt/2019/worldOfwarcraft#s"+mounts[i].spellId+"\n";
      mount += ":s" + mounts[i].spellId +" rdf:type owl:NamedIndividual ,\n\t\t\t\t\t:Mount ;\n";
      mount += '\t\t:icon "http://media.blizzard.com/wow/icons/56/'+mounts[i].icon+'.jpg" ;\n';
      
      if(mounts[i].isGround == true)
        mount += '\t\t:type "Ground" ;\n';
      if(mounts[i].isFlying == true)
        mount += '\t\t:type "Flying" ;\n';
      if(mounts[i].isAquatic == true)
        mount += '\t\t:type "Aquatic" ;\n';
      
      mount += '\t\t:name "' + mounts[i].name.replace(/"/g,'') + '" .\n'
      console.log(mount);
    }   
  })
  .catch(error => console.error(error))
