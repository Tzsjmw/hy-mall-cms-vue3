import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// Vuex
import store from './store'
// element-plus 全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

createApp(App).use(router).use(store).mount('#app')
