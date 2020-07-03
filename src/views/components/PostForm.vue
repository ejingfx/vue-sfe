<template>
  <div class="post__wrap">
    <div
      class="post__update"
      v-if="edit"
    >
      <UpdatePostForm :post="post" @toggle="$emit('toggle')" />
    </div>
    <div
      class="post__create"
      v-else
    >
      <NewPostForm />
    </div>
  </div>
</template>

<script>
import UpdatePostForm from './UpdatePostForm'
import NewPostForm from './NewPostForm'

export default {
  name: 'post-form',
  props: ['post', 'edit'],
  components: {
    UpdatePostForm,
    NewPostForm
  }
}
</script>

<style lang="scss" scoped>
.post__create {
  padding-top: 120px;
  padding-bottom: 0;
}
.post__update {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
