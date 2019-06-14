var unirest = require("unirest");
var sleep = require('sleep');

var token = "EUmxFMX65rOsLd7MhOrIaO4uVHE2mCW2EL"
var locate = "en_gb"
var region = "eu"

getData = async () =>  {
    for(var i=1495; i<20001; i++){
        if((i%50)==0)
            await sleep.sleep(1);
        
        var url = "https://"+region+".api.blizzard.com/wow/spell/"+i+"?locale="+locate+"&access_token="+token
        var req = unirest("GET", url);
    
        req.end(function (res) {
            if(typeof res.body.status === 'undefined') 
                console.log(res.body);
        });
    }
}

getData();