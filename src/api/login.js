import qs from 'qs'
import axios from '../common/axios/config'

/**
 * 获取验证码
 */
function getValidate (phoneNum) {
  return axios.get('/sendSms',{ params: { phoneNum } })
}

/**
 * 校验验证码
 */
function checkValidate (id, code) {
  return axios.post(`/base/captcha/validate/${id}`, code)
}

/**
 * 登录（sms 短信验证登录、openid 社交凭证登录）
 */
function login (params) {
  return axios.post('/login', params)
}
/*
* 快捷登录
* */
function quickLogin (params) {
  return axios.post('/quickLogin', params)
}
/*
* 注册
* */
function register (params) {
  return axios.post('/register', params)
}
// function login (params) {
//   return axios.post('/login', params, {
//     // headers: {
//     //   'Content-Type': 'application/x-www-form-urlencoded'
//     // }
//   })
// }

/**
 * 刷新登录
 */
function refreshToken () {
  let timer = null
  const DELAY = 10 * 60 * 60 * 1000

  if (!localStorage.token) {
    return
  }

  const refreshTokenFn = () => {
    const { refresh_token: refreshTokenData } = JSON.parse(localStorage.token)
    const params = qs.stringify({
      client_id: 'kpg-web',
      client_secret: '12719da91b1745da8d272c6e119f71da',
      grant_type: 'refresh_token',
      refresh_token: refreshTokenData,
      scope: 'all'
    })

    return axios.post('/auth/oauth/token', params, {
      headers: {
        'No-Need-Token': true,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  const handleRefreshToken = async () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    const rep = await refreshTokenFn()
    const token = rep
    token.timestamp = new Date().getTime()
    localStorage.token = JSON.stringify(token)
    localStorage.accessToken = token.access_token

    timer = setTimeout(handleRefreshToken, DELAY)
  }
  handleRefreshToken()
}

export default {
  getValidate,
  checkValidate,
  login,
  quickLogin,
  register,
  refreshToken
}
