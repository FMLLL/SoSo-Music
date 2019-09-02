<template>
  <div class="searchHistory">
    <div class="header">
      <h2 class="title">搜索历史</h2>
      <div class="clear-btn" @click="deleteAll">A</div>
    </div>
    <scroll :data="searchHistory" class="historyList">
      <ul>
        <li class="history-item" v-for="item in searchHistory">
          <span class="history-item-text" @click="clickHistoryItem(item)">{{item}}</span>
          <div class="history-item-clear" @click="deleteItem(item)"></div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from './scroll.vue'
  import storage from 'good-storage'
  export default {
  	name: 'searchHistory',
    props: {
      searchHistory: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    components: {
      Scroll
    },
    methods: {
      showHistory (query) {
        this.content = query
      },
      hideHistory () {
        this.content = []
      },
      deleteAll () {
        this.$emit('deleteAll')
      },
      deleteItem (item) {
        this.$emit('deleteItem', item)
      },
      clickHistoryItem (item) {
        this.$emit('clickHistoryItem', item)
      }
    },
    watch: {
      searchHistory (a) {
        console.log(1111111111,a)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .searchHistory
    padding: 0 15px 0 35px
  .header
    height: 40px
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between
    color: #fff
    .clear-btn
      width: 15px
      height: 15px
      border-radius: 50%
      background-color: #fff
      line-height: 15px
      text-align: center
      color: black
  .historyList
    position: fixed
    top: 380px
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    padding: 0 30px
    .history-item 
      height: 35px
      display: flex
      align-items: center
      justify-content: space-between
      color: #fff
      .history-item-clear
        width: 15px
        height: 15px
        border-radius: 50%
        background-color: #fff
</style>