<template>
  <div>
    <form @submit="loginPost">
      <p>Email:</p>
      <input v-model="email" type="email" />
      <br />
      <p>Password:</p>
      <input v-model="password" type="password" />
      <br />
      <br />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginPost(e) {
      e.preventDefault();

      axios
        .post("https://localhost:44318/api/login", {
          email: this.email,
          password: this.password,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
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
