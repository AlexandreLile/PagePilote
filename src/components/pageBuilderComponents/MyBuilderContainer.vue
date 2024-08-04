<template>
  <div class="container">
    <draggable
      v-model="draggableComponentsList"
      @end="handleListChange"
      :disabled="!isDraggable"
      item-key="id"
    >
      <template #item="{ element }">
        <component
          :is="element.type"
          :id="element.id"
          v-bind="element"
          @toggle-draggable="toggleDraggable"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import { usePageStore } from "@/stores/componentsStore";
import MyHero from "./MyHero.vue";
import Draggable from "vuedraggable";

export default {
  data() {
    return {
      isDraggable: true,
    };
  },
  components: {
    MyHero,
    Draggable,
  },
  computed: {
    pageStore() {
      return usePageStore();
    },
    draggableComponentsList: {
      get() {
        return this.pageStore.components;
      },
      set(value) {
        this.pageStore.updateComponentsOrder(value);
      },
    },
  },
  methods: {
    handleListChange() {
      this.pageStore.saveComponentsToLocalStorage();
    },
    toggleDraggable(state) {
      this.isDraggable = state;
    },
  },
  mounted() {
    this.pageStore.loadComponentsFromLocalStorage();
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  max-height: 80vh;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  background-color: #fcfcfc;
  overflow-y: auto;
}
</style>
