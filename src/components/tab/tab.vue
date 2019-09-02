<template>
  <div class="tab">
  	<router-link tag="div" class="link-item" to="/recommend">
  	  <span class="item-text">推荐</span>
  	</router-link>

  	<router-link tag="div" class="link-item" to="/singer">
  	  <span class="item-text">歌手</span>
  	</router-link>

  	<router-link tag="div" class="link-item" to="/rank">
  	  <span class="item-text">排行</span>
  	</router-link>

  	<router-link tag="div" class="link-item" to="/search">
  	  <span class="item-text">搜索</span>
  	</router-link>
  </div>
  
</template>

<script>
  export default {
  	name: 'tab'
  }
</script>

<style lang="stylus" scoped>
  .tab
    display: flex
    background-color: black
    height: 30px
    padding-bottom: 5px
    .link-item
      flex: 1
      text-align: center
      .item-text
        color: gray
        font-size: 15px
    .router-link-active
      .item-text
        color: gold
        border-bottom: 1px solid gold
        font-size: 15px
        padding-bottom: 3px
</style>