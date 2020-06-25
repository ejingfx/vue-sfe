import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    isAuth: false,
    heroPosts: [],
    posts: [],
    user: {}
  },
  getters: {
    getIsAuth: state => state.isAuth,
    getUser: state => state.user,
    getPosts: state => state.posts,
    getHeroPosts: state => state.heroPosts
  },
  actions: {
    async AUTHENTICATE (context, data) {
      context.commit('auth', await data)
    },
    async ADD_HERO_POSTS (context, data) {
      context.commit('addHeroPosts', await data)
    },
    async ADD_POSTS (context, data) {
      context.commit('addPosts', await data)
    },
    async CREATE_POST (context, data) {
      context.commit('createPost', await data)
    },
    async INIT_USER (context, data) {
      context.commit('initUser', await data)
    }
  },
  mutations: {
    authenticate (state, payload) {
      state.user = payload
      state.isAuth = true
    },
    addHeroPosts (state, payload) {
      state.initHeroPosts.push(...payload)
    },
    addPosts (state, payload) {
      state.posts.push(...payload)
    },
    createPost (state, payload) {
      state.posts.push(payload)
    },
    initUser (state, payload) {
      state.user = payload
    }
  }
})
