<template>
  <header class="header">
    <div class="container clearfix">
      <div class="header__left">
        <router-link
          class="header__logo"
          to="/"
        >
          <Logo />
        </router-link>
      </div>

      <div class="header__right">
        <button
          class="header__btn"
          type="button"
          v-if="!getCredentials.isAuth"
          @click="toggle()"
        >
          <span v-if="!getShowLoginForm" class="header__btn-text">LOGIN</span>
          <span v-else class="header__btn-text">CLOSE</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '../components/Logo'
import { mapGetters } from 'vuex'

export default {
  name: 'app-header',
  components: {
    Logo
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    toggle () {
      if (this.showModal) {
        this.showModal = false
        return this.$emit('closeLoginForm')
      } else {
        this.showModal = true
        return this.$emit('login')
      }
    }
  },
  computed: {
    ...mapGetters(['getIsAuth', 'getUser']),
    getCredentials () {
      return {
        isAuth: this.getIsAuth,
        user: this.getUser
      }
    },
    getShowLoginForm () { return this.showModal }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 35px 0;
  z-index: $z-max + 3;
  border-bottom: 1px solid red;
}
.header__left {
  float: left;
}
.header__logo {
  display: inline-block;
}
.header__right {
  text-align: right;
  float: right;
  font-family: $montserrat;
  font-weight: 700;
}
.header__btn {
  display: inline-block;
  background-color: transparent;
  border: 0;
  outline: none;
}
.header__btn-text {
  font-family: $montserrat;
  font-size: 18px;
  color: $color-black;
}
</style>
