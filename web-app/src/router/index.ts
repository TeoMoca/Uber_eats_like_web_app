import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Cookies from "cookies-ts";
import LoginView from "../views/LoginView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import axios from "axios";

const cookies = new Cookies();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
  },
  {
    path: "/restaurants/:name",
    name: "restaurant",
    component: RestaurantView,
    beforeEnter: (to, from, next) => {
      //axios.get("http://localhost:8000/", {
      //  headers: {
      //    "Content-Type": "application/json",
      //    "Access-Control-Allow-Origin": "*",
      //  },
      //});
      return next();
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = cookies.get("token");
  if (token) {
    if (to.path === "/") return next({ path: "/home" });
    return next();
  } else {
    if (to.path === "/") return next();
    return next({ path: "/" });
  }
});

export default router;
