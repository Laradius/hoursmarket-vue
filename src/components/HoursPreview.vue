<template>
  <div class="hourOfferPreview">
    
    
<VueSlickCarousel  v-if="hourOffers.length > 0"  v-bind="settings">
    <div v-for="hourOffer in hourOffers" :key="hourOffer.id">
      <HourOffer
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
import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {




  name: "HoursPreview",
  components: {
    HourOffer,
    VueSlickCarousel
  },

  data() {
    return {
      hourOffers: [],
      settings: {
  "dots": true,
  "slidesToShow": 1,
  "rows": 3,
}
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
      
      });
  },
};
</script>


<style >
.hourOfferPreview {
  margin-bottom: 50px;

}

.slick-dots  {
  bottom: -5px !important;
}


.slick-dots li button:before {
    color: white !important;
    opacity: 1;
  }

  .slick-dots li.slick-active button:before {
    color:orange !important;
    opacity:1;
    
}


</style>