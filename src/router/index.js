import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyCollect from '../views/user/MyCollect.vue'

// 首页
import Index from '../views/news/Index.vue'
import PostDetai from '../views/news/PostDetail.vue'
import MyColumn from '../views/news/MyColumn.vue'
import Search from '../views/news/Search.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/useredit', component: UserEdit, name: 'useredit' },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/mycomment', component: MyComment, name: 'mycomment' },
  { path: '/mycollect', component: MyCollect, name: 'mycollect' },
  { path: '/', component: Index, name: 'index' },
  { path: '/mycolumn', component: MyColumn, name: 'mycolumn' },
  { path: '/postdetail/:id', component: PostDetai, name: 'postdetail' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes
  // history地址栏不带有#
  // mode: 'history'
})

// 全局的把push的异常给处理了
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach(function(to, from, next) {
  // 需要拦截的所有的页面
  const authUrls = [
    '/user',
    '/useredit',
    '/myfollow',
    '/mycomment',
    '/mycollect'
  ]
  // if (!authUrls.includes(to.path) || token) {
  //   next()
  // } else {
  //   router.push('/login')
  // }
  // if (authUrls.includes(to.name))
  if (!authUrls.includes(to.path) || localStorage.getItem('token')) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
