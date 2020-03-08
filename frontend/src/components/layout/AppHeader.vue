<template>
  <header>
    <img class="logo" src="@/assets/logo.svg" alt="logo" />
    <nav>
      <ul>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <div v-if="!$auth.loading" class="loginOrRegister" href="#">
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      <button v-if="!$auth.isAuthenticated" @click="signup">Sign Up</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Signup
    signup() {
      this.$auth.loginWithRedirect({
        login_hint: ""
      });
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
<style scoped lang="scss">
.logo {
  cursor: pointer;
  margin-right: auto;
}
header {
  display: flex;
  align-items: center;
  padding: 30px 10%;
  height: 65px;
  background-color: $primary;
}
nav {
  li {
    list-style: none;
    display: inline-block;
    padding: 0 20px;
    a {
      color: #fff;
      transition: all 0.3s ease 0s;
    }
  }
}
nav li a:hover {
  color: $secondary;
}
button {
  padding: 9px 25px;
  margin-left: 5px;
  background-color: $secondary;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
</style>