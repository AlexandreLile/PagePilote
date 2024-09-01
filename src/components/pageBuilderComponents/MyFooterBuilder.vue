<template>
  <div class="container_builder">
    <section
      class="footer"
      :style="{ backgroundColor: style.topBackgroundColor }"
    >
      <div class="container_footer">
        <div class="logo_title_footer">
          <img
            :style="{ width: style.logoSize + 'px' }"
            :src="content.logo"
            alt=""
          />
          <h2
            :style="{
              color: style.titleColor,
              fontSize: style.titleFontSize + 'rem',
            }"
          >
            {{ content.title }}
          </h2>
        </div>
        <div
          class="credits_footer"
          :style="{ backgroundColor: style.bottomBackgroundColor }"
        >
          <p :style="{ color: style.companyColor }">
            &copy; 2024 | {{ content.company }}
          </p>
          <a :href="content.mail" :style="{ color: style.mailColor }">{{
            content.mail
          }}</a>
        </div>
      </div>
      <MyButton
        @click="openUpdateModal"
        class="btn_edit"
        text="Modifier"
        size="md"
      ></MyButton>
      <MyUpdateModal
        v-if="isUpdateModalOpen"
        @click.self="closeUpdateModal"
        @close="closeUpdateModal"
        @apply="applyUpdates"
        @deleteComp="deleteComponent"
      >
        <template #group>
          <h4>Bas de page</h4>
          <div class="separator">
            <p>Couleur de fond de la partie haute</p>
            <input type="color" v-model="style.topBackgroundColor" />
          </div>
          <div class="separator">
            <p>Couleur de fond de la partie basse</p>
            <input type="color" v-model="style.bottomBackgroundColor" />
          </div>
          <h4>Votre logo</h4>
          <div class="separator">
            <input type="file" @change="onImageChange" accept="image/*" />
          </div>
          <div class="separator">
            <p>taille du logo</p>
            <input
              type="number"
              v-model="style.logoSize"
              step="10"
              min="20"
              max="200"
            />
          </div>
          <h4>Titre Principal</h4>
          <div class="separator">
            <input type="text" v-model="content.title" />
          </div>
          <div class="separator">
            <p>taille</p>
            <input
              type="number"
              v-model="style.titleFontSize"
              step="0.25"
              min="1"
              max="5"
            />
          </div>
          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.titleColor" />
          </div>
          <h4>Société</h4>
          <div class="separator">
            <input type="text" v-model="content.company" />
          </div>
          <div class="separator">
            <p>Couleur de la société</p>
            <input type="color" v-model="style.companyColor" />
          </div>
          <h4>Adresse mail</h4>
          <div class="separator">
            <input type="text" v-model="content.mail" />
          </div>
          <div class="separator">
            <p>Couleur du mail</p>
            <input type="color" v-model="style.mailColor" />
          </div>
        </template>
      </MyUpdateModal>
    </section>
  </div>
</template>

<script>
import { usePageStore } from "@/stores/componentsStore";
import MyButton from "../MyButton.vue";
import MyUpdateModal from "./MyUpdateModal.vue";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    MyButton,
    MyUpdateModal,
  },
  data() {
    return {
      isUpdateModalOpen: false,

      content: {
        title: "Titre Principal",

        logo: "/public/logo.svg",
        company: "Nom de la société",
        mail: "adressemail@mail.com",
      },
      style: {
        titleColor: "#00000",
        titleFontSize: "2rem",
        topBackgroundColor: "#fff",
        bottomBackgroundColor: "#CCC",
        mailColor: "#000",
        logoSize: "50px",
        companyColor: "#000",
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
        this.content = { ...this.content, ...component.content };
        this.style = { ...this.style, ...component.style };
      }
    },

    openUpdateModal() {
      this.isUpdateModalOpen = true;
      this.$emit("toggle-draggable", false);
    },
    applyUpdates() {
      this.updateStoreContent();
      this.isUpdateModalOpen = false;
      this.$emit("toggle-draggable", true);
    },
    closeUpdateModal() {
      this.isUpdateModalOpen = false;
      this.$emit("toggle-draggable", true);
    },
    deleteComponent() {
      const pageStore = usePageStore();
      pageStore.deleteComponent(this.id);
      this.closeUpdateModal();
      this.$emit("toggle-draggable", true);
    },
    displayLink() {
      this.isDisplayLinkOpen = true;
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.content.logo = e.target.result;
          this.updateStoreContent();
        };

        reader.readAsDataURL(file);
      }
    },
  },
  mounted() {
    this.loadFromStore();
  },
  watch: {
    id(newId) {
      this.loadFromStore(); // Recharger les données si l'ID change
    },
  },
};
</script>

<style scoped>
.container_footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.logo_title_footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  padding: 20px 15px;
}

.logo_title_footer img {
  width: 50px;
}

.credits_footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px;

  width: 100%;
}

.credits_footer_home a {
  padding: 0;
}

.btn_edit {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  z-index: 250;
}

input {
  border: solid 2px #2b303a;
  border-radius: 0.5rem;
  height: 35px;
  padding: 5px;
  width: 100%;
}

input[type="number"],
input[type="color"] {
  width: 30%;
}
input[type="checkbox"] {
  width: 10%;
  height: 30px;
}
</style>
