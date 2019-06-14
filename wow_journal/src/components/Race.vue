<template>
  <v-container>
    <v-card dark ma-2>
        <v-container fluid>
        <v-layout row >
            <v-flex xs1 ma-2>
                <v-avatar size="70px"><v-img
                :src="'https://wow.zamimg.com/images/wow/icons/large/race_'+name.replace(/ |'/g,'').toLowerCase().replace('undead','scourge')+'_female.jpg'"
                ></v-img></v-avatar>
            </v-flex>
            <v-flex xs1 ma-2>
                <v-avatar size="70px"><v-img
                :src="'https://wow.zamimg.com/images/wow/icons/large/race_'+name.replace(/ |'/g,'').toLowerCase().replace('undead','scourge')+'_male.jpg'"
                ></v-img></v-avatar>
            </v-flex>
            <v-flex xs10 ma-2>
                <v-sheet>
                    <div class="display-3 amber--text text--darken-4">{{name}}</div>
                </v-sheet>
            </v-flex>
        </v-layout>
        </v-container>
        <v-layout row wrap>
            <v-flex xs5>
                <v-sheet class="ml-3"><div class="headline">Racials</div></v-sheet>
                <v-divider inset vertical></v-divider>
                <v-list three-line dark>
                    <v-list-tile
                        v-for="(item, index) in traits"
                        :key="index"
                        @click.stop="goToSpell(item.trait)"
                    >
                        <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/large/'+item.icon+'.jpg'" ></v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title class="amber--text text--darken-3" v-text="item.name"></v-list-tile-title>
                            <v-list-tile-sub-title v-text="item.description"></v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs6 offset-xs1>
                <v-sheet><div class="headline">Starting Zone</div></v-sheet>
                <v-container fluid>
                    <v-img ml-2
                        :src="'https://wow.zamimg.com/images/wow/maps/enus/normal/'+location.location.replace('l','')+'.jpg'"
                        max-height="325px"
                        max-width= "488px"
                    ></v-img>
                <figcaption class="amber--text text--accent-4">{{location.name}}</figcaption>
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
                <div class="headline white--text">Classes</div>
            </template>
            <v-card dark>
                <v-flex>
                    <v-container fluid grid-list-sm>
                        <v-layout row wrap>
                        <v-flex
                            v-for="(item, index) in classes"
                            :key="index"
                            xs4
                        >
                        <v-list-tile dark avatar @click="goToClass(item.class)">
                            <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/small/class_'+item.name.replace(/ /g,'').toLowerCase()+'.jpg'" ></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
    <v-dialog
      v-model="dialog"
      max-width="300px"
    >
      <v-card dark>
        <v-flex xs12 ma-2>
            <v-card-title primary-title>
                <v-img
                    v-if="spell.icon!==''"
                    :src="'https://wow.zamimg.com/images/wow/icons/large/'+spell.icon+'.jpg'"
                    height="70px"
                    contain
                    dark
                    flat
                ></v-img>
                <v-img
                    v-else
                    src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg"
                    height="70px"
                    contain
                    dark
                    flat
                ></v-img>
            </v-card-title>
        </v-flex>
        <v-flex xs12 ma-2>
            <v-card-title v-text="spell.name"></v-card-title>
            <v-card-text v-if="spell.description !==''" v-text="spell.description"></v-card-text>
            <v-card-text v-if="spell.castTime !==''" v-text="'Cast Time: '+spell.castTime"></v-card-text>
            <v-card-text v-if="spell.cooldown !==''" v-text="'Cooldown: '+spell.cooldown"></v-card-text>
            <v-card-text v-if="spell.powerCost !==''" v-text="'Cost: '+spell.powerCost"></v-card-text>
            <v-card-text v-if="spell.range !==''" v-text="'Range: '+spell.range"></v-card-text>
            <v-card-text v-if="spell.type !==''" v-text="'Type: '+spell.type"></v-card-text>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'

const lhost = 'http://localhost:7865'

export default {
  props: ['race'],
  data: () => ({
    dialog: false,
    name: '',
    spell: {},
    traits: [],
    classes: [],
    location: {}
  }),
  watch: {
    'race': function () {
      this.loadRace(this.race)
      this.loadTraits(this.race)
      this.loadClasses(this.race)
      this.loadLocation(this.race)
    }
  },
  mounted: async function () {
    this.loadRace(this.race)
    this.loadTraits(this.race)
    this.loadClasses(this.race)
    this.loadLocation(this.race)
  },
  methods: {
    loadRace: async function (id) {
      var response = await axios.get(lhost + '/races/' + id)
      this.name = response.data[0].name
    },
    loadTraits: async function (id) {
      var response = await axios.get(lhost + '/races/' + id + '/traits')
      this.traits = JSON.parse(JSON.stringify(response.data))
    },
    loadClasses: async function (id) {
      var response = await axios.get(lhost + '/races/' + id + '/classes')
      this.classes = JSON.parse(JSON.stringify(response.data))
    },
    loadLocation: async function (id) {
      var response = await axios.get(lhost + '/races/' + id + '/location')
      this.location = JSON.parse(JSON.stringify(response.data[0]))
    },
    goToClass: function (id) {
      this.$router.push('/classes/' + id)
    },
    loadSpell: async function (id) {
      var response = await axios.get(lhost + '/spells/' + id)
      this.spell = JSON.parse(JSON.stringify(response.data[0]))
    },
    goToSpell: function (id) {
      this.loadSpell(id)
      this.dialog = true
    }
  }
}
</script>

<style>

</style>
