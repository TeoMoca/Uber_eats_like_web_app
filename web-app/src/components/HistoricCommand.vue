<template>
  <div class="container">
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Command } from "../../Model/Command";
import Cookies from "cookies-ts";
import { Item } from "../../Model/Item";
import { Menu } from "../../Model/Menu";
import { Articles } from "Model/Articles";
const cookies = new Cookies();
export default defineComponent({
  data: () => ({
    commands: [] as Command[],
    selected: Command,
  }),
  methods: {
    toItems(datas) {
      const items: Item[] = [];

      for (const data of datas) {
        items.push(
          new Item(
            data.objectid,
            data.id_restaurant,
            data.name,
            data.picture,
            data.description,
            data.type,
            data.price,
            data.quantity
          )
        );
      }

      return items;
    },

    toMenus(datas) {
      const menus: Menu[] = [];

      for (const data of datas) {
        menus.push(
          new Menu(
            data.objectid,
            data.id,
            data.id_restaurant,
            data.name,
            data.picture,
            data.description,
            data.price,
            data.quantity,
            []
          )
        );
      }

      return menus;
    },
  },
  async beforeCreate() {
    const datas = await this.$axios.get(
      "http://localhost:9001/commands/" + cookies.get("userId")
    );
    for (const data of datas.data) {
      const items = this.toItems(datas.data.articles.items);
      const menus = this.toMenus(datas.data.articles.menus);
      var command = new Command(
        datas.data.objectid,
        datas.data.customerId,
        datas.data.restorantId,
        datas.data.date,
        new Articles(menus, items),
        datas.data.price,
        datas.data.adress,
        datas.data.city,
        datas.data.codePostal,
        datas.data.isPaid,
        datas.data.isAcceptedByRestaureur,
        datas.data.isInDelivery
      );
      this.commands.push(command);
    }
  },
});
</script>
<style>
.container {
  border-bottom: 3px solid black;
}
</style>
