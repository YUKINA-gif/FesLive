import Vue from 'vue'
import VueRouter from 'vue-router'
import TimeLine from "../views/TimeLine.vue";
import EventDetail from "../views/EventDetail.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "TimeLine",
    component: TimeLine,
  },
  {
    path: "/event/:id",
    name: "EventDetail",
    component: EventDetail,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
