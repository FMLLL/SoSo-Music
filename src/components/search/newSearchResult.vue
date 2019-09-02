<template>
  <scroll class="searchList" :data="songs" :pullUp="true" @scrollToEnd="scrollToEnd" ref="scroll">
    <div>
      <ul class="resultList">
        <li class="search-item" v-for="item in songs" @click="handleItemClick(item)">{{item.name}} - {{item.singer}}</li>
      </ul>
      <div class="loading-wrapper" v-show="hasMore">
        <div class="loading">
          <img src="../../base/loading.gif" class="loading-img" width="24" height="24"/>
          <span class="text">正在加载，请稍等...</span>
        </div> 
      </div>
    </div>
  </scroll>
</template>

<script>
  import {getSearchResult} from '../../api/search.js'
  import {ERR_OK} from '../../api/config.js'
  import {createSong} from '../../api/singerDetail.js'
  import Scroll from '../../base/scroll.vue'
  import {bounce} from '../../common/js/bounce.js'
  export default {
    name: 'searchList',
    components: {
      Scroll
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      zhida: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        songs: [],
        hasMore: true,
        page: 1,
        perpage: 20
      }
    },
    components: {
      Scroll
    },
    methods: {
      _getSearchResult (q) {
        getSearchResult(q, this.page, this.zhida).then((res) => {
          this.hasMore = true
          if (res.code === ERR_OK) {
            //console.log(res.data.song.list)
            this.songs = this.normolizeSongs(res.data.song.list)
            console.log(res.data.song.totalnum)
            this._checkmore(res)   
          }    
        })
      },
      normolizeSongs (list) {
        let ret = []
        list.forEach((item, index) => {
          if (item.songid && item.songmid) {
            ret.push(createSong(item))
          }
        })
        return ret
      },
      handleItemClick (item) {

        console.log('hahaha')
        this.$emit('searchListClick', item)
        //console.log()
      },
      scrollToEnd () {
        getSearchResult (this.query, this.page, this.zhida).then((res) => {
          if (!this.hasMore) return
          this.page ++
          if (res.code === ERR_OK) {
            //console.log(res.data.song.list)
            console.log(res)
            this.songs = this.songs.concat(this.normolizeSongs(res.data.song.list))
            console.log(Math.ceil(res.data.song.totalnum / this.perpage), this.page)
            this._checkmore(res)
          }          
        })
      },
      _checkmore (res) {
        if (Math.ceil(res.data.song.totalnum / this.perpage) <= this.page) {
          this.hasMore = false
        }
      }
    },
    watch: {
      query: bounce (function (newquery) {
        this.page = 1
        this._getSearchResult (newquery)
        this.$emit('getSearchData')
      }, 1000)
    }
  }
</script>

<style lang="stylus" scoped>
  .searchList
    position: fixed
    top: 140px
    bottom: 0
    width: 100%
    padding: 0 20px 10px 30px
    overflow: hidden
    .search-item
      color: #fff
      height: 40px
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .loading-wrapper
      height: 40px
      .loading
        width: 100%
        text-align: center
        .text
          color: white
</style>