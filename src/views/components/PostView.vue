<template>
  <div class="post-view">
    <div class="post__actions clearfix">
      <button
        class="post__btn"
        type="button"
        v-if="getIsAuth"
        @click="$emit('toggle')"
      >
        <span class="post__btn-text">Edit Post</span>
      </button>
    </div>

    <div class="post__heading clearfix">
        <time class="post__date" :datetime="post.createdAt | format_datetime">{{ post.createdAt | format_date }}</time>
        <h1 class="post__title">{{ post.title }}</h1>
    </div>

    <div
      class="post__image"
      v-if="!isNull(post.image)"
    >
      <div :style="{ backgroundImage: `url(${post.image})` }"></div>
    </div>

    <div class="post__content">
      {{ post.content }}
    </div>

    <div class="post__footer">
      <div class="post__footer-heading">
        <h2 class="heading heading--xl">COMMENT</h2>
      </div>

      <ul class="post__comment-list">
        <li
          class="post__comment--item"
          v-for="comment in post.comments"
          :key="comment.id"
        >
          <Comment :comment="comment">
            <h3 slot="content" class="comment__content">{{ comment.content }}</h3>
          </Comment>
        </li>
      </ul>

      <div class="post__comment-form">
        <CommentForm :id="post.id"/>
      </div>

    </div>
  </div>
</template>

<script>
import Comment from './Comment'
import CommentForm from './CommentForm'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'post-view',
  props: ['post'],
  components: {
    Comment,
    CommentForm
  },
  methods: {
    isNull (data) {
      return _.isNull(data) || data === ''
    }
  },
  computed: {
    ...mapGetters(['getIsAuth'])
  }
}
</script>

<style lang="scss" scoped>
.post__comment-form {
  padding-bottom: 150px;
}
</style>
