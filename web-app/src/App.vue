<template>
  <v-app>
    <v-main>
      <nav-bar />
      <router-view />
      <notif-circle v-if="condition" :id_user="id_user" :notifs="notifs" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "./components/NavBar.vue";
import NotifCircle from "./components/NotifCircle.vue";

import Cookies from "cookies-ts";
const cookies = new Cookies();

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    NotifCircle,
  },
  data: () => ({
    id_user: "",
    notifs: Object,
    requestUrl: "http://127.0.0.1:3001/notifs/",
  }),

  created() {
    this.id_user = cookies.get("userId") || "";
    fetch(this.requestUrl + this.id_user, { method: "GET" }).then((rep) => {
      console.log("requrl", this.requestUrl + this.id_user);
      rep.json().then((data) => {
        console.log(data);
        this.notifs = data;
      });
    });
  },
  computed: {
    condition() {
      var isdisplay = true;
      if (this.$route.path === "/") isdisplay = false;
      if (this.$route.path === "/Register") isdisplay = false;
      return !(this.$route.path === "/" || this.$route.path === "/register");
    },
  },
});
</script>

<style>
* {
  --light-mode-color-one: #000;
  --light-mode-color-two: #e0e0ce;
  --light-mode-color-three: #a4243b;
  --light-mode-color-four: #ff7f11;
  --light-mode-color-five: #ff3f00;

  --dark-mode-color-one: #fff;
  --dark-mode-color-two: #00000;
  --dark-mode-color-three: #00000;
  --dark-mode-color-four: #00000;
  --dark-mode-color-five: #00000;
}

i {
  color: var(--light-mode-color-two);
}

a {
  text-decoration: none;
  color: inherit;
}

body ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

body ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 20px;
}

body ::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: var(--light-mode-color-four);
}
</style>
