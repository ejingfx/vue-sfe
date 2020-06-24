<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from './views/components/Header'
import Footer from './views/components/Footer'

export default {
  name: 'app',
  components: {
    Footer,
    Header
  },
  created () {}
}
</script>

<style lang="scss" src="./style/app.scss"></style>
<style lang="scss" scoped>
#app {
  padding-top: 104px;
}
</style>
