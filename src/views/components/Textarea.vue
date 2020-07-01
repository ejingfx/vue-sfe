<template>
  <textarea
    class="textarea__tag"
    :class="modifier"
    :id="name"
    :name="name"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  ></textarea>
</template>

<script>
export default { name: 'form-textarea',
  props: ['modifier', 'name', 'value']
}
</script>

<style lang="scss" scoped>
.input {
  display: block;
  width: 100%;
}
.textarea__label {
  display: inline-block;
  font-family: $montserrat;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin-bottom: 5px;
  cursor: pointer;
}
.textarea__tag {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  border: 1px solid $color-black;
  padding: 5px 10px;
  height: 60px;
  outline: none;
}
//MODIFIER
.textarea--error {
  border-color: $color-red;
  color: $color-red;
}
.textarea--comment-form {
  font-family: $montserrat;
  font-size: 19px;
  font-weight: 300;
  line-height: 1.65;
  letter-spacing: 0.1em;
  min-height: 200px;
  padding: 40px;
  color: $color-black;

  &::placeholder {
    font-size: 18px;
    font-style: italic;
    color: transparentize($color-black, 0.5);
  }
}
.textarea--post-form {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: 0.1em;
  min-height: 394px;
}
</style>
