<template>
  <div class="">
    <Hero />
    <News />
  </div>
</template>

<script>
import Hero from '../components/Hero'
import News from '../components/News'

export default {
  name: 'home',
  components: {
    Hero,
    News
  }
}
</script>
