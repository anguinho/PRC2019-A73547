<template>
  <v-app class="grey darken-2">
    <v-toolbar prominent dark color="grey darken-4">
      <v-btn
        large
        flat
        icon
        @click="goToHome()"
      >
        <v-img :src="require('./assets/logo_transparent.png')"></v-img>
      </v-btn>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <!-- MENU Factions -->
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            v-on="on"
          >
            Factions
          </v-btn>
        </template>

        <v-list dark >
          <v-list-tile
            v-for="(item, index) in factions"
            :key="index"
            @click="goToFaction(item.faction)"
          >
            <v-list-tile-avatar><img :src="require('./assets/'+item.faction+'-symbol.png')" ></v-list-tile-avatar>
            <v-list-tile-title :class="item.color+'--text'">{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-divider vertical></v-divider>
      <!-- MENU Races -->
      <v-menu dark open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            v-on="on"
          >
            Races
          </v-btn>
        </template>
          <v-list dark >
            <v-layout grid-list-sm>
              <v-flex
               v-for="(fac, index) in factions"
              :key="index"
              xs4
              >
                <v-sheet :class="fac.color+'--text headline ml-3'">{{fac.name}}</v-sheet>
                <v-list dark >
                  <v-list-tile
                    v-for="(item, index) in fac.races"
                    :key="index"
                    @click="goToRace(item.race)"
                  >
                    <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/wow/icons/medium/race_'+item.name.replace(/ |'/g,'').toLowerCase().replace('undead','scourge')+'_female.jpg'" ></v-list-tile-avatar>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-list>
      </v-menu>
      <v-divider vertical></v-divider>
      <!-- MENU CLASSES -->
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            v-on="on"
          >
            Classes
          </v-btn>
        </template>

        <v-list dark >
          <v-list-tile
            v-for="(item, index) in classes"
            :key="index"
            @click="goToClass(item.class)"
          >
            <v-list-tile-avatar><img :src="'https://wow.zamimg.com/images/icons/class-crests/'+item.class.replace('c','')+'.png'" ></v-list-tile-avatar>
            <v-list-tile-title :class="item.color+'--text'">{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-divider vertical></v-divider>
        <v-btn
            dark
            v-on="on"
            @click="goToSpells('Spells')"
          >
            Spells
          </v-btn>
      <v-divider vertical></v-divider>
      <!-- MENU SPELLS -->
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            v-on="on"
            @click="goToSpells('Mounts')"
          >
            Mounts
          </v-btn>
        </template>

        <v-list dark >
          <v-list-tile
            v-for="(item, index) in mounts"
            :key="index"
            @click="goToSpells(item)"
          >
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-divider vertical></v-divider>
      <!-- MENU Zones -->
          <v-btn
            dark
            v-on="on"
            @click="goToZones('Zones')"
          >
            Zones
          </v-btn>
    </v-toolbar>
      <v-content class="back">
        <router-view />
      </v-content>
  </v-app>
</template>

<style>
.back {
  background-image: linear-gradient(to top left, rgba(100,115,201,.33), rgba(25,32,72,.7)), url('~@/assets/wallpaper.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: 105% 100%; 
}
</style>
<script>
import axios from 'axios'

const lhost = 'http://localhost:7865'

export default {
  data: () => ({
    on: false,
    mounts: ['Aquatic', 'Ground', 'Flying'],
    zones: ['Raids', 'Dungeons'],
    factions: [],
    classes: []
  }),
  name: 'WoW-journal',
  mounted: async function () {
    this.loadFactions()
    this.loadClasses()
  },
  methods: {
    goToHome: function () {
      this.$router.push('/')
    },
    goToFaction: function (id) {
      this.$router.push('/factions/' + id)
    },
    goToRace: function (id) {
      this.$router.push('/races/' + id)
    },
    goToClass: function (id) {
      this.$router.push('/classes/' + id)
    },
    goToSpells: function (id) {
      this.$router.push('/spells/' + id)
    },
    goToZones: function (id) {
      this.$router.push('/zones/' + id)
    },
    loadFactions: async function () {
      var response = await axios.get(lhost + '/factions/')
      this.factions = JSON.parse(JSON.stringify(response.data))
    },
    loadClasses: async function () {
      var response = await axios.get(lhost + '/classes/')
      this.classes = JSON.parse(JSON.stringify(response.data))
    }
  }
}
</script>
