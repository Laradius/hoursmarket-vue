<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 hourOffer">
          <p>Name: {{ name }}</p>
          <p>From {{ begindateformatted }} to {{ enddateformatted }}</p>
          <button class="btn btn-primary">Biorę!</button>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
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
