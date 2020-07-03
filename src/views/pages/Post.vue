<template>
  <div class="post">
    <Breadcrumb :slugs="getSlugs"/>

    <div class="post__body">
      <div class="container">
        <PostView v-if="!getEdit"
          :post="getPost"
          @toggle="toggle()"
          @addComment="fetchPost()"
        />
        <PostForm v-else-if="getEdit && getIsAuth"
          :edit="getEdit"
          :post="getPost"
          @toggle="toggle()"
          @addComment="fetchPost()"
          @save="save()"
          @cancel="edit = false"
        />
      </div>
    </div>

  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import PostForm from '../components/PostForm'
import PostView from '../components/PostView'
import { GET_POST } from '../../graphql'
import { mapGetters } from 'vuex'

export default {
  name: 'post',
  components: {
    Breadcrumb,
    PostView,
    PostForm
  },
  data () {
    return {
      edit: false,
      init: {},
      post: {},
      slugs: []
    }
  },
  methods: {
    async fetchPost () {
      await this.$apollo.query({
        query: GET_POST,
        fetchPolicy: 'no-cache',
        variables: {
          id: parseInt(this.$route.params.id)
        }
      })
        .then((res) => {
          this.post = res.data.post
          this.slugs = [{ url: res.data.post.id, text: res.data.post.title }]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    toggle () {
      if (!this.edit) {
        this.edit = true
      } else {
        this.edit = false
      }
    },
    save () {
      console.log('save')
    }
  },
  computed: {
    ...mapGetters(['getIsAuth']),
    getEdit () { return this.edit },
    getPost () { return this.post },
    getSlugs () { return this.slugs }
  },
  created () {
    this.fetchPost()
  }
}
</script>

<style lang="scss" scoped>
.post {
  display: block;
}
/* .post__container {} */
.post__image {
  display: block;

  div {
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding-top: 48.21%
  }
}
.post__date {
  font-family: $montserrat;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.2em;
}
.post__content {
  line-height: 2.5;
  padding: 50px 0 125px;
  border-bottom: 1px solid $color-grey;
}
.post__body {
  padding-top: 60px;
}
</style>
