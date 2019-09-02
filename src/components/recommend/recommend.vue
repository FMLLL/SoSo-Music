<template>
  <div class="recommend">
    <scroll :data="recommends" class="scroll" :probeType="3" :listenScroll="true" @scroll="scroll">
      <div>
        <slider v-if="recommends.length" :loop="loop" :autoPlay="autoPlay">
          <div class="slider-item" v-for="(item,index) in recommends" :key="index">
          	<a class="item-link" :href="item.linkUrl">
          	  <img class="item-img" :src="item.picUrl" />
            </a>
          </div>
        </slider>
        <div class="recommend-list">
          <h2 class="list-title">热门歌单推荐</h2>
          <ul class="list-content">
            <li class="list-item" v-for="item in list" :key="">
              <img class="list-item-img" :src="item.imgUrl" />
              <div class="list-item-text">
                <p class="list-item-title">{{item.name}}</p>
                <p class="list-item-desc">{{item.desc}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="fix-list-title" v-show="showRecommendTitle">热门歌单推荐</div>
  </div>
</template>

<script>
  import Slider from '../../base/slider.vue'
  import {getRecommendData} from '../../api/recommend.js'
  import {getListData} from '../../api/recommend.js'
  import {ERR_OK} from '../../api/config.js'
  import Scroll from '../../base/scroll.vue'
  export default {
    name: 'Recommend',
    components: {
      Slider,
      Scroll
    },
    data () {
      return {
      	recommends: [],
        list: [],
        loop: true,
        autoPlay: true,
        showRecommendTitle: false
      }
    },
    created () {
      this._getRecommendData ()
      this._getListData ()
    },
    methods: {
      _getRecommendData () {
      	getRecommendData ().then((res) => {
      	  if (res.code === ERR_OK) {
      	  	this.recommends = res.data.slider
      	  }
          console.log(this.recommends)
      	})
      },
      _getListData () {
        getListData ().then((res) => {
          if (res.code === ERR_OK) {
            this.list = this.handleListData(res.data.list)
          }
          console.log(this.list)
        })
      },
      handleListData (list) {
        let newList = []
        list.forEach((item, index) => {
          newList.push({
            name: item.creator.name,
            desc: item.dissname,
            imgUrl: item.imgurl,
            avatarUrl: item.avatarUrl
          })
        })
        return newList
      },
      scroll (pos) {
        this.showRecommendTitle = pos.y < -150 ? true : false
      }
    }
  }
</script>

<style lang="stylus">
  .recommend
    width: 100%
    position: fixed
    bottom: 0
    top: 70px
    overflow: hidden
    background-color: black
    .scroll
      height: 100%
      width: 100%
      .slider-item
        height: 150px
        float: left
        .item-link
          display: block
          width: 100%
          height: 100%
          .item-img
            display: block
            width: 100%
            height: 100%
      .recommend-list
        width: 100%
        background-color: black
        padding-top: 20px
        .list-title
          text-align: center
          height: 30px
          color: gold
          font-size: 15px
          line-height: 30px
        .list-content
          .list-item
            display: flex
            padding: 10px 0 10px 20px
            .list-item-img
              width: 60px
              height: 60px
            .list-item-text
              display: flex
              flex-direction: column
              padding-left: 20px
              .list-item-title
                color: white
                font-size: 12px
                margin: 8px 0
              .list-item-desc
                color: gray
                font-size: 12px
    .fix-list-title
      text-align: center
      height: 50px
      color: gold
      font-size: 15px
      line-height: 30px
      position: fixed
      top: 69px
      width: 100%
      padding-top: 20px
      background-color: black
</style>
