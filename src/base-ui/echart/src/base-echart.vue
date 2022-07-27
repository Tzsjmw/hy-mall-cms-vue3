<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
// echarts中的类型
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义props   要先导入defineProps 在<>里写代表是ts的类型
// withDefaults  第一个参数放props,第二个参数放默认值
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    // 默认值
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)

  // 当数据发生改变重新设置
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
