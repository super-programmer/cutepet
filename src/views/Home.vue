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
    <!--  登录弹框  -->
    <van-dialog v-model="showLogin" title="登录" show-cancel-button>
    </van-dialog>
  </article>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      navTitle: '宠宠物',
      homeMenu: 0,
      showLogin: false,
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
  computed: {
    userId () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    homeMenu(value){
      if(value && !this.userId){
        this.showLogin()
      }
    }
  },
  methods: {
    showLogin () {
      this.showLogin = true;
    },
    hideLogin () {
      this.showLogin = false;
    },
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
