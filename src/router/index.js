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
    name: "AdminUsers",
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
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const loginStore = useLoginStore();

  const adminPages = ["/admin/users"];
  const adminRequired = adminPages.includes(to.path);

  const loggedInPages = ["/profile"];
  const loginRequired = loggedInPages.includes(to.path);

  if (loginRequired && !loginStore.isLogged()) {
    return "/login";
  }

  if (adminRequired && !loginStore.isAdmin()) {
    return "/not-found";
  }

  if (!routes.some((route) => route.path === to.path)) {
    return "/not-found";
  }
});

export default router;
