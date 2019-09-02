<template>
  <div class="search">
    <search-bar @changeQuery="handleChangeQuery" ref="searchBar"></search-bar>
    <search-hot v-show="!query" @handleHotKeyClick="handleHotKeyClick"></search-hot>
    <search-history 
      :searchHistory="searchHistory" 
      v-show="searchHistory.length && !query" 
      @clickHistoryItem="handleHotKeyClick"
      @deleteItem="deleteOne"
      @deleteAll="deleteAllItem"
    >
    </search-history>
    <search-list v-show="query" :query="query" @searchListClick="searchListClick" @getSearchData="getSearchData"></search-list>
  </div>
</template>

<script>
  import searchBar from './searchBar.vue'
  import searchHot from './searchHot.vue'
  import searchList from './newSearchResult.vue'
  import searchHistory from '../../base/searchHistory.vue'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'Search',
    components: {
      searchBar,
      searchHot,
      searchList,
      searchHistory
    },
    data () {
      return {
        query: ''
      }
    },
    computed: {
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      handleChangeQuery (query) {
        this.query = query
      },
      handleHotKeyClick (content) {
        this.$refs.searchBar.setQuery(content)
      },
      searchListClick (item) {
        console.log(item)
        this.setHistoryList(item.name)
        console.log(this.searchHistory)
        this.selectSearchResult(item)
      },
      getSearchData () {
        this.$refs.searchBar.inputBlur()
      },
      ...mapActions([
        'setHistoryList',
        'deleteOne',
        'deleteAllItem',
        'selectSearchResult'
      ])
    }
  }
</script>

<style lang="stylus">
  .search
    width: 100%
    position: fixed
    bottom: 0
    top: 70px
    overflow: hidden
    background-color: black
</style>
