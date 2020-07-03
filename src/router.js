import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/pages/Home'
import Post from './views/pages/Post'
import NewPost from './views/pages/NewPost'
import NotFound from './views/pages/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      match: true,
      component: Home
    },
    {
      path: '/new',
      name: 'new-post',
      match: true,
      component: NewPost
    },
    {
      path: '/:id',
      name: 'post-detail',
      match: true,
      component: Post
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
