<template>
  <div class="topList">
    <detail-singerlist :bgImage="bgImage" :title="title" :songs="songs" :isRankShow="isRankShow"></detail-singerlist>
  </div>
</template>

<script>
  import detailSingerlist from '../../base/detailSongList.vue'
  import {mapGetters} from 'vuex'
  import {getMusicList} from '../../api/rank.js'
  import {createSong} from '../../api/singerDetail.js'
  export default {
    name: 'loading',
    computed: {
      title () {
        return this.disc.topTitle
      },
      bgImage () {
        return this.disc.picUrl
      },
      ...mapGetters([
        'disc' 
      ])
    },
    components: {
      detailSingerlist
    },
    data () {
      return {
        songs: []
      }
    },
    created () {
      this.isRankShow = true
      this._getMusicList()
    },
    methods: {
      _getMusicList () {
        if (!this.disc.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.disc.id).then((res) => {
          this.songs = this._normalizeSongs(res.songlist)
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))       
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>