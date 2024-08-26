<template>
  <div class="container_builder">
    <section class="text">
      <div
        class="container_txt_style"
        :style="{ backgroundColor: style.backgroundColor }"
      >
        <div
          class="style-text"
          :style="{ backgroundColor: style.waveColor }"
        ></div>
        <div class="container_txt">
          <h2
            :style="{
              color: style.titleColor,
              fontSize: style.titleFontSize + 'rem',
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
          <div class="separator">
            <p>Couleur de fond à gauche</p>
            <input type="color" v-model="style.waveColor" />
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
        paragraph:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard",
        img: "/public/DefaultImg.jpg",
        link: "",
        btnText: "Call to action",
        showLink: true,
      },
      style: {
        titleColor: "#00000",
        backgroundColor: "#ffffff",
        titleFontSize: "2rem",
        paragraphColor: "#000",
        waveColor: "#ddd",
        btnTextColor: "#fff",
        btnBackgroundColor: "#000",
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
          this.content.img = e.target.result;
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
.text {
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 100%;

  width: 100%;
}

.container_txt {
  padding: 50px 20px;
  max-width: 500px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 15px;
  text-align: left;
  z-index: 11;
}
.style-text {
  display: block;
  width: 40%;
  background-color: var(--primary-color);
  height: 100%;
  border-top-right-radius: 999px;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
}

.container_txt_style {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: var(--light);
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
</style>
