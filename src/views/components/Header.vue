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
          v-if="getCredentials.isAuth"
          @click="logout()"
        >
          <span class="header__btn-text">LOGOUT</span>
        </button>

        <button
          class="header__btn"
          type="button"
          v-if="!getCredentials.isAuth"
          @click="toggle();"
        >
          <span class="header__btn-text">{{ getBtnText }}</span>
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
      showModal: false,
      btnText: 'LOGIN'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT')
      this.btnText = 'LOGIN'
      this.showModal = false
    },
    toggle () {
      if (!this.showModal) {
        this.showModal = true
        this.btnText = 'CLOSE'
        return this.$emit('show')
      } else {
        this.showModal = false
        this.btnText = 'LOGIN'
        return this.$emit('close')
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
    getShowModal () { return this.showModal },
    getBtnText () { return this.btnText }
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (this.showModal && e.keyCode === 27) {
        this.showModal = false
        this.btnText = 'LOGIN'
        this.$emit('close')
      }
    })
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
