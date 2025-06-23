import { createRouter, createWebHistory } from 'vue-router'
import home from './view/home.vue'
import feature from './view/feature.vue'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/Feature',
      component: feature
    },
  ]
})
export default router;