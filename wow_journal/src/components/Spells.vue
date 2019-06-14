<template>
  <v-container>
        <v-card dark>
          <v-card-title>
            <span class="headline">{{tipo}}</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="spells"
            :search="search"
            :rows-per-page-items="rowPerPage"
          >
            <template v-slot:items="props">
              <tr @click="goToSpell(props.item.spell)">
              <td class="text-xs-left">
                <v-img
                    v-if="props.item.icon!==''"
                    :src="'https://wow.zamimg.com/images/wow/icons/large/'+props.item.icon+'.jpg'"
                    height="30px"
                    contain
                    dark
                    flat
                ></v-img>
                <v-img
                    v-else
                    src="https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg"
                    height="30px"
                    contain
                    dark
                    flat
                ></v-img>
              </td>
              <td class="text-xs-left amber--text text--darken-1">{{ props.item.name }}</td>
              <td class="text-xs-center">
                <span v-if="props.item.description!==''">{{ props.item.description }}</span>
                <span v-else>No Description Available</span>
              </td>
              </tr>
            </template>
            <template v-slot:no-results>
              <v-alert :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
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
  props: ['tipo'],
  data: () => ({
    dialog: false,
    rowPerPage: [10, 25, 50, { 'text': '$vuetify.dataIterator.rowsPerPageAll', 'value': -1 }],
    name: '',
    spell: {},
    search: '',
    headers: [
      {
        text: 'Icon',
        sortable: false,
        value: 'icon'
      },
      {
        text: 'Name',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Description',
        sortable: false,
        value: 'description'
      }
    ],
    spells: []
  }),
  watch: {
    'tipo': function () {
      if (this.tipo === 'Mounts') { this.loadMounts() } else if (this.tipo === 'Aquatic') { this.loadAquatic() } else if (this.tipo === 'Ground') { this.loadGround() } else if (this.tipo === 'Flying') { this.loadFlying() } else this.loadSpells()
    }
  },
  mounted: async function () {
    if (this.tipo === 'Mounts') { this.loadMounts() } else if (this.tipo === 'Aquatic') { this.loadAquatic() } else if (this.tipo === 'Ground') { this.loadGround() } else if (this.tipo === 'Flying') { this.loadFlying() } else this.loadSpells()
  },
  methods: {
    loadSpells: async function (id) {
      var response = await axios.get(lhost + '/spells/')
      this.spells = JSON.parse(JSON.stringify(response.data))
    },
    loadMounts: async function (id) {
      var response = await axios.get(lhost + '/spells/mounts')
      this.spells = JSON.parse(JSON.stringify(response.data))
    },
    loadAquatic: async function (id) {
      var response = await axios.get(lhost + '/spells/aquatic')
      this.spells = JSON.parse(JSON.stringify(response.data))
    },
    loadGround: async function (id) {
      var response = await axios.get(lhost + '/spells/ground')
      this.spells = JSON.parse(JSON.stringify(response.data))
    },
    loadFlying: async function (id) {
      var response = await axios.get(lhost + '/spells/flying')
      this.spells = JSON.parse(JSON.stringify(response.data))
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
