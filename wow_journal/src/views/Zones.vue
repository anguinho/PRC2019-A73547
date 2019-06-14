<template>
  <Zones :tipo="$route.params.tipo" />
</template>

<script>
import Zones from '@/components/Zones.vue'

export default {
  components: {
    Zones
  }
}
</script>
