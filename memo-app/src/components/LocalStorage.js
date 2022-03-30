function setMemoData (memoData) {
  localStorage.setItem('memoData', JSON.stringify(memoData))
}
function getMemoData () {
  const memoData = JSON.parse(localStorage.getItem('memoData'))
  return memoData === null ? [] : memoData
}
export default { setMemoData, getMemoData }
