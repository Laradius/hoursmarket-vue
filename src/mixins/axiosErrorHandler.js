import Vue from "vue";

Vue.mixin({
  methods: {
    axiosHandleErrors(error) {
      var vm = this;

      if (error.message == "Network Error") {
        vm.$router.push({
          name: "Confirmation",
          params: {
            message: "Connection to the API failed.",
            error: true,
            pushroute: "/",
          },
        });
      } else if (error.response.status == 403) {
        vm.$router.push({
          name: "Confirmation",
          params: {
            message:
              "Error code: 403 (You are not permitted to view this resource.)",
            error: true,
            pushroute: "/",
          },
        });
      } else if (error.response.status == 401) {
        vm.$router.push({
          name: "Confirmation",
          params: {
            message:
              "Error code: 401 (Unauthorized. Login failed or not logged in.)",
            error: true,
            pushroute: "/",
          },
        });
      } else if (error.response.status == 400) {
        vm.$router.push({
          name: "Confirmation",
          params: {
            message:
              "Error code: 400 (Malicious action e.g., malformed request syntax, invalid request message framing, or deceptive request routing)",
            error: true,
            pushroute: "/",
          },
        });
      } else if (error.response.status == 409) {
        vm.$router.push({
          name: "Confirmation",
          params: {
            message:
              "Error code: 409 (Registration cannot be finished because of data conflict. The specified email already exists in database.)",
            error: true,
            pushroute: "/",
          },
        });
      } else if (error.response.status == 404) {
        vm.$router.push({
          name: "Confirmation",
          params: {
            message:
              "Error code: 404 (Resource not found. It happens when resource doesn't exist. Perhaps the resource you wanted to use was already taken by other user.)",
            error: true,
            pushroute: "/",
          },
        });
      }
    },
  },
});
