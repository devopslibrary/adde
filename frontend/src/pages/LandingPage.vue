<template>
  <LayoutDefault>
    <AppHero />
    <v-row class="pt-10 secondary"> </v-row>
    <v-row class="text-center pt-11 pb-12" justify="center">
      <v-flex xs6>
        <div class="display-1 pb-5" style="padding-top: 130px">
          And receive a fully managed REST &amp; GraphQL API server
        </div>
        <span class="headline">
          ADDE (Automated Declarative Data Engine) allows you to automate
          handoffs and reduce miscommunication between your teams by allowing
          them to create incredibly easy to use APIs without needing development
          experience. Each team is able to provide and consume data in the way
          they prefer, with schema validation and API endpoints generated
          instantly, with all data stored within a git repository.
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
          Declarative data is what we call output from one team (often found in
          conversations within JIRA &amp; Service Now tickets, excel sheets, and
          occasionally a very outdated CMDB) that's consumed by one or more
          other teams. It's those things that don't always fit into Terraform or
          your configuration management tool of choice, either due to a lack of
          provider, silo'd teams, difficult to use APIs, etc.
        </span>
      </v-flex>
      <v-flex xs2></v-flex>
      <v-flex>
        <div class="display-1 pb-5">Examples</div>
        <ul class="subtitle-1">
          <li>SRE: What DNS Servers should I use in X datacenter?</li>
          <li>NOC: What's the IPMI/iLO IP for X host?</li>
          <li>
            QA: What version of the application is deployed in X environment?
          </li>
          <li>
            SRE: What application types do we have? I want to make a dropdown
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
          developing applications. Both teams meet up, and agree that every time
          a new app server is deployed, a set of information has to be provided
          by the devs (name of application, responsible team's email address,
          maintenance windows etc.) to infrastructure. The infra team then
          provides information back, such as IP address, hostname, public VIP,
          etc.
        </p>
        <p class="subtitle-1	">
          Typically, all of that information ends up living &amp; dying in a
          ticket. By having an API in front of the information, it leads to
          being able to easily create a script that say, hits the API to get a
          list of application servers, emails the owners, connects via hostname
          to patch them, and lastly updates the declarative data with patch
          level, etc. The dev team could then take that same API and query it to
          build a dashboard showing exactly what version of the apps are
          deployed.
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
          You aren't wrong, and in a perfect world everyone aligns on a single
          technology. That is unfortunately very difficult the larger a company
          grows, as teams naturally settle on different tool chains. Chef is
          fantastic for managing VMs, but isn't going to do much for the storage
          team trying to manage LUNs.
        </p>
        <p class="subtitle-1	">
          ADDE allows each team to specialize and choose the tools they prefer,
          yet align across the entire organization on one common language, JSON.
          All of the data is stored and easily accessed within a Git repository.
          By providing APIs in front of that data, ADDE makes it incredibly easy
          to consume regardless of tooling or language. ADDE also utilizes JSON
          Schema to prevent bad data.
        </p>
      </v-flex>
    </v-row>

    <div class="footer"></div>
  </LayoutDefault>
</template>

<script>
import LayoutDefault from "../components/LayoutDefault.vue";
import AppHero from "../components/AppHero.vue";

export default {
  name: "LandingPage",
  components: {
    LayoutDefault,
    AppHero
  }
};
</script>
