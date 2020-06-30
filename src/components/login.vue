<template>
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
                 :rules="[{ validator:pswValidator, message: '请输入验证码' }]"
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
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        phoneNum: null,
        verifyCode: null,
        pwd: null
      } // 登录form
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
