import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as utils from './utils/common'
import 'vant/lib/index.css';
import '@/assets/styles/common.css'
import {
  Button,
  NavBar,
  Icon,
  DropdownMenu,
  DropdownItem,
  List,
  Toast,
  Dialog,
  Field,
  Form,
  CellGroup,
} from 'vant'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(List)
Vue.use(Field)
Vue.use(Form)
Vue.use(CellGroup)
Vue.config.productionTip = false
Vue.prototype.utils = utils
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
