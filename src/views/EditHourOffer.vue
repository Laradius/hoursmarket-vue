<template>
  <div>
    <HourOfferEditForm
      v-if="this.id != null"
      :id="this.id"
      :originpath="this.originpath"
    ></HourOfferEditForm>
  </div>
</template>

<script>
// @ is an alias to /src
import HourOfferEditForm from "../components/HourOfferEditForm.vue";

export default {
  name: "EditHourOffer",
  props: ["id", "originpath"],

  components: {
    HourOfferEditForm,
  },

  beforeMount() {
    if (this.id == null) {
      this.$router.push("/");
    }
  },

  data() {
    return {};
  },
};
</script>

<style></style>
