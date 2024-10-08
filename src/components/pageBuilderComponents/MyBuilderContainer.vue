<template>
  <div class="container" ref="componentsContainer">
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
import MyText from "./MyText.vue";
import MyDoubleColumn from "./MyDoubleColumn.vue";
import MyImgFullWidth from "./MyImgFullWidth.vue";
import MyMenuBuilder from "./MyMenuBuilder.vue";
import MyHeroTemplate1 from "./MyHeroTemplate1.vue";
import MyTextTemplate1 from "./MyTextTemplate1.vue";
import Draggable from "vuedraggable";
import MyItemsIcons from "./MyItemsIcons.vue";
import MyInformation from "./MyInformation.vue";
import MyFooterBuilder from "./MyFooterBuilder.vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  data() {
    return {
      isDraggable: true,
      previousComponentCount: 0,
      hasNewItems: false,
      isInitialLoad: true,
    };
  },
  components: {
    MyHero,
    MyItems,
    Draggable,
    MyText,
    MyDoubleColumn,
    MyImgFullWidth,
    MyMenuBuilder,
    MyHeroTemplate1,
    MyTextTemplate1,
    MyItemsIcons,
    MyInformation,
    MyFooterBuilder,
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
        console.log(value);
      },
    },
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.componentsContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    handleListChange() {
      this.pageStore.saveComponentsToDatabase();
    },
    toggleDraggable(state) {
      this.isDraggable = state;
    },
    async loadPageData(pageId) {
      try {
        await this.pageStore.loadPageComponents(pageId);
        this.previousComponentCount = this.draggableComponentsList.length;
        this.isInitialLoad = false;
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
    const pageId = route.params.pageId;
    if (pageId) {
      this.pageStore.pageId = pageId;
      this.loadPageData(pageId);
    } else {
      console.error("Page ID is missing from route parameters.");
    }
  },
  watch: {
    draggableComponentsList: {
      handler(newList) {
        if (
          !this.isInitialLoad &&
          newList.length > this.previousComponentCount
        ) {
          this.scrollToBottom();
        }
        this.previousComponentCount = newList.length;
      },
      deep: true,
    },
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
