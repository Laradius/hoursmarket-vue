<template>
  <div class="logout">
    <button @click="logout" class="log-btn p-2">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Logout",

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.log-btn {
  border: 2px solid black;
  background-color: #42b983;
  border-radius: 10px;
}
</style>
