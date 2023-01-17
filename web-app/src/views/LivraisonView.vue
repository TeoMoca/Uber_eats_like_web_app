<template>
  <div class="main">
    <ProgressBar
      class="pBar"
      msg="test"
      :state="this.currentStateLivraison.toString()"
    ></ProgressBar>
    <div class="container">
      <div id="livreur">
        <div class="photo">Photo jpeg</div>
        <div class="container-livreur">
          <div class="name">
            {{ livreurData.firstname }} {{ livreurData.lastname }}
          </div>
          <div class="number">{{ livreurData.phone }}</div>
          <button
            :class="{ bouton: true }"
            v-on:click="currentStateLivraison = 2"
          >
            1
          </button>
          <button
            :class="{ bouton: true }"
            v-on:click="currentStateLivraison = 3"
          >
            2
          </button>
          <button
            :class="{ bouton: true }"
            v-on:click="currentStateLivraison = 4"
          >
            3
          </button>
          <button
            :class="{ bouton: true }"
            v-on:click="currentStateLivraison = 5"
          >
            4
          </button>
        </div>
      </div>
      <div id="map">
        <v-img src="/map.jpg" alt="ceci est une carte"></v-img>
      </div>
      <div id="commande">
        <div name="recap">Récapitulatif de votre commande</div>
        <ul class="list-item">
          <li
            class="item"
            v-for="article in commandeData.orderDetails.articles"
            :key="article"
          >
            {{ article }}
          </li>
          <li>{{ commandeData.orderDetails.prix }}</li>
          <li>{{ currentStateLivraison }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from "vue";
import ProgressBar from "./../components/ProgressBar.vue";
import axios from "axios";


export default defineComponent({
    name: "LivraisonView",
    data() {
        return {
            idLivreur: "0daaf5b6-5299-44b8-9d45-fe4270d34ea1",
            livreurData:{},
            commandeData:{},
            livraisonData:{},
            currentStateLivraison:1,
        }
    },
    methods: { },
    computed: {
    },
    components: { ProgressBar },
    created() {
      //recupère les données du livreur
      axios.get("http://localhost:7000/api/users/"+this.idLivreur).then(res => {
      this.livreurData=res.data})
      //recupère les données de la livraison
      axios.get("http://localhost:3000/livraison/livreur/"+this.idLivreur).then(resLivraison =>{ this.commandeData = resLivraison.data
      //recupère les données de la commande
      axios.get("http://localhost:3000/commande/"+resLivraison.data.commandeID).then(resCommande =>{ this.commandeData = resCommande.data })
      })
      // res.data.forEach(element => {
      // this.livreurData.livreurFName = element.firstname, this.livreurData.livreurLName = element.lastname, this.livreurData.livreurPNumber = element.phone, console.log(element)})
  }
});
</script>

<style>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-image: linear-gradient(
    0deg,
    var(--light-mode-color-five) 3%,
    var(--light-mode-color-four) 10%
  );
}

.container {
  display: flex;
  width: 90%;
  height: 60%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  position: relative;
  border-radius: 30px;
  border: 1px solid var(--light-mode-color-five);
  margin-bottom: 10px;
  overflow: hidden;
}
.container > * {
  background-color: #fff;
}
.container-livreur {
  display: flex;
  width: 100%;
  height: 50%;
  margin: 10px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
.container-livreur > * {
  margin: 20px;
}
.bouton {
  background-color: red;
}
#livreur {
  display: flex;
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.photo {
  margin-top: 50px;
  padding: 0px;
  display: flex;
  height: 300px;
  width: 200px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid black;
}

#map {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#commande {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}
#commande > * {
  margin: 5px;
}

.restaurant-title {
  display: flex;
  width: 100%;
  font-size: 45px;
  align-items: center;
  justify-content: center;
}
</style>
