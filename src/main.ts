import { createApp } from 'vue'
import { globalRegister } from './global'
import App from './App.vue'
// 路由
import router from './router'
// Vuex
import store from './store'
// Normalize.css   安装npm install normalize.css
import 'normalize.css'
import './assets/css/index.css'

import { setupStore } from './store'

const app = createApp(App)
app.use(store)
setupStore()
app.use(router)
app.use(globalRegister)
app.mount('#app')

import * as ElIconModules from '@element-plus/icons-vue'

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}

// 使用了volar插件，vue注册全局filters属性却不能被ts正常检测
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: any
  }
}
