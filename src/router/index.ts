import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
const Home = () => import('../views/Home.vue')
const Detail = () => import('../views/Detail.vue')
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/detail',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
