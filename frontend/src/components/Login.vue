<template>
  <div>
    <v-btn
      :href="loginURL"
      large
      color="secondary"
      class="ml-2 mr-2"
      v-show="!loggedIn"
    >
      <v-icon dark>mdi-login</v-icon>
      Log In
    </v-btn>
    <v-btn
      large
      color="secondary"
      class="ml-2 mr-2"
      v-show="loggedIn"
      @click="logout"
    >
      Log Out
    </v-btn>
    <v-btn large color="secondary" class="ml-2 mr-2" v-show="!loggedIn">
      Try Free
    </v-btn>
  </div>
</template>

<script>
import { authComputed } from "../store/helpers";
import Configuration from "../config/configuration";

export default {
  name: "Login",
  computed: {
    // a computed getter
    loginURL: function() {
      return (
        "https://github.com/login/oauth/authorize?client_id=" +
        Configuration.value("client_id") +
        "&redirect_uri=" +
        Configuration.value("redirect_uri") +
        "&scope=read:org%20repo" +
        "&state=/overview"
      );
    },
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}
.v-toolbar {
  padding-left: 10%;
  padding-right: 10%;
}
</style>
