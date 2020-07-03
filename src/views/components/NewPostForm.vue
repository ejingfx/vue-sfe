<template>
  <div class="post__create-form">
    <div class="post__actions clearfix">
      <button
        class="post__btn"
        type="button"
        @click="$emit('save'); save($event)"
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

    <div class="post__form">
      <form
        class="form form--post"
        action="/"
        novalidate
        @submit.prevent="submit($event)"
      >
        <div class="form__block">
          <time class="post__date" :datetime="new Date() | format_datetime">{{ new Date() | format_date }}</time>
          <Title
            placeholder="Title"
            modifier="textarea--title"
            v-model="$v.form.title.$model"
            @blur="$v.form.title.$touch()"
          />
        </div>
        <div class="form__block">
          <Textarea
            placeholder="Content"
            modifier="textarea--new-form"
            v-model="$v.form.content.$model"
            @blur="$v.form.content.$touch()"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Textarea from '../components/Textarea'
import { required } from 'vuelidate/lib/validators'
import { ADD_POST } from '../../graphql'

export default {
  name: 'new-form',
  components: {
    Title: Textarea,
    Textarea
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        image: '',
        comments: []
      }
    }
  },
  validations: {
    form: {
      title: { required },
      content: { required }
    }
  },
  methods: {
    reset () {
      this.form = {
        title: '',
        content: '',
        image: '',
        comments: []
      }
    },
    async save (e) {
      e.preventDefault()
      if (!this.$v.form.$invalid) {
        console.log('submit', this.getForm)
        await this.$apollo.mutate({
          mutation: ADD_POST,
          variables: {
            post: {
              title: 'this title',
              content: 'this content',
              image: ''
            }
          }
        })
          .then((res) => {
            console.log('posted!', res.data)
            this.reset()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  computed: {
    getForm () { return this.form }
  }
}
</script>

<style lang="scss" scoped>
.post__form {
}
</style>
