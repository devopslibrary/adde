<template>
  <v-app-bar clipped-left app color="primary" dark>
    <div class="d-flex align-center">
      <a href="/"><img class="logo" src="@/assets/logo.svg" alt="logo"/></a>
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

    <span class="mr-2"><Login></Login></span>
  </v-app-bar>
</template>

<script>
import Login from "./Login";
export default {
  name: "AppHeader",
  components: { Login },
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
