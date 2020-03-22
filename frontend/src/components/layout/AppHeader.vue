<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <img class="logo" src="@/assets/logo.svg" alt="logo" />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      class="subtitle-1"
      large
      text
      v-for="item in menuItems"
      :key="item.title"
      :to="item.path"
    >
      {{ item.title }}
    </v-btn>

    <span v-if="!$auth.loading" class="mr-2"
      ><v-btn
        large
        color="secondary"
        class="ml-2 mr-2"
        v-if="!$auth.isAuthenticated"
        @click="login"
      >
        <v-icon dark>mdi-login</v-icon>
        Log In
      </v-btn>
      <v-btn
        large
        color="secondary"
        class="ml-2 mr-2"
        v-if="$auth.isAuthenticated"
        @click="logout"
      >
        Log Out
      </v-btn>
      <v-btn
        large
        color="secondary"
        class="ml-2 mr-2"
        v-if="!$auth.isAuthenticated"
        @click="signup"
      >
        Try Free
      </v-btn>
    </span>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "FAQ", path: "/faq" },
        { title: "Pricing", path: "/pricing" },
        { title: "Contact", path: "/contact" }
      ]
    };
  },
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Signup
    signup() {
      this.$auth.loginWithRedirect({
        login_hint: ""
      });
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
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