<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-8 col-md-4 formBorder">
          <form @submit="registerPost">
            <p>Name:</p>
            <input v-model="name" class="form-control" type="text" required />
            <br />
            <p>Email:</p>
            <input v-model="email" class="form-control" type="email" required />
            <br />
            <p>Zakładając konto zgadzasz się z polityką prywatności.</p>
            <input
              ref="registerbutton"
              type="submit"
              class="btn btn-primary"
              value="Rozpocznij"
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
  name: "RegisterBegin",
  data() {
    return {
      email: "",
      name: "",
    };
  },

  methods: {
    registerPost(e) {
      var vm = this;
      var errorOccured = false;
      var error = null;
      this.$refs.registerbutton.disabled = true;
      e.preventDefault();
      axios
        .post("http://api.hourmarket.pl/api/register", {
          email: this.email,
          name: this.name,
        })
        .catch(function (err) {
          error = err;
          errorOccured = true;
        })
        .then(function () {
          if (!errorOccured) {
            vm.$router.push({
              name: "Confirmation",
              params: {
                message:
                  "Request completed with no errors. Check your email to complete registration.",
                error: false,
                pushroute: "/",
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
