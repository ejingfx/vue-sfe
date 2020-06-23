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
        LOGIN
      </div>
    </div>
  </header>
</template>

<script>
import Logo from '../components/Logo'

export default {
  name: 'app-header',
  components: {
    Logo
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
  border-bottom: 1px solid red;
  z-index: $z-max + 2;
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
</style>
