<template>
  <Faction :faction="$route.params.faction" />
</template>

<script>
import Faction from '@/components/Faction.vue'

export default {
  components: {
    Faction
  }
}
</script>
