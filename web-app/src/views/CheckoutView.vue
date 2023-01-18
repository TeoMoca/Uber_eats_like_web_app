<template>
  <v-container class="container">
    <v-row>
      <v-col cols="8">
        <v-row v-for="item in items" v-bind:key="item.id">
          <div>
            <v-img
              class="mx-auto"
              height="200"
              src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            ></v-img>
            <div>
              {{ item.name }}
            </div>
            <div class="pa-7 secondary rounded-circle d-inline-block">
              <v-text-field v-model="item.price" readonly />
            </div>
          </div>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto">
          <div class="commandtitle">
            <v-card-title> Résumé de la commande </v-card-title>
          </div>

          <div class="command">
            <div>
              <h4>Articles</h4>
              <v-card-text>{{ subtotal }}</v-card-text>
            </div>
            <div>
              <h4>Tax</h4>
              <v-card-text>{{ tax }}</v-card-text>
            </div>
            <div>
              <h4>Total</h4>
              <v-card-text>{{ total }}</v-card-text>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Item } from "../../Model/Item";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    items: [] as Item[],
    subtotal: 0,
    tax: 0,
    total: 0,
  }),
  mounted() {
    const storeItems = this.$store.getters.getCart as Item[];
    this.items = storeItems;
    console.log(this.items.length);
    this.subtotal = this.$store.getters.getSubCartTotal;
    this.tax = this.$store.getters.getTax;
    this.total = this.$store.getters.cartTotal;
  },
});
</script>

<style>
.container {
  margin-top: 130px;
}
.command {
  margin-left: 10px;
}
.commandtitle {
  text-align: center;
}
</style>
