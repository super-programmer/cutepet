/* eslint-disable no-param-reassign */
import axios from 'axios'
// axios.defaults.baseURL = 'https://api.kpg123.com'
import { Toast } from 'vant'
axios.defaults.baseURL = 'http://68e76c7b.cpolar.io'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const Axios = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: false
})

Axios.interceptors.request.use(
  config => {
    if (
      window.localStorage.accessToken &&
      window.localStorage.accessToken !== 'null' &&
      !config.headers['No-Need-Token']
    ) {
      const $accessToken = window.localStorage.accessToken
      config.headers.Authorization = `Bearer ${$accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

Axios.interceptors.response.use(
  res => {
    if (!res) {
      Toast('网络异常')
    } else if (res.data.errCode) {
      Toast({
        message: res.data.msg
      })
      return Promise.reject(res.data)
    } else {
      return Promise.resolve(res.data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default Axios
