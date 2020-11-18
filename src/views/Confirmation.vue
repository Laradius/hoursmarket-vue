<template>
  <div>
    <p v-if="!error" class="text-success confirmationMsg bg-dark p-4 rounded">
      {{ message }}
    </p>
    <p v-if="error" class="text-danger confirmationMsg bg-dark p-4 rounded">
      {{ message }}
    </p>
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

<style>
.confirmationMsg {
  width: 65%;
  margin: auto;
}
</style>
