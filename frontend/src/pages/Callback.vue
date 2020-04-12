<template>
  <div></div>
</template>

<script>
export default {
  name: "Callback.vue",
  mounted() {
    this.login(this.$router, this.$route);
  },
  methods: {
    async login(router, route) {
      await this.$store.dispatch("login", {
        code: this.$route.query.code,
        state: this.$route.query.state
      });
      const redirectPath = route.query.state;
      router.push(redirectPath);
    }
  }
};
</script>

<style scoped>
.loading-dialog {
  background-color: #303030;
}
</style>
