<template>
  <div class="home">
    <Login></Login>
    <HourPreview></HourPreview>
  </div>
</template>

<script>
// @ is an alias to /src

import Login from "../components/Login.vue";
import HourPreview from "../components/HoursPreview.vue";

export default {
  name: "Home",
  components: {
    Login,
    HourPreview,
  },
};
</script>
