<template>
  <Race :race="$route.params.race" />
</template>

<script>
import Race from '@/components/Race.vue'

export default {
  components: {
    Race
  }
}
</script>
