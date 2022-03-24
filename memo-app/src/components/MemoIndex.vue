<template>
  <div class="memo-list-container box">
    <ul>
      <li v-for="(memoItem, index) in memoItems" :key="index">
        <MemoTitle :memoItem="memoItem" @click="$_editItem(memoItem)" />
      </li>
      <li id="new-item" @click="$_newItem"></li>
    </ul>
  </div>
  <div class="memo-form-container box">
    <div :class="$_visibility">
      <form
        @submit.prevent="$_onSubmit"
      >
        <textarea
          rows="20"
          v-model="editingItem.content"
        ></textarea>
        <br />
        <input type="submit" value="保存" />
      </form>
      <button @click="$_deleteItem(editingItem)">削除</button>
      <button @click="$_closeForm">保存しないで閉じる</button>
      </div>
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
      memoItems: [],
      editingItem: {},
      formVisible: false
    }
  },
  methods: {
    $_onSubmit () {
      if (this.$_isToCreate(this.editingItem))
        this.$_createItem(this.editingItem)
      else
        this.$_updateItem(this.editingItem)

      this.$_setMemo(this.editingItem)
      this.$_closeForm()
    },
    $_findMemoIndex (index) {
      const foundIndex = this.memoItems.findIndex( (item) => {
        return item.keyIndex === index
      })
      return foundIndex
    },
    $_isToCreate (item) {
      return this.$_getIndex() <= item.keyIndex
    },
    $_createItem (item) {
      this.$_setIndex(item.keyIndex + 1)
      this.memoItems.push(item)
    },
    $_updateItem (item) {
        const index = this.$_findMemoIndex(item.keyIndex)
        this.memoItems[index] = Object.assign({}, item)
    },
    $_deleteItem (memoItem) {
      const index = this.$_findMemoIndex(memoItem.keyIndex)
      this.memoItems.splice(index, 1)
      this.$_deleteMemo(memoItem.keyIndex)
      this.$_closeForm()
    },
    $_editItem (memoItem) {
      this.editingItem = Object.assign({}, memoItem)
      this.formVisible = true
    },
    $_closeForm () {
      this.formVisible = false
      this.$_resetData(this.memoItems)
    },
    $_newItem () {
      const newItem = {
        keyIndex: this.$_getIndex(),
        content: ''
      }
      this.$_editItem(newItem)
    },
    $_resetData (memoItems) {
      localStorage.clear()
      let i
      for (i = 0; i < memoItems.length; i++) {
        memoItems[i].keyIndex = i
        this.$_setMemo(memoItems[i])
      }
      this.$_setIndex(i + 1)
    },
    $_pushData (countEffectives, dataArray) {
      if (countEffectives <= this.memoItems.length) return
      const memoItems = []
      let i
      for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].content !== '') memoItems.push(dataArray[i])
      }
      this.$_resetData(memoItems)
      this.memoItems = memoItems
    },
    $_deleteMemo (index) {
      localStorage.removeItem(`memoContent${index}`)
    },
    $_setIndex (index) {
      localStorage.setItem('memoIndex', index)
    },
    $_setMemo (memoItem) {
      localStorage.setItem(`memoContent${memoItem.keyIndex}`, memoItem.content)
    },
    $_getIndex () {
      const memoIndex = parseInt(localStorage.getItem('memoIndex'))
      return isNaN(memoIndex) ? 0 : memoIndex
    },
    $_getContent (index) {
      return localStorage.getItem(`memoContent${index}`)
    }
  },
  computed: {
    $_visibility: function () {
      if (this.formVisible) return 'memo-form'
      return 'memo-form-invisible'
    },
    $_loadData: function () {
      const keys = Object.keys(localStorage)
      const dataArray = this.$_emptyDataArray
      let countEffectives = 0
      for (let i = 0; i < keys.length; i++) {
        if (!/memoContent(\d+)/.test(keys[i])) continue

        countEffectives++
        let j = parseInt(keys[i].replace(/memoContent(\d+)/, '$1'))
        dataArray[j].content = this.$_getContent(j)
        dataArray[j].keyIndex = j
      }
      this.$_pushData(countEffectives, dataArray)
      return true
    },
    $_emptyDataArray: function () {
      const dataArray = []
      for (let k = 0; k <= this.$_getIndex(); k++) {
        const dataObject = {
          content: '',
          keyIndex: 0
        }
        dataArray.push(dataObject)
      }
      return dataArray
    }
  },
  mounted () {
    window.onload = () => {
      this.$_loadData
    }
  }
}
</script>

<style scoped>
.box {
  display: inline-block;
  width: 40%;
  vertical-align: top;
}
.memo-form-invisible {
  display: none;
}
li {
  text-align: left;
  cursor: pointer;
}
#new-item {
  list-style-type: "+  ";
  font-weight: bolder;
}
textarea {
  width: 100%;
}
</style>
