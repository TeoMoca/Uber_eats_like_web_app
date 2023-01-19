<template>
  <div>Restaurateur Home</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RestaurateurHomeView",
  beforeCreate() {
    this.$axios
      .get("http://localhost:4001/restaurant/displayRestaurant")
      .then((rep) => {
        console.log(rep.data);
      });
  },
});
</script>

<style></style>
