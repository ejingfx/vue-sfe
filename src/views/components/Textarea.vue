<template>
  <label
    class="input"
    :class="modifier"
    :for="label"
  >
    <span class="textarea__label">{{ label | capitalize }}</span>
    <input
      class="textarea__tag"
      :type="type"
      :id="name"
      :name="name"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  </label>
</template>

<script>
export default {
  name: 'form-textarea',
  props: ['modifier', 'type', 'label', 'name', 'value']
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
  span {
    color: $color-red;
  }
  .textarea__tag {
    border-color: $color-red;
    color: $color-red;
  }
}
.textarea--post-form {
  .textarea__tag {
    font-size: 40px;
    font-weight: 700;
    line-height: 1.65;
    letter-spacing: 0.1em;
  }
}
</style>
