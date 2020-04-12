import store from "../store/index.js";

export const authGuard = async (to, from, next) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const userData = JSON.parse(userString);
    store.commit("LOGIN_USER", userData);
  }
  if (!store.getters.loggedIn) {
    const loginUrl =
      "https://github.com/login/oauth/authorize?client_id=" +
      process.env.VUE_APP_CLIENT_ID +
      "&redirect_uri=" +
      process.env.VUE_APP_REDIRECT_URI +
      "&state=/overview";
    window.location = loginUrl;
  } else {
    next();
  }
};
