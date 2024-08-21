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
import MyItems from "./MyItems.vue";
import Draggable from "vuedraggable";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      isDraggable: true,
    };
  },
  components: {
    MyHero,
    MyItems,
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
    async loadPageData(pageId) {
      try {
        await this.pageStore.loadPageComponents(pageId);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de la page:",
          error
        );
      }
    },
  },
  mounted() {
    const route = useRoute();
    const pageId = route.params.pageId; // Assurez-vous que `pageId` est bien défini dans les paramètres de la route
    if (pageId) {
      this.pageStore.pageId = pageId; // Assurez-vous que le `pageId` est défini dans le store
      this.loadPageData(pageId); // Assurez-vous que cette méthode existe
    } else {
      console.error("Page ID is missing from route parameters.");
    }
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
