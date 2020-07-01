<template>
  <div class="hero">
    <div class="hero__inner">
      <div class="row">
        <ul class="row">
          <li
            class="col-lg--4"
            v-for="post in getPosts"
            :key="post.id"
          >
            {{ post }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_PAGINATED_POSTS } from '../../graphql'

export default {
  name: 'hero',
  data () {
    return {
      posts: []
    }
  },
  apollo: {
    posts: {
      query: GET_PAGINATED_POSTS,
      variables: {
        pagination: {
          limit: 3,
          offset: 0
        }
      }
    }
  },
  computed: {
    getPosts () { return this.posts }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: table;
  vertical-align: middle;
  width: 100%;
  height: 100vh;
  border: 1px solid red;
}
.hero__inner {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
</style>
