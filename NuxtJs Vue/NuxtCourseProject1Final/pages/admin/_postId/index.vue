<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['check-auth', 'auth'],
  // computed: {
  //   loadedPosts() {
  //     return this.$store.getters.loadedPosts
  //   }
  // },
  asyncData(context) {
    return context.app.$axios.$get('/posts/' + context.params.postId + '.json')
    .then(data => {
      console.log(data)
      return {
        // loadedPost: data
        loadedPost: {...data, id: context.params.postId}
      }
    })
  },
  methods: {
    onSubmitted(editedPost) {
      console.log(editedPost)
      this.$store.dispatch('editPost', editedPost)
      .then(response => this.$router.push('/admin'))
    }
  },
        // author: 'Maximilian',
        // title: 'My awesome Post',
        // content: 'Super amazing, thanks for that!',
        // thumbnailLink: 'https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg'
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
