<template>
  <LayoutDefault>
    <div v-if="loggedIn">
      <div id="contentWrapper">
        <h1>Getting Started</h1>
        <p>
          First, we need to add a new repository to Adde. We recommend starting
          with an empty repository, but feel free to add any repository
          containing JSON, and we'll try to automatically figure out the
          existing schema.
        </p>
        <add-new-adde />
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import AddNewAdde from "../components/ui/AddNewAdde.vue";
import { authComputed } from "../store/helpers";

export default {
  name: "Overview",
  components: {
    LayoutDefault,
    AddNewAdde
  },
  computed: {
    ...authComputed
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
