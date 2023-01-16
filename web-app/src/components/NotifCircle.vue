<template>
  <v-menu transition="scroll-y-transition">
    <template v-slot:activator="{ props }">
      <div v-if="this.howMany_notifs > 0" class="notifs">
        <!--if notifs not seen -->
        <v-badge :content="this.howMany_notifs" color="red lighten-1">
          <v-btn
            v-on:click="seeNotifs"
            icon="mdi-bell-outline"
            color="light-green darken-2"
            v-bind="props"
          ></v-btn>
        </v-badge>
      </div>
      <div v-else class="notifs">
        <!-- else -->
        <v-btn
          v-on:click="seeNotifs"
          icon="mdi-bell-outline"
          color="light-green darken-2"
          v-bind="props"
        ></v-btn>
      </div>
    </template>
    <v-list>
      <v-list-item v-if="howMany_notifs == 0" link>
        <v-list-item-title>vous n'avez pas de notifications</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="notif in this.notifs" :key="notif.message" link>
        <v-list-item-title v-text="notif.message"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "NotifCircle",

  data: () => ({}),
  props: {
    notifs: Object,
    id_user: String,
  },

  methods: {
    seeNotifs: function () {
      var request = "http://127.0.0.1:3001/notifs/seen/" + this.id_user;
      fetch(request, { method: "PUT" }).then((rep) => {
        rep.json();
      });
    },
  },

  computed: {
    howMany_notifs: function () {
      var n = 0;
      //console.log(this.notifs[0].seen );
      for (var notif in this.notifs) {
        //console.log(notif)
        if (this.notifs[notif].seen == false) {
          //si la notif n'a pas été vue:
          n++;
        }
      }
      return n;
    },
  },
};
</script>

<style scoped>
.notifs {
  position: absolute;
  bottom: 5%;
  right: 5%;
}
.notifsPop {
  background-color: green;
}
</style>
