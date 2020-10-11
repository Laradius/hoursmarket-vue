<template >
  <div v-cloak>
    <span
      v-if="apiOffline && requestDone"
      class="text-danger bg-dark p-4 rounded"
    >
      API server is offline. Contact page administrator.
    </span>
    <span
      v-if="unassigned && requestDone"
      class="text-warning bg-dark p-4 rounded"
    >
      You are not assigned to any project. Contact page administrator.
    </span>

    <div v-if="!unassigned && !apiOffline && requestDone" class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
          <form @submit="postHour">
            <p>Dodaj godziny</p>

            <p class="text-danger" v-if="error">{{ errorMessage }}</p>

            <input v-model="begindate" class="form-control" type="date" />
            <br />
            <input v-model="beginhour" class="form-control" type="time" />
            <br />
            <input v-model="enddate" class="form-control" type="date" />
            <br />
            <input v-model="endhour" class="form-control" type="time" />
            <br />
            <br />
            <input type="submit" class="btn btn-primary" value="Wystaw" />
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "HourOfferForm",
  data() {
    return {
      endhour: null,
      beginhour: null,
      begindate: null,
      enddate: null,
      unassigned: false,
      apiOffline: true,
      requestDone: false,
      errorMessage: null,
      error: false,
    };
  },

  beforeMount() {
    var vm = this;

    const config = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    vm.apiOffline = true;
    axios
      .get("http://localhost:7777/api/houroffers/checkunassigned", config)
      .then(function (response) {
        vm.unassigned = response.data.unassigned;
        vm.apiOffline = false;
        vm.requestDone = true;
      })
      .catch(function (error) {
        console.log(error);
        vm.apiOffline = true;
        vm.requestDone = true;
      });
  },

  methods: {
    validateDates() {
      if (
        this.begindate == null ||
        this.enddate == null ||
        this.beginhour == null ||
        this.endhour == null
      ) {
        this.error = true;
        this.errorMessage = "Należy wprowadzić wszystkie dane.";
        return false;
      }

      var date1 = moment
        .utc(this.begindate.toString() + " " + this.beginhour.toString())
        .toDate();

      var date2 = moment
        .utc(this.enddate.toString() + " " + this.endhour.toString())
        .toDate();

      var dateNow = Date.UTC();
      var date1Tomorrow = new Date(date1);
      date1Tomorrow.setDate(date1Tomorrow.getDate() + 1);

      if (date1 <= dateNow) {
        this.error = true;
        this.errorMessage =
          "Niepoprawna data. Data początkowa musi być większa niż teraźniejsza.";
        return false;
      } else if (date1 >= date2) {
        this.error = true;
        this.errorMessage =
          "Niepoprawna data. Data końcowa musi być większa niż końcowa.";
        return false;
      } else if (date2 >= date1Tomorrow) {
        this.error = true;
        this.errorMessage =
          "Niepoprawna data. Data końcowa może być maksymalnie o jeden dzień większa.";
        return false;
      }

      return true;
    },
    postHour(e) {
      e.preventDefault();
      var vm = this;
      var errorOccured = false;
      var error = null;
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      if (!this.validateDates()) {
        return;
      }

      const bodyParameters = {
        begindate: moment
          .utc(this.begindate.toString() + " " + this.beginhour.toString())
          .toDate(),
        enddate: moment
          .utc(this.enddate.toString() + " " + this.endhour.toString())
          .toDate(),
      };

      axios
        .post("http://localhost:7777/api/houroffers", bodyParameters, config)
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
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>