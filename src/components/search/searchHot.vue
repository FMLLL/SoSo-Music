<template>
  <div class="searchHot">
    <h2 class="hot-title">热门搜索</h2>
    <ul class="hot-items">
      <li class="hot-item" v-for="item in hotKey" :key="item.n" @click="handleClick(item.k)">
        <span class="item-text">{{item.k}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getHotKey} from '../../api/search.js'
  import {ERR_OK} from '../../api/config.js'
  export default {
    name: 'SearchHot',
    created () {
      this._getHotKey()
    },
    data () {
      return {
        hotKey: []
      }
    },
    methods: {
      _getHotKey () {
        getHotKey().then((res) => {
          console.log(res)
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
          
        })
      },
      handleClick (keyword) {
        this.$emit('handleHotKeyClick', keyword)
      }
    }
  }
</script>

<style lang="stylus">
  .searchHot
    width: 100%
    margin: 10px
    padding: 0 20px
    .hot-items
     display: flex
     align-items: center
     flex-wrap: wrap
     .hot-item
       text-align: center
       padding: 5px 5px
       background-color: gray
       border-radius: 10px
       margin-right: 10px
       margin-bottom: 10px
       font-size: 15px
</style>
