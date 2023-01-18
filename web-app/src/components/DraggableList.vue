<template>
  <div class="dragger">
    <div
      class="drop-zone"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        class="drag-el"
        v-for="item in listOne"
        :key="item.title"
        @click="removeFromList(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
    <div
      class="drop-zone"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        class="drag-el"
        v-for="item in filteredList"
        :key="item.title"
        draggable="true"
        @dragstart="startDrag($event, item)"
      >
        {{ item.title }}
      </div>
      <div class="drag-el">+</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DraggableList",
  data: (): {
    listOne: Array<{ id: number; title: string; list: number }>;
    listTwo: Array<{ id: number; title: string; list: number }>;
  } => {
    return {
      listOne: [],
      listTwo: [
        {
          id: 0,
          title: "Item A",
          list: 2,
        },
        {
          id: 1,
          title: "Item B",
          list: 2,
        },
        {
          id: 2,
          title: "Item C",
          list: 2,
        },
      ],
    };
  },
  computed: {
    filteredList() {
      return this.listTwo.filter((e) => {
        return this.listOne.indexOf(e) === -1;
      });
    },
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item.id);
    },
    onDrop(evt) {
      const itemID = evt.dataTransfer.getData("itemID");
      const item = this.listTwo.find((item) => item.id == itemID);
      if (item && !this.listOne.find((item) => item.id == itemID)) {
        this.listOne.push(item);
      }

      console.log("lists", this.listOne, this.listTwo);
    },
    removeFromList(id) {
      const index = this.listOne.findIndex((item) => item.id == id);
      this.listOne.splice(index, 1);
    },
  },
});
</script>

<style>
.dragger {
  display: grid;
  grid-template-columns: 200px 200px;
  gap: 10px;
}

.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drag-el[draggable] {
  cursor: grab;
}
</style>
