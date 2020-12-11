<template>
  <div v-if="connected">
    <RoleEdit></RoleEdit>
    <br />
    <ProjectEdit></ProjectEdit>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
// @ is an alias to /src

import RoleEdit from "../components/RoleEdit.vue";
import ProjectEdit from "../components/ProjectEdit.vue";
import axios from "axios";

export default {
  name: "AdminPanel",

  components: {
    RoleEdit,
    ProjectEdit,
  },

  data() {
    return {
      connected: false,
    };
  },

  beforeMount() {
    var vm = this;

    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    vm.apiOffline = true;
    axios
      .get("https://api.hourmarket.pl/api/adminpanel/checkrole", config)
      .then(function () {
        vm.connected = true;
      })
      .catch(function (error) {
        vm.axiosHandleErrors(error);
      });
  },
};
</script>
