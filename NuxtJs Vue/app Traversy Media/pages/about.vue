<template>
  <div class="container">
      <h1>About DadJokes</h1>
      <p>This is an app that displays corny dad jokes</p>
  </div>
</template>

<script>
export default {
    head() {
        return {
            title: 'Corny dad jokes',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Best place for corny dad jokes'
                }
            ]
        }
    }
}
</script>

<style>

</style>