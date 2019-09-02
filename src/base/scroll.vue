<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template> 

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      listenScroll: {
      	type: Boolean,
      	default: false
      },
      click: {
        type: Boolean,
        default: false
      },
      data: {
      	type: Array,
      	default: []
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.initScroll ()
    },
    methods: {
      initScroll () {
      	this.scroll = new BScroll(this.$refs.scroll, {
          probeType: this.probeType,
          click: this.click
      	})
 
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        if (this.pullUp) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y < this.scroll.maxScrollY + 60) {
              console.log('快到底部了，呵呵')
              this.$emit('scrollToEnd')
              //this.scroll.refresh()
            }
          })
        }
      },
      enable () {
      	this.scroll && this.scroll.enable ()
      },
      disable () {
      	this.scroll && this.scroll.disable ()
      },
      scrollTo () {
      	this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
      	this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      refresh () {
      	this.scroll && this.scroll.refresh ()
      }
    },
    watch: {
      data () {
      	setTimeout(() => {
      	this.refresh()
      }, 20)
      }
    }
  }
</script>

<style lang="stylus">

</style>
