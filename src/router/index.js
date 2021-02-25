import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import( /* webpackChunkName: "categories" */ '../views/JobsByHistory.vue')
  },
  {
    path: '/category',
    name: 'All',
    component: () => import( /* webpackChunkName: "categories" */ '../views/JobsByAll.vue')
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import( /* webpackChunkName: "categories" */ '../views/JobsByCategory.vue')
  },
  {
    path: '/category/job/:companySlug/:jobSlug',
    name: 'Job',
    component: () => import( /* webpackChunkName: "categories" */ '../views/DetailJob.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import( /* webpackChunkName: "categories" */ '../views/CreateJob.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
