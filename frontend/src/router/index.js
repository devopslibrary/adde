import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage
    // beforeEnter: (to, from, next) => {
    //   // If host is made up of 4 parts, redirect from default landing to account specific
    //   if (window.location.host.split(".").length == 4) next("/overview");
    //   else next();
    // }
  },
  {
    path: "/getting-started",
    name: "GettingStarted",
    component: () => import("../pages/GettingStarted.vue")
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
