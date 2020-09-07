<template>
  <div class="home">
    <HourPreview></HourPreview>
  </div>
</template>

<script>
// @ is an alias to /src

import HourPreview from "../components/HoursPreview.vue";

export default {
  name: "Home",
  components: {
    HourPreview,
  },
};
</script>
