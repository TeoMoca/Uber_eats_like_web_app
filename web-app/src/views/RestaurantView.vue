<template>
  <img :src="restaurant.image" class="restaurant-image" />
  <div class="restaurant-container">
    <div class="restaurant-title">
      <p>{{ restaurant.name }}</p>
    </div>
    <div class="stars" :style="{ '--note': restaurant.notes }"></div>

    <div class="items-container">
      <div v-for="item in display" :key="item.componentTitle">
        <ArticleCard :item="item.data" />
      </div>
    </div>
    <DraggableList v-if="restaurant._id" :id="restaurant._id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DraggableList from "../components/DraggableList.vue";
import ArticleCard from "../components/ArticleCard.vue";

export default defineComponent({
  name: "RestaurantView",
  data: (): {
    restaurant: {
      image: string;
      notes: number;
      name: string;
      _id: string;
    };
    menus: Array<{
      name: string;
    }>;
    articles: Array<{ name: string }>;
    display: Array<{
      componentTitle: string;
      data: { name: string };
    }>;
  } => ({
    restaurant: {
      image: "",
      notes: 0,
      _id: "",
      name: "",
    },
    menus: [],
    articles: [],
    display: [],
  }),
  beforeCreate() {
    console.log(this.$route.params);
    this.$axios
      .get(
        `http://localhost:4001/restaurant/displayRestaurant/${this.$route.params.id}`
      )
      .then((rep) => {
        this.restaurant = rep.data;
        console.log(this.restaurant);
        this.$axios
          .get(`http://localhost:3000/catalog/${this.restaurant._id}`)
          .then((rep) => {
            console.log("catalog api", rep.data);
            rep.data.menusList.map((menu) => {
              this.menus.push(menu);
            });
            rep.data.itemsList.map((menu) => {
              this.articles.push(menu);
            });
          });
      });
    this.$axios
      .get(
        `http://localhost:4001/restaurant/displayRestaurant/${this.$route.params.id}`
      )
      .then((rep) => {
        console.log(rep.data);
        rep.data.display.map((item) => {
          this.display.push({ componentTitle: "", data: item });
        });
      });
  },
  computed: {},
  methods: {
    getComponent(
      componentTitle: string,
      item: { name: string; picture: string }
    ) {
      console.log("item", item);
      switch (componentTitle) {
        case "article": {
          return `<div>article - ${item.name}</div>`;
        }
        case "menu": {
          return `<div>menu - ${item.name}</div>`;
        }
        case "articles": {
          return `<div>articles - ${item.name}</div>`;
        }
        case "menus": {
          return `<div>menus - ${item.name}</div>`;
        }
        default: {
          return `${item.name} <img src='${item.picture}'/>`;
        }
      }
    },
  },
  components: { DraggableList, ArticleCard },
});
</script>

<style scoped>
.restaurant-container {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  content: "???????????????";
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

.items-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, calc((100% - 2 * 10px) / 4));
  grid-auto-flow: row;
}
</style>
