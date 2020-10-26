<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
<p v-if="badPassword" class="text-danger  p-4 ">Password must contain minimum eight characters, at least one letter, one number and one special character</p>

          <form @submit="registerPost">
            <h3>Finish registration by typing password.</h3>
            <br />
            <p>Password:</p>
            <input v-model="password" class="form-control" type="password" required/>
            <br />
            <br />
            <input type="submit" class="btn btn-primary" value="Register" />
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
  destroyed() {
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
      badPassword: false,
    };
  },

  methods: {
    registerPost(e) {
      var vm = this;
      var errorOccured = false;
      var error = null;

      e.preventDefault();
var reg = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,32}$");
      if(!reg.test(this.password)) {
        this.badPassword = true;
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${localStorage.registerToken}` },
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
        .catch(function (err) {
          error = err;
          errorOccured = true;
        })
        .then(function () {
          if (!errorOccured) {
            vm.$router.push({
              name: "Confirmation",
              params: {
                message: "Registration completed. You can log in now.",
                error: false,
                pushroute: "/Login",
              },
            });
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
