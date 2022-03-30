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
import LocalStorage from './LocalStorage.js'
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

      LocalStorage.setMemo(this.editingItem)
      this.$_closeForm()
      LocalStorage.resetData(this.memoItems)
    },
    $_findMemoIndex (index) {
      return this.memoItems.findIndex( (item) => item.keyIndex === index)
    },
    $_isToCreate (item) {
      return LocalStorage.getIndex() <= item.keyIndex
    },
    $_createItem (item) {
      LocalStorage.setIndex(item.keyIndex + 1)
      this.memoItems.push(item)
    },
    $_updateItem (item) {
        const index = this.$_findMemoIndex(item.keyIndex)
        this.memoItems[index] = item
    },
    $_deleteItem (memoItem) {
      const index = this.$_findMemoIndex(memoItem.keyIndex)
      this.memoItems.splice(index, 1)
      LocalStorage.deleteMemo(memoItem.keyIndex)
      this.$_closeForm()
      LocalStorage.resetData(this.memoItems)
    },
    $_editItem (memoItem) {
      this.editingItem = Object.assign({}, memoItem)
      this.formVisible = true
    },
    $_closeForm () {
      this.formVisible = false
    },
    $_newItem () {
      const newItem = {
        keyIndex: LocalStorage.getIndex(),
        content: ''
      }
      this.$_editItem(newItem)
    },
    $_pushData (countEffectives, dataArray) {
      if (countEffectives <= this.memoItems.length) return
      const memoItems = []
      let i
      for (i = 0; i < dataArray.length; i++) {
        if (dataArray[i].content !== '') memoItems.push(dataArray[i])
      }
      LocalStorage.resetData(memoItems)
      this.memoItems = memoItems
    }
  },
  computed: {
    $_visibility: function () {
      if (this.formVisible) return 'memo-form'
      return 'memo-form-invisible'
    },
    $_loadData: function () {
      const keys = LocalStorage.keys()
      const dataArray = this.$_emptyDataArray
      let countEffectives = 0
      for (let i = 0; i < keys.length; i++) {
        if (!/memoContent(\d+)/.test(keys[i])) continue

        countEffectives++
        let j = parseInt(keys[i].replace(/memoContent(\d+)/, '$1'))
        dataArray[j].content = LocalStorage.getContent(j)
        dataArray[j].keyIndex = j
      }
      this.$_pushData(countEffectives, dataArray)
      return true
    },
    $_emptyDataArray: function () {
      const dataArray = []
      for (let k = 0; k <= LocalStorage.getIndex(); k++) {
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
    this.$_loadData
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
