import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/pages/Home'
import Post from './views/pages/Post'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post/:id',
      name: 'post-detail',
      match: true,
      component: Post
    }
  ]
})
