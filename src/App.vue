<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />
  </div>
</template>


<script>
export default {
  updated() {
    this.registerTokenExists = localStorage.registerToken != null;
    this.tokenExists = localStorage.token != null;

    if (this.$route.name == "RegisterEnd") {
      if (!this.registerTokenExists) {
        this.$router.push("/");
      }
    } else {
      if (!this.tokenExists) {
        if (this.$route.name != "Register") {
          if (this.$route.name != "Home") {
            this.$router.push("/");
          }
        }
      }
    }
  },

  data() {
    return {
      registerTokenExists: localStorage.registerToken != null,
      tokenExists: localStorage.token != null,
    };
  },

  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
