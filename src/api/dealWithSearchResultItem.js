export const addSearchResultItem = function (arr, song, currentIndex) {
  let index = arr.findIndex((item) => {
    return item.id === song.id
  })

  if (index < 0) {
  	currentIndex ++
  	arr.splice(currentIndex, 0, song)
  }

  if (index > currentIndex) {
    arr.splice(index, 1)
    currentIndex++
    arr.splice(currentIndex, 0, song)
  }
  
  if (index < currentIndex) {
  	arr.splice(index, 1)
    arr.splice(currentIndex, 0, song)
  }
  
}