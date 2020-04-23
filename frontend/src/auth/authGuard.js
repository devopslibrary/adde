import store from "../store/index.js";
import Configuration from "../config/configProvider";

export const authGuard = async (to, from, next) => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const userData = JSON.parse(userString);
    store.commit("LOGIN_USER", userData);
  }
  if (!store.getters.loggedIn) {
    const loginUrl =
      "https://github.com/login/oauth/authorize?client_id=" +
      Configuration.value("client_id") +
      "&redirect_uri=" +
      Configuration.value("redirect_uri") +
      "&state=/overview";
    window.location = loginUrl;
  } else {
    next();
  }
};
