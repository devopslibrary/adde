import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import { authGuard } from "../auth/authGuard";
import Callback from "../pages/Callback";
// import { ifLoggedInRedirect } from "../auth/ifLoggedInRedirect";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage
    // beforeEnter: (to, from, next) => {
    //   ifLoggedInRedirect(to, from, next, "overview");
    // }
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback
    // beforeEnter: (to, from, next) => {
    //   ifLoggedInRedirect(to, from, next, "overview");
    // }
  },
  {
    path: "/overview",
    name: "Overview",
    component: () => import("../pages/Overview.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("../pages/Setup.vue"),
    props: route => ({ installation_id: route.query.installation_id }),
    beforeEnter: authGuard
  },
  {
    path: "/swagger/:org/:repo",
    name: "Swagger",
    component: () => import("../pages/Swagger.vue"),
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const loggedIn = await localStorage.getItem("user");
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    const loginUrl =
      "https://github.com/login/oauth/authorize?client_id=" +
      process.env.VUE_APP_CLIENT_ID +
      "&redirect_uri=" +
      process.env.VUE_APP_REDIRECT_URI +
      "&state=/overview";
    window.location = loginUrl;
  } else {
    next();
  }
});

export default router;
