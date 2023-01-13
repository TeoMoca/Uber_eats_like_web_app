<template>
  <v-app>
    <v-main>
      <nav-bar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "./components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      //
    };
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
</style>
