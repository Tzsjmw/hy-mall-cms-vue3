<template>
  <div>
    <h2>{{ $store.state.name }}</h2>
    <router-link to="/login">登录</router-link>
    <router-link to="/main">首页</router-link>

    <router-view></router-view>
    <br />
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
    <el-checkbox label="Option 1" size="large" />
  </div>
</template>

<script lang="ts">
// 要让 TypeScript 正确推断 Vue 组件选项中的类型，需要使用 defineComponent 全局方法定义组件
import { defineComponent } from 'vue'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: any
  }
}
//手动引入样式
// import { ElButton } from 'element-plus'
// import 'element-plus/theme-chalk/el-button.css'
// import 'element-plus/theme-chalk/base.css'

export default defineComponent({
  name: 'App',
  components: {
    // ElButton
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
