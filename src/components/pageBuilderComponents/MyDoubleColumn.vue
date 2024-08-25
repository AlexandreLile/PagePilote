<template>
  <div class="container_builder">
    <section class="two_col" :style="{ background: style.backgroundColor }">
      <div
        class="container_two_col"
        :class="{ 'row-reverse': content.dislayImgRight }"
      >
        <div class="content_two_col">
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
        <div class="container_img">
          <img :src="content.img" alt="" />
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
        img: "/public/DefaultImg.jpg",
        link: "",
        btnText: "Call to action",
        showLink: true,
        dislayImgRight: false,
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
      this.loadFromStore();
    },
  },
};
</script>

<style scoped>
.two_col {
  padding: 100px 0;
}
.container_two_col {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;

  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.row-reverse {
  flex-direction: row-reverse;
}

.content_two_col {
  gap: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  text-align: left;
}
.container_img {
  height: 100%;
  flex: 1;
}

.container_img img {
  display: block;
  max-width: 100%;
  height: 100%;

  object-fit: cover;
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
