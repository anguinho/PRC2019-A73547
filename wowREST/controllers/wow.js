const endpoint = "http://localhost:7200/repositories/wow-prc-project"
const axios = require('axios')

async function execQuery(q) {
    try {
        var encoded = encodeURIComponent(q);
        var response = await axios.get(endpoint + "?query=" + encoded)
        var vars = response.data.head.vars
        var res = response.data.results.bindings;
        var jsonList = [];
        for(i in res) {
            var json = {}
            for(j in vars) {
                if(typeof res[i][vars[j]] === 'undefined' || !res[i][vars[j]])
                    json[vars[j]] = ""
                else {
                    if(res[i][vars[j]].type === 'uri')
                        json[vars[j]] = res[i][vars[j]].value.split("#")[1];
                    else
                        json[vars[j]] = res[i][vars[j]].value
                }
            }
            jsonList.push(json);
        }
        return(jsonList)
    }
    catch(error) {
        return("ERRO: " + error)
    }
}

//Controller factions
module.exports.listFactions = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        ?faction  a       :Faction ;
            :color ?color ;
            :name   ?name .
        OPTIONAL{?faction :description ?description}
    }`
    return execQuery(query)
}

module.exports.getFaction = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :name ?name ;
               :color ?color ;
    			  :description ?description .
    }`
    return execQuery(query)
}

module.exports.racesPerFaction = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :isFactionOf ?race.
        ?race :name ?name.
    }`
    return execQuery(query)
}

module.exports.locationsPerFaction = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :hasCapital ?city.
        ?city :name ?name .
    }`
    return execQuery(query)
}


//Controller Races
module.exports.listRaces = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        ?race a :Race;
               :name ?name .
    }`
    return execQuery(query)
}

module.exports.getRace = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :name ?name .
    }`
    return execQuery(query)
}

module.exports.traitsRace = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :hasTrait ?trait .
        ?trait :name ?name ;
               :icon ?icon .
               OPTIONAL{ ?trait :description ?description .}
    }`
    return execQuery(query)
}

module.exports.locationRace = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :hasOrigin ?location .
        ?location :name ?name .
    }`
    return execQuery(query)
}

module.exports.classesRace = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :hasWoW_Class ?class.
        ?class :name ?name;
               :color ?color .
    }`
    return execQuery(query)
}

//Controller Classes
module.exports.listClasses = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    SELECT *
    WHERE {
        ?class a :WoW_Class;
               :name ?name ;
               :color ?color .
    }`
    return execQuery(query)
}


module.exports.getClass = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :name ?name ;
               :color ?color;
            :hasPowerType ?type .
        ?type :typeName ?power ;
              :color ?powerColor .
    }`
    return execQuery(query)
}


module.exports.specsClass = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :hasSpec ?spec .
    	?spec :description ?description;
           	  :hasRole ?role;
              :icon ?icon.
        ?role :name ?roleName;
              :description ?roleDescription .
    }`
    return execQuery(query)
}

module.exports.talentsPerColumnClass = (id,column) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select * where { 
        :${id} :hasTalent ?talent.
    	?talent :column ${column};
                :name ?name;
                :description ?description .
    OPTIONAL{?talent :icon ?icon}
    }`
    return execQuery(query)
}

// Controller Spells
module.exports.listSpells = () => {
    var query = ` PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct ?spell ?name ?icon ?description where { 
    {?spell a :Spell} UNION {?spell a :Trait} 
        ?spell     :name ?name .
        OPTIONAL{ ?spell :icon ?icon .}
        OPTIONAL{ ?spell :description ?description .}
        FILTER (NOT EXISTS { ?spell a :Mount . })
    }`
    return execQuery(query)
}

module.exports.listMounts = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
        ?spell a :Mount;
             :name ?name .
        OPTIONAL{ ?spell :icon ?icon .}
        OPTIONAL{ ?spell :description ?description .}
    }`
    return execQuery(query)
}

module.exports.listAquaticMounts = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
        ?spell a :Mount;
             :name ?name ;
             :type "Aquatic" .
             OPTIONAL{ ?spell :icon ?icon .}
             OPTIONAL{ ?spell :description ?description .}
    }`
    return execQuery(query)
}

module.exports.listGroundMounts = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
        ?spell a :Mount;
             :name ?name ;
             :type "Ground" .
             OPTIONAL{ ?spell :icon ?icon .}
             OPTIONAL{ ?spell :description ?description .}
    }`
    return execQuery(query)
}

module.exports.listFlyingMounts = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
        ?spell a :Mount;
             :name ?name ;
             :type "Flying" .
             OPTIONAL{ ?spell :icon ?icon .}
    }`
    return execQuery(query)
}

module.exports.getSpell = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
        :${id} :name ?name .
        OPTIONAL{ :${id} :castTime ?castTime .}
        OPTIONAL{ :${id} :cooldown ?cooldown .}
        OPTIONAL{ :${id} :powerCost ?powerCost .}
        OPTIONAL{ :${id} :range     ?range .}
        OPTIONAL{ :${id} :description ?description .}
        OPTIONAL{ :${id} :type ?type .}
        OPTIONAL{ :${id} :icon	?icon .}
    }`
    return execQuery(query)
}

//Controller Zones
module.exports.listZones = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
        select distinct * where { 
            ?zone a :Zone;
                :name ?name;
                :minLevel ?minLevel;
                :numPlayers ?numPlayers;
                :isZoneOf ?l.
            ?l :name ?lname .
    }`
    return execQuery(query)
}

module.exports.listRaids = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
        ?zone a :Raid;
            :name ?name;
            :minLevel ?minLevel;
            :numPlayers ?numPlayers;
            :isZoneOf ?l.
        ?l :name ?lname .
    }`
    return execQuery(query)
}

module.exports.listDungeons = () => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
        ?zone a :Dungeon;
            :name ?name;
            :minLevel ?minLevel;
            :numPlayers ?numPlayers;
            :isZoneOf ?l.
        ?l :name ?lname .
    }`
    return execQuery(query)
}

module.exports.getZone = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    select distinct * where { 
		:${id} :name ?name;
         	   :isZoneOf ?l.
         	?l :name ?lname .
    OPTIONAL{:${id} :floors ?floors.}
    OPTIONAL{:${id} :minLevel ?minLevel.}	
    OPTIONAL{:${id} :maxLevel ?maxLevel . }	
    OPTIONAL{:${id} :numPlayers ?numPlayers .}	
    OPTIONAL{:${id} :description ?description .}
    }`
    return execQuery(query)
}

module.exports.bossPerZone = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    SELECT * WHERE {
        :${id} :hasNPC ?boss .
        ?boss  :name ?name .
        OPTIONAL{?boss :icon ?iconid .}
    }`
    return execQuery(query)
}

module.exports.getNPC = (id) => {
    var query = `PREFIX : <http://prc.di.uminho.pt/2019/worldOfwarcraft#>
    SELECT * WHERE {
	    :${id} :name ?name. 
    OPTIONAL{:${id} :description ?description.}
        OPTIONAL{:${id} :health ?health.}
        OPTIONAL{:${id} :level ?level.}
        OPTIONAL{:${id} :icon ?iconid.}
}`
    return execQuery(query)
}

