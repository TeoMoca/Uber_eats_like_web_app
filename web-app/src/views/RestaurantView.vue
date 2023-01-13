<template>
  <div class="restaurant-title">
    {{ $route.params.name }}
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

<style>
.restaurant-title {
  display: flex;
  width: 100%;
  font-size: 45px;
  align-items: center;
  justify-content: center;
}
</style>
