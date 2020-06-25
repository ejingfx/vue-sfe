<template>
  <form class="form" action="" method="post" novalidate @submit.prevent="$event.preventDefault()">
    <div class="form__container">
      <div class="form__block">
        <h2 class="heading heading--md">LOGIN</h2>
      </div>

      <div class="form__block">
        <EmailInput
          label="email"
          type="email"
          name="email"
        />
      </div>

      <div class="form__block">
        <PasswordInput
          label="password"
          type="password"
          name="password"
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

export default {
  name: 'login-form',
  components: {
    EmailInput: Input,
    PasswordInput: Input,
    Button
  },
  data () {
    return {
      test: '',
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
    }
  },
  computed: {
    getTest () { return this.test }
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
