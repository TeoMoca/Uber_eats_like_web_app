<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Ajouter un affichage </v-btn>
      </template>
      <!-- ------------------------------------ -->
      <v-tabs v-model="tab" fixed-tabs bg-color="indigo-darken-2">
        <v-tab value="slider"> Slider </v-tab>
        <v-tab value="soloItem"> Add a single item </v-tab>
      </v-tabs>
      <!-- ------------------------------------ -->
      <v-card v-if="tab == 'slider'">
        <v-card-title>
          <span class="text-h5">Add a Slider</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="newComponents"
                  :items="itemsList"
                  item-title="name"
                  item-value="_id"
                  chips
                  label="Articles a ajouter*"
                  multiple
                ></v-select>
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
          <v-btn color="blue-darken-1" variant="text" @click="sliderSubmit()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- -------------------------------------------------------------------------------------------------------- -->
      <v-card v-if="tab == 'soloItem'">
        <v-card-title>
          <span class="text-h5">Add an Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="newComponent"
                  :items="itemsList"
                  item-title="name"
                  item-value="_id"
                  chips
                  label="Articles a ajouter*"
                ></v-select>
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
          <v-btn color="blue-darken-1" variant="text" @click="soloItemSubmit()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreationDraggableList",
  data: function (): {
    itemsList: Array<{ _id: string; name: string }>;
    getUrl: string;
    dialog: boolean;
    tab: string;
    getMenusUrl: string;
    getArticlesUrl: string;
    getCatalogUrl: string;
    putRestaurantUrl: string;
    newComponent: string;
    newComponents: Array<string>;
    restaurant: {
      name: string;
      zone: Array<number>;
      address: string;
      notes: number;
      type: string;
      openingTime: string;
      closingTime: string;
      image: string;
      components: Array<string | Array<string>>;
      display: Array<string>;
    };
  } {
    return {
      dialog: false,
      tab: "slider",
      restaurant: {
        name: "",
        zone: [],
        address: "",
        notes: 0,
        type: "",
        openingTime: "",
        closingTime: "",
        image: "",
        components: [],
        display: [],
      },
      itemsList: [],
      getUrl: "http://127.0.0.1:4001/restaurant/displayRestaurant/",
      getMenusUrl: "http://127.0.0.1:3000/menus/",
      getArticlesUrl: "http://127.0.0.1:3000/articles/",
      getCatalogUrl: "http://127.0.0.1:3000/catalog/",
      putRestaurantUrl: "http://127.0.0.1:4001/restaurant/updateRestaurant",
      newComponent: "",
      newComponents: [],
    };
  },

  props: {
    restaurant_id: { type: String, required: true },
  },
  computed: {},
  methods: {
    sliderSubmit: function () {
      console.log(this.newComponents);
      this.restaurant.components.push(this.newComponents);
      console.log(this.restaurant);
      this.$axios
        .put(this.putRestaurantUrl, this.restaurant)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialog = false;
    },
    soloItemSubmit: function () {
      console.log(this.itemsList);
      //console.log(this.newMenu);
      this.restaurant.components.push(this.newComponent);
      this.$axios
        .put(this.putRestaurantUrl, this.restaurant)
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
    this.$axios
      .get(this.getCatalogUrl + this.restaurant_id)
      .then((response) => {
        console.log(response.data);
        Object.values<Array<{ _id: string; name: string }>>(response.data).map(
          (list) => {
            list.map((item) => {
              this.itemsList.push(item);
            });
          }
        );
      });
    this.$axios
      .get(this.getUrl + this.restaurant_id)
      .then((response) => {
        //console.log(response.data);
        this.restaurant = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {
    console.log("resto", this.restaurant);
    console.log("list", this.itemsList);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
