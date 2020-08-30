import Vue from 'vue'
import App from './App.vue'

// 引入样式
import './styles/bass.less'
import './styles/iconfont.css'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import HmHeader from './components/HmHeader.vue'
import Logo from './components/Logo.vue'
import NavBar from './components/NavBar.vue'
import moment from 'moment'

// 引入 ampe-flexible
import 'amfe-flexible'
// 引入之后html的fontsize 会设置为实际屏幕宽度的1/10
import axios from 'axios'
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
