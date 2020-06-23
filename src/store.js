import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    articles: [],
    user: {}
  },
  getters: {
    getAllArticles: state => state.articles
  },
  mutations: {
    createArticle (state, payload) {
      state.articles.push(payload)
    },
    initArticles (state, payload) {
      state.articles.push(...payload)
    }
  },
  actions: {
    async INIT_ARTICLES (context, data) {
      context.commit('initArticles', await data)
    },
    async CREATE_ARTICLE (context, data) {
      context.commit('createArticle', await data)
    }
  }
})
