import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import singUpView from "../views/SingUpView.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/page-builder/:pageId",
    name: "PageBuilder",

    component: HomeView,
    meta: { requiresAuth: true },
  },
  { path: "/connexion", component: LoginView },
  { path: "/inscription", component: singUpView },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/connexion");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
