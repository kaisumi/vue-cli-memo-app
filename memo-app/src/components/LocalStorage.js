
function deleteMemo (index) {
  localStorage.removeItem(`memoContent${index}`)
}

function setIndex (index) {
  localStorage.setItem('memoIndex', index)
}
function setMemo (memoItem) {
  localStorage.setItem(`memoContent${memoItem.keyIndex}`, memoItem.content)
}
function getIndex () {
  const memoIndex = parseInt(localStorage.getItem('memoIndex'))
  return isNaN(memoIndex) ? 0 : memoIndex
}
function getContent (index) {
  return localStorage.getItem(`memoContent${index}`)
}
function setMemoData (memoData) {
  localStorage.setItem('memoData', JSON.stringify(memoData))
}
function getMemoData () {
  const memoData = JSON.parse(localStorage.getItem('memoData'))
  console.log(memoData)
  return memoData
}
function clear() {
  localStorage.clear()
}
function keys() {
  return Object.keys(localStorage)
}
function resetData (memoItems) {
  clear()
  let i
  for (i = 0; i < memoItems.length; i++) {
    memoItems[i].keyIndex = i
    setMemo(memoItems[i])
  }
  setIndex(i + 1)
}
export default { deleteMemo, setIndex, setMemo, getIndex, getContent, setMemoData, getMemoData, clear, keys, resetData }
