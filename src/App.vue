<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $store: any
//   }
// }

export default defineComponent({
  name: 'App',
  components: {
    // ElButton
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
