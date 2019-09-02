<template>
	<transition :appear="true" name="slide"> 
	  <div class="singerDetail">
	  	<div class="Mheader" ref="mheader"> 
		    <div class="icon-wrapper" @click="clickBack">
		    	<i class="iconBack"><</i>
		    </div>
		    <h2 class="singer-name">{{singer.name}}</h2>
	    </div>
	    <div class="singer-bg" ref="bgImg" :style=" bgUrl"></div>
      <div class="layer" ref="layer"></div>
      <singer-list :songs="songs" @scroll="scroll" @selectItem="selectItem" class="singer-list" :style="singerListTop"></singer-list> 
	  </div>
  </transition>
</template>

<script> 
  import {mapGetters, mapActions} from 'vuex'
  import singerList from '../../base/singerList.vue'
  import {getSingerDetailList, createSong} from '../../api/singerDetail.js'
  export default {
    name: 'singerDetail',
    components: {
      singerList
    },
    data () {
      return {
        songs: [],
        scrollY: '',
        bgHeight: 0
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ]),
      bgUrl () {
        return `background-image: url(${this.singer.avatar})`
      },
      singerListTop () {
        return `top: ${this.bgHeight}px`
      }
    },
    created () {
      if (!this.singer.id) {
        //console.log(this.singer, 1111111111111)
        this.$router.push({
          path: '/singer'
        })
      }
      console.log(this.singer, 1111111111111)
      this.getSingerList(this.singer.id)
    },
    mounted () {
      this.getbgImgHeight ()
      this.$refs.mheader.style.zIndex = 150
    },
    methods: {
    	clickBack () {
    		this.$router.back()
    	},
      getSingerList (currentId) {
        getSingerDetailList (currentId).then((res) => {
          if (res.code === 0) {
            let list = res.data.list
            let currentData = []
            list.forEach((item) => {
              currentData.push(createSong(item.musicData))
            })
            this.songs = currentData            
          }
        })
      },
      getbgImgHeight () {
        this.bgHeight = parseInt(this.$refs.bgImg.clientHeight)
        console.log(this.bgHeight)
      },
      scroll (pos) {
        this.scrollY = pos.y
        //console.log(this.scrollY)
      },
      selectItem (item, index) { 
        console.log(item)
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      ...mapActions([
        'selectPlay'
      ])
    },
    watch: {
      scrollY (newy) {
        let height = 40 - this.bgHeight
        
        if (newy < 0 && newy >= height) {
          this.$refs.layer.style['transform'] = `translate3d(0, ${newy}px, 0)`
          this.$refs.bgImg.style.height = 0
          this.$refs.bgImg.style.zIndex = 0
          this.$refs.bgImg.style.paddingTop = '80%'
          return
        } else if (newy < height) {
          this.$refs.layer.style['transform'] = `translate3d(0, ${height}px, 0)`
          this.$refs.bgImg.style.height = '40px'
          this.$refs.bgImg.style.zIndex = 100
          this.$refs.bgImg.style.paddingTop = 0
          return
        } 
        let percent = (this.bgHeight + parseInt(newy)) / this.bgHeight
        console.log(percent)
        this.$refs.bgImg.style['transform'] = `scale(${percent})`
        this.$refs.bgImg.style.zIndex = 50
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .singerDetail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background-color: black
    color: white
    .Mheader
      position: absolute
      width: 100%
      height: 50px
      font-size: 20px
      .icon-wrapper
        position: absolute
        left: 10px
        line-height: 50px
        font-weight: bold
        width: 30px
        text-align: center
      .singer-name
        text-align: center
        width: 100%
        line-height: 50px
    .singer-bg
      position: relative
      width: 100%
      height: 0
      background-size: cover
      padding-top: 80%
    .layer
      position: relative
      height: 100%
      width: 100%
      background-color: black
    .singer-list
      position: fixed
      bottom: 0
      width: 100%

  .slide-enter-active, .slide-leave-active
    transition: all .3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
