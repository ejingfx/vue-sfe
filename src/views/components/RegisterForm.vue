<template>
  <form class="form" action="" method="post" novalidate @submit.prevent="$event.preventDefault()">
    <div class="form__container">
      <div class="form__block">
        <h2 class="heading heading--md">REGISTER</h2>
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
        <ConfirmInput
          label="confirm password"
          type="password"
          name="confirm"
          :modifier="formModifier($v.form.confirm)"
          v-model.trim="$v.form.confirm.$model"
          @blur="$v.form.confirm.$touch()"
        />
      </div>

      <div class="form__block">
        <Button
          text="REGISTER"
          modifier="btn--fluid"
          type="submit"
          @click.native="submit($event)"
        />
      </div>

      <div class="form__info">
        <p>Already have an account? <strong @click="$emit('login')">LOGIN HERE</strong></p>
      </div>
    </div>
  </form>
</template>

<script>
import Input from './Input'
import Button from './Button'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
import { REGISTER, AUTHENTICATE } from '../../graphql'

export default {
  name: 'login-form',
  components: {
    EmailInput: Input,
    PasswordInput: Input,
    ConfirmInput: Input,
    Button
  },
  data () {
    return {
      form: {
        email: '',
        confirm: '',
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
      },
      confirm: {
        required,
        sameAsPassword: sameAs('password')
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
    login (email, password) {
      this.$apollo.mutate({
        mutation: AUTHENTICATE,
        variables: {
          email,
          password
        }
      })
        .then((res) => {
          const data = {
            email: this.form.email,
            token: res.data.authenticate
          }
          this.$store.dispatch('AUTHENTICATE', data)
          this.$emit('close')
        })
    },
    submit (event) {
      event.preventDefault()

      if (!this.$v.$invalid) {
        console.log('submit')

        this.$apollo.mutate({
          mutation: REGISTER,
          variables: {
            email: this.form.email,
            password: this.form.password
          }
        })
          .then((res) => {
            if (res.data.register) this.login(this.form.email, this.form.password)
          })
          .catch((err) => {
            console.log('error', err)
          })
      }
    }
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
