import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    LOGIN_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      window.location = "/";
    }
  },
  actions: {
    async login({ commit }, githubCallback) {
      const githubTokenResponse = await axios.post(
        "//localhost:3000/auth/login",
        githubCallback
      );
      const githubToken = githubTokenResponse.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${githubToken}`;
      const userData = await axios.get("https://api.github.com/user");
      const user = {
        token: githubToken,
        login: userData.data.login,
        id: userData.data.id,
        avatar_url: userData.data.avatar_url,
        name: userData.data.name,
        email: userData.data.email
      };
      await commit("LOGIN_USER", user);
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  },
  strict: debug
});
