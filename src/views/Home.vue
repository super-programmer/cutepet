<template>
  <article>
    <van-nav-bar :title="navTitle">
      <template #left>
        <van-icon name="fire" />
      </template>
      <template #right>
        <van-dropdown-menu>
          <van-dropdown-item v-model="homeMenu" :options="menuOptions" />
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
        <div v-for="(item, index) in list" :key="index" class="m-list__item" @click="goToDetail(item)">
          <img :src="item.cover" class="m-list__cover" />
          <section class="m-list__con">
            {{ item.title }}
          </section>
        </div>
      </van-list>
    </article>
    <!--  登录弹框  -->
    <van-dialog v-model="showLoginDialog" :title="loginTitle" :showConfirmButton="false" :closeOnClickOverlay="true">
      <van-form>
        <van-cell-group>
          <van-field v-model="loginForm.phone"
                     type="tel"
                     placeholder="请输入手机号"
                     name="validator"
                     :rules="[{ validator, message: '请输入正确的手机号码' }]"/>
          <van-field v-model="loginForm.password"
                     placeholder="请输入密码"
                     v-if="loginByPwd"
                     name="pswValidator"
                     :rules="[{ validator:pswValidator, message: '请输入密码' }]"
                     type="password"></van-field>
          <van-field v-model="loginForm.verCode"
                     name="pswValidator"
                     :rules="[{ validator:pswValidator, message: '请输入验证' }]"
                     placeholder="请输入验证码" v-else>
            <template #button v-if="!loginByPwd">
              <van-button size="small" type="primary" native-type="button" @click="getVerCode" v-if="verCount <= 0">发送验证码</van-button>
              <van-button size="small" type="default" v-else>{{verCount}}秒后重新获取</van-button>
            </template>
          </van-field>
          <section class="m-login-tips">
            <section class="m-login-tips__con" @click="changeLoginByPwd">
              {{loginByPwd ? '快捷登录' : '密码登录'}}
            </section>
            <section class="m-login-tips__operation">
              {{loginByPwd ? '忘记密码' : ''}}
            </section>
          </section>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-cell-group>
      </van-form>

    </van-dialog>
  </article>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      navTitle: '宠宠物',
      loginTitle: '登录',
      confirmButtonText: '登录',
      verTimer: null,
      verCount: 0,
      homeMenu: 0,
      loginByPwd: false,
      showLoginDialog: false,
      menuOptions: [
        { text: '首页', value: 0 },
        { text: '我的', value: 1 }
      ],
      loginForm: {
        phone: null,
        verCode: null,
        password: null
      },
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
      return this.$store.getters.getUserId
    }
  },
  watch: {
    homeMenu (value) {
      if (value && !this.userId) {
        this.showLogin()
      }
    }
  },
  methods: {
    getVerCode () {
      if (!this.validator(this.loginForm.phone)) return
      this.verCount = 60
      this.verTimer = setInterval(() => {
        if (this.verCount) {
          this.verCount--
        } else {
          clearInterval(this.verTimer)
        }
      }, 1000)
    },
    showLogin () {
      this.showLoginDialog = true
    },
    changeLoginByPwd () {
      this.loginByPwd = !this.loginByPwd
      clearInterval(this.verTimer)
      this.verCount = 0
      this.verTimer = null
    },
    validator (val) {
      return /^1[3456789]\d{9}$/.test(val)
    },
    pswValidator (val) {
      return !!val
    },
    hideLogin () {
      this.showLoginDialog = false
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        this.loading = false
        this.finished = true
      }, 1000)
    },
    goToDetail () {
      this.$router.push({
        path: '/detail'
      })
    }
  }
}
</script>

<style scoped>
  .m-login-tips{
    min-height: 50px;
    line-height: 50px;
    padding: 0 16px;
    font-size: 12px;
  }
  .m-login-tips__con{
    float: left;
    color: #999;
  }
  .m-login-tips__operation{
    float: right;
    color: #999;
  }
</style>
