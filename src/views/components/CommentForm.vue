<template>
  <form
    class="comment-form"
    action="/"
    novalidate
    @submit.prevent="$emit('addComment'); submit($event)"
  >
    <div class="comment-form__block">
{{ $v.comment }}
      <Textarea
        placeholder="Write Comment"
        modifier="textarea--comment-form"
        name="comment"
        id="comment"
        v-model="$v.comment.$model"
        @blur="$v.form.comment.$touch()"
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

export default {
  name: 'comment-form',
  props: ['post'],
  components: {
    Textarea,
    Button
  },
  data () {
    return {
      comment: {},
      form: {}
    }
  },
  validations: {
    form: {},
    comment: {
      required
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      console.log('comment', this.$v.comment.$invalid)
    }
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
.comment-form__ {}
.comment-form__ {}
.comment-form__ {}
.comment-form__ {}
</style>
