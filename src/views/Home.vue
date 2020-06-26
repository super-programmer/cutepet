<template>
  <article>
    <van-nav-bar :title="navTitle">
      <template #left>
        <van-icon name="fire" />
        <van-dropdown-menu>
          <van-dropdown-item v-model="homeMenu" :options="menuOptions" />
        </van-dropdown-menu>
      </template>
      <template #right>
        <article class="m-hd__operation">
          <section @click="showLogin" class="m-hd__operation-item m-hd__operation-item--login">登录</section><section @click="showRegister(null)" class="m-hd__operation-item">注册</section>
        </article>
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
          <van-field v-model="loginForm.phoneNum"
                     type="tel"
                     placeholder="请输入手机号"
                     name="validator"
                     :rules="[{ validator, message: '请输入正确的手机号码' }]"/>
          <van-field v-model="loginForm.pwd"
                     placeholder="请输入密码"
                     v-if="loginByPwd"
                     name="pswValidator"
                     :rules="[{ validator:pswValidator, message: '请输入密码' }]"
                     type="password"></van-field>
          <van-field v-model="loginForm.verifyCode"
                     name="pswValidator"
                     :rules="[{ validator:pswValidator, message: '请输入验证' }]"
                     placeholder="请输入验证码" v-else>
            <template #button v-if="!loginByPwd">
              <van-button size="small" type="primary" native-type="button" @click="getVerCode(loginForm)" v-if="verCount <= 0">发送验证码</van-button>
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
            <van-button round block type="info" native-type="submit" @click="loginSubmit">
              登录
            </van-button>
          </div>
        </van-cell-group>
      </van-form>

    </van-dialog>
    <!--  注册弹框  -->
    <van-dialog v-model="showRegisterDialog" title="注册" :showConfirmButton="false" :closeOnClickOverlay="true">
      <van-form>
        <van-cell-group>
          <van-field v-model="registerForm.phoneNum"
                     type="tel"
                     placeholder="请输入手机号"
                     name="validator"
                     :rules="[{ validator, message: '请输入正确的手机号码' }]"/>
          <van-field v-model="registerForm.verifyCode"
                     name="pswValidator"
                     :rules="[{ validator:pswValidator, message: '请输入验证' }]"
                     placeholder="请输入验证码">
            <template #button>
              <van-button size="small" type="primary" native-type="button" @click="getVerCode(registerForm)" v-if="verCount <= 0">发送验证码</van-button>
              <van-button size="small" type="default" v-else>{{verCount}}秒后重新获取</van-button>
            </template>
          </van-field>
          <van-field v-model="registerForm.pwd"
                     placeholder="请输入密码"
                     name="pswValidator"
                     :rules="[{ validator:pswValidator, message: '请输入密码' }]"
                     type="password"></van-field>
          <van-field v-model="registerForm.confirmPwd"
                     placeholder="请再次输入密码"
                     name="pswValidator"
                     :rules="[{ validator:pswValidator, message: '请再次输入密码' }]"
                     type="password"></van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" @click="registerSubmit">
              注册
            </van-button>
          </div>
        </van-cell-group>
      </van-form>

    </van-dialog>
  </article>
</template>

<script>
import Api from '../api/index'
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
      showRegisterDialog: false,
      menuOptions: [
        { text: '首页', value: 0 },
        { text: '我的', value: 1 }
      ],
      registerForm: {
        phoneNum: null,
        verifyCode: null,
        pwd: null, // 密码
        confirmPwd: null// 确认密码
      }, // 注册form
      loginForm: {
        phoneNum: null,
        verifyCode: null,
        pwd: null
      }, // 登录form
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
      // if (value && !this.userId) {
      //   this.showLogin()
      // }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      Api.getList().then(res => {
        this.list = res.data
        console.log(res)
      })
    },
    getVerCode (form) {
      if (!this.validator(form.phoneNum)) return
      this.verCount = 60
      Api.getValidate(form.phoneNum).then(res => {
        if (res && res.code === 0) {
          this.$toast('获取验证码成功')
        }
      })
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
      this.showRegisterDialog = false
    },
    showRegister (phoneNum) {
      this.showLoginDialog = false
      this.showRegisterDialog = true
      this.registerForm.phoneNum = phoneNum
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
    // 登录
    loginSubmit () {
      if (this.loginByPwd) {
        // 密码登录
        Api.login(this.loginForm).then(res => {
          if (res.code === 0) {
            clearInterval(this.verTimer)
            this.$toast('登录成功')
            this.showLoginDialog = false
            localStorage.accessToken = res.token
          }
        }).catch(err => {
          if (err.errCode === -19) {
            this.showRegister(this.loginForm.phoneNum)
          }
        })
      } else {
        // 快捷登录
        Api.quickLogin(this.loginForm).then(res => {
          if (res.code === 0) {
            clearInterval(this.verTimer)
            this.$toast('登录成功')
            this.showLoginDialog = false
            localStorage.accessToken = res.token
          }
        }).catch(err => {
          if (err.errCode === -19) {
            this.showRegister(this.loginForm.phoneNum)
          }
        })
      }
    },
    // 注册
    registerSubmit () {
      Api.register(this.registerForm).then(res => {
        if (res.code === 0) {
          clearInterval(this.verTimer)
          this.$toast('注册成功请登录')
          this.loginByPwd = true
          this.showRegisterDialog = false
          this.showLoginDialog = true
        }
      })
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
