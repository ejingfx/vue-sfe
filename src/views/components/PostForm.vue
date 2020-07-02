<template>
  <div class="post-view">
    <div class="post__actions clearfix">
      <button
        class="post__btn"
        type="button"
        v-if="getIsAuth"
        @click="$emit('save'); save()"
      >
        <span class="post__btn-text">Save Post</span>
      </button>
      <button
        class="post__btn"
        type="button"
        v-if="getIsAuth"
        @click="$emit('cancel'); cancel()"
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

      <div class="post__comment-form">
        <CommentForm
          :id="post.id"
          @addComment="$emit('addComment')"
        />
      </div>

    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { mapGetters } from 'vuex'
// import { required } from 'vuelidate/lib/validators'
import { UPDATE } from '../../graphql'

export default {
  name: 'post-form',
  props: ['post', 'edit'],
  components: {
    Comment,
    CommentForm
  },
  data () {
    return {
      test: '',
      preview: false,
      upload: '',
      form: {}
    }
  },
  validations: {
    form: {
      id: {
      },
      title: {
      },
      content: {},
      createdAt: {},
      comments: {}
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
    cancel () {
      console.log('cancel')
    },
    async save () {
      console.log('submit...', this.$v.form.$invalid, this.$v.form)

      if (!this.$v.form.$invalid) {
        this.form.id = this.post.id
        this.form.image = document.getElementById('upload').src
        this.form.createdAt = this.post.createdAt
        this.form.comments = this.post.comments
        console.log('form', this.form)

        await this.$apollo.mutate({
          mutation: UPDATE,
          variables: {
            id: this.post.id,
            title: this.post.title,
            content: this.getForm.content,
            image: this.form.image,
            createdAt: this.getForm.createdAt,
            comments: this.getForm.comments
          }
        })
          .then((res) => {
            console.log(res.data.post)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    ...mapGetters(['getIsAuth']),
    getForm () { return this.form },
    getPreview () { return this.preview },
    getUpload () { return this.upload }
  },
  created () {
    this.form = this.post
  }
}
</script>
