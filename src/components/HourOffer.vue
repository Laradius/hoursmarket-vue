<template>
  <div>
    <p>Name: {{ name }}</p>
    <p>From {{ begindateformatted }} to {{ enddateformatted }}</p>
    <button>Biorę!</button>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "HourOffer",

  data() {
    return {
      begindateformatted: moment(this.begindate).format("DD/MM/YYYY H:mm"),
      enddateformatted: moment(this.enddate).format("DD/MM/YYYY H:mm"),
    };
  },

  props: ["id", "name", "begindate", "enddate"],
};
</script>
