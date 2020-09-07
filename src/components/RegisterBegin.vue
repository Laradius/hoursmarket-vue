<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-4 formBorder">
          <form @submit="registerPost">
            <p>Name:</p>
            <input v-model="name" class="form-control" type="text" />
            <br />
            <p>Email:</p>
            <input v-model="email" class="form-control" type="email" />
            <br />
            <br />
            <input
              type="submit"
              class="btn btn-primary"
              value="Send Registration Link"
            />
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterBegin",
  data() {
    return {
      email: "",
      name: "",
    };
  },

  methods: {
    registerPost(e) {
      e.preventDefault();
      axios
        .post("https://localhost:44318/api/register", {
          email: this.email,
          name: this.name,
        })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
