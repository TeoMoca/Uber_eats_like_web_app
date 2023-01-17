<template>
  <img
    :src="'https://pizzastreet.fr/wp-content/uploads/2021/06/cropped-logo-light-png-1-1.png'"
    class="restaurant-image"
  />
  <div class="restaurant-title">
    <p>{{ $route.params.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RestaurantView",

  composant: {},

  data: () => ({}),

  methods: {},
});
</script>

<style scoped>
.restaurant-title {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.restaurant-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: flex;
}

.restaurant-title p {
  font-size: 45px;
  padding: 10px 20px;
}
</style>
