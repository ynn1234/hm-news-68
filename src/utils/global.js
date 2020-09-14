// 用于注册全局组件
import Vue from 'vue'
import HmHeader from '../components/HmHeader.vue'
import Logo from '../components/Logo.vue'
import NavBar from '../components/NavBar.vue'
import MyPost from '../components/MyPost.vue'
import HmComment from '../components/HmComment.vue'
import HmFloor from '../components/HmFloor.vue'

Vue.component('Hmheader', HmHeader)
Vue.component('logo', Logo)
Vue.component('nav-bar', NavBar)
Vue.component('my-post', MyPost)
Vue.component('hm-comment', HmComment)
Vue.component('hm-floor', HmFloor)
