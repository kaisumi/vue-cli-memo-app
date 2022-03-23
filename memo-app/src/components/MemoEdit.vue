<template>
  <form
    :class="this.$_invisible"
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
      memoContent: '',
      formVisible: true
    }
  },
  computed: {
    $_invisible: function () {
      if (this.formVisible) return 'memo-form'
      return 'memo-form-invisible'
    }
  },
  methods: {
    $_onSubmit () {
      localStorage.setItem('memoContent', this.memoContent)
    }
  }
}
</script>

<style>
.memo-form-invisible {
  display: none;
}
</style>
