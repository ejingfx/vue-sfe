<template>
  <div class="post__update-form">
    <div class="post__actions clearfix">
      <button
        class="post__btn"
        type="button"
        @click="$emit('save'); save()"
      >
        <span class="post__btn-text">Save Post</span>
      </button>
      <button
        class="post__btn"
        type="button"
        @click="$emit('toggle')"
      >
        <span class="post__btn-text">Cancel</span>
      </button>
    </div>

    <div class="post__heading clearfix">
      <time class="post__date" :datetime="post.createdAt | format_datetime">{{ post.createdAt | format_date }}</time>
      <h1
        class="post__title post__title--edit"
        contenteditable
        placeholder="Title"
        id="title"
        @input="updateField($event, 'title')"
        @blur="$v.form.title.$touch()"
      >{{ post.title }}</h1>
    </div>
    <!-- <div -->
    <!--   class="post__image" -->
    <!--   v&#45;if="!isNull(post.image)" -->
    <!-- > -->
    <!--   <div :style="{ backgroundImage: `url(${post.image})` }"></div> -->
    <!-- </div> -->
    <div class="post__upload">
      <label for="upload" class="upload">
        <input class="upload__input" type="file" accept="image/*" id="upload" name="upload" @change="fileChange($event)">
        <div class="upload__preview">
          <div class="upload__preview-img uploads" v-show="getPreview" id="preview"></div>
          <div class="upload__preview-img" v-show="!getPreview" :style="{ backgroundImage: `url(${post.image})` }"></div>
        </div>

        <div class="upload__btn">
          <span>UPLOAD IMAGE</span>
        </div>
      </label>
    </div>

    <div
      class="post__content post__content--edit"
      contenteditable
      placeholder="Content"
      @input="updateField($event, 'content')"
      @blur="$v.form.content.$touch()"
    >{{ post.content }}</div>

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
    </div>
    <div class="post__comment-form">
      <CommentForm :id="post.id" @addComment="$emit('addComment')" />
    </div>
  </div>
</template>

<script>
import CommentForm from './CommentForm'
import Comment from './Comment'
import { required } from 'vuelidate/lib/validators'
import _ from 'lodash'
import { UPDATE_POST } from '../../graphql'

export default {
  name: 'update-post',
  props: ['post'],
  components: {
    Comment,
    CommentForm
  },
  data () {
    return {
      preview: false,
      form: {}
    }
  },
  validations: {
    form: {
      id: {},
      title: {
        required
      },
      content: {}
    }
  },
  methods: {
    isNull (data) {
      return _.isNull(data) || data === ''
    },
    fileChange (e) {
      const reader = new FileReader()
      reader.onload = function () {
        document.getElementById('upload').src = reader.result
        document.getElementById('preview')
          .setAttribute('style', `background-image: url(${reader.result})`)
      }

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
        this.preview = true
      }
    },
    updateField (e, field) {
      this.form[field] = e.target.textContent
    },
    async save () {
      if (!this.$v.form.$invalid) {
        await this.$apollo.mutate({
          mutation: UPDATE_POST,
          variables: {
            post: {
              id: this.getForm.id,
              title: this.getForm.title,
              content: this.getForm.content,
              image: this.getForm.image
            }
          }
        })
          .then((res) => { console.log(res) })
          .catch((err) => { console.log(err) })
      }
    }
  },
  computed: {
    getForm () { return this.form },
    getPreview () { return this.preview },
    getUpload () { return this.upload }
  },
  created () {
    this.form = this.post
  }
}
</script>
