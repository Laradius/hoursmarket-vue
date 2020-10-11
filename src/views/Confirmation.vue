<template>
  <div>
    <span v-if="!error" class="text-success bg-dark p-4 rounded">
      {{ message }}
    </span>
    <span v-if="error" class="text-danger bg-dark p-4 rounded">
      {{ message }}
    </span>
    <br />
    <br />
    <br />

    <button @click="pushRoute" class="btn btn-primary">
      Zabierz mnie z powrotem!
    </button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Confirmation",
  props: ["message", "error", "pushroute"],

  methods: {
    pushRoute() {
      this.$router.push(this.pushRoute);
    },
  },

  beforeMount() {
    if (this.message == null) {
      this.$router.push("/");
    }
  },
  data() {
    return {};
  },
};
</script>

<style></style>
