<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <play-music></play-music>
  </div>
</template>

<script>
  import MHeader from './components/Mheader/Mheader.vue'
  import Tab from './components/tab/tab.vue'
  import playMusic from './components/play/play.vue'
  export default {
    name: 'App',
    components: {
      MHeader,
      Tab,
      playMusic
    }
  }
</script>

<style lang="stylus">
  #app
    position: fixed
    top: 0
    bottom: 0
    width: 100%
</style>
