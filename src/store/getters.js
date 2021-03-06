export const singer = state => state.singer

export const sequenceList = state => state.sequenceList

export const playList = state => state.playList

export const currentIndex = state => state.currentIndex

export const mode = state => state.mode

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}

export const searchHistory = (state) => state.searchHistory

export const disc = state => state.disc