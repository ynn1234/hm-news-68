import Vue from 'vue'
import App from './App.vue'

// 引入样式
import './styles/bass.less'
import './styles/iconfont.css'
import router from './router'
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
import HmHeader from './components/HmHeader.vue'
import Logo from './components/Logo.vue'
import NavBar from './components/NavBar.vue'
import moment from 'moment'

// 引入 ampe-flexible
import 'amfe-flexible'
// 引入之后html的fontsize 会设置为实际屏幕宽度的1/10
import axios from 'axios'

Vue.use(Toast)

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  // 在发送请求之前做些什么
  // localStorage有token就将token添加到请求头中
  if (token) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
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
Vue.use(Vant)

// 注册全局组件
Vue.component('Hmheader', HmHeader)
Vue.component('logo', Logo)
Vue.component('nav-bar', NavBar)

Vue.config.productionTip = false
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
