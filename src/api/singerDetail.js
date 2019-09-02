import {jsonp} from '../common/js/jsonp.js'
import {commonParams, options} from './config.js'

export const getSingerDetailList = (id) => {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: id 
  })

  return jsonp(url, data, options)
}



class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.filename = `C400${this.mid}.m4a`
    this.url = url
  }
}


export function createSong(musicData) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url: 'https://img.tukuppt.com/newpreview_music/09/00/99/5c89b225eed2d10864.mp3'
	})
}

function filterSinger (singer) {
	let ret = []
	if (!singer) {
		return ''
	}
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}