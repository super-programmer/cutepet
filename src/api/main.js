import qs from 'qs'
import axios from '../common/axios/config'

/**
 * 获取验证码
 */
function getList (param) {
  return axios.get('/index', param)
}
export default {
  getList
}
