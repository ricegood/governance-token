import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Ballot from './views/Ballot.vue'
import Vote from './views/Vote.vue'
import Page404 from './views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/ballot/:number',
      name: 'ballot',
      component: Ballot
    },
    {
      path: '/vote',
      name: 'vote',
        component: Vote
    },
    {
      path: '*',
      component: Page404
    }
  ]
})
