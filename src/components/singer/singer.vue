<template>
	<div class="singer-wrapper">
	  <scroll class="singer" :data="list" ref="scroll" :probeType="probeType" :listenScroll="listenScroll" 
	  @scroll="handleScroll">
	    <div class="list">
	    	<ul>
	    		<li class="list-items" v-for="(group, index) in list" :key="group.index"  ref="listItems">
	    			<h2 class="title">{{group.title}}</h2>
    				<ul>
    					<li class="list-item" v-for="item in group.items" @click="handleSingerList(item)">
    						<img class="item-img" :src="item.avatar" />
    						<p class="item-name">{{item.name}}</p>
    					</li>
    				</ul>
	    		</li>
	    	</ul>
	    </div>
	    <div class="fixTitle" v-show="fixTitle" ref="fixTitle">{{fixTitle}}</div> 
	  </scroll> 
	  
	  <div class="directory">
    	<ul 
    	  @touchstart.stop.prevent="handleTouchStart"
    	  @touchmove.stop.prevent="handleTouchMove"
    	>
    		<li class="directory-item" v-for="(group, index) in list" :key="index" :data-index="index" :class="{'activeIndex': currentIndex===index}">{{handleGroupTitle (group)}}</li>
    	</ul>
	  </div>
    
	  <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList, getSingerDetailData} from '../../api/singer.js'
  import {ERR_OK} from '../../api/config.js'
  import Scroll from '../../base/scroll.vue'
  import {mapMutations} from 'vuex'
  export default {
    name: 'Singer',
    components: {
    	Scroll
    },
    created () {
      this.getSingerData ()
      this.touch = {}
      this.probeType = 3
      this.listenScroll = true
    },
    data () {
      return {
      	list: [],
      	currentIndex: 0,
      	scrollY: '',
      	listHeight: [],
      	fixTitle: '',
        singerList: []
      }
    },
    mounted () {
      setTimeout(() => {
      	this.handleHeight ()
      }, 1000)
    },
    methods: {
      getSingerData () {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.list = this.initialListData(res.data.list)
            console.log(this.list)
          }
        })
      },
      initialListData (list) {
      	let map = {
          hot: {
          	title: '热门',
          	items: []
          }
        }

        list.forEach((item, index) => {
          if (index < 10) {
          	map.hot.items.push({
	            id: item.Fsinger_mid,
	            name: item.Fsinger_name,
	            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
          let key = item.Findex

          if (!map[key]) {
          	map[key] = {
          		title: key,
          		items: []
          	}
          }

          map[key].items.push({
	            id: item.Fsinger_mid,
	            name: item.Fsinger_name,
	            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        })

        let ret = []
        let hot = []
        
        for (let k in map) {
        	if (map[k].title === '热门') {
        		hot.push(map[k])
        	} else if (map[k].title.match(/[a-zA-Z]/)) {
        		ret.push(map[k])
        	}
        }

        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(ret)

      },
      handleGroupTitle (data) {
        return data.title.substr(0,1)
      },
      handleTouchStart (e) {
      	let index = parseInt(e.target.getAttribute('data-index'))
        this.touch.y1 = e.touches[0].pageY
        this.touch.anchorIndex = index
        this.$refs.scroll.scrollToElement(this.$refs.listItems[index],0,0)
      },
      handleTouchMove (e) {
        this.touch.y2 = e.touches[0].pageY
        let delta =((this.touch.y2 - this.touch.y1) / 20) | 0
        let anchorIndex = this.touch.anchorIndex + delta
        this.$refs.scroll.scrollToElement(this.$refs.listItems[anchorIndex],0,0)
      },
      handleScroll (pos) {
        this.scrollY = pos.y
      },
      handleHeight () {
      	let height = []
      	height.push(0)
      	let list = this.$refs.listItems
      	let listHeight = 0
      	for (let i = 0; i < list.length; i++) {
      		listHeight += list[i].clientHeight
      		height.push(listHeight) 
      	}
      	this.listHeight = height
      	console.log(height)
      },
      handleSingerList(item) {
        this.$router.push({
        	path: `/singer/${item.id}`
        })
        this.setSinger(item)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    watch: {
    	scrollY (newy) {
    		let height = this.listHeight
    		if (-newy <0) {
    			this.currentIndex = 0
    			this.fixTitle = ''
    			return
    		}
        for (let i=0; i < height.length-1; i++) {
          if (-newy >=height[i] && -newy <height[i+1]) {
          	this.currentIndex = i
          	this.fixTitle = this.list[i].title

            let fixHeight = 30
            let diff = parseInt(height[i+1])+newy < fixHeight ? (newy + parseInt(height[i+1])) - 30 : 0
            console.log(diff)
            this.$refs.fixTitle.style.transform = `translate3D(0, ${diff}px, 0)`
          	return
          }
        }  
    	}
    }
  }
</script>

<style lang="stylus">
  .singer-wrapper
    position: fixed
    width: 100%
    top: 70px
    bottom: 0
	  .singer
	    background-color: black
	    position: absolute
	    width: 100%
	    bottom: 0
	    top: -1px
	    overflow: hidden
	    .list
	      background-color: black
	      .list-items
	        .title
	          line-height: 30px
	          height: 30px
	          background: #4A4A4A
	          color: white
	          padding-left: 12px
		        .list-item
		          display: flex
		          align-items: center
		          padding: 10px 0 10px 20px
		          .item-img
		            width: 50px
		            height: 50px
		            border-radius: 50%
	            .item-name
	              color: white
	              margin-left: 20px
		  .fixTitle
	      position: absolute
	      top: 0
	      width: 100%
	      height: 30px
	      line-height: 30px
	      padding-left: 12px
	      background-color: #4A4A4A
	      color: white
    .directory
      position: absolute
      right: 0
      width: 20px
      top: 50%
      transform: translateY(-50%)
      background-color: #1A1A1A
      border-radius: 5px
      .directory-item
        color: white
        text-align: center
        height: 20px
        &.activeIndex
          color: gold
</style>
