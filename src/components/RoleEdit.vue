<template>
  <div v-cloak>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
          <form @submit="changeRole" class="form-group">
            <span>Set role by email: </span>
            <br />
            <br />
            <input v-model="email" class="form-control" type="email" required />
            <br />

            <select v-model="selected" class="custom-select" required>
              <option hidden disabled :value="null">Select option</option>
              <option
                v-bind:value="role.value"
                :key="role.value"
                v-for="role in roles"
              >
                {{ role.role }}
              </option>
            </select>
            <br />
            <br />
            <input
              :disabled="this.selected == null"
              type="submit"
              class="btn btn-primary"
              value="Proceed"
            />
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
  name: "RoleEdit",

  components: {},

  data() {
    return {
      selected: null,
      roles: null,
      email: null,
    };
  },

  methods: {
    changeRole(e) {
      e.preventDefault();
      var vm = this;
      var errorOccured = false;
      var error = null;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      const bodyParameters = {
        email: this.email,
        value: this.selected,
      };

      axios
        .post(
          "http://api.hourmarket.pl/api/adminpanel/changerole",
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
                message: "Request completed with no errors.",
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

  beforeMount() {
    var vm = this;

    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };

    axios
      .get("http://api.hourmarket.pl/api/adminpanel/getroles", config)
      .then(function (response) {
        vm.roles = response.data;
      });
  },
};
</script>

<style scoped>
</style>