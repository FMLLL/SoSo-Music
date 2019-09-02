<template>
  <div class="progressBar">
  	<div class="progressBar-wrapper" ref="progressBarWrapper" @click='handleClickBtn'>
  	  <div class="progress" ref="progress"></div>
  	  <div 
  	    class="progressBtn" 
  	    ref="progressBtn"
  	    @touchstart.prevent="handleTouchStart"
  	    @touchmove.prevent="handleTouchMove"
  	    @touchend="handleTouchEnd"
  	  >
  	  </div>
  	</div>
  </div>	
</template>

<script>
  export default {
  	name: 'progressBar',
  	created () {
      this.barWidth = 0,
      this.progressBtnWidth = 0,
      this.touch = {},
      this.isTouch = false
  	},
  	props: {
  	  percent: {
  	  	type: Number,
  	  	default: 0
  	  }
  	},
  	mounted () {

  	},
  	methods: {
      handleTouchStart (e) {
      	this.isTouch = true
        this.touch.x1 = e.touches[0].pageX
        this.progressWidth = this.$refs.progress.style.width
      },
      handleTouchMove (e) {
      	if (!this.isTouch) {
      	  return
      	}
        this.touch.x2 = e.touches[0].pageX
        let alter = Math.min(this.barWidth, (this.touch.x2 - this.touch.x1))
        
        let progressWidth = Math.max(0, (parseInt(this.progressWidth) + alter))
        this.$refs.progress.style.width = progressWidth + 'px'
        this.$refs.progressBtn.style['transform'] = `translate3d(${Math.floor(progressWidth)}px, -50%, 0)`

        this.altPercent = parseInt(alter) / parseInt(this.barWidth)
        
      },
      handleTouchEnd () {
        this.isTouch = false
        this.$emit('changeBarProgress', this.altPercent)
      },
      changeBar (per) {
        this.$refs.progress.style.width = this.barWidth*per + 'px'
        this.$refs.progressBtn.style['transform'] = `translate3d(${Math.floor(this.barWidth*per)}px, -50%, 0)`
      },
      handleClickBtn (e) {
        let left = this.$refs.progressBtn.getBoundingClientRect().left
        console.log(e)
        let deltar = e.pageX - left
        let per = parseInt(deltar) / parseInt(this.barWidth)
        this.changeBar(per)
        this.$emit('changeBarProgress', per)
      }
  	},
  	watch: {
      percent (newpercent) {
      	if (this.isTouch) {
      	  return
      	}
      	//console.log(newpercent)
      	this.barWidth = this.$refs.progressBarWrapper.clientWidth
      	this.progressBtnWidth = this.$refs.progressBtn.clientWidth
      	//console.log(this.barWidth, this.progressBtnWidth)
        this.changeBar(newpercent)
      }
  	}
  }
</script>

<style lang="stylus" scoped>
  .progressBar
    width: 70%
    position: absolute
    top: -20px
    left: 50%
    transform: translateX(-50%)
    .progressBar-wrapper
      position: relative
      height: 5px
      width: 100%
      border-radius: 3px
      background-color: gray
      .progress
        position: absolute
        left: 0
        top: 0
        height: 5px
        width: 0
        background-color: orange
      .progressBtn
        position: absolute
        left: 0
        top: 50%
        transform: translateY(-50%)
        height: 10px
        width: 10px
        border-radius: 50%
        background-color: blue
</style>

