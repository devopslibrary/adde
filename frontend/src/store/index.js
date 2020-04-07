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
      await axios
        .post("//localhost:3000/auth/login", githubCallback)
        .then(async function(response) {
          const token = response.data;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios.get("https://api.github.com/user").then(async function(output) {
            const user = {
              token: token,
              login: output.data.login,
              id: output.data.id,
              avatar_url: output.data.avatar_url,
              name: output.data.name,
              email: output.data.email
            };
            await commit("LOGIN_USER", user);
          });
        });
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
