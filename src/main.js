import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2Filters from 'vue2-filters'
import mixins from './mixins'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './filters'

const httpLink = new HttpLink({
  uri: process.env.VUE_APP_API_URL
})
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false
Vue.use(VueApollo)
Vue.use(Vue2Filters)
Vue.use(mixins)

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')