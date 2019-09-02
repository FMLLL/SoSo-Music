<template>
  <scroll class="singerList" :data="songs" @scroll="scroll" :listenScroll="listenScroll" :probeType="probeType">
    <ul class="song-items">
      <li class="song-item" v-for="(item, index) in songs" :key="item.id" @click="handleSelectItem(item, index)">
        <div class="ranked" v-if="isRankShow">
          <span :class="RankIcon(index)" ref="rankIcon">{{showRank(index)}}</span>
        </div>
        <div class="content">
          <p class="song-item-name">{{item.album}}</p>
          <p class="song-item-desc">{{item.name}}</p>
        </div>
      </li>
    </ul>
  </scroll> 
</template>

<script>
  import Scroll from './scroll.vue'
  export default {
    name: 'SingerList',
    components: {
      Scroll
    },
    data () {
      return {
        listenScroll: true,
        probeType: 3     
      }
    },
    props: {
      songs: {
        type: Array,
        default: []
      },
      isRankShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      showRankIcon(index) {
        return index < 3 ? `item-rank-${index}` : 'item-rank-num'
      }
    },
    methods: {
      scroll (pos) {
        this.$emit('scroll', pos)
      },
      handleSelectItem(item, index) {
        this.$emit('selectItem', item, index)
      },
      RankIcon(index) {
        return index < 3 ? `icon item-rank-${index}` : 'text'
      },
      showRank(index) {
        return index < 3 ? '' : index + 1
      }
    }
  }
</script>

<style lang="stylus">
  .singerList
    width: 100%
    height: 100%
    .song-items
      padding: 20px 0
      .song-item
        height: 60px
        padding-bottom: 18px
        display: flex
        align-items: center
        margin-left: 20px
        .ranked
          width: 40px
          height: 40px
          text-align: center
          margin-right: 20px
          .icon
            width: 25px
            height: 24px
            display: block
            background-size: 25px 24px
            &.item-rank-0
              background-image: url("./first@2x.png")
            &.item-rank-1
              background-image: url("./second@2x.png")
            &.item-rank-2
              background-image: url("./third@2x.png")
          .text
            display: block
            width: 25px
            height: 24px
            line-height: 24px
            text-align: center
            font-size: 20px
            color: gold
        .content
          flex: 1
          .song-item-name
            color: white
            font-size: 15px
            margin-bottom: 5px
          .song-item-desc
            color: gray
            font-size: 14px
</style>
