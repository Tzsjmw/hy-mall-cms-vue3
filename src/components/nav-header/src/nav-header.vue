<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="isFoldClick"
      ><component :is="isFold ? iconNames[0] : iconNames[1]"></component>
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, { emit }) {
    // 1.折叠相关逻辑
    const isFold = ref(false)
    const iconNames = ['Fold', 'Expand']
    const isFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      iconNames,
      isFoldClick
    }
  }
})
</script>

<style scoped>
.fold-menu {
  font-size: 30px;
  cursor: pointer;
}
</style>
