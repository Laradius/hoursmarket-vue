<template>
  <div v-cloak>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
          <form @submit="changeRole" class="form-group">
            <span>Set project by email: </span>
            <br />
            <br />
            <input v-model="email" class="form-control" type="email" required />
            <br />

            <select v-model="selected" class="custom-select" required>
              <option hidden disabled :value="null">Select option</option>
              <option
                v-bind:value="project.value"
                :key="project.id"
                v-for="project in projects"
              >
                {{ project.project }}
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
      projects: null,
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
          "http://api.hourmarket.hostingasp.pl/api/adminpanel/changeproject",
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
      .get(
        "http://api.hourmarket.hostingasp.pl/api/data/getcurrentprojects",
        config
      )
      .then(function (response) {
        vm.projects = response.data;
      });
  },
};
</script>

<style scoped>
</style>