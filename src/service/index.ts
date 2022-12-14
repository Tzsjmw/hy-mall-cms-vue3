//servie统一出口
import { AxiosRequestConfig } from 'axios'
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
interface YXRequestConfig extends AxiosRequestConfig {
  interceptors?: any
  headers?: any
}

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // requestInterceptor(config) {
    //   // 携带token的拦截
    //   const token = localStorage.getSave('token')

    //   if (config && config.headers) {
    //     config.headers.Authorization = `Bearer ${token}`
    //   }

    //   console.log('请求成功的拦截')
    //   return config
    // },
    requestInterceptor: (config: YXRequestConfig) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default hyRequest
