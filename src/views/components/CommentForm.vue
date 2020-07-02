<template>
  <form
    class="comment-form"
    action="/"
    novalidate
    @submit.prevent="$emit('addComment'); submit($event)"
  >
    <div class="comment-form__block">
      <Textarea
        placeholder="Write Comment"
        :modifier="formModifier($v.form.content)"
        name="content"
        id="content"
        v-model.trim="$v.form.content.$model"
        @blur="$v.form.content.$touch()"
      />
    </div>

    <div class="comment-form__block">
      <Button
        type="submit"
        text="SUBMIT"
        modifier="btn btn--comment-submit"
      />
    </div>
  </form>
</template>

<script>
import Textarea from './Textarea'
import Button from './Button'
import { required } from 'vuelidate/lib/validators'
import { ADD_COMMENT, GET_POST } from '../../graphql'

export default {
  name: 'comment-form',
  props: ['id'],
  components: {
    Textarea,
    Button
  },
  data () {
    return {
      form: {
        postId: this.id,
        content: ''
      }
    }
  },
  validations: {
    form: {
      postId: { required },
      content: { required }
    }
  },
  watch: {
    id () {
      this.form.postId = this.id
    }
  },
  methods: {
    formModifier (validation) {
      return {
        'textarea--comment-form textarea--error': validation.$error,
        'textarea--comment-form textarea--dirty': validation.$dirty
      }
    },
    addComment () {
      this.$apollo.mutate({
        mutation: ADD_COMMENT,
        variables: {
          postId: this.getForm.postId,
          content: this.getForm.content
        }
      })
        .then((res) => {
          console.log('addComment', res.data)
          this.updateStore()
        })
    },
    updateStore () {
      this.$apollo.query({
        query: GET_POST,
        variables: {
          id: this.getForm.postId
        }
      })
        .then((res) => {
          console.log('updateStore', res.data.post)
          this.$store.dispatch('UPDATE_POST', res.data.post)
        })
    },
    submit (e) {
      e.preventDefault()
      if (!this.$v.form.$invalid) {
        this.addComment()
      }
    }
  },
  computed: {
    getForm () { return this.form }
  }
}
</script>

<style lang="scss" scoped>
.comment-form {
  display: block;
}
.comment-form__block {
  display: block;

  &:not(:last-child) {
    padding-bottom: 50px;
  }

  &:last-child {
    text-align: right;
  }
}
</style>
