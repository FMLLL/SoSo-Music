<template>
  <transition :appear="true" name="personTrans">
    <div class="person">
       <h2 class="header">
         <div class="back-btn" @click="handleClick">
           <i><</i>
         </div>
       </h2>
    </div>
  </transition>
</template>

<script>
  export default {
  	name: 'person',
    methods: {
      handleClick () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .personTrans-enter-active,.personTrans-leave-active
    transition: all 0.3s
  .personTrans-enter,.personTrans-leave-to
    transform: translateX(100%)

  .person
    background-color: black
    position: fixed
    top: 0
    width: 100%
    bottom: 0
    .header
      height: 30px
      width: 100%
      display: flex
      .back-btn
        width: 30px
        color: gold
        font-size: 28px
        font-weight: bold
        margin-left: 10px
</style>