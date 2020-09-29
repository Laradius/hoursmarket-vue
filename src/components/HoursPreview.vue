<template>
  <div class="hourOfferPreview">
    <div v-for="hourOffer in hourOffers" :key="hourOffer.id">
      <HourOffer
        :id="hourOffer.id"
        :name="hourOffer.name"
        :begindate="hourOffer.beginDate"
        :enddate="hourOffer.endDate"
      ></HourOffer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HourOffer from "../components/HourOffer.vue";

export default {
  name: "HoursPreview",
  components: {
    HourOffer,
  },

  data() {
    return {
      hourOffers: [],
    };
  },

  beforeMount() {
    var vm = this;

    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    axios
      .get("https://localhost:44318/api/houroffers", config)
      .then(function (response) {
        vm.hourOffers = response.data;
      })
      .catch(console.log);
  },
};
</script>


<style scoped>
.hourOfferPreview {
  margin-bottom: 50px;
}
</style>