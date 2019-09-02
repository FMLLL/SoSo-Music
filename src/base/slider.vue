<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
    	<span class="dot" v-for="(item,index) in dots" :key="index" :class="{'activeDot': currentIndex === index}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Swiper',
    props: {
      loop: {
      	type: Boolean,
      	default: false
      },
      autoPlay: {
      	type: Boolean,
      	default: false
      },
      Interval: {
      	type: Number,
      	default: 4000
      }
    },
    data() {
      return {
      	dots: [],
      	currentIndex: 0
      }
    },
    mounted () {
      //  ->感觉这个地方不需要使用setTimeout或者this.nextTick
      setTimeout(() =>{
	      this.initWidth ()
	      this.getDots ()
	      this.init ()

	      if (this.autoPlay) {
	      	this._autoPlay ()
	      }
        
        //视口变化，改变slider的尺寸
        window.addEventListener('resize', () => {
          //this.$nextTick()
          this.initWidth(true)
        })

      }, 20)
    },
    methods: {
      init () {
      	this.slider = new BScroll(this.$refs.slider, {
      	  scrollX: true,
      	  scrollY: false,
      	  momentum: false,
      	  snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
      	})

      	this.slider.on('scrollEnd', this._onscrollEnd)
      },
      initWidth (isResize) {
      	let width = 0
      	let clientWidth = this.$refs.slider.clientWidth
        this.children = this.$refs.sliderGroup.children
        //设置slider宽度
        for (let i = 0; i < this.children.length; i++) {
        	this.children[i].style.width = clientWidth + 'px'
          width += clientWidth
        }
        //loop循环开启宽度
        if (this.loop && !isResize) {
        	width += 2*clientWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      //获取dots
      getDots () {
      	this.dots = new Array(this.children.length)
      },
      _onscrollEnd () {
        if (!this.slider) {
        	return
        }
        let index = this.slider.getCurrentPage().pageX
        console.log(index)
        this.currentIndex = index
        if (this.autoPlay) {
        	this._autoPlay ()
        	this.currentIndex = this.slider.getCurrentPage().pageX
        }
      },
      //自动播放
      _autoPlay () {
      	clearTimeout(this.timer)
      	this.timer = setTimeout(() => {
         this.slider.next()
      	}, this.Interval)
      }
    }
  }
</script>

<style lang="stylus">
  .slider
    position: relative
    height: 150px
    .dots
      position: absolute
      bottom: 10px
      left: 50%
      transform: translate(-50%)
      .dot
        display: inline-block
        width: 8px
        height: 8px
        border-radius: 50%
        background-color: white
        margin: 0 10px
        &.activeDot
          background-color: blue
</style>
