<template>
  <div class="play-music" v-show="playList.length>0">

    <transition name="normal" 
                @enter="animationEnter"
                @after-enter="animationAfterEnter"
                @leave="animationLeave"
                @after-leave="animationAfterLeave"
    >
      <div class="normal-playing" v-show="fullScreen">
      	<div class="playing-bg">
      		<img width="100%" height="100%" :src="currentSong.image" />
      	</div>
        <div class="top">
        	<div class="back-btn" @click="handleBackIcon">
        	  <i class="back-iten"><</i>
        	</div>
        	<h2 class="title">
  		  		<p class="title-name" v-html="currentSong.album"></p>
  		  		<p class="title-singer" v-html="currentSong.singer"></p>
        	</h2>
        </div>
        <div class="middle">
        	<div class="cd-playing-wrapper" ref="cdWrapper">
        		<img :class="handlePlayingRotate" :src="currentSong.image" />
        	</div>
        </div> 
        <div class="bottom">
          <div class="progressTime">{{currentTime}}</div>
        	<progress-bar :percent="percent" @changeBarProgress="changeBarProgress"></progress-bar>
          <div class="durationTime">{{durationTime}}</div>
          <ul class="bottom-btn-group">
            <li class="bottom-icon" @click="handleModeBtn">{{Currentmode}}</li>
            <li class="bottom-icon" @click="preSong">上一首</li>
            <li class="bottom-icon" @click="handlePlayButton">{{changePlayingIcon}}</li>
            <li class="bottom-icon" @click="nextSong">下一首</li>
            <li class="bottom-icon">喜欢</li>
          </ul> 
        </div>
      </div>
    </transition>
    
    <transition name="mini">
      <div class="mini-playing" v-show="!fullScreen" @click="open">
         <div class="mini-cd-wrapper">
           <img :src="currentSong.image" :class="handlePlayingRotate" />
         </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="musicAudio" @timeupdate="handleTimeUpdate" @ended="end"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import progressBar from './progressbar.vue'
  import {playMode} from '../../common/js/config.js'
  import animations from 'create-keyframe-animation'
  export default {
    name: 'playMusic',
    components: {
      progressBar
    },
    created () {
      if (!this.currentSong) {
        cosole.log(this.currentSong)
        this.$router.push({
          path: '/singer'
        })
      }
    },
    computed: {
      Currentmode () {
        return this.mode === playMode.sequence ? '顺序' : this.mode === playMode.loop ? '单循' : '随机'
      },
      changePlayingIcon () {
        return this.playing ? '暂停' : '播放'
      },
      handlePlayingRotate () {
        return this.playing ? 'cd-playing cd-rotate-playing' : 'cd-playing cd-rotate-playing paused' 
      },
      ...mapGetters([
        'playList',
        'fullScreen',
        'currentSong',
        'playing',
        'currentIndex',
        'sequenceList',
        'mode'
      ])
    },
    data () {
      return {
        currentTime: '00:00',
        durationTime: '00:00',
        percent: 0
      }
    },
    methods: {
      handleBackIcon () {
        this.setFullScreen(false)
        console.log(this.fullScreen)
      },
      open () {
        this.setFullScreen(true)
      },
      handlePlayButton () {
        this.setPlayingState(!this.playing)
      },
      handleTimeUpdate () {
        this.currentTime = this.handleTime(this.$refs.musicAudio.currentTime)
        this.durationTime = this.handleTime(this.$refs.musicAudio.duration)
        this.percent = this.$refs.musicAudio.currentTime / this.$refs.musicAudio.duration
      },
      handleTime (time) {
        let min = (time / 60) | 0
        let sec = (time % 60) | 0
        return `${this.formatTime(min, 2)}:${this.formatTime(sec, 2)}`
      },
      formatTime (number, n) {
        let len = number.toString().length
        if (len >=n) {
          return number
        }
        for (let i = 0; i < len; i++) {
          number = '0' + number
        }
        return number
      },
      changeBarProgress (alter) {
        this.percent = Math.min((this.percent + alter), 1)
        if (this.percent < 0) this.percent = 0
        this.$refs.musicAudio.currentTime = this.$refs.musicAudio.duration*this.percent
        console.log(this.percent)
        if (!this.playing) {
          this.handlePlayButton ()
        }
      },
      preSong () {
        let index = 0
        if (this.currentIndex === 0) {
          index = this.playList.length - 1
        } else {
          index = this.currentIndex - 1
        }
        if (!this.playing) {
          this.handlePlayButton()
        }
        this.setCurrentIndex(index)
      },
      nextSong () {
        let index = 0
        if (this.currentIndex === this.playList.length - 1) {
          index = 0
        } else {
          index = this.currentIndex + 1
        }
        if (!this.playing) {
          this.handlePlayButton()
        }
        this.setCurrentIndex(index)
      },
      end () {
        console.log(this.mode)
        if (this.mode === playMode.loop) {
          this.$refs.musicAudio.currentTime = 0
          this.$refs.musicAudio.play()
        } else {
          this.nextSong()
        }
      },
      handleModeBtn () {
        let mode = (this.mode + 1) % 3
        this.switchMode({
          list: this.playList,
          mode
        })
        //console.log(this.mode)
      },
      animationEnter (el, done) {
        console.log('我进来了~~~~~~~~')
        const {x, y, initScale} = this.calculateCDPosition()

        console.log(x, y, initScale)

        let animation = {
          0: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${initScale})`
          },
          60: {
            transform: `translate3d(-50%, -50%, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(-50%, -50%, 0) scale(1)`,
            filter: 'blur(0)'
          }
        }

        animations.registerAnimation({
          name: 'move',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'move', done)
      },
      animationAfterEnter () {
        animations.unregisterAnimation('move')
        this.$refs.cdWrapper.style.animation = ''
      },
      animationLeave (el, done) {

        const {x, y, initScale} = this.calculateCDPosition()

        let animation = {
          0: {
            transform: `translate3d(-50%, -50%, 0) scale(1)`
          },
          60: {
            transform: `translate3d(-50%, -50%, 0) scale(1.1)`
          },
          100: {
            transform: `translate3d(${x}px, ${y}px, 0) scale(${initScale})`
          }
        }

        animations.registerAnimation({
          name: 'out',
          animation,
          presets: {
            duration: 400,
            easing: 'linear'
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, 'out', done)

      },
      animationAfterLeave () {
        animations.unregisterAnimation('out')
        this.$refs.cdWrapper.style.animation = ''
      },
      calculateCDPosition () {
        let x = -((window.innerWidth / 2 - 30) + window.innerWidth*0.8/2)
        let y = window.innerHeight - (window.innerHeight*0.7/2+60) -5 - 20 - window.innerWidth*0.8/2
        let initScale = 40 / (window.innerWidth*0.8)
        return {
          x,
          y,
          initScale
        }

      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      }),
      ...mapActions([
        'switchMode'  
      ])
    },
    watch: {
      currentSong (newsong, oldsong) {
        console.log(newsong.mid, oldsong.mid)
        if (newsong.mid === oldsong.mid) {
          return
        }
        let musicAudio = this.$refs.musicAudio
        this.$nextTick(() => {
          musicAudio.currentTime = 0
          musicAudio.play()       
        })
      },
      playing (newPlaying) {
        if (newPlaying) {
          this.$nextTick (() => {
            this.$refs.musicAudio.play()         
          })
        } else {
          this.$nextTick (() => {
            this.$refs.musicAudio.pause()            
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  .play-music
    color: white
    .normal-playing
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: black
      .playing-bg
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        filter: blur(20px)
        opacity: 0.6
      .top
        position: relative
        height: 60px
        width: 100%
        .back-btn
          position: absolute
          left: 0
          top: 0
          line-height: 60px
          color: gold
          font-weight: bold
          width: 30px
          text-align: center
        .title
          text-align: center
          font-size: 15px
          .title-name
            padding-top: 5px
            margin-bottom: 6px
          .title-singer
            font-size: 12px
      .middle
        width: 100%
        height: 70%
        .cd-playing-wrapper
          position: relative
          left: 50%
          top: 50%
          transform: translate3d(-50%, -50%, 0)
          width: 80%
          height: 0
          padding-top: 80%
          border-radius: 50%
          overflow: hidden
          box-sizing: border-box
          .cd-playing
            position: absolute
            left: 0
            top: 0
            width: 100%
            height: 100%
            border-radius: 50%
            box-sizing: border-box
            border: 10px solid gray
            &.cd-rotate-playing
              animation: rotate 20s linear infinite
            &.paused
              animation-play-state: paused
      .bottom
        position: absolute
        bottom: 40px
        width: 100%
        height: 30px
        .progressTime
          position: absolute
          left: 20px
          top: -25px
          font-size: 12px
        .durationTime
          position: absolute
          right: 18px
          top: -25px
          font-size: 12px
        .bottom-btn-group
          display: flex
          align-items: center
          .bottom-icon
            flex: 1
            text-align: center
      &.normal-enter-active, .normal-leave-active
        transition: all .4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
        .top, .bottom
          transition: all .4s
      &.normal-enter, .normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-playing
      position: fixed
      bottom: 0
      left: 0
      right: 0
      height: 50px
      background-color: gray
      &.mini-enter-active, .mini-leave-active
        transition: all .4s
      &.mini-enter, .mini-leave-to
        opacity: 0
      .mini-cd-wrapper
        position: absolute
        left: 10px
        top: 5px
        width: 40px
        height: 40px
        border-radius: 50%
        .cd-playing
          border-radius: 50%
          width: 100%
          height: 100%
          &.cd-rotate-playing
            animation: rotate 20s linear infinite
          &.paused
            animation-play-state: paused


  @keyframes rotate
    0% 
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>
