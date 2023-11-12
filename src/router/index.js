import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/profiles',
    name: 'Profiles',
    component: () => import('../views/ProfilesView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
