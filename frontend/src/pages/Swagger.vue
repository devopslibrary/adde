<template>
  <LayoutDefault>
    <div id="swagger-ui"></div>
  </LayoutDefault>
</template>                                                                                                                             
                                                                                                                                        
<script>
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist";
import "swagger-ui-dist/swagger-ui.css";
// import "swagger-ui-themes/themes/3.x/theme-material.css";
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import axios from "axios";

export default {
  name: "RepoDashboard",
  props: ["napp"],
  async mounted() {
    let url = "http://localhost:3000/swagger.json/devopslibrary/sample-data";
    if (!this.$auth.loading) {
      await this.getToken();
      this.swaggerJSON = await this.getSwaggerJSON(
        "/swagger.json/kar-auto/datacenter-inventory"
      );
      let spec = this.swaggerJSON;
      this.buildSwagger({ url: url, spec: spec });
    }
  },
  components: {
    LayoutDefault
  },
  methods: {
    buildSwagger(args) {
      let presets = [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset[2]
      ];
      const ui = SwaggerUIBundle({
        url: args.url,
        spec: args.spec,
        dom_id: "#swagger-ui",
        deepLinking: false,
        filter: true,
        presets: presets,
        plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        layout: "StandaloneLayout"
      });
      window.ui = ui;
    },
    async getToken() {
      // Get the access token from the auth wrapper
      this.token = await this.$auth.getTokenSilently();
    },
    async getSwaggerJSON(endpoint) {
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
      this.getSwaggerJSON();
    }
  },
  data() {
    return {
      swaggerJSON: ""
    };
  }
};
</script> 

<style >
.v-application .info {
  background-color: #fff !important;
}
</style>