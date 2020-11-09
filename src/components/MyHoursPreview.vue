<template>
  <div class="hourOfferPreview">
    <span
      v-if="!this.unassigned && this.requestDone && hourOffers.length < 1"
      class="text-warning bg-dark p-4 rounded"
    >
      No hour offers currently posted. Post some at Home section.
    </span>

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

    <VueSlickCarousel v-if="hourOffers.length > 0" v-bind="settings">
      <div v-for="hourOffer in hourOffers" :key="hourOffer.id">
        <HourOffer
          :project="projects[hourOffer.project]"
          :id="hourOffer.id"
          :name="hourOffer.name"
          :begindate="hourOffer.beginDate"
          :enddate="hourOffer.endDate"
          :owned="hourOffer.owned"
        ></HourOffer>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import axios from "axios";
import HourOffer from "../components/HourOffer.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "MyHoursPreview",
  components: {
    HourOffer,
    VueSlickCarousel,
  },

  data() {
    return {
      hourOffers: [],
      settings: {
        dots: true,
        slidesToShow: 1,
        rows: 3,
        arrows: false,
      },
      requestDone: false,
      unassigned: true,
      apiOffline: true,
      projects: [],
    };
  },

  beforeMount() {
    var vm = this;

    axios
      .get("http://api.hourmarket.hostingasp.pl/api/data/getcurrentprojects", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(function (response) {
        vm.projectsObject = response.data;
        for (var i = 0; i < response.data.length; i++) {
          vm.projects[i] = response.data[i].project;
        }
      });

    const config1 = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };
    vm.apiOffline = true;
    axios
      .get(
        "http://api.hourmarket.hostingasp.pl/api/houroffers/checkunassigned",
        config1
      )
      .then(function (response) {
        vm.apiOffline = false;
        vm.requestDone = true;
        vm.unassigned = response.data.unassigned;
      })
      .catch(function (error) {
        console.log(error);
        vm.apiOffline = true;
        vm.requestDone = true;
      });

    const config2 = {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    };

    axios
      .get(
        "http://api.hourmarket.hostingasp.pl/api/houroffers/myoffers",
        config2
      )
      .then(function (response) {
        vm.hourOffers = response.data;
      });
  },
};
</script>


<style >
.hourOfferPreview {
  margin-bottom: 50px;
}

.slick-dots {
  bottom: -5px !important;
}

.slick-dots li button:before {
  color: white !important;
  opacity: 1;
}

.slick-dots li.slick-active button:before {
  color: orange !important;
  opacity: 1;
}
</style>