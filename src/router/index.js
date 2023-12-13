import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from "@/stores/loginStore";

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
    path: "/admin/users",
    name: "Admin-Users",
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
  const loginStore = useLoginStore();
  const publicPages = ["/", "/login", "/register", "/help", "/imprint"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !loginStore.isLogin) {
    console.log(loginStore.isLogin);
    loginStore.returnUrl = to.fullPath;
    console.log(loginStore.returnUrl, "index.js url");
    return "/login";
  }
});

export default router;
