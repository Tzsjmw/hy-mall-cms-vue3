import * as echarts from 'echarts'

// 注册地图
import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el, 'light', { renderer: 'svg' })

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 监听浏览器宽度自动改变echarts图形大小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  // 左边菜单栏缩放时重新调用
  const updateSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
