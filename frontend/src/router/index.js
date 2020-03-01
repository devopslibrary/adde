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

router.beforeEach((to, from, next) => {
  var subdir = window.location.host.split(".")[0];

  console.log(subdir, to, from, next);
});

export default router;
