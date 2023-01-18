<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Add Item </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add an Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newItem.name"
                  label="nom de l'item*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newItem.picture"
                  label="Lien de la photo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newItem.description"
                  label="description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newItem.type"
                  :items="['plat', 'boisson', 'dessert']"
                  label="Type*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newItem.price"
                  label="price*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="submit()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

import Cookies from "cookies-ts";
const cookies = new Cookies();

export default defineComponent({
  name: "CreationItemButton",
  data: function () {
    return {
      dialog: false,
      newItem: {
        id_restaurant: "",
        name: "",
        picture: "",
        description: "",
        type: "",
        price: 1,
      },

      requestUrl: "http://127.0.0.1:3000/articles/add",
    };
  },

  props: {
    restaurant_id: { type: String, required: true },
  },

  methods: {
    submit: function () {
      console.log(this.newItem);
      axios
        .post(this.requestUrl, this.newItem)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialog = false;
    },
  },
  created() {
    this.newItem.id_restaurant = this.restaurant_id;
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
