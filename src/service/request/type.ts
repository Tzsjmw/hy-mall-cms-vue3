import type { AxiosRequestConfig, AxiosResponse } from 'axios'
export interface HYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCath?: (erro: any) => any
  reponseInterceptor?: (res: AxiosResponse) => AxiosResponse
  reponseInterceptorsCath?: (erro: any) => any
}

export interface HYRequesConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors
}
