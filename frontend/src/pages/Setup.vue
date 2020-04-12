<template>
  <LayoutDefault>
    <div v-if="!$auth.loading">
      <div id="contentWrapper">
        <h1>Post-Install</h1>
        <p>Adde was successfully installed! {{ installation_id }}</p>
        <add-new-adde />
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../components/LayoutDefault.vue";

export default {
  name: "Overview",
  props: ["installation_id"],
  components: {
    LayoutDefault
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
