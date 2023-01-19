<template>
  <v-container class="container">
    <div v-if="commands.length > 0">
      <div v-for="command in commands" :key="command.objectid">
        <v-card>
          <v-card-title>{{ "Le Ritz" }}</v-card-title>
          <v-card-text>{{ command.adress }}</v-card-text>
          <v-card-actions>
            <v-btn
              @click="takeDelivery(command.objectid)"
              variant="text"
              color="teal-accent-4"
            >
              Prendre la livraison
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Command } from "../../Model/Command";
import { defineComponent } from "vue";
import Cookies from "cookies-ts";

const cookies = new Cookies();
export default defineComponent({
  data: () => ({
    commands: [] as Command[],
    commandidtaken: "",
  }),
  methods: {
    async takeDelivery(id) {
      this.commandidtaken = id;
      await this.$axios.patch(
        "http://localhost:9001/command/takedelivery/" + this.commandidtaken
      );
      await this.$axios.post("http://localhost:3000/livraison/accepted", {
        commandeID: this.commandidtaken,
        livreurID: cookies.get("userId"),
      });
    },
  },
  async beforeCreate() {
    const datas = await this.$axios.get(
      "http://localhost:9001/commands/allactivecommands"
    );
    var item: Command[] = [];
    for (const data of datas.data) {
      const command = new Command(
        data._id,
        data.customerId,
        data.restorantId,
        data.date,
        data.articles,
        data.price,
        data.adress,
        data.city,
        data.codePostal,
        data.isPaid,
        data.isAcceptedByRestaurateur,
        data.isInDelivery
      );
      item.push(command);
    }
    this.commands = item;
  },
});
</script>
<style>
.container {
  border: 5px solid black;
  margin-top: 120px;
  width: 50%;
  align-items: center;
}
</style>
