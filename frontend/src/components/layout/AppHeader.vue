<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
      ><v-toolbar-items>
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
      </v-toolbar-items>

      <span v-if="!$auth.loading" class="mr-2"
        ><v-btn
          color="secondary"
          class="ml-2 mr-2"
          v-if="!$auth.isAuthenticated"
          @click="login"
        >
          <v-icon dark>mdi-login</v-icon>
          Log in
        </v-btn>
        <v-btn
          color="secondary"
          class="ml-2 mr-2"
          v-if="$auth.isAuthenticated"
          @click="logout"
        >
          Log out
        </v-btn>
        <v-btn
          color="secondary"
          class="ml-2 mr-2"
          v-if="!$auth.isAuthenticated"
          @click="signup"
        >
          Sign Up
        </v-btn></span
      >
    </v-btn>
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
</style>