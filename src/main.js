import Vue from 'vue'
import App from './App.vue'

// 引入样式
import './styles/bass.less'
import './styles/iconfont.css'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 ampe-flexible
import 'amfe-flexible'
// 引入之后html的fontsize 会设置为实际屏幕宽度的1/10

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
