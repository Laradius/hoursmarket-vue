<template>
  <div class="home">
    <MyHourPreview></MyHourPreview>
  </div>
</template>

<script>
// @ is an alias to /src

import MyHourPreview from "../components/MyHoursPreview.vue";

export default {
  name: "Home",
  components: {
    MyHourPreview,
  },

  data() {
    return {
      unassigned: false,
      notConnected: true,
    };
  },
};
</script>
