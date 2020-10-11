<template>
  <div class="home">
    <HourOfferForm
      :unassigned="unassigned"
      :apiOffline="notConnected"
    ></HourOfferForm>
    <HourPreview></HourPreview>
  </div>
</template>

<script>
// @ is an alias to /src

import HourPreview from "../components/HoursPreview.vue";
import HourOfferForm from "../components/HourOfferForm.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HourPreview,
    HourOfferForm,
  },

  data() {
    return {
      unassigned: false,
      notConnected: true,
    };
  },

  beforeMount() {
    var vm = this;

    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };

    axios
      .get("https://localhost:44318/api/houroffers/checkunassigned", config)
      .then(function (response) {
        vm.unassigned = response.data.unassigned;
        vm.notConnected = false;
      })
      .catch((vm.notConnected = true));
  },
};
</script>
