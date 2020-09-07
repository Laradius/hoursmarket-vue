<template>
  <div>
    <form @submit="registerPost">
      <h3>Finish registration by typing password.</h3>

      <p>Password:</p>
      <input v-model="password" type="password" />
      <br />
      <br />
      <input type="submit" value="Register" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  destroyed() {
    console.log("aa");

    if (localStorage.getItem("registerToken") != null) {
      localStorage.removeItem("registerToken");
    }
  },

  beforeCreate() {
    this.token = this.$route.query.token;

    if (this.token != null) {
      localStorage.registerToken = this.token;
    } else {
      localStorage.removeItem("registerToken");
    }
  },

  name: "RegisterEnd",
  data() {
    return {
      password: "",
      token: "",
    };
  },

  methods: {
    registerPost(e) {
      e.preventDefault();

      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const bodyParameters = {
        password: this.password,
      };

      axios
        .post(
          "https://localhost:44318/api/register/finish",
          bodyParameters,
          config
        )
        .then(console.log)
        .catch(console.log);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
