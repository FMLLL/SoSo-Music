function randomIndex (min, max) {
  return Math.floor(Math.random()*(max- min + 1) + min)
}

export function shuffle (arr) {
  let _arr = arr.slice(0)
  for (let i = 0; i < _arr.length; i++) {
  	let num = randomIndex(0, _arr.length-1)
  	let t = _arr[i]
    _arr[i] = _arr[num]
    _arr[num] = t         	
  }
  console.log('hahawozhixingle')
  return _arr
}

export function currentSongIndex (currentSong, newlist) {
  return newlist.findIndex((item) => {
    return item.mid === currentSong.mid
  })
}