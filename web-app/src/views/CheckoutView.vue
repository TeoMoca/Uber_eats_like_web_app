<template>
  <v-container class="container">
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col v-for="item in items" v-bind:key="item.objectid">
            <div>
              <v-img
                class="mx-auto"
                height="100"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img>
              <div>
                {{ item.name }}
              </div>
              <div>
                <v-text-field
                  class="pa-4 secondary text-no-wrap rounded-pill"
                  v-model="item.quantity"
                  readonly
                />

                <v-btn
                  icon="mdi-plus"
                  color="primary"
                  @click="addQuantity(item.objectid)"
                ></v-btn>
                <v-btn
                  icon="mdi-window-minimize"
                  color="error"
                  @click="removeQuantity(item.objectid)"
                ></v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-for="menu in menus" v-bind:key="menu.objectid">
            <div>
              <v-img
                class="mx-auto"
                height="100"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              ></v-img>
              <div>
                {{ menu.name }}
              </div>
              <div>
                <v-text-field
                  class="pa-4 secondary text-no-wrap rounded-pill"
                  v-model="menu.quantity"
                  readonly
                />

                <v-btn
                  icon="mdi-plus"
                  color="primary"
                  @click="addQuantity(menu.objectid)"
                ></v-btn>
                <v-btn
                  icon="mdi-window-minimize"
                  color="error"
                  @click="removeQuantity(menu.objectid)"
                ></v-btn>
              </div>
            </div>
          </v-col>
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
          <div class="commandtitle">
            <v-btn @click="Pay" color="primary">Payer la commande</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Item } from "../../Model/Item";
import { defineComponent } from "vue";
import { Menu } from "../../Model/Menu";
import { Articles } from "../../Model/Articles";
import Cookies from "cookies-ts";
const cookies = new Cookies();
export default defineComponent({
  data: () => ({
    items: [] as Item[],
    menus: [] as Menu[],
    subtotal: 0,
    tax: 0,
    total: 0,
  }),
  mounted() {
    const storeItems = this.$store.getters.getCart as Articles;
    this.items = storeItems.items;
    this.menus = storeItems.menus;
    this.subtotal = this.$store.getters.getSubCartTotal;
    this.tax = this.$store.getters.getTax;
    this.total = this.$store.getters.cartTotal;
  },
  methods: {
    addQuantity(objectid) {
      this.$store.commit("addQuantity", objectid);
      this.subtotal = this.$store.getters.getSubCartTotal;
      this.tax = this.$store.getters.getTax;
      this.total = this.$store.getters.cartTotal;
    },
    removeQuantity(objectid) {
      this.$store.commit("deleteQuantity", objectid);
      this.subtotal = this.$store.getters.getSubCartTotal;
      this.tax = this.$store.getters.getTax;
      this.total = this.$store.getters.cartTotal;
      const storeItems = this.$store.getters.getCart as Articles;
      this.items = storeItems.items;
      this.menus = storeItems.menus;
    },

    async Pay() {
      const articles = new Articles(this.menus, this.items);
      const commandid = await this.$axios.post(
        "http://localhost:9001/commands/send",
        {
          customerId: cookies.get("userId"),
          restorantId: this.menus[0].id_restaurant,
          date: Date(),
          price: this.total,
          articles: articles,
        }
      );
      await this.$axios
        .post("http://localhost:7000/api/payment/createCheckoutSession", {
          userId: cookies.get("userId"),
          commandid: commandid.data.commandid,
          menus: this.menus,
          items: this.items,
        })
        .then((rep) => {
          console.log(rep.data);
          window.location.href = rep.data.url;
        });
    },
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
