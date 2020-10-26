import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginView.vue";
import RegisterEnd from "../views/RegisterEnd.vue";
import Register from "../views/Register.vue";
import Confirmation from "../views/Confirmation.vue";
import MyHours from "../views/MyHours.vue";
import EditHourOffer from "../views/EditHourOffer.vue";
import AdminPanel from "../views/AdminPanel.vue";

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

  {
    path: "/Confirmation",
    name: "Confirmation",
    component: Confirmation,
    props: true,
  },
   {
    path: "/MyHours",
    name: "MyHours",
    component: MyHours,
  },
  {
       path: "/EditHourOffer",
    name: "EditHourOffer",
    component: EditHourOffer,
    props: true,
  },
  
  {
   path: "/AdminPanel",
    name: "AdminPanel",
    component: AdminPanel,
   }
];

const router = new VueRouter({
  routes,
});

export default router;
