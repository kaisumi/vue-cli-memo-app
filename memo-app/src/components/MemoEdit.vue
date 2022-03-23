<template>
  <form
    class="memo-form"
    @submit.prevent="$_onSubmit"
  >
    <textarea
      rows="20"
      cols="40"
      v-model="memoContent"
    ></textarea>
    <br />
    <input type="submit" value="保存" />
  </form>
</template>

<script>

export default {
  name: 'MemoEdit',
  data () {
    return {
      memoContent: ''
    }
  },
  methods: {
    $_onSubmit () {
      localStorage.setItem('memoContent', this.memoContent)
    }
  },
  mounted () {
    window.onload = () => {
      this.memoContent = localStorage.getItem('memoContent')
    }
  }
}
</script>
