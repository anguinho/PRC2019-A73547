import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Faction from './views/Faction.vue'
import Race from './views/Race.vue'
import Class from './views/Class.vue'
import Spells from './views/Spells.vue'
import Zones from './views/Zones.vue'
import Zone from './views/Zone.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/factions/:faction',
      name: 'faction',
      component: Faction
    },
    {
      path: '/races/:race',
      name: 'race',
      component: Race
    },
    {
      path: '/classes/:wow_class',
      name: 'class',
      component: Class
    },
    {
      path: '/spells/:tipo',
      name: 'spells',
      component: Spells
    },
    {
      path: '/zones/:tipo',
      name: 'zones',
      component: Zones
    },
    {
      path: '/zone/:mode/:zone',
      name: 'zone',
      component: Zone
    }
  ]
})
