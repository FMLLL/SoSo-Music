<template>
  <scroll class="singer" :data="list">
    <div class="list">
      <ul>
        <li class="list-items" v-for="(group, index) in data" :key="group.index">
          <h2 class="title">{{group.title}}</h2>
            <ul>
              <li class="list-item" v-for="item in group.items">
                <img class="item-img" :src="item.avatar" />
                <p class="item-name">{{item.name}}</p>
              </li>
            </ul>
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../base/scroll.vue'
  export default {
    name: 'listView',
    components: {
      Scroll
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .singer
    background-color: black
    position: fixed
    width: 100%
    bottom: 0
    top: 70px
    overflow: hidden
    .list
      background-color: black
      .list-items
        .title
          line-height: 30px
          height: 30px
          background: gray
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
</style>
