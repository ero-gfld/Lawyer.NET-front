import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from "@/stores/LoginStore";

const routes = [
  {
    path: "/profiles/:search",
    name: "Profiles",
    component: () => import("@/views/ProfilesView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/my-account",
    name: "MyAccount",
    component: () => import("@/views/MyAccountView.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/admin/users",
    name: "AdminUsers",
    component: () => import("@/views/LoginCRUD.vue"),
    beforeEnter: () => {
      const loginStore = useLoginStore();
      if (!loginStore.isAdmin()) {
        return "/not-found";
      }
    },
  },
  {
    path: "/",
    name: "Homepage",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("@/views/HelpView.vue"),
  },
  {
    path: "/imprint",
    name: "Imprint",
    component: () => import("@/views/ImprintView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Any",
    component: () => import("@/views/NotFoundView.vue"),
    beforeEnter: () => {
      return "/not-found";
    },
  },
  {
    path: "/not-found",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
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

  const loggedInPages = ["/profile"];
  const loginRequired = loggedInPages.includes(to.path);

  if (loginRequired && !loginStore.isLoggedIn) {
    return "/login";
  }
});

export default router;
