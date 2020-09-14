import Vue from 'vue'
import App from './App.vue'
// 引入全局组件
import './utils/global'
// 引入vant
import './utils/vant'
// 引入过滤器
import './utils/filter'
// 引入请求
import './utils/request'
// 引入样式
import './styles/bass.less'
import './styles/iconfont.css'
// 引入路由
import router from './router'

// 引入 ampe-flexible  用于rem适配  配合postcss
import 'amfe-flexible'
// 引入之后html的fontsize 会设置为实际屏幕宽度的1/10

Vue.config.productionTip = false
const bus = new Vue()
Vue.prototype.$bus = bus
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
