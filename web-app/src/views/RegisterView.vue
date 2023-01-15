<template>
  <v-card class="mx-auto" max-width="444" title="Enregistrement">
    <v-form ref="form" class="mb-2" v-model="valid" @submit.prevent="validate">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstname"
              class="mb-2"
              label="Prénom"
              :rules="firstnamerules"
              required
            />
          </v-col>

          <v-col cols="12" md="6"
            ><v-text-field
              v-model="lastname"
              class="mb-2"
              label="Nom"
              :rules="lastnamerules"
              required
          /></v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              class="mb-2"
              label="Mot de passe"
              :rules="passwordrules"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="select"
              class="mb-2"
              :items="items"
              item-title="role"
              item-value="roleId"
              label="Vous êtes"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-text-field
          prepend-inner-icon="mdi-email"
          v-model="email"
          class="mb-2"
          label="Email"
          :rules="emailrules"
          required
        />
        <v-text-field
          v-model="phone"
          class="mb-2"
          label="Téléphone"
          :rules="phonerules"
          required
        />
        <v-text-field
          v-model="adressname"
          class="mb-2"
          label="Adresse"
          :rules="addressnamerules"
          required
        />
        <v-text-field
          v-model="codepostal"
          class="mb-2"
          label="Code Postal"
          :rules="codepostalrules"
          required
        />
        <v-text-field
          v-model="country"
          class="mb-2"
          label="Pays"
          :rules="countryrules"
          required
        />
        <v-text-field
          v-model="city"
          class="mb-2"
          label="Ville"
          :rules="cityrules"
          required
        />
      </v-container>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" :disabled="!valid" class="mr-4" type="submit">
          Enregistrement
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>

  <v-snackbar v-model="isRegistered" close-delay="100" location="top right">
    <p>Vous avez bien été enregistré !</p>
  </v-snackbar>
</template>

<script lang="ts">
import { User } from "../../Model/User";
import axios from "axios";
import { Adress } from "../../Model/Adress";
import router from "@/router";
import { defineComponent } from "vue";
export default defineComponent({
  data: () => ({
    valid: false,
    firstname: "",
    firstnamerules: [(v) => !!v || "le prénom est requis"],
    lastname: "",
    lastnamerules: [(v) => !!v || "le nom est requis"],
    email: "",
    emailrules: [
      (v) => /.+@.+\..+/.test(v) || "E-mail doit être valide",
      (v) => !!v || "Email est requis",
    ],
    select: { role: "", roleId: 0 },
    items: [
      { role: "Utilisateur", roleId: 1 },
      { role: "Commmercial", roleId: 2 },
      { role: "Restaurateur", roleId: 3 },
      { role: "Livreur", roleId: 4 },
      { role: "Service technique", roleId: 5 },
    ],
    phone: "",
    phonerules: [(v) => !!v || "Le numéro de téléphone est obligatoire"],
    adressname: "",
    addressnamerules: [(v) => !!v || "L adresse est obligatoire"],
    codepostal: "",
    codepostalrules: [
      (v) => !!v || "Le code postal est obligatoire",
      (v) =>
        /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(v) ||
        "Le code postal n est pas valide",
    ],
    country: "",
    countryrules: [(v) => !!v || "Le pays est obligatoire"],
    city: "",
    cityrules: [(v) => !!v || "La ville est obligatoire"],
    password: "",
    passwordrules: [(v) => !!v || "Le mot de passe est obligatoire"],
    existingUsers: [""],
    isRegistered: false,
  }),

  methods: {
    async validate() {
      const { valid } = await (this.$refs.form as HTMLFormElement).validate();

      if (valid) {
        const user = new User(
          "",
          this.select.roleId,
          this.firstname,
          this.lastname,
          this.phone,
          this.email,
          this.password
        );
        const adress = new Adress(
          "",
          this.adressname,
          this.codepostal,
          this.city,
          this.country
        );
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        const response = await axios.post(
          "http://localhost:8000/users/register",
          { user: user, adress: adress, IdRole: this.select },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        this.isRegistered = true;
        await new Promise((t) => setTimeout(t, 2000));
        this.$router.push("/");
      }
    },
  },
});
</script>
