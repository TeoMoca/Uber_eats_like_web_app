<template>
  <img :src="restaurant.image" class="restaurant-image" />
  <div class="restaurant-container">
    <div class="restaurant-title">
      <p>{{ $route.params.name }}</p>
    </div>
    <div class="stars" :style="{ '--note': restaurant.notes }"></div>
    <div v-for="componentTitle in display" :key="componentTitle">
      {{ getComponent(componentTitle) }}
    </div>
    <div v-for="menu in menus" :key="menu.name">
      {{ menu.name }}
    </div>
    <DraggableList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DraggableList from "../components/DraggableList.vue";

export default defineComponent({
  name: "RestaurantView",
  composant: { DraggableList },
  data: (): {
    restaurant: {
      image: string;
      notes: number;
      _id: string;
    };
    menus: Array<{
      name: string;
    }>;
    display: Array<string>;
  } => ({
    restaurant: {
      image: "",
      notes: 0,
      _id: "",
    },
    menus: [],
    display: ["article", "menus", "articles"],
  }),
  created() {
    this.$axios
      .get(
        `http://localhost:4001/restaurant/displayRestaurant/${this.$route.params.name}`
      )
      .then((rep) => {
        this.restaurant = rep.data;
        this.$axios
          .get(`http://localhost:3000/menus/${this.restaurant._id}`)
          .then((rep) => {
            rep.data.map((menu) => {
              this.menus.push(menu);
            });
          });
      });
  },
  computed: {},
  methods: {
    getComponent(componentTitle: string) {
      switch (componentTitle) {
        case "article": {
          return "<div>article</div>";
        }
        case "menu": {
          return "<div>menu</div>";
        }
        case "articles": {
          return "<div>articles</div>";
        }
        case "menus": {
          return "<div>menus</div>";
        }
      }
    },
  },
  components: { DraggableList },
});
</script>

<style scoped>
.restaurant-container {
  padding: 10px 20px;
}
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
}

.stars {
  line-height: 1;
}

.stars::before {
  content: "★★★★★";
  letter-spacing: 3px;
  background: linear-gradient(
    90deg,
    #fc0 calc(var(--note) / 20 * 100%),
    grey calc(var(--note) / 20 * 100%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 25px;
}
</style>
