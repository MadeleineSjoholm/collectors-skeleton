import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Collectors from '../views/Collectors.vue'
import Rules from '../views/Rules.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/room/:id',
    name: 'Collectors',
    component: Collectors
  },
  {
    path: '/rules',
    name: 'Rules',
    component: Rules
  }
]

const router = new VueRouter({
  routes
})

export default router
