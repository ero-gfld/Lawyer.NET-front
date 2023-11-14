import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/profiles',
    name: 'Profiles',
    component: () => import('../views/ProfilesView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
