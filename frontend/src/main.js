import Vue from "vue";
import App from "./App.vue";
import VueCodeHighlight from "vue-code-highlight";
import VueRouter from "vue-router";

// Auth0 Integration
import { domain, clientId, audience } from "../auth_config.json";
import { Auth0Plugin } from "./auth";
import router from "./router";
import vuetify from "./plugins/vuetify";
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: appState => {
    VueRouter.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;
Vue.use(VueCodeHighlight); //registers the v-highlight directive

new Vue({
  VueRouter,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
