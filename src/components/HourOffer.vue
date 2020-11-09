<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 hourOffer">
          <p>Name: {{ name }}</p>
          <p>Project: {{ project }}</p>
          <p>Date: {{ begindateformatted }} to {{ enddateformatted }}</p>

          <button
            style="margin-right: 5px"
            @click="editHourOffer"
            v-if="owned"
            class="btn btn-primary"
          >
            Edytuj
          </button>

          <button
            :disabled="disabled"
            @click="deleteHourOffer"
            v-if="owned"
            class="btn btn-danger"
          >
            Usuwam!
          </button>
          <button
            :disabled="disabled"
            @click="takeHourOffer"
            v-if="!owned"
            class="btn btn-primary"
          >
            Biorę!
          </button>
        </div>
        <div class="col"></div>
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
    editHourOffer() {
      this.$router.push({
        name: "EditHourOffer",
        params: {
          id: this.id,
          originpath: this.$route,
        },
      });
    },
    deleteHourOffer() {
      var vm = this;
      var errorOccured = false;
      var error = null;
      this.disabled = true;
      axios
        .delete("http://api.hourmarket.hostingasp.pl/api/houroffers/" + vm.id, {
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
      this.disabled = true;

      axios
        .delete(
          "http://api.hourmarket.hostingasp.pl/api/houroffers/takehouroffer/" +
            vm.id,
          {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          }
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

  data() {
    return {
      begindateformatted: moment(this.begindate).format("DD/MM/YYYY H:mm"),
      enddateformatted: moment(this.enddate).format("DD/MM/YYYY H:mm"),
      disabled: false,
    };
  },

  props: ["id", "name", "project", "begindate", "enddate", "owned"],
};
</script>

<style scoped>
.hourOffer {
  min-width: 250px;
}
</style>