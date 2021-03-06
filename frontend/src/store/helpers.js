import { mapGetters } from "vuex";

export const authComputed = {
  ...mapGetters([
    "loggedIn",
    "hasInstallations",
    "getInstallations",
    "getToken"
  ])
};
