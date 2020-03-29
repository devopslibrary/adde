<template>
  <form-wizard title="" subtitle="" color="#62b562" ref="wizard">
    <tab-content title="Which organization?">
      <h3>Please select an organization</h3>
      <br />
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="item in orgs"
                :key="item.id"
                style="cursor: pointer"
                @click="selectOrg(item)"
              >
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
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </tab-content>
    <tab-content title="Select Repository">
      <h3>Please select a repository</h3>
      <br />
      <div v-if="reposLoading">
        <v-progress-circular
          indeterminate
          color="secondary"
        ></v-progress-circular>
        Loading please wait...
      </div>
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="item in repos"
                :key="item.id"
                style="cursor: pointer"
                @click="selectRepo(item)"
              >
                <td>
                  {{ item.name }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </tab-content>
    <tab-content title="Confirmation">
      <h3>
        We're about to install Adde on {{ this.selectedOrg.login }}/{{
          this.selectedRepo.id
        }}
      </h3>
      By clicking install, you'll be sent to Github briefly to confirm the
      installation.
    </tab-content>
    <template slot="footer" slot-scope="props">
      <div class="wizard-footer-left">
        <wizard-button
          v-if="props.activeTabIndex > 0"
          @click.native="props.prevTab()"
          :style="props.fillButtonStyle"
          >Previous</wizard-button
        >
      </div>
      <div class="wizard-footer-right">
        <wizard-button
          v-if="props.isLastStep"
          @click.native="installApp(selectedOrg.id, selectedRepo.id)"
          class="wizard-footer-right finish-button"
          :style="props.fillButtonStyle"
          >Install</wizard-button
        >
      </div>
    </template>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent, WizardButton } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import axios from "axios";

export default {
  name: "AddNewAdde",
  components: {
    FormWizard,
    TabContent,
    WizardButton
  },
  methods: {
    installApp(orgId, repoId) {
      window.location.href =
        `https://github.com/apps/adde-to/installations/new/permissions?suggested_target_id=` +
        orgId +
        `&repository_ids[]=` +
        repoId;
    },
    async selectOrg(org) {
      this.reposLoading = true;
      this.repos = "";
      this.$refs.wizard.nextTab();
      this.selectedOrg = org;
      this.repos = await this.callApi("/orgs/" + org.login + "/repos");
      this.reposLoading = false;
    },
    async selectRepo(repo) {
      this.$refs.wizard.nextTab();
      this.selectedRepo = repo;
    },
    async getToken() {
      // Get the access token from the auth wrapper
      this.token = await this.$auth.getTokenSilently();
    },
    async callApi(endpoint) {
      // Use Axios to make a call to the API
      const { data } = await axios.get("http://localhost:3000" + endpoint, {
        headers: {
          Authorization: `Bearer ${this.token}` // send the access token through the 'Authorization' header
        }
      });
      return data;
    }
  },
  watch: {
    "$auth.isAuthenticated": function() {
      this.callApi();
    }
  },
  async mounted() {
    if (!this.$auth.loading) {
      await this.getToken();
      this.orgs = await this.callApi("/orgs");
    }
  },
  data() {
    return {
      orgs: [],
      reposLoading: false,
      selectedOrg: false,
      selectedRepo: true,
      token: false,
      repos: []
    };
  }
};
</script>