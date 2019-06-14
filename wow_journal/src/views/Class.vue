<template>
  <Class :wow_class="$route.params.wow_class" />
</template>

<script>
import Class from '@/components/Class.vue'

export default {
  components: {
    Class
  }
}
</script>
