<template>
  <div class="hero">
    <div class="hero__inner">
      Hero
    </div>
  </div>
</template>

<script>
export default {
  name: 'hero',
  data () {
    return {
      posts: []
    }
  },
  computed: {
    getHeroPosts () { return this.posts }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: table;
  vertical-align: middle;
  width: 100%;
  height: 100vh;
}
.hero__inner {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
</style>
