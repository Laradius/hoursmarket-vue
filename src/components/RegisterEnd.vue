<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-8 col-md-4 formBorder">
          <p v-if="badPassword" class="text-danger p-4">
            Hasło musi zawierać minimum 8 znaków, przynajmniej jedną literę,
            jedną liczbę oraz jeden znak specjalny (@#$%). [Maksymalna długość
            hasła: 32]
          </p>

          <form @submit="registerPost">
            <h4 class="text-center">Zakończ rejestracje wpisując hasło.</h4>
            <br />
            <p>Hasło:</p>
            <input
              v-model="password"
              class="form-control"
              type="password"
              required
            />
            <br />
            <br />
            <input
              :disabled="disabled"
              type="submit"
              class="btn btn-primary"
              value="Zarejestruj"
            />
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
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
      disabled: false,
    };
  },

  methods: {
    registerPost(e) {
      var vm = this;
      var errorOccured = false;
      var error = null;
      e.preventDefault();
      var reg = new RegExp(
        "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,32})"
      );
      if (!reg.test(this.password)) {
        this.badPassword = true;
        return;
      }

      this.disabled = true;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.registerToken}` },
      };

      const bodyParameters = {
        password: this.password,
      };

      axios
        .post(
          "http://api.hourmarket.pl/api/register/finish",
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
