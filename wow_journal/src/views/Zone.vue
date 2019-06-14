<template>
  <Zone :zone="$route.params.zone" :mode="$route.params.mode" />
</template>

<script>
import Zone from '@/components/Zone.vue'

export default {
  components: {
    Zone
  }
}
</script>
