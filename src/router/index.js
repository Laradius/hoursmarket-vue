import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginView.vue";
import RegisterEnd from "../views/RegisterEnd.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/Login",
    name: "Login",
    component: Login,
  },

  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/RegisterEnd",
    name: "RegisterEnd",
    component: RegisterEnd,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
