<template>
  <article>
    <van-nav-bar :title="navTitle">
      <template #left>
        <van-icon name="fire" />
      </template>
      <template #right>
        <van-dropdown-menu>
          <van-dropdown-item v-model="homeMenu" :options="Menuoptions" />
        </van-dropdown-menu>
      </template>
    </van-nav-bar>
    <article class="m-bd">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in list" :key="item" class="m-list__item">
          <img :src="item.cover" :alt="cutePet" class="m-list__cover" />
          <section class="m-list__con">
            {{ item.title }}
          </section>
        </div>
      </van-list>
    </article>
  </article>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      navTitle: '宠小宠',
      homeMenu: 0,
      Menuoptions: [
        { text: '首页', value: 0 },
        { text: '我的', value: 1 }
      ],
      list: [
        {
          title: '首发| 瑞派宠物获得玛氏C轮战略投资，投后估值达70亿元',
          cover: require('../assets/images/demo/mmi.jpg')
        },
        {
          title: '首发| 瑞派宠物获得玛氏C轮战略投资，投后估值达70亿元',
          cover: require('../assets/images/demo/mmi.jpg')
        }
      ],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        this.loading = false
        this.finished = true
      }, 1000)
    }
  }
}
</script>

<style scoped></style>
