import { createApp } from 'vue'
// import { registerApp } from './global'
import App from './App.vue'
// 路由
import router from './router'
// Vuex
import store from './store'
// axios
// import './service/axios_demo'
import hyRequest from './service'
// element-plus 全局引用
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

// Normalize.css   安装npm install normalize.css
import 'normalize.css'
import './assets/css/index.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

import * as ElIconModules from '@element-plus/icons-vue'

// 统一注册Icon图标
for (const iconName in ElIconModules) {
  if (Reflect.has(ElIconModules, iconName)) {
    const item = ElIconModules[iconName]
    app.component(iconName, item)
  }
}
// 根据不同的环境设置不同的环境变量
// console.log(VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
// 拦截器
// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     reponseInterceptor: (res) => {
//       console.log('单独响应的reponse')
//       return res
//     }
//   }
// })

hyRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
