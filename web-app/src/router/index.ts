import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Cookies from "cookies-ts";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
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
    component: () => {
      return axios
        .get(`http://localhost:5001/api/users/${cookies.get("userId")}`)
        .then((rep) => {
          console.log(rep.data.roleId);
          switch (rep.data.roleId) {
            case 1: {
              return HomeView;
            }
            case 2: {
              return HomeView;
            }
            case 3: {
              return HomeView;
            }
            case 4: {
              return HomeView;
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  {
    path: "/restaurants/:id",
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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LivraisonView.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/Refer",
    name: "Refer",
    component: () => import("../views/ReferView.vue"),
  },
  {
    path: "/customerRegister",
    name: "CustomerRegister",
    component: () => import("../views/CustomerView.vue"),
  },
  {
    path: "/deliveryRegister",
    name: "DeliveryRegister",
    component: () => import("../views/DeliveryView.vue"),
  },
  {
    path: "/restaurateurRegister",
    name: "restaurateurRegister",
    component: () => import("../views/RestaurateurView.vue"),
  },
  {
    path: "/Checkout",
    name: "Checkout",
    component: () => import("../views/CheckoutView.vue"),
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
    if (
      to.path === "/" ||
      to.path === "/register" ||
      to.path === "/customerRegister" ||
      to.path === "/deliveryRegister" ||
      to.path === "/restaurateurRegister"
    )
      return next();
    return next({ path: "/" });
  }
});

export default router;
