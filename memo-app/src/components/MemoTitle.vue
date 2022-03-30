<template>
  <a>{{ $_title }}</a>
</template>
<script>
export default {
  name: 'MemoTitle',
  props: {
    memoItem: {
      type: String,
      required: true
    }
  },
  computed: {
    $_title: function () {
      const lines = this.memoItem.split('\n')
      return lines[0]
    }
  }
}
</script>
