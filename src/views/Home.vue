<template>
  <div class="home">
    <HourOfferForm></HourOfferForm>
    <HourPreview></HourPreview>
  </div>
</template>

<script>
// @ is an alias to /src

import HourPreview from "../components/HoursPreview.vue";
import HourOfferForm from "../components/HourOfferForm.vue";

export default {
  name: "Home",
  components: {
    HourPreview,
    HourOfferForm,
  },
};
</script>
