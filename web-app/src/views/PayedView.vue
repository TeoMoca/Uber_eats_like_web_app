<template>
  <v-card width="400">
    <v-card-item>
      <v-card-title>Votre commande a bien été payée !</v-card-title>
    </v-card-item>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Components

export default defineComponent({
  async created() {
    console.log(this.$route.params);
    await this.$axios.patch(
      "http://localhost:9001/commands/" + this.$route.params.commandid
    );
    await new Promise((t) => setTimeout(t, 2000));
    this.$router.push("/");
  },
});
</script>
