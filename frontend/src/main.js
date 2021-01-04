import Vue from "vue";
import App from "./App.vue";
import VueCodeHighlight from "vue-code-highlight";
import VueRouter from "vue-router";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
// import axios from "axios";

Vue.config.productionTip = false;
Vue.use(VueCodeHighlight); //registers the v-highlight directive

new Vue({
  VueRouter,
  router,
  store,
  vuetify,
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("LOGIN_USER", userData);
    }
    // axios.interceptors.response.use(
    //   response => response,
    //   error => {
    //     if (error.response.status === 401) {
    //       this.$store.dispatch("logout");
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  },
  render: h => h(App)
}).$mount("#app");
