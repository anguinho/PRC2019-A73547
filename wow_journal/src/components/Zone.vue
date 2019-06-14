<template>
  <v-container >
    <v-card dark>
        <v-layout row wrap justify-space-between>
          <v-flex xs5>
            <v-sheet class="ma-3 ml-4">
            <div>
              <v-sheet class="display-3 lime--text text--darken-2">{{location.name}}</v-sheet>
              <v-sheet v-if="location.description!==''" class="subheading" >{{location.description}}</v-sheet>
              <v-sheet v-else class="headline my-2">No Description Available</v-sheet>
              <v-layout>
                <v-flex xs6>
                  <v-sheet class="subheading">{{'Minimum Level: '+location.minLevel}}</v-sheet>
                </v-flex>
                <v-flex xs6>
                  <v-sheet class="subheading">{{'Maximum Level: '+location.maxLevel}}</v-sheet>
                </v-flex>
              </v-layout>
              <v-sheet class="subheading my-2">{{'Number of Players: '+location.numPlayers}}</v-sheet>
              <v-sheet class="subheading">{{'Number of floors: '+location.floors}}</v-sheet> 
            </div>
            </v-sheet>
          </v-flex>
          <v-flex xs6 offset-xs1>
                <v-container dark>
                  <v-carousel
                    class="text-xs-center"
                    hide-delimiters 
                    height="370px"
                    max="500px"
                  >
                    <v-carousel-item>
                      <v-img
                        max-height="370px"
                        max-width="550px"
                        :src="'https://wow.zamimg.com/images/wow/maps/enus/normal/'+location.l.replace('l','')+'.jpg'"
                      ></v-img>
                      <figcaption class="amber--text text--accent-4">{{location.lname}}</figcaption>
                    </v-carousel-item>
                    <v-carousel-item
                      v-for="i in parseInt(location.floors)"
                      :key="i"
                    >
                      <v-img v-if="mode === 'raid'"
                        max-height="370px"
                        max-width="550px"
                        :src="'https://wow.zamimg.com/images/wow/maps/enus/normal/'+zone.replace('z','')+'-'+(i-1)+'.jpg'"
                      ></v-img>
                      <v-img v-else
                        max-height="370px"
                        max-width="550px"
                        :src="'https://wow.zamimg.com/images/wow/maps/enus/normal/'+zone.replace('z','')+'-'+(i)+'.jpg'"
                      ></v-img>
                      <figcaption class="amber--text text--accent-4">{{location.name + ' - '+i+' Floor'}}</figcaption>
                    </v-carousel-item>
                  </v-carousel>
                </v-container>
            </v-flex>
        </v-layout>
        <v-expansion-panel>
        <v-expansion-panel-content lazy class="grey darken-4">
            <template v-slot:actions>
                <v-icon color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template v-slot:header>
                <div class="headline white--text">Bosses</div>
            </template>
            <v-card dark>
                <v-flex>
                    <v-container fluid grid-list-sm>
        <v-layout row wrap>
          <v-flex
            v-for="(item, index) in bosses"
            :key="index"
            xs2
          >
                <v-container class="justify-center" @click="goToBoss(item.boss)">
                    <v-img ml-2
                        :src="'https://wow.zamimg.com/images/wow/journal/ui-ej-boss-'+item.name.replace(/ /g,'-').toLowerCase()+'.png'"
                        height="80px"
                        width="80px"
                    ></v-img>
                <figcaption class="amber--text text--accent-4">{{item.name}}</figcaption>
                </v-container>
          </v-flex>
        </v-layout>
        </v-container>
                </v-flex>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    </v-card>
    <v-divider light></v-divider>
    
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card dark>
        <v-flex xs12 ma-2>
            <v-card-title primary-title>
                <v-img ml-2
                        :src="'https://wow.zamimg.com/images/wow/journal/ui-ej-boss-'+boss.name.replace(/ /g,'-').toLowerCase()+'.png'"
                        height="80px"
                        width="80px"
                    ></v-img>
            </v-card-title>
        </v-flex>
        <v-flex xs12 ma-2>
            <v-card-title class="amber--text text--darken-4" v-text="boss.name"></v-card-title>
            <v-card-text v-if="boss.description !==''" v-text="boss.description"></v-card-text>
            
            <v-flex xs6>
            <v-card-text v-if="boss.helath !==''" v-text="'Health: '+boss.health"></v-card-text>
            </v-flex>
            <v-flex xs6>
            <v-card-text v-if="boss.level !==''" v-text="'Level: '+boss.level"></v-card-text>
            </v-flex>
            <v-card-text v-if="boss.iconid !==''" v-text="'Creature ID: '+boss.iconid"></v-card-text>            
        </v-flex>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'

const lhost = 'http://localhost:7865'

export default {
  props: ['zone','mode'],
  data: () => ({
    spell: '',
    dialog: false,
    location: {},
    bosses: [],
    boss: {name: '', description: '', health: '', level: '', iconid: ''},
  }),
  watch: {
    'zone': function () {
      this.loadZone(this.zone)
      this.loadBosses(this.zone)
    }
  },
  mounted: async function () {
    this.loadZone(this.zone)
    this.loadBosses(this.zone)
  },
  methods: {
    loadZone: async function (id) {
      var response = await axios.get(lhost + '/zones/' + id)
      console.log(response.data)
      var res = response.data[0]
      this.location = JSON.parse(JSON.stringify(res))
    },
    loadBosses: async function (id) {
      var response = await axios.get(lhost + '/zones/' + id + '/bosses')
      this.bosses = JSON.parse(JSON.stringify(response.data))
    },
    loadBoss: async function (id) {
      var response = await axios.get(lhost + '/npcs/' + id )
      var res = response.data[0]
      this.boss = JSON.parse(JSON.stringify(res))
    },
    goToBoss: function (id) {
      this.loadBoss(id)
      this.dialog = true
    }
  }
}
</script>

<style>

</style>
