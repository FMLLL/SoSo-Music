<template>
  <div class="searchBar">
    <div class="icon">
      <i class="icon-search">O</i>
    </div>
    <input class="input-content" type="text" v-model="query" placeholder="搜索歌曲、歌手" ref="inputContent"/>
    <div class="clear" @click="handleClear">
      <i class="clear-icon" v-show="query">X</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    data () {
      return {
      	query: ''
      }
    },
    methods: {
      handleClear () {
        this.query = ''
      },
      setQuery (content) {
        this.query = content
      },
      inputBlur() {
        this.$refs.inputContent.blur()
      }
    },
    watch: {
      query (newquery) {
        this.$emit('changeQuery', newquery)
      }
    }
  }
</script>

<style lang="stylus">
  .searchBar
    display: flex
    align-items: center
    width: 90%
    background-color: gray
    height: 30px
    margin: 20px auto
    border-radius: 5px
    .icon
      width: 20px
      margin-left: 10px
      text-align: center
    .input-content
      flex: 1
      outline: none
      background: none
      border: none
      color: white
    .clear
      width: 30px
</style>
