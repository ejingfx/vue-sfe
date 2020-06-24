<template>
  <div class="breadcrumb">
    <div class="container">
      <ol class="breadcrumb__list">
        <li class="breadcrumb__item">
          <a href="/" class="breadcrumb__link">
            <span class="breadcrumb__text">HOME</span>
          </a>
        </li>
        <li
          class="breadcrumb__item"
          v-for="(slug, i) in slugs"
          :key="i"
        >
          <a
            class="breadcrumb__link"
            :class="(slugs.length - 1) === i ? 'breadcrumb__link--last' : ''"
            :href="slug.url"
          >
            <span class="breadcrumb__text">{{ slug.text }}</span>
          </a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: ['slugs']
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: block;
  max-height: 80px;
  background-color: $color-light-grey;
}
.breadcrumb__list {
  list-style: none;
  padding: 30px 0;
}
.breadcrumb__item {
  display: inline-block;
  vertical-align: middle;
  color: blue;
}
.breadcrumb__link {
  display: inline-block;
  text-decoration: none;
}
.breadcrumb__text {
  font-weight: 500;
  font-size: 16px;
  color: $color-black;
  letter-spacing: 0.1em;
}
.breadcrumb__item:not(:last-child) {
  padding-right: 38px;
  position: relative;

  &:after {
    position: absolute;
    content: '>';
    top: 50%;
    right: 17px;
    color: $color-black;
    transform: translateY(-50%);
  }
}
.breadcrumb__link--last {
  pointer-events: none;
}
</style>
