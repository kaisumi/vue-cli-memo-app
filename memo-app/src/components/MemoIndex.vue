<template>
  <div class="memo-list-container box">
    <ul>
      <li v-for="(memoItem, index) in memoItems" :key="index">
        <MemoTitle :memoItem="memoItem" @click="$_editItem(index)" />
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
          v-model="editingItem"
        ></textarea>
        <br />
        <input type="submit" value="保存" />
      </form>
      <button @click="$_deleteItem(editingIndex)">削除</button>
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
      editingIndex: 0,
      editingItem: '',
      formVisible: false
    }
  },
  methods: {
    $_onSubmit () {
      if (this.editingIndex === this.memoItems.length)
        this.$_createItem(this.editingItem)
      else
        this.$_updateItem(this.editingItem)

      LocalStorage.setMemoData(this.memoItems)
      this.$_closeForm()
    },
    $_createItem (item) {
      this.memoItems.push(item)
    },
    $_updateItem (item) {
      this.memoItems[this.editingIndex] = item
    },
    $_deleteItem (index) {
      this.memoItems.splice(index, 1)
      LocalStorage.setMemoData(this.memoItems)
      this.$_closeForm()
    },
    $_editItem (index) {
      this.editingIndex = index
      this.editingItem = this.memoItems[index]
      this.formVisible = true
    },
    $_closeForm () {
      this.formVisible = false
    },
    $_newItem () {
      this.editingIndex = this.memoItems.length
      this.editingItem = ''
      this.formVisible = true
    }
  },
  computed: {
    $_visibility: function () {
      if (this.formVisible) return 'memo-form'
      return 'memo-form-invisible'
    }
  },
  mounted () {
    this.memoItems = LocalStorage.getMemoData()
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
