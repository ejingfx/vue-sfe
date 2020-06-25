<template>
  <label
    class="input"
    :class="modifier"
    :for="label"
  >
    <span class="input__label">{{ label | capitalize }}</span>
    <input
      class="input__tag"
      :type="type"
      :id="name"
      :name="name"
    >
  </label>
</template>

<script>
export default {
  name: 'form-input',
  props: ['modifier', 'type', 'label', 'name', 'model']
}
</script>

<style lang="scss" scoped>
.input {
  display: block;
  width: 100%;
}
.input__label {
  display: inline-block;
  font-family: $montserrat;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: 0.1em;
  margin-bottom: 5px;
  cursor: pointer;
}
.input__tag {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border-radius: 0;
  border: 1px solid $color-black;
  padding: 5px 10px;
  height: 60px;
  outline: none;
}
</style>
