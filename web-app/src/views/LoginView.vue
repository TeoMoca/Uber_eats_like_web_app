<template>
  <div class="main">
    <v-form ref="form" class="form" @submit="validate">
      <v-text-field
        required
        clearable
        @click:clear="clearEmail"
        :rules="emailRules"
        v-model="email"
        label="E-Mail"
      ></v-text-field>
      <v-text-field
        required
        clearable
        @click:clear="clearPassword"
        v-model="password"
        :type="'password'"
        label="Password"
      ></v-text-field>
      <v-btn type="submit" :disabled="isDisabled">Se connecter </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Components

export default defineComponent({
  name: "LoginView",

  components: {},

  data: () => ({
    email: "",
    emailRules: [
      (v: string) => {
        return !!v || "E-mail is required";
      },
      (v: string) => {
        return /.+@.+\..+/.test(v) || "E-mail must be valid";
      },
    ],
    password: "",
  }),

  computed: {
    isDisabled() {
      return !(this.email.length > 0) || !(this.password.length > 0);
    },
  },

  methods: {
    validate(e: Event) {
      e.preventDefault();
      this.$axios
        .post(
          "http://localhost:8000/users/login",
          { email: this.email.toLowerCase(), password: this.password },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((e) => {
          document.cookie = `token=${e.data.token};expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 24
          ).toUTCString()}`;
          document.cookie = `last_name=${
            e.data.user.last_name
          };expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 24
          ).toUTCString()}`;
          document.cookie = `first_name=${
            e.data.user.first_name
          };expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 24
          ).toUTCString()}`;
          this.$router.push({ path: "/home" });
        })
        .catch((e) => {
          window.alert(e.response.data.message);
        });
    },
    clearEmail() {
      this.email = "";
    },
    clearPassword() {
      this.password = "";
    },
  },
});
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.form {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 20vw;
  gap: 20px;
}
</style>
