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
  },
  {
    path: "/overview",
    name: "Overview",
    component: () => import("../pages/Overview.vue"),
    beforeEnter: authGuard
  },
  {
    path: "/setup",
    name: "Setup",
    component: () => import("../pages/Setup.vue"),
    props: route => ({ installation_id: route.query.installation_id }),
    beforeEnter: authGuard
  },
  {
    path: "/:org/:repo",
    name: "Swagger",
    component: () => import("../pages/Swagger.vue"),
    beforeEnter: authGuard
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
