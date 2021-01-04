<template>
  <div class="LayoutDefault">
    <AppHeader />
    <main class="LayoutDefault__main">
      <slot />
      <v-navigation-drawer
        v-model="drawer"
        dark
        clipped
        permanent
        app
        v-if="loggedIn"
      >
        <v-list dense>
          <v-list-item link>
            <v-list-item-action>
              <img src="/swagger_logo.png" height="25px" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Swagger (REST)</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <img src="/graphql.png" height="25px" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>GraphiQL (GraphQL)</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <img src="/powershell.png" height="25px" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>PowerShell</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-action>
              <img src="/ansible.png" height="25px" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Ansible</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </main>
    <footer class="LayoutDefault__footer"></footer>
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import { authComputed } from "../store/helpers";
import { mdiMenuDown } from "@mdi/js";

export default {
  name: "LayoutDefault",
  components: {
    AppHeader
  },
  data: () => ({
    icons: {
      mdiMenuDown
    },
    return: {
      publicPath: process.env.BASE_URL
    }
  }),
  computed: {
    ...authComputed
  }
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}
</style>
