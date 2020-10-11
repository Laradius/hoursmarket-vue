<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4 hourOffer">
          <p>Name: {{ name }}</p>
          <p>Date: {{ begindateformatted }} to {{ enddateformatted }}</p>
          <button @click="deleteHourOffer" v-if="owned" class="btn btn-danger">
            Usuwam!
          </button>
          <button @click="takeHourOffer" v-if="!owned" class="btn btn-primary">
            Biorę!
          </button>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "HourOffer",

  methods: {
    deleteHourOffer() {
      var vm = this;
      var errorOccured = false;
      var error = null;
      axios
        .delete("http://localhost:7777/api/houroffers/" + vm.id, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
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

    takeHourOffer() {
      var vm = this;
      var errorOccured = false;
      var error = null;
      axios
        .delete("http://localhost:7777/api/houroffers/takehouroffer/" + vm.id, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
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

  data() {
    return {
      begindateformatted: moment(this.begindate).format("DD/MM/YYYY H:mm"),
      enddateformatted: moment(this.enddate).format("DD/MM/YYYY H:mm"),
    };
  },

  props: ["id", "name", "begindate", "enddate", "owned"],
};
</script>
