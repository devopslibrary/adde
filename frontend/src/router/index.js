import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import { authGuard } from "../auth/authGuard";
import { ifLoggedInRedirect } from "../auth/ifLoggedInRedirect";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
    beforeEnter: (to, from, next) =>
      ifLoggedInRedirect(to, from, next, "overview")
  },
  {
    path: "/getting-started",
    name: "GettingStarted",
    component: () => import("../pages/GettingStarted.vue"),
    beforeEnter: authGuard
  },
  {
    path: "/overview",
    name: "Overview",
    component: () => import("../pages/Overview.vue"),
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
