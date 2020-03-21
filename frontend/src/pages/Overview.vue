<template>
  <LayoutDefault>
    <div v-if="!$auth.loading">
      <div id="contentWrapper">
        <h1>Snooooo Welcome!</h1>
        <p>
          Let's begin by selecting which organization you'd like to configure
          Adde for. Here are the ones we found associated with your Github
          account: {{ this.orgs }}
        </p>
      </div>
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import axios from "axios";

export default {
  name: "Overview",
  components: {
    LayoutDefault
  },
  methods: {
    async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();

      // Use Axios to make a call to the API
      const { data } = await axios.get("http://localhost:3000/orgs", {
        headers: {
          Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
        }
      });
      console.log(data);
      this.orgs = data;
    }
  },
  watch: {
    "$auth.isAuthenticated": function() {
      this.callApi();
    }
  },
  mounted() {
    if (!this.$auth.loading) {
      this.callApi();
    }
  },
  data() {
    return {
      orgs: "",
      token: false
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
</style>