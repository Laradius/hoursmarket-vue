<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
          <form @submit="postHour">
            <p>Dodaj godziny</p>
            <input v-model="date" class="form-control" type="date" />
            <br />
            <input v-model="beginhour" class="form-control" type="time" />
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
      date: null,
    };
  },

  methods: {
    postHour(e) {
      e.preventDefault();

      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };

      const bodyParameters = {
        begindate: moment
          .utc(this.date.toString() + " " + this.beginhour.toString())
          .toDate(),
        enddate: moment
          .utc(this.date.toString() + " " + this.endhour.toString())
          .toDate(),
      };

      axios
        .post("https://localhost:44318/api/houroffers", bodyParameters, config)
        .then(console.log)
        .catch(console.log);
    },
  },
};
</script>