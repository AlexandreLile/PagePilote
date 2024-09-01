<template>
  <div class="container_builder">
    <section class="container-grid">
      <div
        class="grid"
        :style="{
          background: style.backgroundColor,
          paddingTop: style.paddingTop + 'px',
          paddingBottom: style.paddingBottom + 'px',
        }"
      >
        <article
          class="grid-item"
          :style="{ background: style.backgroundColorCard }"
        >
          <h3
            contenteditable="true"
            @input="updateContent('title1', $event)"
            :style="{
              color: style.title1Color,
              fontSize: style.titleSize + 'rem',
            }"
          >
            {{ content.title1 }}
          </h3>
          <p :style="{ color: style.paragraphColor }">
            {{ content.paragraph1 }}
          </p>
        </article>
        <article
          class="grid-item"
          :style="{ background: style.backgroundColorCard }"
        >
          <h3
            :style="{
              color: style.title2Color,
              fontSize: style.titleSize + 'rem',
            }"
          >
            {{ content.title2 }}
          </h3>
          <p :style="{ color: style.paragraphColor }">
            {{ content.paragraph2 }}
          </p>
        </article>
        <article
          class="grid-item"
          :style="{ background: style.backgroundColorCard }"
        >
          <h3
            :style="{
              color: style.title3Color,
              fontSize: style.titleSize + 'rem',
            }"
          >
            {{ content.title3 }}
          </h3>
          <p :style="{ color: style.paragraphColor }">
            {{ content.paragraph3 }}
          </p>
        </article>
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
          <h4>Cartes</h4>
          <div class="separator">
            <p>Couleur de fond</p>
            <input type="color" v-model="style.backgroundColor" />
          </div>
          <div class="separator">
            <p>Espacement haut</p>
            <input
              type="number"
              v-model="style.paddingTop"
              step="25"
              min="25"
              max="200"
            />
          </div>
          <div class="separator">
            <p>Espacement bas</p>
            <input
              type="number"
              v-model="style.paddingBottom"
              step="25"
              min="25"
              max="200"
            />
          </div>
          <div class="separator">
            <p>Couleur de fond des cartes</p>
            <input type="color" v-model="style.backgroundColorCard" />
          </div>
          <div class="separator">
            <p>taille des titres</p>
            <input
              type="number"
              v-model="style.titleSize"
              step="0.25"
              min="1"
              max="5"
            />
          </div>
          <div class="separator">
            <p>Couleur des paragraphes</p>
            <input type="color" v-model="style.paragraphColor" />
          </div>
          <h4>Carte 1</h4>
          <div class="separator">
            <input type="text" v-model="content.title1" />
          </div>

          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.title1Color" />
          </div>
          <div class="separator">
            <p>Paragraphe</p>
            <textarea v-model="content.paragraph1"></textarea>
          </div>

          <h4>Carte 2</h4>
          <div class="separator">
            <input type="text" v-model="content.title2" />
          </div>

          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.title2Color" />
          </div>
          <div class="separator">
            <p>Paragraphe</p>
            <textarea v-model="content.paragraph2"></textarea>
          </div>

          <h4>Carte 3</h4>
          <div class="separator">
            <input type="text" v-model="content.title3" />
          </div>
          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.title3Color" />
          </div>
          <div class="separator">
            <p>Paragraphe</p>
            <textarea v-model="content.paragraph3"></textarea>
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
        title: "Titre",
        subTitle: "Sous Titre",
        title1: "Titre Principal",
        paragraph1:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        title2: "Titre Principal",
        paragraph2:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        title3: "Titre Principal",
        paragraph3:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      },
      style: {
        titleColor: "#00000",
        backgroundColor: "#ffffff",
        titleFontSize: "1.5rem",
        title1Color: "#000",
        title2Color: "#000",
        title3Color: "#000",
        paragraphColor: "#000",
        carteBackground: "#fff",
        backgroundColorCard: "#fff",
        paragraphColor: "#000",
        paddingTop: "100px",
        paddingBottom: "100px",
      },
    };
  },
  // computed: {
  //   computedStyle() {
  //     return {
  //       color: this.style.color,
  //       backgroundColor: this.style.backgroundColor,
  //       fontSize: this.style.fontSize,
  //     };
  //   },
  // },
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
.container-grid {
  position: relative;
  margin: 15px;
  height: 100%;
  padding: 15px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 35px;
  height: 100%;
  grid-auto-rows: minmax(100px, auto);
}

.grid-item {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
  text-align: center;
  padding: 30px 20px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;
  gap: 15px;
  position: relative;
  transition: all 0.5s ease;
}

.grid-item::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 54%;
  left: 53%;
  border-radius: 5px;
  background-color: var(--primary-color);
  transform: translate(-50%, -50%);
  z-index: -2;
  transition: all 0.3s ease;
}

.grid-item:hover::after {
  top: 50%;
  left: 50%;
}

.grid-item:hover {
  box-shadow: 0 0 3px var(--primary-color), 0 0 3px var(--primary-color) inset;
}
.btn_edit {
  position: absolute;
  top: 4%;
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
</style>
