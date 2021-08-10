import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import EventDetail from "../views/EventDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/event/:id",
    name: "EventDetail",
    component: EventDetail,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
