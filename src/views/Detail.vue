<template>
  <article>
    <van-nav-bar :title="navTitle">
      <template #left>
        <van-icon name="arrow-left" @click="goBack"/>
      </template>
    </van-nav-bar>
  </article>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      navTitle: '宠宠物'
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
