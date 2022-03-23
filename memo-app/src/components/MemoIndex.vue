<template>
  <div class="memo-list-container">
    <ul>
      <li v-for="(memoItem, index) in memoItems" :key="index">
        <MemoTitle :memoItem="memoItem" @click="$_editItem(memoItem)" />
      </li>
    </ul>
  </div>
  <div :class="this.$_visibility">
    <form
      @submit.prevent="$_onSubmit"
    >
      <textarea
        rows="20"
        cols="40"
        v-model="this.editingItem.content"
      ></textarea>
      <br />
      <input type="submit" value="保存" />
    </form>
    <button @click="this.$_deleteItem(this.editingItem)">削除</button>
    <button @click="this.$_closeForm">閉じる</button>
  </div>
</template>

<script>

import MemoTitle from './MemoTitle.vue'
// import MemoEdit from './MemoEdit.vue'
export default {
  name: 'MemoIndex',
  components: {
    MemoTitle
  },
  data () {
    return {
      memoItems: [],
      editingItem: {},
      formVisible: false
    }
  },
  methods: {
    $_onSubmit () {
      console.log(`memoContent${this.editingItem.keyIndex}: ${this.editingItem.content}`)
      localStorage.setItem(`memoContent${this.editingItem.keyIndex}`, this.editingItem.content)
    },
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
      this.$_closeForm()
    },
    $_editItem (memoItem) {
      console.log(`editingItem:`)
      console.log(memoItem)
      this.editingItem = memoItem
      this.formVisible = true
    },
    $_closeForm () {
      this.formVisible = false
    }
  },
  computed: {
    $_visibility: function () {
      if (this.formVisible) return 'memo-form'
      return 'memo-form-invisible'
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

<style>
.memo-form-invisible {
  display: none;
}
</style>
