import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const usePageStore = defineStore("page", {
  state: () => ({
    components: [],
  }),
  actions: {
    addComponent(component) {
      const newComponent = {
        id: uuidv4(),
        type: component.type,
        content: component.content,
        style: component.style,
      };
      this.components.push(newComponent);
      this.saveComponentsToLocalStorage();
    },
    updateComponentsOrder(updatedComponents) {
      this.components = updatedComponents;
      this.saveComponentsToLocalStorage();
    },
    updateComponent({ id, newProps }) {
      const componentIndex = this.components.findIndex((c) => c.id === id);
      if (componentIndex !== -1) {
        this.components[componentIndex] = {
          ...this.components[componentIndex],
          ...newProps,
        };
        this.saveComponentsToLocalStorage();
      }
    },
    deleteComponent(id) {
      this.components = this.components.filter(
        (component) => component.id !== id
      );
      this.saveComponentsToLocalStorage();
    },
    saveComponentsToLocalStorage() {
      localStorage.setItem("components", JSON.stringify(this.components));
    },
    loadComponentsFromLocalStorage() {
      const components = localStorage.getItem("components");
      if (components) {
        this.components = JSON.parse(components);
      }
    },
  },
});
