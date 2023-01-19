<template>
  <div class="dashboard-container"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RestaurateurDashboard",
  data: (): { commands: Array<{ restaurant_id: string }> } => ({
    commands: [],
  }),
  props: {
    id_restaurant: String,
  },
  beforeCreate() {
    this.$axios.
  }
});
</script>

<style></style>
