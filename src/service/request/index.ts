import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequesConfig } from './type'
// import { ElLoading } from 'element-plus'
// 使用loading需要单独引入loading样式
import 'element-plus/theme-chalk/el-loading.css'
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors

  constructor(config: HYRequesConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    this.interceptors = config.interceptors
    // 使用拦截器

    // 1.从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorsCath
    )
    this.instance.interceptors.response.use(
      this.interceptors?.reponseInterceptor,
      this.interceptors?.reponseInterceptorsCath
    )

    //  2.添加所有实例都有的公共拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器:请求拦截成功')

        // element-plus里的loading
        // const loadingInstance = ElLoading.service({
        //   lock: true,
        //   body: true,
        //   text: '加载中...',
        //   background: 'rgba(0, 0, 0, 0.5)'
        // })
        // setTimeout(() => {
        //   // 关闭全局Loading
        //   loadingInstance.close()
        // }, 1000)

        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器:请求拦截失败')

        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的拦截器:响应拦截成功')

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // console.log('所有实例都有的拦截器:响应拦截成功')
        // 一般判断不同的错误返回不同的信息用 switch 比较方便
        if (err.response.status == 404) {
          console.log('404错误!!!')
        }
        return err
      }
    )
  }

  request(config: HYRequesConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.reponseInterceptor) {
        res = config.interceptors.reponseInterceptor(res)
        return res
      }

      // console.log(res)
    })
  }
}

export default HYRequest
