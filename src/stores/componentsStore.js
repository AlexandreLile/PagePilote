import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import {
  loadPageComponents,
  saveComponentsToDatabase,
} from "@/api/pageBuilderApi";
import axiosInstance from "@/config/axiosSetup";

export const usePageStore = defineStore("page", {
  state: () => ({
    components: [],
    pageId: null,
    errorMessage: "",
    successMessage: "",
  }),
  actions: {
    async loadPageComponents(pageId) {
      this.pageId = pageId;
      try {
        this.components = await loadPageComponents(pageId);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          this.errorMessage = error.response.data.msg;
        } else {
          this.errorMessage =
            error.message || "Erreur lors du chargement des composants";
        }
        console.error(
          "Erreur lors du chargement des composants :",
          this.errorMessage
        );
      }
    },

    async saveComponentsToDatabase() {
      if (!this.pageId) {
        this.errorMessage =
          "L'ID de la page n'est pas défini. Impossible de sauvegarder les composants.";
        console.error(this.errorMessage);
        return;
      }

      try {
        await saveComponentsToDatabase(this.pageId, this.components);
        this.successMessage = "Composants sauvegardés avec succès.";
      } catch (error) {
        if (error.response && error.response.data && error.response.data.msg) {
          this.errorMessage = error.response.data.msg;
        } else {
          this.errorMessage =
            error.message || "Erreur lors de la sauvegarde des composants";
        }
        console.error(
          "Erreur lors de la sauvegarde des composants :",
          this.errorMessage
        );
      }
    },

    addComponent(component) {
      const newComponent = {
        id: uuidv4(),
        type: component.type,
        content: component.content || {},
        style: component.style || {},
      };
      this.components.push(newComponent);
      this.saveComponentsToDatabase();
    },

    updateComponentsOrder(updatedComponents) {
      this.components = updatedComponents;
      this.saveComponentsToDatabase();
    },

    updateComponent({ id, newProps }) {
      const componentIndex = this.components.findIndex((c) => c.id === id);
      if (componentIndex !== -1) {
        this.components[componentIndex] = {
          ...this.components[componentIndex],
          ...newProps,
        };
        this.saveComponentsToDatabase();
      }
    },

    deleteComponent(id) {
      this.components = this.components.filter(
        (component) => component.id !== id
      );
      this.saveComponentsToDatabase();
    },
  },
});
