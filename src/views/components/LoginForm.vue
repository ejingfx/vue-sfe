<template>
  <form
    class="form"
    action=""
    method="post"
    novalidate
    @submit.prevent="submit()"
  >
    <div class="form__container">
      <div class="form__block">
        <h2 class="heading heading--md">LOGIN</h2>
      </div>

      <div class="form__block">
        <EmailInput
          label="email"
          type="email"
          name="email"
          :modifier="formModifier($v.form.email)"
          v-model.trim="$v.form.email.$model"
          @blur="$v.form.email.$touch()"
        />
      </div>

      <div class="form__block">
        <PasswordInput
          label="password"
          type="password"
          name="password"
          :modifier="formModifier($v.form.password)"
          v-model.trim="$v.form.password.$model"
          @blur="$v.form.password.$touch()"
        />
      </div>

      <div class="form__block">
        <Button
          text="LOGIN"
          modifier="btn--fluid"
          type="submit"
          @click.native="submit($event)"
        />
      </div>

      <div class="form__info">
        <p>No account yet? <strong @click="$emit('register')">REGISTER HERE</strong></p>
      </div>
    </div>
  </form>
</template>

<script>
import Input from './Input'
import Button from './Button'
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  name: 'login-form',
  components: {
    EmailInput: Input,
    PasswordInput: Input,
    Button
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    formModifier (validation) {
      return {
        'input--error': validation.$error,
        'input--dirty': validation.$dirty
      }
    },
    submit (event) {
      event.preventDefault()

      if (!this.$v.$invalid) {
        console.log('submit')
      }
    }
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: block;
}
.form__container {
  display: block;
  margin: 0 auto;
  max-width: 460px;
}
.form__block {
  display: block;
  text-align: left;
  &:first-child {
    margin-bottom: 37px;
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.form__info {
  display: block;
  font-family: $montserrat;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin-top: 36px;
  text-align: center;

  strong {
    text-decoration: none;
    font-weight: 700;
    color: $color-black;
    transition: color $duration $easing;
    cursor: pointer;

    &:hover {
      color: $color-black-hover;
    }
  }
}
</style>
