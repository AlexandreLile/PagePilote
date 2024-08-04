<template>
  <div class="container_builder">
    <section class="hero" :style="computedStyle">
      <h1 contenteditable="true" @input="updateContent('title', $event)">
        {{ content.title }}
      </h1>
      <h2 contenteditable="true" @input="updateContent('subTitle', $event)">
        {{ content.subTitle }}
      </h2>
    </section>
  </div>
</template>

<script>
import { usePageStore } from "@/stores/componentsStore";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: {
        title: "Titre Principal",
        subTitle: "Sous Titre",
      },
      style: {
        color: "#000000",
        backgroundColor: "#ffffff",
        fontSize: "16px",
      },
    };
  },
  computed: {
    computedStyle() {
      return {
        color: this.style.color,
        backgroundColor: this.style.backgroundColor,
        fontSize: this.style.fontSize,
      };
    },
  },
  methods: {
    updateContent(propertyName, event) {
      this.content[propertyName] = event.target.innerText;
      this.updateStoreContent();
    },
    updateStyle(propertyName, value) {
      this.style[propertyName] = value;
      this.updateStoreContent();
    },
    updateStoreContent() {
      const pageStore = usePageStore();
      pageStore.updateComponent({
        id: this.id,
        newProps: {
          content: this.content,
          style: this.style,
        },
      });
    },
    loadFromStore() {
      const pageStore = usePageStore();
      const component = pageStore.components.find((c) => c.id === this.id);
      if (component) {
        this.content = component.content || this.content;
        this.style = component.style || this.style;
      }
    },
  },
  mounted() {
    this.loadFromStore();
  },
};
</script>

<style scoped>
.hero {
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
