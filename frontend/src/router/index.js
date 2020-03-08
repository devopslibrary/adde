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
    // beforeEnter: () => {
    //   if (this.$auth.isAuthenticated) {
    //     this.$router.push({ path: "/kondo/overview" });
    //   }
    // }
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
