import axios from "axios"
import qs from 'qs'

import { CurrentApiDomain, ApiBasename } from "../configs/api"

const http = axios.create()

http.defaults.baseURL = `${CurrentApiDomain}${ApiBasename}`

// 请求拦截
http.interceptors.request.use(config => {
  if (config.method === "post") config.data = qs.stringify(config.data) // 对json格式重排成 key1=val1&key2=val2
  if (localStorage.token) config.headers.Authorization
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
http.interceptors.response.use(res => {
  return res
}, err => {
  return Promise.reject(err)
})

export const request = (config) => {
  return http(config)
}