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

            <div :key="project.value" v-for="project in projects">
              <input
                name="project"
                v-on:change="changed()"
                type="checkbox"
                :value="project.value"
              />
              <span>{{ project.project }}</span>
            </div>
            <br />
            <input
              :disabled="disabled"
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
      projects: null,
      email: null,
      selected: null,
      disabled: true,
    };
  },

  methods: {
    changed() {
      if (
        document.querySelectorAll("input[name=project]:checked").length <= 0
      ) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },

    changeRole(e) {
      e.preventDefault();
      var vm = this;
      var errorOccured = false;
      var error = null;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      var selectedProjects = "";
      var checkedBoxes = document.querySelectorAll(
        "input[name=project]:checked"
      );

      for (let i = 0; i < checkedBoxes.length; i++) {
        if (i == checkedBoxes.length - 1) {
          selectedProjects += checkedBoxes[i].value;
        } else {
          selectedProjects += checkedBoxes[i].value + ";";
        }
      }

      const bodyParameters = {
        email: this.email,
        value: selectedProjects,
      };

      axios
        .post(
          "http://api.hourmarket.pl/api/adminpanel/changeproject",
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
      .get("http://api.hourmarket.pl/api/data/getcurrentprojects", config)
      .then(function (response) {
        vm.projects = response.data;
      });
  },
};
</script>

<style scoped>
</style>