import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Cookies from "cookies-ts";
import LoginView from "../views/LoginView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import livraisonClientView from "../views/LivraisonClientView.vue";
import livraisonLivreurView from "../views/LivraisonLivreurView.vue";
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
    path: "/livraison",
    name: "livraison",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return axios
        .get(`http://localhost:5001/api/users/${cookies.get("userId")}`)
        .then((rep) => {
          console.log(rep.data.roleId);
          switch (rep.data.roleId) {
            case 1: {
              return livraisonClientView;
            }
            case 2: {
              return livraisonClientView;
            }
            case 3: {
              return livraisonLivreurView;
            }
            case 4: {
              return livraisonClientView;
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
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
    if (to.path === "/Register") return next();
    return next({ path: "/" });
  }
});

export default router;
