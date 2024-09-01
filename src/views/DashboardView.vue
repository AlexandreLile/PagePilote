<template>
  <div>
    <MyMenu></MyMenu>
    <div>
      <div class="grid_container">
        <h1>Retrouver vos <strong>landing page</strong></h1>
        <ul class="grid">
          <li v-for="page in pages" :key="page._id">
            <iframe
              :src="`http://localhost:3000/page/${page._id}`"
              class="iframe"
              height="500px"
            ></iframe>
            <div class="title_btn">
              <h3>{{ page.title }}</h3>
              <div class="btn_content">
                <MyButton
                  @click="openUpdateModal(page)"
                  size="md"
                  text="Paramètres"
                >
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.18747 1.94C7.27747 1.398 7.74747 1 8.29747 1H10.8905C11.4405 1 11.9105 1.398 12.0005 1.94L12.2135 3.221C12.2765 3.595 12.5265 3.907 12.8585 4.091C12.9325 4.131 13.0055 4.174 13.0785 4.218C13.4035 4.414 13.7985 4.475 14.1535 4.342L15.3705 3.886C15.6199 3.79221 15.8945 3.78998 16.1453 3.87971C16.3962 3.96945 16.6071 4.14531 16.7405 4.376L18.0365 6.623C18.1695 6.8537 18.2164 7.12413 18.1688 7.38617C18.1212 7.6482 17.9822 7.88485 17.7765 8.054L16.7735 8.881C16.4805 9.122 16.3355 9.494 16.3435 9.873C16.3449 9.95799 16.3449 10.043 16.3435 10.128C16.3355 10.506 16.4805 10.878 16.7735 11.119L17.7775 11.946C18.2015 12.296 18.3115 12.901 18.0375 13.376L16.7395 15.623C16.6063 15.8536 16.3957 16.0296 16.145 16.1195C15.8943 16.2094 15.6199 16.2074 15.3705 16.114L14.1535 15.658C13.7985 15.525 13.4035 15.586 13.0775 15.782C13.005 15.8261 12.9316 15.8688 12.8575 15.91C12.5265 16.093 12.2765 16.405 12.2135 16.779L12.0005 18.06C11.9105 18.603 11.4405 19 10.8905 19H8.29647C7.74647 19 7.27747 18.602 7.18647 18.06L6.97347 16.779C6.91147 16.405 6.66147 16.093 6.32947 15.909C6.25532 15.8681 6.18197 15.8258 6.10947 15.782C5.78447 15.586 5.38947 15.525 5.03347 15.658L3.81647 16.114C3.5672 16.2075 3.29283 16.2096 3.04217 16.1199C2.7915 16.0302 2.58078 15.8545 2.44747 15.624L1.15047 13.377C1.01741 13.1463 0.970515 12.8759 1.01812 12.6138C1.06573 12.3518 1.20476 12.1152 1.41047 11.946L2.41447 11.119C2.70647 10.879 2.85147 10.506 2.84447 10.128C2.8429 10.043 2.8429 9.95799 2.84447 9.873C2.85147 9.493 2.70647 9.122 2.41447 8.881L1.41047 8.054C1.20501 7.88489 1.06614 7.64843 1.01854 7.38662C0.970938 7.12481 1.01768 6.8546 1.15047 6.624L2.44747 4.377C2.58065 4.14614 2.79148 3.97006 3.04238 3.88014C3.29328 3.79021 3.56796 3.79229 3.81747 3.886L5.03347 4.342C5.38947 4.475 5.78447 4.414 6.10947 4.218C6.18147 4.174 6.25547 4.132 6.32947 4.09C6.66147 3.907 6.91147 3.595 6.97347 3.221L7.18747 1.94Z"
                      stroke="#E5EEF0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.5938 10C12.5938 10.7956 12.2777 11.5587 11.7151 12.1213C11.1525 12.6839 10.3894 13 9.59375 13C8.7981 13 8.03504 12.6839 7.47243 12.1213C6.90982 11.5587 6.59375 10.7956 6.59375 10C6.59375 9.20435 6.90982 8.44129 7.47243 7.87868C8.03504 7.31607 8.7981 7 9.59375 7C10.3894 7 11.1525 7.31607 11.7151 7.87868C12.2777 8.44129 12.5937 9.20435 12.5938 10Z"
                      stroke="#E5EEF0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </MyButton>
                <MyButton
                  @click="handleGoToPageBuilder(page._id)"
                  size="md"
                  text="Éditer"
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.862 3.23725L16.549 1.54925C16.9007 1.19757 17.3777 1 17.875 1C18.3723 1 18.8493 1.19757 19.201 1.54925C19.5527 1.90092 19.7502 2.3779 19.7502 2.87525C19.7502 3.37259 19.5527 3.84957 19.201 4.20125L8.582 14.8202C8.05332 15.3486 7.40137 15.737 6.685 15.9502L4 16.7502L4.8 14.0652C5.01328 13.3489 5.40163 12.6969 5.93 12.1682L14.862 3.23725ZM14.862 3.23725L17.5 5.87525M16 12.7502V17.5002C16 18.097 15.7629 18.6693 15.341 19.0912C14.919 19.5132 14.3467 19.7502 13.75 19.7502H3.25C2.65326 19.7502 2.08097 19.5132 1.65901 19.0912C1.23705 18.6693 1 18.097 1 17.5002V7.00025C1 6.40351 1.23705 5.83121 1.65901 5.40926C2.08097 4.9873 2.65326 4.75025 3.25 4.75025H8"
                      stroke="#E5EEF0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </MyButton>
              </div>
            </div>
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
    <MySecurityModal
      v-if="isSecurityModal"
      :text="`Êtes-vous sûr de vouloir supprimer ${this.title} ?`"
      @deleteElement="deleteComponent"
      @close="isSecurityModal = false"
    >
    </MySecurityModal>
    <MyUpdateModal
      v-if="isUpdateModalOpen"
      @click.self="closeUpdateModal"
      @close="closeUpdateModal"
      @apply="applyUpdates"
      @deleteComp="openSecurityModal"
    >
      <template #group>
        <h4>Titre de votre landing page</h4>
        <div class="separator">
          <input type="text" v-model="title" />
        </div>
        <h4>Balise méta (SEO)</h4>
        <div class="separator">
          <p>Meta Title</p>
          <input type="text" v-model="metaTitle" />
        </div>
        <div class="separator">
          <p>Meta Description</p>
          <textarea v-model="metaDescription"></textarea>
        </div>

        <!-- <p
          v-if="creationMessage"
          :style="{ color: creationSuccess ? 'green' : 'red' }"
        >
          {{ creationMessage }}
        </p> -->
      </template>
    </MyUpdateModal>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton.vue";
import MySecurityModal from "@/components/MySecurityModal.vue";
import MyMenu from "@/components/MyMenu.vue";
import MyUpdateModal from "@/components/pageBuilderComponents/MyUpdateModal.vue";
import MyFooter from "@/components/MyFooter.vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import {
  createPage,
  updatePage,
  deletePage,
  fetchPages,
  goToPageBuilder,
} from "@/api/landingPageApi";

export default {
  data() {
    return {
      isUpdateModalOpen: false,
      isSecurityModal: false,
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
    await this.handleFetchPages();
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
    openSecurityModal() {
      this.isSecurityModal = true;
    },

    async applyUpdates() {
      if (this.isEditing) {
        await this.handleUpdatePage();
      } else {
        await this.handleCreatePage();
      }
      this.closeUpdateModal();
    },
    closeUpdateModal() {
      this.isUpdateModalOpen = false;
    },
    async deleteComponent() {
      if (this.currentPageId) {
        await this.handleDeletePage(this.currentPageId);
        this.isSecurityModal = false;
      }
    },
    async handleCreatePage() {
      const { success, message, pageId } = await createPage(
        this.title,
        this.metaTitle,
        this.metaDescription
      );
      console.log("Création de la page, ID de la page:", pageId); // Log pour vérifier le pageId
      this.creationMessage = message;
      this.creationSuccess = success;

      if (success) {
        await this.handleFetchPages();

        if (pageId) {
          return this.handleGoToPageBuilder(pageId);
        } else {
          console.error("Aucun pageId renvoyé après la création de la page.");
        }
      }
    },

    async handleUpdatePage() {
      const { success, message } = await updatePage(
        this.currentPageId,
        this.title,
        this.metaTitle,
        this.metaDescription
      );
      this.creationMessage = message;
      this.creationSuccess = success;

      if (success) {
        await this.handleFetchPages();
        this.closeUpdateModal();
      }
    },
    async handleDeletePage(pageId) {
      const { success, message } = await deletePage(pageId);
      this.creationMessage = message;
      this.creationSuccess = success;

      if (success) {
        await this.handleFetchPages();
        this.closeUpdateModal();
      }
    },
    async handleFetchPages() {
      try {
        const response = await fetchPages();
        console.log("Réponse de fetchPages:", response);

        const { success, pages, message } = response;
        console.log("Pages récupérées :", pages);

        if (success) {
          this.pages = pages;
        } else {
          this.fetchErrorMessage = message;
        }
      } catch (error) {
        this.fetchErrorMessage = "Erreur lors de la récupération des pages.";
        console.error("Erreur dans handleFetchPages :", error.message);
      }
    },

    async handleGoToPageBuilder(pageId) {
      try {
        if (pageId) {
          await goToPageBuilder(pageId, this.$router);
        } else {
          console.warn("Page ID is not defined.");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la navigation vers le page builder :",
          error
        );
        this.fetchErrorMessage =
          "Erreur lors de la navigation vers le page builder.";
      }
    },
  },
  components: {
    MyMenu,
    MyButton,
    MyUpdateModal,
    MyFooter,
    MySecurityModal,
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 50px;
  padding: 50px 25px;
  min-height: 600px;
}

.grid li {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  min-height: 400px;
}

.grid_container {
  text-align: center;
  padding: 100px 15px;
}

.grid_container h1 {
  font-size: 2.5rem;
  padding-bottom: 25px;
}

.grid_container strong {
  color: var(--primary-color);
}

.iframe {
  width: 100%;
  height: 400px;
  border: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
}

.title_btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
}

.title_btn h3 {
  font-size: 2rem;
  font-weight: 400;
}

.btn_content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

@media (max-width: 500px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
