import * as types from './mutation-types.js'
import {shuffle, currentSongIndex} from '../api/random.js'
import {playMode} from '../common/js/config.js'
import {saveHistoryItem, deleteHistoryItem, deleteHistoryAll} from '../api/cache.js'


export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}

export const switchMode = function ({commit, state}, {list, mode}) {
	commit(types.SET_PLAY_MODE, mode)
	if (state.mode === playMode.random) {
	  let newlist = shuffle(list)
	  commit(types.SET_PLAY_LIST, newlist)
      commit(types.SET_CURRENT_INDEX, currentSongIndex(list[state.currentIndex], newlist))
	} else {
	  commit(types.SET_PLAY_LIST, state.sequenceList)
      commit(types.SET_CURRENT_INDEX, currentSongIndex(list[state.currentIndex], state.sequenceList))
	}
}

export const setHistoryList = function ({commit}, item) {
  commit(types.SET_SEARCH_HISTORY, saveHistoryItem(item))
}

export const deleteOne = function ({commit}, item) {
  commit(types.SET_SEARCH_HISTORY, deleteHistoryItem(item))
}

export const deleteAllItem = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, deleteHistoryAll())
}

export const selectSearchResult = function ({commit, state}, song) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]
  //addSearchResultItem(playlist, song, currentIndex)
  //addSearchResultItem(sequenceList, song, currentIndex)
  //设置播放列表插入歌曲
  let index = playlist.findIndex((item) => {
    return item.id === song.id
  })

  if (index < 0) {
    currentIndex ++
    playlist.splice(currentIndex, 0, song)
  }

  if (index > currentIndex) {
    playlist.splice(index, 1)
    currentIndex++
    playlist.splice(currentIndex, 0, song)
  }
  
  if (index < currentIndex) {
    playlist.splice(index, 1)
    playlist.splice(currentIndex, 0, song)
  }

  //设置顺序列表插入歌曲
  let fCurrentIndex = sequenceList.findIndex((item) => {
    return item.id === currentSong.id
  })
  let fIndex = sequenceList.findIndex((item) => {
    return item.id === song.id
  })
  
  if (fIndex < 0) {
    fCurrentIndex ++
    sequenceList.splice(fCurrentIndex, 0, song)
  }

  if (fIndex > fCurrentIndex) {
    sequenceList.splice(fIndex, 1)
    fCurrentIndex++
    sequenceList.splice(fCurrentIndex, 0, song)
  }
  
  if (fIndex < fCurrentIndex) {
    sequenceList.splice(fIndex, 1)
    sequenceList.splice(fCurrentIndex, 0, song)
  }



  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_CURRENT_INDEX, currentIndex)
}

