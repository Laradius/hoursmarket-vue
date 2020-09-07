<template>
  <div id="app">
    <Header></Header>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },

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
.hourOffer {
  border: 2px solid black;
  background-color: rgba(46, 54, 53, 1);
  margin: 10px 0px;
  padding: 20px;
  border-radius: 15px;
  color: rgb(66, 185, 131);
}

body {
  height: 100vh;
  background: url("/images/background.jpg");
  background-size: cover; /* <------ */
  background-repeat: no-repeat;
  background-position: center center; /* optional, center the image */
}

#nav a {
  color: white !important;
}

#nav a.router-link-exact-active {
  color: #42b983 !important;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.formBorder {
  border: 2px solid black;
  padding: 50px !important;
  border-radius: 15px;
  background-color: rgba(46, 54, 53, 1);

  color: rgb(66, 185, 131);
}

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
