<template>
  <div>
    <div class="rank">
      <scroll :data="topList" class="topList">
        <ul>
          <li class="category-item" v-for="items in topList" @click="selectItem(items)">
          	<div class="left-pic">
              <img :src="items.picUrl" class="left-pic-url" />
          	</div>
          	<ul class="right-songs">
          	  <li class="right-songs-item" v-for="(item, index) in items.songList">
                <span>{{index + 1}}</span>
          	  	<span class="item-desc">{{item.songname}} - {{item.singername}}</span>
          	  </li>
          	</ul>
          </li>
        </ul>
        <div class="loading-wrapper" v-show="!topList.length">
          <loading></loading>
        </div>
      </scroll> 
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRankData} from '../../api/rank.js'
  import {ERR_OK} from '../../api/config.js'
  import Scroll from '../../base/scroll.vue'
  import Loading from '../../base/loading.vue'
  import {mapMutations} from 'vuex'
  export default {
    name: 'Rank',
    created () {
      this._getRankData()
    },
    components: {
      Scroll,
      Loading
    },
    data () {
      return {
        topList: []
      }
    },
    methods: {
      _getRankData () {
      	getRankData().then((res) => {
      		//console.log(res)
          if (res.code === ERR_OK) {
            
            this.topList = res.data.topList
            console.log(this.topList)     	
          }
      	})
      },
      selectItem(item) {
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>

<style lang="stylus">
  .rank
    position: fixed
    top: 70px
    bottom: 0
    width: 100%
    background-color: black
    overflow: hidden
    .topList
      width: 100%
      height: 100%
      .category-item
        display: flex
        margin: 0 20px
        padding-top: 20px
        &:last-child
          padding-bottom: 20px
        .left-pic
          width: 100px
          height: 100%
          .left-pic-url
            display: block
            width: 100%
            height: 100%
        .right-songs
          flex: 1
          color: white
          background-color: gray
          padding: 10px 10px 0 10px
          overflow: hidden
          .right-songs-item
            margin-bottom: 8px
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
      .loading-wrapper
        width: 100%
        height: 100%
        display: flex
        align-items: center
        justify-content: center
</style>
