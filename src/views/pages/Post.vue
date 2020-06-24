<template>
  <div class="post">
    <Breadcrumb :slugs="getSlugs"/>

    <div class="post__body">
      <div class="container">
        <div class="post__actions clearfix"></div>

        <div class="post__heading clearfix">
          <time class="post__date" :datetime="getPost.createdAt | format_datetime">{{ getPost.createdAt | format_date }}</time>
          <h1 class="post__title">{{ getPost.title }}</h1>
        </div>

        <div
          class="post__image"
          v-if="!isNull(post.image)"
        >
          <div :style="{ backgroundImage: `url(${post.image})` }"></div>
        </div>

        <div class="post__content">
          {{ getPost.content }}
        </div>

        <div class="post__footer">
          <h2 class="heading heading--xl">COMMENT</h2>

          <ul class="post__comment-list">
            <li
              class="post__comment--item"
              v-for="comment in getPost.comments"
              :key="comment.id"
            >
              <Comment :comment="comment">
                <h3 slot="content" class="comment__content">{{ comment.content }}</h3>
              </Comment>
            </li>
          </ul>

          <div class="post__comment-form">
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import Comment from '../components/Comment'
import _ from 'lodash'
import { GET_POST } from '../../graphql'

export default {
  name: 'post',
  components: {
    Breadcrumb,
    Comment
  },
  data () {
    return {
      post: {},
      slugs: []
    }
  },
  apollo: {
    post: {
      query: GET_POST,
      update: data => data.post,
      variables () {
        return {
          id: parseInt(this.$route.params.id)
        }
      }
    }
  },
  watch: {
    post () {
      console.log('change', this.getPost)
      const slugs = [
        {
          url: '#',
          text: this.getPost.title
        }
      ]
      this.slugs.push(...slugs)
    }
  },
  methods: {
    isNull (data) {
      return _.isNull(data) || data === ''
    }
  },
  computed: {
    getPost () { return this.post },
    getSlugs () { return this.slugs }
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
.post__actions {
  display: block;
  min-height: 30px;
}
.post__heading {
  padding-top: 30px;
  padding-bottom: 12px;
}
.post__title {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: 0.1em;
}
.post__footer-title {
  font-family: $montserrat;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: 0.1em;
}
</style>
