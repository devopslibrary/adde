<template>
  <div id="wrapper" v-highlight>
    <div id="examples">
      <div class="example">
        <span class="headline">
          Add Data via <span class="blue--text">REST</span>
        </span>
        <!-- prettier-ignore -->
        <pre>
    <code-highlight>
curl rest.adde.to/org/repo \
-H 'Content-Type: text/json' \
-d @- &lt;&lt; EOF
{
  "object:name": "ind01pr",
  "object:type": "datacenter",
  "location": "IND Colocation",
  "dns": {
    "primary": "8.8.8.8",
    "secondary": "4.2.2.2"
  }
}
EOF
    </code-highlight>
    </pre>
      </div>
      <div id="black" class="example">
        <span class="headline">Or PowerShell</span>
        <!-- prettier-ignore -->
        <pre>
          <code-highlight>
$dns = @{primary='10.0.0.50'
         secondary='10.0.0.51'}
$sfo01 = @{}
$sfo01.Add("dns_servers", $dns)
$sfo01.Add("location", "SFO DR DC")
Configure-AddeServer -Org OrgName `
                     -AuthToken $token
Update-AddeObject -Name sfo01 `
                  -Type datacenter `
                  -Values $sfo01
          </code-highlight>
        </pre>
      </div>
      <div class="example">
        <span class="headline">Or Git</span>
        <!-- prettier-ignore -->
        <pre>
    <code-highlight>
git clone yourDDrepo.git
mkdir datacenter
cd datacenter
// Create las1dc.json
git add las1dc.json
git push origin master
    </code-highlight>
    </pre>
      </div>
    </div>
  </div>
</template>

<script>
import "@/scss/_code-samples.scss";
import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";

export default {
  name: "TheHero",
  components: {
    CodeHighlight
  }
};
</script>

<style  lang="scss">
.v-application code {
  background-color: black !important;
  color: #62b562 !important;
  font-size: 100% !important;
}
#examples {
  padding-top: 130px;
  display: flex;
  justify-content: center;
  width: 100%;
  div {
    padding: 0px calc(2vw);
  }
  div:nth-child(1) {
    animation: fade 1s 1s ease-in-out both;
  }
  div:nth-child(2) {
    animation: fade 1s 1.5s ease-in-out both;
  }
  div:nth-child(3) {
    animation: fade 1s 2s ease-in-out both;
  }
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translate(0, 30px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}

#wrapper {
  width: 100%;
  height: 620px;
  background-color: black;
}

.example {
  text-align: center;
  color: #fff;
}
</style>