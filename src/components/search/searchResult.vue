<template>
  <scroll class="searchResult" :data="searchList">
    <ul class="result-list">
      <li class="result-item" v-for="item in searchList" v-html="handleData(item)" @click="goToMusic(item)"></li> 
    </ul>
  </scroll>
</template>

<script>
  import {getSearchResult} from '../../api/search.js'
  import {bounce} from '../../common/js/bounce.js'
  import {ERR_OK} from '../../api/config.js'
  import {mapMutations} from 'vuex'
  import Scroll from '../../base/scroll.vue'
  export default {
    name: 'searchResult',
    created () {
      this._getSearchResult()
    },
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
      },
      page: {
        page: {
          type: Number,
          default: 1
        }
      }
    },
    data () {
      return {
        searchList: []
      }
    },
    methods: {
      _getSearchResult() {
        getSearchResult('李宇春', this.zhida, this.page).then((res) => {
          if (res.code === ERR_OK) {
            //console.log(res.data.song.list)
            this.searchList = this.handlesSearchList(res.data)
          }
          console.log(res, 'qqqqq')
        })
      },
      handlesSearchList (listData) {
        let map = [{
          singerid: listData.zhida.singerid,
          singermid: listData.zhida.singermid,
          singername: listData.zhida.singername,
          type: 'singer'
        }]
        let ret = map.concat(listData.song.list)
        console.log(ret)
        return ret
      },
      handleData (item) {
        if (item.type == 'singer') {
          return item.singername
        } else {
          return item.songname
        }
      },
      goToMusic (item) {
        console.log('hahaha', item)

        this.SET_SEARCH_HISTORY([this.handleData (item)])
      }, 
      ...mapMutations([
        'SET_SEARCH_HISTORY'
      ])
    },
    watch: {
      query: bounce(function (newquery) {
        getSearchResult(newquery, 1, 1).then((res) => {
          if (res.code === ERR_OK) {
            //console.log(res.data.song.list)
            this.searchList = this.handlesSearchList(res.data)
            this.$emit('getSearchData')
          }
        })
      }, 200)
    }
  }
</script>

<style lang="stylus">
  .searchResult
    position: fixed
    top: 140px
    bottom: 0
    width: 100%
    background-color: black
    color: white
    overflow: hidden
    .result-list
      padding: 0 25px
      .result-item
        height: 40px
</style>