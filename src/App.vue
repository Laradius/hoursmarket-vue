<template>
  <div id="app">
  
    <Header></Header>
  <Logout v-if="tokenExists" class="logout-button"></Logout>
    <div id="nav">
      <router-link v-if="tokenExists" to="/">Home</router-link> 
      <span v-if="tokenExists">|</span>
       <router-link v-if="tokenExists" to="/MyHours">My Hours</router-link>
      <router-link v-if="!tokenExists" to="/login">Login</router-link>
      <span v-if="!tokenExists">|</span>
      <router-link v-if="!tokenExists" to="/register">Register</router-link> 
    </div>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Logout from "./components/Logout.vue";

export default {
  components: {
    Header,
    Footer,
    Logout,
  },


  mounted() {
    this.registerTokenExists = localStorage.registerToken != null;
    this.tokenExists = localStorage.token != null;

    // eslint-disable-next-line no-empty
    if (this.$route.name == "Confirmation") {
    } else if (this.tokenExists) {
      if (this.$route.name != "Home" && this.$route.name != "MyHours" && this.$route.name !="EditHourOffer") {
        this.$router.push("/");
      }
    } else if (!this.registerTokenExists && this.$route.name == "RegisterEnd") {
      if (this.tokenExists) this.$router.push("/");
      else this.$router.push("/login");
    } else if (
      !(this.$route.name == "RegisterEnd") &&
      !this.tokenExists &&
      this.$route.name != "Login" &&
      this.$route.name != "Register"
    ) {
      this.$router.push("/login");
    }
  },

  updated() {
    this.registerTokenExists = localStorage.registerToken != null;
    this.tokenExists = localStorage.token != null;
    // eslint-disable-next-line no-empty
    if (this.$route.name == "Confirmation") {
    } else if (this.tokenExists) {
      if (this.$route.name != "Home" && this.$route.name != "MyHours" && this.$route.name !="EditHourOffer") {
        this.$router.push("/");
      }
    } else if (!this.registerTokenExists && this.$route.name == "RegisterEnd") {
      if (this.tokenExists) this.$router.push("/");
      else this.$router.push("/login");
    } else if (
      !(this.$route.name == "RegisterEnd") &&
      !this.tokenExists &&
      this.$route.name != "Login" &&
      this.$route.name != "Register"
    ) {
      this.$router.push("/login");
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
  min-height: 100vh;
  background: url("/images/background.jpg");
  background-size: 100% 1400px;
  background-repeat: no-repeat;
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
