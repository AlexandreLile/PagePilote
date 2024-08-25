import { defineStore } from "pinia";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const usePageStore = defineStore("page", {
  state: () => ({
    components: [],
    pageId: null,
  }),
  actions: {
    async reloadPage() {
      if (this.pageId) {
        await this.loadPageComponents(this.pageId);
      }
    },
    // Charger le tableau des composant d'une page en fonction de son ID
    async loadPageComponents(pageId) {
      this.pageId = pageId;
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:3000/pageBuilder/${pageId}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        this.components = response.data;
        // this.saveComponentsToLocalStorage();
      } catch (error) {
        console.error("Erreur lors du chargement des composants :", error);
        // this.loadComponentsFromLocalStorage();
      }
    },
    //Enregistrer le tableau en Base de donnée en l'associant à l'ID de la page

    async saveComponentsToDatabase() {
      if (!this.pageId) {
        console.error("Page ID is not set. Cannot save components.");
        return;
      }

      const token = localStorage.getItem("token");

      try {
        await axios.put(
          `http://localhost:3000/pageBuilder/${this.pageId}`,
          { components: this.components },
          {
            headers: { "x-auth-token": token },
          }
        );
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des composants :", error);
      }
    },

    // Permet d'ajouter des comopsants au tableau en leurs attribuant un ID unique + le contenu et le Style
    //Dans MySideMenu au click sur un composants j'apelle la fonction addComponent
    addComponent(component) {
      const newComponent = {
        id: uuidv4(),
        type: component.type,
        content: component.content || {},
        style: component.style || {},
      };
      this.components.push(newComponent);

      // this.saveComponentsToLocalStorage();
      this.saveComponentsToDatabase();
    },

    // Permet de changer l'order des composants dans le tableau
    updateComponentsOrder(updatedComponents) {
      this.components = updatedComponents;
      // this.saveComponentsToLocalStorage();
      this.saveComponentsToDatabase();
    },

    //Modifie le style ou le contene d'u composant en fonction de l'ID

    updateComponent({ id, newProps }) {
      const componentIndex = this.components.findIndex((c) => c.id === id);
      if (componentIndex !== -1) {
        this.components[componentIndex] = {
          ...this.components[componentIndex],
          ...newProps,
        };
        // this.saveComponentsToLocalStorage();
        this.saveComponentsToDatabase();
      }
    },
    //Suprrimer un composant

    deleteComponent(id) {
      this.components = this.components.filter(
        (component) => component.id !== id
      );
      // this.saveComponentsToLocalStorage();
      this.saveComponentsToDatabase();
    },

    // Mécanique d'enregistrement et de lecture depuis le local storage

    // saveComponentsToLocalStorage() {
    //   localStorage.setItem("components", JSON.stringify(this.components));
    // },
    // loadComponentsFromLocalStorage() {
    //   const components = localStorage.getItem("components");
    //   if (components) {
    //     this.components = JSON.parse(components);
    //   }
    // },
  },
});
