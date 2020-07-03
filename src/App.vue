<template>
  <div id="app">
    <Header
      @login="showLoginForm = true; if (showRegisterForm) { showRegisterForm = false }"
      @register="showRegisterForm = true; if (showLoginForm) { showLoginForm = false }"
      @show="showForm()"
      @close="closeForm()"
    />

    <router-view />

    <Footer />

    <Modal
      v-if="showLoginForm"
    >
      <LoginForm
        slot="form"
        @register="showRegisterForm = true; if (showLoginForm) { showLoginForm = false }"
        @close="closeForm()"
      />
    </Modal>

    <Modal
      v-if="showRegisterForm"
    >
      <RegisterForm
        slot="form"
        @login="showLoginForm = true; if (showRegisterForm) { showRegisterForm = false }"
        @close="closeForm()"
       />
    </Modal>
  </div>
</template>

<script>
import Header from './views/components/Header'
import Footer from './views/components/Footer'
import Modal from './views/components/Modal'
import LoginForm from './views/components/LoginForm'
import RegisterForm from './views/components/RegisterForm'
import _ from 'lodash'
const ls = window.localStorage

export default {
  name: 'app',
  data () {
    return {
      showLoginForm: false,
      showRegisterForm: false
    }
  },
  components: {
    Footer,
    Header,
    Modal,
    LoginForm,
    RegisterForm
  },
  methods: {
    closeForm () {
      this.showLoginForm = false
      this.showRegisterForm = false
    },
    showForm () {
      if (!this.showLoginForm) this.showLoginForm = true
    }
  },
  async created () {
    if (_.isEmpty(ls.getItem('sfe'))) {
      ls.setItem('sfe', await JSON.stringify({ isAuth: false, user: {} }))
    } else {
      this.$store.dispatch('INIT', await JSON.parse(ls.getItem('sfe')))
    }
  },
  computed: {
    getShowLoginForm () { return this.showLoginForm },
    getShowRegisterForm () { return this.showRegisterForm }
  }
}
</script>

<style lang="scss" src="./style/app.scss"></style>
<style lang="scss" scoped>
#app {
  padding-top: 104px;
}
</style>
