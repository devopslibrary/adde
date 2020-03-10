import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify, {
  options: {
    customProperties: true
  }
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#007eff",
        secondary: "#62b562",
        accent: "#ff7700",
        error: "#b71c1c"
      }
    }
  }
});
