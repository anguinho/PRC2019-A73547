<template>
  <v-container >
    <v-card dark>
        <v-layout row wrap >
            <v-flex xs3 >
                <v-container fluid>
                <v-img
                :src="'https://wow.zamimg.com/images/guide/classes/'+name.replace(' ','').toLowerCase()+'.jpg'"
                max-height="600px"
                max-width="300px"
                ></v-img>
                </v-container>
            </v-flex>
            <v-flex xs9 >
                <v-sheet class="ma-3">
                <div>
                    <div :class="'display-3 '+color+'--text'">{{name}}</div>
                    <div :class="'headline '+powerColor+'--text text--accent-3'">{{power}}</div>
                </div>
                </v-sheet>
                <v-card-title primary-title><div class="headline">Specs</div></v-card-title>
                <v-list three-line dark>
                    <v-list-tile
                        v-ripple
                        v-for="(item, index) in specs"
                        :key="index"
                        @click="specid= item.spec"
                    >
                        <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/large/'+item.icon+'.jpg'" ></v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title class="amber--text text--darken-3" v-text="item.spec.replace(/c[0-9]+Spec/g,'')"></v-list-tile-title>
                            <v-list-tile-sub-title v-text="item.description"></v-list-tile-sub-title>
                            <span class="amber--text text--darken-2">{{item.roleDescription}}</span>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
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
                <div class="headline white--text">{{"Talents of "+spec}}</div>
            </template>
            <v-card dark>
            <v-layout v-bind="binding">
                <v-flex sm4 ma-2>
                    <v-card>
                    <v-list three-line dark>
                        <v-list-tile
                            v-ripple
                            v-for="(item, index) in talents[0]"
                            :key="index"
                            @click="goToSpell(item.talent)"
                        >
                            <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/large/'+item.icon+'.jpg'" ></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                <v-list-tile-sub-title class="caption" v-text="item.description"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    </v-card>
                </v-flex>
                <v-flex sm4 ma-2>
                    <v-card>
                    <v-list three-line dark>
                        <v-list-tile
                            v-ripple
                            v-for="(item, index) in talents[1]"
                            :key="index"
                            @click="goToSpell(item.talent)"
                        >
                            <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/large/'+item.icon+'.jpg'" ></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                <v-list-tile-sub-title class="caption" v-text="item.description"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    </v-card>
                </v-flex>
                <v-flex sm4 ma-2>
                    <v-card>
                    <v-list three-line dark>
                        <v-list-tile
                            v-ripple
                            v-for="(item, index) in talents[2]"
                            :key="index"
                            @click="goToSpell(item.talent)"
                        >
                            <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/large/'+item.icon+'.jpg'" ></v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                                <v-list-tile-sub-title class="caption" v-text="item.description"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
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
            <v-card-title class="amber--text text--darken-4" v-text="spell.name"></v-card-title>
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
  props: ['wow_class'],
  data: () => ({
    dialog: false,
    spell: {},
    name: '',
    power: '',
    powerColor: '',
    color: '',
    spec: '',
    specid: '',
    specs: [],
    talents: { '0': [], '1': [], '2': [] }
  }),
  watch: {
    'wow_class': function () {
      this.loadClass(this.wow_class)
      this.loadSpecs(this.wow_class)
    },
    'specid': function () {
      this.spec = this.specid.replace(/c[0-9]+Spec/g, '')
      this.loadTalents(this.specid, 0)
      this.loadTalents(this.specid, 1)
      this.loadTalents(this.specid, 2)
    }
  },
  mounted: async function () {
    this.loadClass(this.wow_class)
    this.loadSpecs(this.wow_class)
  },
  methods: {
    loadClass: async function (id) {
      var response = await axios.get(lhost + '/classes/' + id)
      this.name = response.data[0].name
      this.color = response.data[0].color
      this.power = response.data[0].power
      this.powerColor = response.data[0].powerColor
    },
    loadSpecs: async function (id) {
      var response = await axios.get(lhost + '/classes/' + id + '/specs')
      this.specid = response.data[0].spec
      this.spec = response.data[0].spec.replace(/c[0-9]+Spec/g, '')
      this.specs = JSON.parse(JSON.stringify(response.data))
    },
    loadTalents: async function (id, col) {
      var response = await axios.get(lhost + '/classes/' + id + '/talents/' + col)
      this.talents[col] = JSON.parse(JSON.stringify(response.data))
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
