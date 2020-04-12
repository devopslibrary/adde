<template>
  <LayoutDefault>
    <div id="contentWrapper">
      <div v-if="hasInstallations">
        <h1>Getting Started</h1>
        <p>
          First, we need to add a new repository to Adde. We recommend starting
          with an empty repository, but feel free to add any repository
          containing JSON, and we'll try to automatically figure out the
          existing schema.
        </p>
        <add-new-adde />
      </div>
      <div v-else>
        <h1>Welcome back! Which ADDE repository would you like to use?</h1>
        <v-app id="inspire">
          <v-card height="400" width="256" class="mx-auto">
            <v-navigation-drawer permanent>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    Application
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    subtext
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link>
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-app>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../components/LayoutDefault.vue";
import AddNewAdde from "../components/AddNewAdde.vue";
import { authComputed } from "../store/helpers";

export default {
  name: "Overview",
  components: {
    LayoutDefault,
    AddNewAdde
  },
  computed: {
    ...authComputed
  },
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      right: null
    };
  }
};
</script>

<style scoped>
#contentWrapper {
  display: block;
  width: 70vw;
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  text-align: left;
  justify-content: left;
  align-items: center;
}
p {
  font-size: 130%;
  padding-top: 10px;
}
.v-btn {
  text-transform: none !important;
}
</style>
