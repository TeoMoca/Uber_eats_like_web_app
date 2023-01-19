<template>
  <div class="nav-bar">
    <h1 class="title" v-if="$router.currentRoute.value.fullPath !== '/home'">
      <a :href="'/home'">
        {{ title }}
      </a>
    </h1>
    <h1 class="title" v-else>
      {{ title }}
    </h1>

    <v-spacer></v-spacer>
    <div class="search-bar" v-if="condition">
      <input
        type="text"
        v-model="search"
        placeholder="De quoi avez vous envie ?"
      />
      <div class="search-items">
        <a
          class="item"
          v-for="fruit in filteredList()"
          :key="fruit"
          :href="'http://localhost:8080/restaurants/' + fruit"
        >
          <img class="item-img" />
          <p>{{ fruit }}</p>
        </a>
        <div class="item error" v-if="search && !filteredList().length">
          <p>No results found!</p>
        </div>
      </div>
    </div>
    <v-icon v-if="condition">mdi-shopping</v-icon>
    <div v-if="livraison" class="user">
      <v-icon v-if="livraison"
        ><v-btn variant="plain"></v-btn>mdi-bicycle</v-icon
      >
    </div>
    <div v-if="commandesEnCours" class="user" tabindex="1">
      <v-badge v-bind:content="commandes.length" floating
        ><v-icon>mdi-food</v-icon></v-badge
      >
      <div class="options">
        <a
          variant="plain"
          v-for="commande in commandes.filter(
            (commande) => commande.commandeStatut == 'EC'
          )"
          :key="commande"
          :href="'/livraison/:' + commande.id"
        >
          {{ commande.id }}
        </a>
      </div>
    </div>
    <div tabindex="1" class="user" v-if="getUserInitials() && condition">
      {{ getUserInitials() }}
      <div class="options">
        <v-btn variant="plain" @click="RedirectProfile">
          Mes informations
        </v-btn>
        <p>Voir mes commandes</p>
        <p>Ah ouais</p>
        <p class="disconnect" @click="disconnect">Me déconnecter</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "NavBar",
  computed: {
    condition() {
      var isdisplay = true;
      if (this.$route.path === "/") {
        isdisplay = false;
      }
      if (this.$route.path === "/Register") {
        isdisplay = false;
      }
      return isdisplay;
    },
    livraison() {
      var isdisplay = true;
      if (this.$data.livraisons === undefined) {
        isdisplay = false;
      }
      if (this.$route.path !== "/home") {
        isdisplay = false;
      }
      if (this.$data.idRole !== 3) {
        isdisplay = false;
      }
      return isdisplay;
    },
    commandesEnCours() {
      var isdisplay = true;
      if (this.$data.idRole !== 2) {
        isdisplay = false;
      }
      if (this.$route.path === "/livraison") {
        isdisplay = false;
      }
      return isdisplay;
    },
  },
  beforeCreate() {
    //Restaurant
    this.$axios
      .get("http://localhost:5001/api/users/", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((rep) => {
        rep.data.map((item: { firstname: string }) => {
          this.restaurants.push(item.firstname);
        });
      });
    //
    this.$axios
      .get("http://localhost:5001/api/users/" + cookies.get("userId"), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((rep) => {
        this.idRole = rep.data.roleId;
        console.log(this.idRole);
      });
    //Livraisons
    this.$axios
      .get(
        "http://localhost:3000/livraison/livreur/" + cookies.get("userId"),
        // "http://localhost:3000/api/users/",
        // { userId: cookies.get("userId") },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((rep) => {
        this.livraisons = rep.data;
        console.log(this.$data.livraisons);
      });
    this.$axios
      .get(
        "http://localhost:3000/commande/client/" + cookies.get("userId"),
        // "http://localhost:3000/api/users/",
        // { userId: cookies.get("userId") },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((rep) => {
        this.commandes = rep.data;
        console.log(this.$data.commandes);
      });
  },
  data: (): {
    title: string;
    search: string;
    restaurants: string[];
    initials: string;
    idRole: number;
    livraisons: object;
    commandes: Array<{ commandeStatut: string; id: string }>;
  } => ({
    title: "U Beuh'r Eats",
    search: "",
    restaurants: [],
    initials: "",
    idRole: 0,
    livraisons: {},
    commandes: [],
  }),
  methods: {
    RedirectProfile() {
      this.$router.push("/Profile");
    },
    filteredList() {
      const regex = new RegExp("^" + this.$data.search.toLowerCase());
      const filteredFruits = this.$data.restaurants.filter((restaurant) =>
        regex.test(restaurant.toLowerCase())
      );
      return filteredFruits;
    },
    getUserInitials() {
      const firstname = cookies.get("firstname");
      const lastname = cookies.get("lastname");
      if (firstname && lastname) {
        this.initials = firstname?.charAt(0) + lastname?.charAt(0) || "";
        return this.initials;
      }
    },
    disconnect() {
      cookies.remove("token");
      cookies.remove("firstname");
      cookies.remove("lastname");
      cookies.remove("userId");
      this.$router.push({ path: "/" });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  overflow: visible;
  gap: 10px;
  width: 100%;
  height: 80px;
  background: var(--light-mode-color-five);
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  grid-template-columns: max-content 1fr max-content max-content max-content;
  grid-template-areas: "title blank search cart user-options";
  padding: 10px;
}

.nav-bar .title {
  color: var(--light-mode-color-two);
  cursor: default;
}

.search-bar {
  display: grid;
  grid-template-rows: 100% 1fr;
  position: relative;
  margin-right: 10px;
  background: var(--light-mode-color-two);
  padding: 10px;
  width: 30vw;
}

.search-bar input:focus {
  outline: none;
}

.search-bar:focus-within .search-items {
  display: block;
}
.search-items {
  display: none;
  position: absolute;
  top: 100%;
  background: #eee;
  color: #000;
  width: 100%;
  overflow: auto;
  max-height: 300px;
  transition: all 1s ease-in-out;
}

.search-items .item {
  text-decoration: none;
  padding: 10px 5px;
}

.search-items .item:hover {
  background: var(--light-mode-color-two);
}

.item {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 80px 1fr;
  grid-template-areas: "img item-infos";
  width: 100%;
  height: 100%;
  gap: 10px;
  color: var(--light-mode-color-one);
}

.item .item-img {
  width: 100%;
  height: 80px;
  background: var(--light-mode-color-one);
}

.user {
  background: var(--light-mode-color-one);
  color: var(--light-mode-color-two);
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}

.user .options {
  display: none;
  outline: none;
  width: 200px;
  height: 200px;
  background: var(--light-mode-color-two);
  color: var(--light-mode-color-four);
  border-radius: 10px 0 10px 10px;
  position: absolute;
  top: 85%;
  right: 85%;
  overflow: hidden;
  z-index: 200;
}

.user .options p {
  padding: 10px;
  display: flex;
  align-items: center;
}

.disconnect::before {
  content: "\F0343";
  font: normal normal normal 24px/1 "Material Design Icons";
}

.user .options p:hover {
  background: var(--light-mode-color-one);
  color: var(--light-mode-color-two);
}

.user:focus-within .options {
  display: block;
}
</style>
