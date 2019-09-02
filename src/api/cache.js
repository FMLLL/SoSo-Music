import storage from 'good-storage'

const LEN = 15
export const _KEYNAME_ = 'historyItem'

export function saveHistoryItem (val) {
  let arr = storage.get(_KEYNAME_, [])
  
  let index = arr.findIndex((item) => {
    return item === val
  })

  if (index < 0) {
  	arr.unshift(val)
  	if (arr.length > LEN) {
  	  arr.pop()
  	}
    storage.set(_KEYNAME_, arr)
  	return arr
  }

  if (index == 0) {
    return arr
  }

  if (index > 0) {
  	arr.splice(index, 1)
  	arr.unshift(val)
  	storage.set(_KEYNAME_, arr)
  	return arr
  }
}

export function deleteHistoryItem (val) {
  let arr = storage.get(_KEYNAME_, [])
  let index = arr.findIndex((item) => {
    return item === val
  })

  arr.splice(index, 1)
  storage.set(_KEYNAME_, arr)
  return arr
}

export function deleteHistoryAll () {
  storage.remove(_KEYNAME_)
  return []
}