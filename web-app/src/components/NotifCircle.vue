<template>
  <v-menu transition="scroll-y-transition">
    <template v-slot:activator="{ props }">
      <div v-if="howMany_unseen > 0" class="notifs">
        <v-badge :content="howMany_unseen" color="red lighten-1">
          <v-btn
            v-on:click="seeNotifs"
            icon="mdi-bell-outline"
            color="light-green darken-2"
            v-bind="props"
          ></v-btn>
        </v-badge>
      </div>
      <div v-else class="notifs">
        <v-btn
          v-on:click="seeNotifs"
          icon="mdi-bell-outline"
          color="light-green darken-2"
          v-bind="props"
        ></v-btn>
      </div>
    </template>
    <v-list>
      <v-list-item v-if="getNotificationsNumber === 0" link>
        <v-list-item-title>Vous n'avez pas de notifications</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="notif in notifications" :key="notif.message" link>
        <v-list-item-title v-text="notif.message"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotifCircle",

  data: (): {
    notifications: { message: string; seen: boolean }[];
  } => ({
    notifications: [],
  }),
  props: {
    idUser: String,
  },

  created() {
    if (this.$props.idUser) {
      this.$axios
        .get("http://127.0.0.1:3001/notifs/" + this.$props.idUser)
        .then((rep) => {
          rep.data.map((notification: never) => {
            this.notifications.push(notification);
          });
          console.log("coucou", this.notifications);
        });
    }
  },
  methods: {
    seeNotifs() {
      var request = "http://127.0.0.1:3001/notifs/seen/" + this.$props.idUser;
      fetch(request, { method: "PUT" }).then((rep) => {
        rep.json();
      });
    },
  },

  computed: {
    howMany_unseen() {
      return this.notifications.filter((notif) => {
        return notif.seen === false;
      }).length;
    },
    getNotificationsNumber() {
      console.log("notif number", this.notifications.length);
      return this.notifications.length;
    },
  },
});
</script>

<style scoped>
.notifs {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
.notifsPop {
  background-color: green;
}
</style>
