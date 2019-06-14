<template>
  <Spells :tipo="$route.params.tipo" />
</template>

<script>
import Spells from '@/components/Spells.vue'

export default {
  components: {
    Spells
  }
}
</script>
