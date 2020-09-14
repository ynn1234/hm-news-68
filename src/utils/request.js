import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'
import router from '../router/index'
Vue.use(Toast)

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  // 在发送请求之前做些什么
  // localStorage有token就将token添加到请求头中
  if (token) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  const { statusCode, message } = response.data
  // 对响应数据做点什么
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1.提示失败信息
    Toast.fail(message)
    // 2.跳转到login
    router.push('/login')
    // 3.删除token和userId
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return response
})

// 将axios挂在到vue的原型上
Vue.prototype.$axios = axios
// 给axios配置基准地址
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$baseURL = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return 'http://localhost:3000' + url
  }
}
