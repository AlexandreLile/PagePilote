// import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
// import singUpView from "../views/SingUpView.vue";
// import DashboardView from "../views/DashboardView.vue";
// import LoginView from "../views/LoginView.vue";

// const routes = [
//   {
//     path: "/page-builder/:pageId",
//     name: "PageBuilder",

//     component: HomeView,
//     meta: { requiresAuth: true },
//   },
//   { path: "/connexion", component: LoginView },
//   { path: "/inscription", component: singUpView },
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     component: DashboardView,
//     meta: { requiresAuth: true },
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("token");

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next("/connexion");
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SingUpView from "../views/SingUpView.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/page-builder/:pageId",
    name: "PageBuilder",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/connexion",
    component: LoginView,
  },
  {
    path: "/inscription",
    component: SingUpView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    redirect: "/connexion", // Rediriger vers connexion par défaut
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  // Vérifiez si l'utilisateur essaie d'accéder aux routes de connexion ou d'inscription
  if (to.path === "/connexion" || to.path === "/inscription") {
    // Permettre l'accès à ces routes même si l'utilisateur n'est pas authentifié
    next();
  } else if (!isAuthenticated) {
    // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    next("/connexion");
  } else {
    // Si l'utilisateur est authentifié, autorisez l'accès aux autres routes
    next();
  }
});

export default router;
