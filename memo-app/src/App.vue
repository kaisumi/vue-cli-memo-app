<template>
  <h1>Memo App</h1>
  <p>Click "<b>+</b>" to create a new memo.</p>
  <MemoIndex />
</template>

<script>
import MemoIndex from './components/MemoIndex.vue'

export default {
  name: 'App',
  components: {
    MemoIndex
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
