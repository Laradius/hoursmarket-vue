import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/RegisterEnd",
    name: "RegisterEnd",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterEnd.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
