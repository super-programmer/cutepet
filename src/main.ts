import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/styles/common.css'
import {
  Button,
  NavBar,
  Icon,
  DropdownMenu,
  DropdownItem,
  List
} from 'vant'
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(List)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
