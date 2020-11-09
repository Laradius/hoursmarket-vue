<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
          <form @submit="loginPost" class="formInside">
            <p>Email:</p>
            <input v-model="email" class="form-control" type="email" required />
            <br />
            <p>Password:</p>
            <input
              ref="loginbutton"
              v-model="password"
              class="form-control"
              type="password"
              required
            />
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

      var vm = this;
      var errorOccured = false;
      var error = null;
      this.$refs.loginbutton.disabled = true;

      axios
        .post("http://api.hourmarket.hostingasp.pl/api/login", {
          email: this.email,
          password: this.password,
        })
        .catch(function (err) {
          error = err;
          errorOccured = true;
        })
        .then(function (response) {
          if (!errorOccured) {
            localStorage.token = response.data;
            vm.$router.push("/");
          } else {
            vm.axiosHandleErrors(error);
          }
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
