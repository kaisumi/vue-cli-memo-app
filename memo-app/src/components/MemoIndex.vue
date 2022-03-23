<template>
  <div class="memo-list-container">
    <ul>
      <li v-for="(memoItem, index) in memoItems" :key="index">
        <MemoTitle :memoItem="memoItem" />
      </li>
    </ul>
  </div>  
</template>

<script>

import MemoTitle from './MemoTitle.vue'
export default {
  name: 'MemoIndex',
  components: {
    MemoTitle
  },
  data () {
    return {
      memoItems: []
    }
  },
  methods: {
    $_emptyDataArray () {
      const dataArray = []
      const dataObject = {
        content: '',
        keyIndex: 0
      }
      const count = parseInt(localStorage.getItem('memoIndex'))
      for (let k = 0; k <= count; k++) {
        dataArray.push(Object.assign({}, dataObject))
      }
      return dataArray
    },
    $_resetLocalStorage (memoItems) {
      localStorage.clear()
      let i
      for (i = 0; i < memoItems.length; i++) {
        localStorage.setItem(`memoContent${i}`, memoItems[i].content)
        memoItems[i].keyIndex = i
      }
      localStorage.setItem('memoIndex', i + 1)
    },
    $_pushData (countEffectives, dataArray) {
      if (countEffectives <= this.memoItems.length) return

      const memoItems = []
      let i
      for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].content !== '') memoItems.push(dataArray[i])
      }
      this.$_resetLocalStorage(memoItems)
      // this.$emit('set-items', memoItems)
      this.memoItems = memoItems
    },
    $_deleteItem (memoItem) {
      // this.$emit('delete-item', memoItem)
      this.memoItems.splice(memoItem.keyIndex, 1)
      localStorage.removeItem(`memoContent${memoItem.keyIndex}`)
    }
  },
  mounted () {
    window.onload = () => {
      console.log('onload')
      const keys = Object.keys(localStorage)
      console.log(keys)
      const dataArray = this.$_emptyDataArray()
      let countEffectives = 0
      let i
      for (i = 0; i < keys.length; i++) {
        if (!/memoContent(\d+)/.test(keys[i])) continue

        countEffectives++
        let j = parseInt(keys[i].replace(/memoContent(\d+)/, '$1'))
        dataArray[j].content = localStorage.getItem(`memoContent${j}`)
        dataArray[j].keyIndex = j // いらないかも？
      }
      this.$_pushData(countEffectives, dataArray)
    }
  }
}
</script>
