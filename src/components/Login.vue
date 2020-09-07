<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
          <form @submit="loginPost" class="formInside">
            <p>Email:</p>
            <input v-model="email" class="form-control" type="email" />
            <br />
            <p>Password:</p>
            <input v-model="password" class="form-control" type="password" />
            <br />
            <br />
            <input type="submit" class="btn btn-primary" value="Login" />
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>
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
          localStorage.token = response.data;
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
