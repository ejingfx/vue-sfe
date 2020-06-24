import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    heroPosts: [],
    posts: [],
    user: {}
  },
  getters: {
    getAllPosts: state => state.posts,
    getHeroPosts: state => state.heroPosts
  },
  actions: {
    async CREATE_POST (context, data) {
      context.commit('createPost', await data)
    },
    async INIT_HERO_POSTS (context, data) {
      context.commit('initHeroPosts', await data)
    },
    async LOAD_MORE_POSTS (context, data) {
      context.commit('loadMorePosts', await data)
    },
    async INIT_POSTS (context, data) {
      console.log('actions', data)
      context.commit('initPosts', await data)
    }
  },
  mutations: {
    createPost (state, payload) {
      state.posts.push(payload)
    },
    initHeroPosts (state, payload) {
      state.initHeroPosts.push(...payload)
    },
    loadMorePosts (state, payload) {
      state.posts.push(...payload)
    },
    initPosts (state, payload) {
      console.log('mutations', payload)
      state.posts.push(payload)
    }

  }
})
