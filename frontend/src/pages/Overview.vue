<template>
  <LayoutDefault>
    <div v-if="!$auth.loading">
      <div id="contentWrapper">
        <h1>Snooooo Welcome!</h1>
        <p>
          Let's begin by selecting which organization you'd like to configure
          Adde for. Here are the ones we found associated with your Github
          account:
        </p>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";

export default {
  name: "Overview",
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
</style>