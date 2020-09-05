<template>
  <div class="register">
    <RegisterBegin></RegisterBegin>
  </div>
</template>

<script>
// @ is an alias to /src

import RegisterBegin from "../components/RegisterBegin.vue";

export default {
  name: "Register",
  components: {
    RegisterBegin,
  },
};
</script>
