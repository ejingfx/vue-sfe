<template>
  <section class="news">
    <div class="news__container container">
      <h2 class="heading heading--xl">NEWS</h2>

      <div class="news__list">
        <ul class="row news__list-inner">
          <li
            class="col-lg--4 news__list-item"
            v-for="(post, i) in getPosts"
            :key="i"
          >
            <ArticleCard :post="post">
              <h2 slot="title" class="article-card__title">{{ post.title }}</h2>
            </ArticleCard>
          </li>
        </ul>
      </div>

      <div class="news__cta">
        <Button
          text="LOAD MORE"
          type="'button'"
          @click.native="loadMore($event)" />
      </div>
    </div>
  </section>
</template>

<script>
import ArticleCard from './ArticleCard'
import Button from './Button'
import { mapGetters } from 'vuex'
import { GET_PAGINATED_POSTS } from '../../graphql'

export default {
  name: 'news',
  components: {
    ArticleCard,
    Button
  },
  data () {
    return {
      max: false,
      pagination: {
        limit: 6,
        offset: 3
      }
    }
  },
  methods: {
    loadMore (event) {
      event.preventDefault()
      if (!this.getMax) {
        this.pagination.offset += 6
        this.fetchPosts()
      }
    },
    async fetchPosts (init = false) {
      await this.$apollo.query({
        query: GET_PAGINATED_POSTS,
        variables: {
          pagination: this.getPagination
        }
      })
        .then((response) => {
          this.$store.dispatch('ADD_POSTS', response.data.posts)
          if (!init && response.data.posts.length < 6) {
            this.max = true
          }
        })
    }
  },
  computed: {
    getMax () { return this.max },
    getPosts () { return this.posts },
    getPagination () { return this.pagination },
    ...mapGetters(['getPosts'])
  },
  created () {
    this.fetchPosts(true)
  }
}
</script>

<style lang="scss" scoped>
.news {
  display: block;
}
.news__list {
  margin: 0 -24px;
}
.news__list-inner {}
.news__list-item {
  padding: 0 24px;
  margin-bottom: 60px;
}
.news__cta {
  display: block;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;
}
</style>
