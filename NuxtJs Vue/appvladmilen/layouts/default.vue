<template>
  <div>
        <Navbar/>
        <main class="main">
            <div class="container">
                <nuxt/>
            </div>
        </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
    components: {
        Navbar,
    },
}
</script>

<style>

</style>