import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/pages/Home'
import Post from './views/pages/Post'
import NewPost from './views/pages/NewPost'
import _ from 'lodash'
import store from './store'
const ls = window.localStorage

Vue.use(Router)

const routes = [
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
    meta: { isAuth: 'asdfadf' },
    component: NewPost
  },
  {
    path: '/:id',
    name: 'post-detail',
    match: true,
    component: Post
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(getIsAuth())
  if (to.name === 'post-detail' && _.isNaN(parseInt(to.params.id))) next(routes[0])
  else next()
})

async function getIsAuth () {
  if (_.isEmpty(ls.getItem('sfe'))) {
    ls.setItem('sfe', await JSON.stringify({ isAuth: false, user: {} }))
  } else {
    console.log('dispatch')
    store.dispatch('INIT', await JSON.parse(ls.getItem('sfe')))
  }

  let promise = await new Promise((resolve) => {
    resolve(store.getters.isAuth)
  })

  return promise()
}

export default router
