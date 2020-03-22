<template>
  <LayoutDefault>
    <div v-if="!$auth.loading">
      <div id="contentWrapper">
        <h1>Welcome!</h1>
        <p>
          Choose an account to install ADDE on:
        </p>
        <v-card max-width="444" outlined>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr v-for="item in orgs" :key="item.id">
                  <td style="width: 34px;">
                    <img
                      :src="item.avatar_url"
                      width="34"
                      height="34"
                      alt="@kenerwin88"
                    />
                  </td>
                  <td class="font-weight-bold" style="padding-left: 0px;">
                    {{ item.login }}
                  </td>
                  <td>
                    <v-btn
                      :href="
                        `https://github.com/apps/adde-to/installations/new/permissions?target_id=${item.id}`
                      "
                      :v-bind="item"
                      color="secondary"
                      >Install</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
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
      orgs: [],
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
.v-btn {
  text-transform: none !important;
}
</style>