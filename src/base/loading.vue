<template>
	<div class="loading">
	  <img src="./loading.gif" class="loading-img" width="24" height="24"/>
	  <p class="text">{{text}}</p>
	</div>
</template>

<script>
  export default {
  	name: 'loading',
  	props: {
      text: {
      	type: String,
      	default: '正在加载，请稍等...'
      }
  	}
  }
</script>

<style lang="stylus" scoped>
  .loading
    width: 100%
    text-align: center
    .text
      color: white
</style>