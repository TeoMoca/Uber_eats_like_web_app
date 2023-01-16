<template>
  <div class="home">
    <h1 :style="{ display: 'none' }">Quand on a faim, on y mets les moyens</h1>
    <SliderSection title="NOS RESTAURANTS" :items="restaurants" />
    <SliderSection title="LES MEILLEURS AVIS" :items="upperRates" />
    <SliderSection title="NOS COMPAGNIES" :items="restaurants" />
    <SliderSection title="NOS MENUS" :items="restaurants" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SliderSection from "../components/SliderSection.vue";

export default defineComponent({
  name: "HomeView",
  components: { SliderSection },
  data: () => ({
    restaurants: [
      {
        _id: "1",
        name: "Classic Burgers",
        zone: ["[49.385004, 1.079975]"],
        address: "51 Chemin Du Lavarin Sud",
        notes: 16,
        openingTime: {
          $date: {
            $numberLong: "1388572200000",
          },
        },
        closingTime: {
          $date: {
            $numberLong: "1388610000000",
          },
        },
        type: "Fast Food",
        image:
          "https://as1.ftcdn.net/v2/jpg/02/22/40/12/1000_F_222401280_DXgJ2kot1kINrH7P3h5VGOTnCmM42x26.jpg",
        __v: 0,
      },
      {
        _id: "2",
        name: "Sushi Masta",
        zone: ["[49.423859, 1.076652]"],
        address: "26 rue Victor Hugo",
        notes: 14,
        openingTime: {
          $date: {
            $numberLong: "1388574000000",
          },
        },
        closingTime: {
          $date: {
            $numberLong: "1388610000000",
          },
        },
        type: "Restaurant Japonais",
        image:
          "https://movernie.com/wp-content/uploads/2021/02/IMG_20210213_211154_resized_20210213_091243841-002.jpg",
        __v: 0,
      },
      {
        _id: "3",
        name: "Punjab Rara",
        zone: ["[49.450745, 1.091746]"],
        address: "96 rue du Faubourg National",
        notes: 18,
        openingTime: {
          $date: {
            $numberLong: "1388574000000",
          },
        },
        closingTime: {
          $date: {
            $numberLong: "1388610000000",
          },
        },
        type: "Restaurant Indien",
        image:
          "https://www.lepetitsommelier.paris/wp-content/uploads/2021/12/media-restaurant-indien-3-plats-a-decouvrir-de-toute-urgence.jpg",
        __v: 0,
      },
      {
        _id: "4",
        name: "Le Ritz",
        zone: ["[49.216381, 1.163013]"],
        address: "14 Rue St Ferréol",
        notes: 18,
        openingTime: {
          $date: {
            $numberLong: "1388574000000",
          },
        },
        closingTime: {
          $date: {
            $numberLong: "1388613600000",
          },
        },
        type: "Restaurant Français",
        image:
          "https://res.cloudinary.com/tf-lab/image/upload/restaurant/1fdf1d03-0717-446b-8d45-f696d42e551e/cf6d1bfd-92e1-4318-8e06-f04ebfe65ed0.jpg",
        __v: 0,
      },
      {
        _id: "5",
        name: "Pizza Street",
        zone: ["[49.404387, 1.084023]"],
        address: "59 avenue de Bouvines",
        notes: 13,
        openingTime: {
          $date: {
            $numberLong: "1388572200000",
          },
        },
        closingTime: {
          $date: {
            $numberLong: "1388611800000",
          },
        },
        type: "Pizzeria",
        image:
          "https://pizzastreet.fr/wp-content/uploads/2021/06/cropped-logo-light-png-1-1.png",
        __v: 0,
      },
      {
        _id: "6",
        name: "La Boulangerie du Centre",
        zone: ["[49.439760, 1.097139]"],
        address: "89 rue Sadi Carnot",
        notes: 17,
        openingTime: {
          $date: {
            $numberLong: "1388557800000",
          },
        },
        closingTime: {
          $date: {
            $numberLong: "1388593800000",
          },
        },
        type: "Boulangerie",
        image:
          "https://cdn.sortiraparis.com/images/80/1467/697314-la-boulangerie-patisserie-baptiste-de-joel-defives-aux-batignolles.jpg",
        __v: 0,
      },
    ],
  }),
  computed: {
    upperRates() {
      return this.restaurants
        .filter((item) => {
          return item.notes > 15;
        })
        .sort((a, b) => {
          return b.notes - a.notes;
        });
    },
  },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
  column-gap: 10px;
}
</style>
