<template>
  <div>
    <MyMenu></MyMenu>
    <div>
      <div class="grid_container">
        <h2>Mes Pages</h2>
        <ul class="grid">
          <li v-for="page in pages" :key="page._id">
            <h3>{{ page.title }}</h3>
            <MyButton
              @click="openUpdateModal(page)"
              size="sm"
              text="Modifier"
            ></MyButton>
            <MyButton
              @click="goToPageBuilder(page._id)"
              size="md"
              text="Page Builder"
            ></MyButton>
          </li>
          <li>
            <MyButton
              @click="openUpdateModal()"
              size="md"
              text="Créer une Landing Page"
            ></MyButton>
          </li>
        </ul>
        <p v-if="fetchErrorMessage" style="color: red">
          {{ fetchErrorMessage }}
        </p>
      </div>
    </div>
  </div>

  <MyUpdateModal
    v-if="isUpdateModalOpen"
    @click.self="closeUpdateModal"
    @close="closeUpdateModal"
    @apply="applyUpdates"
    @deleteComp="deleteComponent"
  >
    <template #group>
      <div>
        <form>
          <div>
            <label for="title">Titre</label>
            <input type="text" v-model="title" required />
          </div>
          <div>
            <label for="metaTitle">Meta Title</label>
            <input type="text" v-model="metaTitle" />
          </div>
          <div>
            <label for="metaDescription">Meta Description</label>
            <textarea v-model="metaDescription"></textarea>
          </div>
        </form>
        <p
          v-if="creationMessage"
          :style="{ color: creationSuccess ? 'green' : 'red' }"
        >
          {{ creationMessage }}
        </p>
      </div>
    </template>
  </MyUpdateModal>
</template>
<script>
import MyButton from "@/components/MyButton.vue";
import MyMenu from "@/components/MyMenu.vue";
import MyUpdateModal from "@/components/pageBuilderComponents/MyUpdateModal.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { usePageStore } from "@/stores/componentsStore";

export default {
  data() {
    return {
      isUpdateModalOpen: false,
      isEditing: false,
      currentPageId: null,
      title: "",
      metaTitle: "",
      metaDescription: "",
      pages: [],
      creationMessage: "",
      creationSuccess: false,
      fetchErrorMessage: "",
    };
  },
  async created() {
    this.fetchPages();
  },
  methods: {
    openUpdateModal(page = null) {
      this.isEditing = !!page;
      if (this.isEditing) {
        this.currentPageId = page._id;
        this.title = page.title;
        this.metaTitle = page.metaTitle;
        this.metaDescription = page.metaDescription;
      } else {
        this.currentPageId = null;
        this.title = "";
        this.metaTitle = "";
        this.metaDescription = "";
      }
      this.isUpdateModalOpen = true;
    },
    async applyUpdates() {
      if (this.isEditing) {
        await this.updatePage();
      } else {
        await this.createPage();
      }
      this.closeUpdateModal();
    },
    closeUpdateModal() {
      this.isUpdateModalOpen = false;
    },

    deleteComponent() {
      if (this.currentPageId) {
        this.deletePage(this.currentPageId);
        this.closeUpdateModal();
      }
    },
    async createPage() {
      this.creationMessage = "";
      this.creationSuccess = false;

      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error(
            "Token d'authentification non trouvé. Veuillez vous connecter."
          );

        const response = await axios.post(
          "http://localhost:3000/landingPages",
          {
            title: this.title,
            metaTitle: this.metaTitle,
            metaDescription: this.metaDescription,
          },
          { headers: { "x-auth-token": token } }
        );

        this.creationMessage = "Page créée avec succès!";
        this.creationSuccess = true;
        this.fetchPages();
        this.goToPageBuilder(response.data._id); // Pass the newly created page ID
      } catch (error) {
        this.creationMessage =
          error.response?.data?.msg || "Erreur lors de la création de la page.";
        this.creationSuccess = false;
      }
    },
    async updatePage() {
      this.creationMessage = "";
      this.creationSuccess = false;

      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error(
            "Token d'authentification non trouvé. Veuillez vous connecter."
          );

        await axios.put(
          `http://localhost:3000/landingPages/${this.currentPageId}`,
          {
            title: this.title,
            metaTitle: this.metaTitle,
            metaDescription: this.metaDescription,
          },
          { headers: { "x-auth-token": token } }
        );

        this.creationMessage = "Page modifiée avec succès!";
        this.creationSuccess = true;
        this.fetchPages();
      } catch (error) {
        this.creationMessage =
          error.response?.data?.msg ||
          "Erreur lors de la modification de la page.";
        this.creationSuccess = false;
      }
    },
    async deletePage(pageId) {
      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error(
            "Token d'authentification non trouvé. Veuillez vous connecter."
          );

        await axios.delete(`http://localhost:3000/landingPages/${pageId}`, {
          headers: { "x-auth-token": token },
        });

        this.creationMessage = "Page supprimée avec succès!";
        this.creationSuccess = true;
        this.fetchPages();
      } catch (error) {
        this.creationMessage =
          error.response?.data?.msg ||
          "Erreur lors de la suppression de la page.";
        this.creationSuccess = false;
      }
    },
    async fetchPages() {
      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error(
            "Token d'authentification non trouvé. Veuillez vous connecter."
          );

        const response = await axios.get("http://localhost:3000/landingPages", {
          headers: { "x-auth-token": token },
        });

        this.pages = response.data;
      } catch (error) {
        this.fetchErrorMessage =
          error.response?.data?.msg ||
          "Erreur lors de la récupération des pages.";
      }
    },
    async goToPageBuilder(pageId) {
      console.log("goToPageBuilder called with pageId:", pageId);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(
            "Token d'authentification non trouvé. Veuillez vous connecter."
          );
        }

        // Vérifier si la page a déjà un builder associé
        try {
          const response = await axios.get(
            `http://localhost:3000/pageBuilder/${pageId}`,
            { headers: { "x-auth-token": token } }
          );
          // Si le constructeur de page existe, rediriger vers le page builder
          if (response.status === 200) {
            this.$router.push(`/page-builder/${pageId}`);
            return; // Terminer la fonction ici, car le builder existe déjà
          }
        } catch (error) {
          // Si une erreur 404 est rencontrée, alors le constructeur de page n'existe pas
          if (error.response && error.response.status === 404) {
            // Créer un nouveau builder
            await axios.post(
              `http://localhost:3000/pageBuilder/${pageId}`,
              { components: [] }, // Initialiser avec des composants vides ou par défaut
              { headers: { "x-auth-token": token } }
            );
            this.$router.push(`/page-builder/${pageId}`);
            return; // Terminer la fonction ici après la création
          } else {
            throw error; // Rejeter l'erreur si ce n'est pas une erreur 404
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la navigation vers le page builder :",
          error
        );
      }
    },
  },
  components: {
    MyMenu,
    MyButton,
    MyUpdateModal,
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  padding: 50px 25px;
}

.grid li {
  height: 250px;
  max-width: 100%;
  background-color: var(--light);
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}

.grid_container {
  text-align: center;
  padding: 100px 15px;
}
</style>
