<template>
  <LayoutDefault>
    <div v-if="!$auth.loading">
      <div v-if="$auth.isAuthenticated">
        <br />
        <h1>Which org would you like to install Adde on?</h1>
      </div>
      <div v-if="!$auth.isAuthenticated">
        <AppHero />
        <v-row class="pt-10 secondary"> </v-row>
        <v-row class="text-center pt-11 pb-12" justify="center">
          <v-flex xs6>
            <div class="display-1 pb-5" style="padding-top: 130px">
              And receive a fully managed REST &amp; GraphQL API server
            </div>
            <span class="headline">
              ADDE (Automated Declarative Data Engine) allows you to automate
              handoffs and reduce miscommunication between your teams by
              allowing them to create incredibly easy to use APIs without
              needing development experience. Each team is able to provide and
              consume data in the way they prefer, with schema validation and
              API endpoints generated instantly, with all data stored within a
              git repository.
            </span>
          </v-flex>
        </v-row>
        <v-row
          style="padding-bottom: 100px; padding-top: 130px; min-height: 500px; margin-top: 150px; margin-bottom: 200px; background-color: #e6e8ec"
        >
          <v-flex xs2></v-flex>

          <v-flex xs3>
            <div class="display-1 pb-5">What is declarative data?</div>

            <span class="subtitle-1	">
              Declarative data is what we call output from one team (often found
              in conversations within JIRA &amp; Service Now tickets, excel
              sheets, and occasionally a very outdated CMDB) that's consumed by
              one or more other teams. It's those things that don't always fit
              into Terraform or your configuration management tool of choice,
              either due to a lack of provider, silo'd teams, difficult to use
              APIs, etc.
            </span>
          </v-flex>
          <v-flex xs2></v-flex>
          <v-flex>
            <div class="display-1 pb-5">Examples</div>
            <ul class="subtitle-1">
              <li>SRE: What DNS Servers should I use in X datacenter?</li>
              <li>NOC: What's the IPMI/iLO IP for X host?</li>
              <li>
                QA: What version of the application is deployed in X
                environment?
              </li>
              <li>
                SRE: What application types do we have? I want to make a
                dropdown
              </li>
            </ul>
          </v-flex>
          <v-flex xs2></v-flex>
        </v-row>
        <v-row style="margin-bottom: 200px;">
          <v-flex xs2></v-flex>

          <v-flex xs4>
            <v-card raised>
              <v-img aspect-ratio="1.73" contain src="../assets/sample.png" />
            </v-card>
          </v-flex>
          <v-flex xs1></v-flex>
          <v-flex xs2>
            <div class="display-1 pb-5">
              What does having an API for declarative data let me do?
            </div>
            <p class="subtitle-1	">
              Let's say you have one team managing infrastructure, and another
              developing applications. Both teams meet up, and agree that every
              time a new app server is deployed, a set of information has to be
              provided by the devs (name of application, responsible team's
              email address, maintenance windows etc.) to infrastructure. The
              infra team then provides information back, such as IP address,
              hostname, public VIP, etc.
            </p>
            <p class="subtitle-1	">
              Typically, all of that information ends up living &amp; dying in a
              ticket. By having an API in front of the information, it leads to
              being able to easily create a script that say, hits the API to get
              a list of application servers, emails the owners, connects via
              hostname to patch them, and lastly updates the declarative data
              with patch level, etc. The dev team could then take that same API
              and query it to build a dashboard showing exactly what version of
              the apps are deployed.
            </p>
          </v-flex>
          <v-flex xs2></v-flex>
        </v-row>
        <v-row
          justify="center"
          class="white--text text-center"
          style="background: #3d464f; min-height: 500px; padding-top: 100px; padding-bottom: 100px;"
        >
          <v-flex xs3>
            <div class="display-1 pb-5">What about ...?</div>
            <p class="subtitle-1	">
              You might be thinking, we can just use Terraform/Chef/Helm/MySQL
              database for all of this information.
            </p>
            <p class="subtitle-1	">
              You aren't wrong, and in a perfect world everyone aligns on a
              single technology. That is unfortunately very difficult the larger
              a company grows, as teams naturally settle on different tool
              chains. Chef is fantastic for managing VMs, but isn't going to do
              much for the storage team trying to manage LUNs.
            </p>
            <p class="subtitle-1	">
              ADDE allows each team to specialize and choose the tools they
              prefer, yet align across the entire organization on one common
              language, JSON. All of the data is stored and easily accessed
              within a Git repository. By providing APIs in front of that data,
              ADDE makes it incredibly easy to consume regardless of tooling or
              language. ADDE also utilizes JSON Schema to prevent bad data.
            </p>
          </v-flex>
        </v-row>
        <!-- <v-row class="text-center pt-11 pb-12 mt-12" justify="space-between">
          <v-col cols="12">
            <div class="display-1 pb-5">
              Example Generated REST and GraphiQL Endpoints
            </div>
          </v-flex>
        </v-row>
        <v-row>
          <v-flex xs6>
            <div class="white pt-12">
              <div class="swagger">
                <iframe
                  class="resp-iframe"
                  src="http://devopslibrary.sampledata.adde.to/swagger/"
                  title="Swagger"
                ></iframe>
              </div>
            </div>
          </v-flex>
        </v-row> -->
      </div>

      <div class="footer"></div>
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
  }
};
</script>

<style scoped lang="scss">
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
  // .darkWash {
  //   font-weight: 300;
  //   color: #202020;
  //   font-size: 18px;
  //   line-height: 28.8px;
  //   box-sizing: border-box;
  //   border: none;
  //   margin: 0;
  //   padding: 0;
  //   font-family: "Nunito", sans-serif;
  //   background: #3d464f;
  //   box-shadow: inset 0 30px 30px -30px rgba(0, 0, 0, 0.35),
  //     inset 0 -20px 30px -30px rgba(0, 0, 0, 0.35);
  //   overflow: hidden;
  //   position: relative;
  // }
}
</style>
