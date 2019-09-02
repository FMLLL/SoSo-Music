<template>
  <div class="Mheader">
    <img class="Mheader-img" src="./logo@2x.png" />
    <h1 class="Mheader-name">S】CoCo Music</h1>
    <router-link to="/person" tag="div" class="person">
      <i class="iconfont icon-gerenzhongxin"></i>
    </router-link>
  </div>
</template>

<script>
  export default {
  	name: 'MHeader'
  }
</script>

<style lang="stylus" scoped>
  .Mheader
    height: 40px
    background-color: black
    display: flex
    align-items: center
    justify-content: center
    position: relative
    .Mheader-img
      width: 30px
      height: 30px
      margin-right: 10px
    .Mheader-name
      color: gold
    .person
      width: 20px
      height: 20px
      display: block
      border-radius: 50%
      background-color: gold
      position: absolute
      right: 10px
      .iconfont
        display: block
        width: 100%
        height: 100%
        font-size: 18px
        color: white
</style>