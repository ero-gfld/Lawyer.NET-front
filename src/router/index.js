import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from '@/stores/login'

const routes = [
  {
    path: "/profiles/:search",
    name: "Profiles",
    component: () => import("../views/ProfilesView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/edit-profile",
    name: "Edit-Profile",
    component: () => import("../views/LoginCRUD.vue"),
  },
  {
    path: "/",
    name: "Homepage",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("../views/HelpView.vue"),
  },
  {
    path: "/imprint",
    name: "Imprint",
    component: () => import("../views/ImprintView.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const loginStore = useLoginStore()
  const publicPages = ['/', '/login', '/register', '/help', '/imprint'];
  const authRequired = !publicPages.includes(to.path)
  
  if( authRequired && !loginStore.isLogin ) {
    return '/login'
  }
})

export default router;
