<template>
  <LayoutDefault>
    <AppHero />
    <div class="container" v-highlight>
      <div class="intro">
        <div>
          <h1>
            And receive a fully managed REST &amp; GraphQL API server
          </h1>
        </div>
        <div class="details">
          <h2>
            Adde (Automated Declarative Data Engine) allows you to automate
            handoffs and reduce miscommunication between your teams by allowing
            them to create incredibly easy to use APIs without needing
            development experience. Each team is able to provide and consume
            data in the way they prefer, with schema validation and API
            endpoints generated instantly, with all data stored within a git
            repository.
          </h2>
        </div>
      </div>
      <div class="swagger ">
        <iframe
          class="resp-iframe"
          src="http://devopslibrary.sampledata.adde.to/swagger/"
        ></iframe>
      </div>
      <div class="footer"></div>
      <!-- <div class="swagger demo">
        <img src="../assets/graphiql.png" />
      </div> -->
    </div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../components/layout/LayoutDefault.vue";
import AppHero from "../components/ui/AppHero.vue";

export default {
  name: "LandingPage",
  components: {
    LayoutDefault,
    AppHero
  },
  mounted() {
    console.log("mounted");
    console.log(this);
    this.$watch(
      () => {
        return this.$auth.isAuthenticated;
      },
      status => {
        console.log(status);
        if (status) {
          this.$router.push("getting-started");
        }
      },
      {
        deep: true
      }
    );
  }
};
</script>

<style scoped lang="scss">
.details {
  padding-top: 20px;
}

.intro {
  grid-area: intro;
  color: white;
}
.resp-iframe {
  position: absolute;
  top: 10;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
.footer {
  grid-area: footer;
  width: 100%;
  height: 100%;
}
.swagger {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  grid-area: swagger;
  width: 100%;
  height: 100%;
  padding-right: 0em;
  padding-top: 3rem;
  margin-top: 40px;
  border-radius: 6px;
  background-image: url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fillRule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="%23FF5F56" stroke="%23E0443E" strokeWidth=".5" /><circle cx="26" cy="6" r="6" fill="%23FFBD2E" stroke="%23DEA123" strokeWidth=".5" /><circle cx="46" cy="6" r="6" fill="%2327C93F" stroke="%231AAB29" strokeWidth=".5" /></g></svg>');
  background-repeat: no-repeat;
  background-position: 16px 16px;
  box-shadow: 5px 5px 15px 0px rgba(50, 50, 50, 0.75);

  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.container {
  width: 100%;
  background-color: $primary;
  display: grid;
  grid-template-columns: 25% auto auto 25%;
  grid-template-rows: 100px 100% 100% 100%;

  grid-template-areas:
    ". . . ."
    ". intro intro ."
    ". swagger swagger ."
    "footer footer footer footer";
}
</style>
