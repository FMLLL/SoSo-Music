import {playMode} from '../common/js/config.js'
import storage from 'good-storage'
import {_KEYNAME_} from '../api/cache.js'

const state = {
	singer: {},
	sequenceList: [],
	playList: [],
	currentIndex: -1,
	mode: playMode.sequence,
	playing: false,
	fullScreen: false,
	searchHistory: storage.get(_KEYNAME_, []),
	disc: {} 
}

export default state 