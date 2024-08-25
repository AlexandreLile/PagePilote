<template>
  <div class="container_builder">
    <section class="img_full_width" :style="backgroundStyle">
      <div
        class="container_img_full_width"
        :class="[style.selectedContentPosition, style.selectedOpacity]"
      >
        <div class="content_img_full_width">
          <h2
            :style="{
              fontSize: style.titleFontSize + 'rem',
              color: style.titleColor,
            }"
          >
            {{ content.title }}
          </h2>

          <p :style="{ color: style.paragraphColor }">
            {{ content.paragraph }}
          </p>
          <a
            :style="{
              color: style.btnTextColor,
              background: style.btnBackgroundColor,
            }"
            v-if="content.showLink"
            class="link_builder"
            :href="content.link"
            target="_blank"
            rel="noopener noreferrer"
            >{{ content.btnText }}</a
          >
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
          <h4>Couleur de fond</h4>
          <div class="separator">
            <input type="color" v-model="style.backgroundColor" />
          </div>
          <h4>Mettre l'image à droite</h4>
          <div class="separator">
            <input type="checkbox" v-model="content.dislayImgRight" />
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
          <h4>Paragraphe</h4>
          <div class="separator">
            <textarea type="text" v-model="content.paragraph"> </textarea>
          </div>
          <div class="separator">
            <p>Couleur du paragraphe</p>
            <input type="color" v-model="style.paragraphColor" />
          </div>

          <div class="separator">
            <p>Image</p>
            <input type="file" @change="onImageChange" accept="image/*" />
          </div>
          <h4>Bouton</h4>
          <div class="separator">
            <p>Afficher le bouton</p>
            <input type="checkbox" v-model="content.showLink" />
          </div>
          <div class="separator">
            <p>Texte du bouton</p>
            <input type="text" v-model="content.btnText" />
          </div>
          <div class="separator">
            <p>Lien du bouton</p>
            <input type="text" v-model="content.link" placeholder="https://" />
          </div>
          <div class="separator">
            <p>Couleur du bouton</p>
            <input type="color" v-model="style.btnTextColor" />
          </div>
          <div class="separator">
            <p>Couleur de fond du bouton</p>
            <input type="color" v-model="style.btnBackgroundColor" />
          </div>
          <div class="separator">
            <p>Position du contenu</p>
            <select v-model="style.selectedContentPosition">
              <option value="flex-start">Aligner à gauche</option>
              <option value="center">Centrer</option>
              <option value="flex-end">Aligner à droite</option>
            </select>
          </div>
          <div class="separator">
            <p>Opacité</p>
            <select v-model="style.selectedOpacity">
              <option value="light">Claire</option>
              <option value="dark">Foncé</option>
            </select>
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
        subTitle: "Sous Titre",
        backgroundImg: `/public/DefaultImg.jpg`,
        link: "",
        btnText: "Call to action",
        showLink: true,
        paragraph:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard",
      },
      style: {
        titleColor: "#00000",
        backgroundColor: "#ffffff",
        titleFontSize: "2rem",
        subTitleSize: "1.5rem",
        subTitleColor: "#000",
        btnTextColor: "#fff",
        btnBackgroundColor: "#000",
        paragraphColor: "#000",
        selectedContentPosition: "flex-start",
        selectedOpacity: "light",
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
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.content.backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          this.content.backgroundImg = e.target.result;
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
      this.loadFromStore();
    },
  },
};
</script>

<style scoped>
.img_full_width {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.container_img_full_width {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 50vh;
}

.content_img_full_width {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  padding: 0 20px;
}

.flex-start {
  justify-content: flex-start;
}

.center {
  justify-content: center;
}

.flex-end {
  justify-content: flex-end;
}

.light {
  background: rgba(255, 255, 255, 0.2);
}

.dark {
  background: rgba(0, 0, 0, 0.3);
}
.btn_edit {
  position: absolute;
  top: 8%;
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
@media (max-width: 1000px) {
  .hero {
    flex-direction: column;
  }
  .container_content {
    text-align: center;
  }
}
</style>
