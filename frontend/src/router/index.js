import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../pages/LandingPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage
  },
  {
    path: "/getting-started",
    name: "GettingStarted",
    component: () => import("../pages/GettingStarted.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
