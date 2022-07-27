<template>
  <div class="chat">
    <wf-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import WfEditor from '@/base-ui/editor'

export default defineComponent({
  name: 'chat',
  components: {
    WfEditor
  },
  setup() {
    const htmlString = ref<string>('加油,一直学下去!!!!!!!')
    return {
      htmlString
    }
  }
})
</script>

<style scoped>
.chat {
  margin-top: 15px;
}
</style>
