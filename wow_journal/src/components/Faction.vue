<template>
  <v-container>
    <v-card dark>
        <v-layout>
            <v-flex xs2>
                <v-container fluid>
                <v-img
                :src="require('../assets/'+faction+'-symbol.png')"
                height="125px"
                contain
                ></v-img>
                </v-container>
            </v-flex>
            <v-flex xs10>
                <v-card-title primary-title>
                <div>
                    <div :class="color+'--text headline'">{{name}}</div>
                    <div>{{description}}</div>
                </div>
                </v-card-title>
            </v-flex>
        </v-layout>
        <v-layout>
          <v-flex
            v-for="(item, index) in cities"
            :key="index"
            xs4
          >
                <v-container fluid>
                    <v-img ml-2
                        :src="'https://wow.zamimg.com/images/wow/maps/enus/normal/'+item.city.replace('l','')+'.jpg'"
                        max-height="325px"
                        max-width= "488px"
                    ></v-img>
                <figcaption class="amber--text text--accent-4">{{item.name}}</figcaption>
                </v-container>
          </v-flex>
        </v-layout>
    </v-card>
    <v-divider light></v-divider>
    <v-expansion-panel>
        <v-expansion-panel-content lazy class="grey darken-4">
            <template v-slot:actions>
                <v-icon color="primary">$vuetify.icons.expand</v-icon>
            </template>
            <template v-slot:header>
                <div class="headline white--text">Races</div>
            </template>
            <v-card dark>
                <v-flex>
                    <v-container fluid grid-list-sm>
                        <v-layout row wrap>
                        <v-flex
                            v-for="(item, index) in races"
                            :key="index"
                            xs4
                        >
                        <v-list>
                        <v-list-tile dark avatar @click="goToRaces(item.race)">
                            <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/medium/race_'+item.name.replace(/ |'/g,'').toLowerCase().replace('undead','scourge')+'_male.jpg'" ></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        </v-list>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-flex>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import axios from 'axios'

const lhost = 'http://localhost:7865'

export default {
  props: ['faction'],
  data: () => ({
    description: '',
    name: '',
    color: '',
    cities: [],  
    races: []
  }),
  watch: {
    'faction': function () {
      this.loadFaction(this.faction)
      this.loadCities(this.faction)
      this.loadRaces(this.faction)
    }
  },
  mounted: async function () {
    this.loadFaction(this.faction)
    this.loadCities(this.faction)
    this.loadRaces(this.faction)
  },
  methods: {
    loadFaction: async function (id) {
      var response = await axios.get(lhost + '/factions/' + id)
      this.name = response.data[0].name
      this.color = response.data[0].color
      this.description = response.data[0].description
    },
    loadRaces: async function (id) {
      var response = await axios.get(lhost + '/factions/' + id + '/races')
      this.races = JSON.parse(JSON.stringify(response.data))
    },
    loadCities: async function (id) {
      var response = await axios.get(lhost + '/factions/' + id + '/capitals')
      this.cities = JSON.parse(JSON.stringify(response.data))
    },
    goToRaces: function (id) {
      this.$router.push('/races/' + id)
    }
  }
}
</script>

<style>

</style>
