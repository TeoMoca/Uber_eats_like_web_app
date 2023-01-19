<template>
  <div class="main-container">
    <h1>
      {{ restaurant.name }}
    </h1>
    <DraggableList v-if="restaurant._id" :id="restaurant._id" />
  </div>
</template>

<script lang="ts">
import DraggableList from "../../components/DraggableList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "RestaurateurHomeView",
  data: (): {
    restaurant: {
      name: string;
      _id: string;
    };
    commands: Array<{
      _id: { $oid: string };
      customerId: string;
      restorantId: string;
      date: {
        $date: {
          $numberLong: string;
        };
      };
      articles: {
        menus: Array<{
          objectid: string;
          id: number;
          id_restaurant: string;
          name: string;
          picture: string;
          description: string;
          price: number;
          quantity: number;
          items: Array<string>;
        }>;
        items: [
          {
            objectid: string;
            id_restaurant: number;
            name: string;
            picture: string;
            description: string;
            type: string;
            price: number;
            quantity: number;
          }
        ];
      };
      price: number;
      isPaid: boolean;
    }>;
  } => ({
    restaurant: { name: "", _id: "" },
    commands: [
      {
        _id: {
          $oid: "63c94e3137860b9216365771",
        },
        customerId: "63c6bc6dba3923e853155792 ",
        restorantId: "63c6bc6dba3923e853155792 ",
        date: {
          $date: {
            $numberLong: "1674137136000",
          },
        },
        articles: {
          menus: [
            {
              objectid: "002",
              id: 0,
              id_restaurant: "",
              name: "Big mac",
              picture: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
              description: "",
              price: 68,
              quantity: 1,
              items: [],
            },
          ],
          items: [
            {
              objectid: "001",
              id_restaurant: 2,
              name: "pâtes carbonara",
              picture: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
              description: "",
              type: "",
              price: 50,
              quantity: 1,
            },
          ],
        },
        price: 129.8,
        isPaid: false,
      },
      {
        _id: {
          $oid: "63c950cb11a209853ff6ff30",
        },
        customerId: "63c6bc6dba3923e853155792 ",
        restorantId: "63c6bc6dba3923e853155792 ",
        date: {
          $date: {
            $numberLong: "1674137803000",
          },
        },
        articles: {
          menus: [
            {
              objectid: "002",
              id: 0,
              id_restaurant: "",
              name: "Triple cheese",
              picture: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
              description: "",
              price: 18,
              quantity: 1,
              items: [],
            },
          ],
          items: [
            {
              objectid: "001",
              id_restaurant: 2,
              name: "pâtes bolognaise",
              picture: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
              description: "",
              type: "",
              price: 20,
              quantity: 1,
            },
          ],
        },
        price: 129.8,
        isPaid: true,
      },
      {
        _id: {
          $oid: "63c967b611a209853ff6ff33",
        },
        customerId: "FF432207-D6AF-4817-9468-F143BCE37445",
        restorantId: "FF432207-D6AF-4817-9468-F143BCE37445",
        date: {
          $date: {
            $numberLong: "1674143670000",
          },
        },
        articles: {
          menus: [
            {
              objectid: "002",
              id: 0,
              id_restaurant: "",
              name: "Bucket",
              picture: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
              description: "",
              price: 68,
              quantity: 1,
              items: [],
            },
          ],
          items: [
            {
              objectid: "001",
              id_restaurant: 2,
              name: "parmentier de canard",
              picture: "https://cdn.vuetifyjs.com/images/parallax/material.jpg",
              description: "",
              type: "",
              price: 50,
              quantity: 1,
            },
          ],
        },
        price: 129.8,
        isPaid: true,
      },
    ],
  }),
  beforeCreate() {
    this.$axios
      .get("http://localhost:4001/restaurant/displayAllRestaurant")
      .then((rep) => {
        this.restaurant = rep.data.find((restaurant) => {
          return restaurant.id_restaurateur === this.$cookies.get("userId");
        });
        console.log(this.restaurant);
      });
  },
  components: { DraggableList },
});
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.chart-container {
  width: 100%;
}
</style>
