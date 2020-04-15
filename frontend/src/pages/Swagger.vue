<template>
  <LayoutDefault>
    <div id="swagger-ui"></div>
  </LayoutDefault>
</template>

<script>
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist";
import "swagger-ui-dist/swagger-ui.css";
import LayoutDefault from "../components/LayoutDefault.vue";
import axios from "axios";
import { authComputed } from "../store/helpers";

export default {
  name: "RepoDashboard",
  async mounted() {
    let url = "http://localhost:3000/swagger.json/devopslibrary/sample-data";
    this.swaggerJSON = await this.getSwaggerJSON(
      "/swagger.json/kar-auto/datacenter-inventory"
    );
    let spec = this.swaggerJSON;
    this.buildSwagger({ url: url, spec: spec });
  },
  components: {
    LayoutDefault
  },
  methods: {
    async buildSwagger(args) {
      let presets = [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset[2]
      ];
      const token = this.getToken;
      const ui = SwaggerUIBundle({
        url: 'http://localhost:3000/swagger.json/devopslibrary/sample-data"',
        spec: args.spec,
        dom_id: "#swagger-ui",
        deepLinking: false,
        filter: true,
        presets: presets,
        plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        layout: "StandaloneLayout",
        requestInterceptor: function(request) {
          request.headers.Authorization = "Bearer " + token;
          return request;
        }
      });
      window.ui = ui;
    },
    async getSwaggerJSON(endpoint) {
      const { data } = await axios.get("http://localhost:3000" + endpoint);
      return data;
    }
  },
  data() {
    return {
      swaggerJSON: ""
    };
  },
  computed: {
    ...authComputed
  }
};
</script>

<style>
.v-application .info {
  background-color: #fff !important;
}
</style>
