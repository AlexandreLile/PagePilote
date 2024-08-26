<template>
  <div class="container_builder">
    <section class="container-grid">
      <h2
        :style="{
          fontSize: style.titleFontSize + 'rem',
          color: style.titleColor,
        }"
      >
        {{ content.title }}
      </h2>
      <div class="grid" :style="{ background: style.backgroundColor }">
        <article
          class="grid-item"
          :style="{ background: style.backgroundColorCard }"
        >
          <img :src="content.icone1" alt="" />
          <h3
            contenteditable="true"
            @input="updateContent('title1', $event)"
            :style="{
              color: style.title1Color,
              fontSize: style.titleCardFontSize + 'rem',
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
          <img :src="content.icone2" alt="" />
          <h3
            :style="{
              color: style.title2Color,
              fontSize: style.titleCardFontSize + 'rem',
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
          <img :src="content.icone3" alt="" />
          <h3
            :style="{
              color: style.title3Color,
              fontSize: style.titleCardFontSize + 'rem',
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
          <h4>Titre Principal</h4>
          <div class="separator">
            <input type="text" v-model="content.title" />
          </div>
          <p>Taille du titre principal</p>
          <div class="separator">
            <input
              type="number"
              v-model="style.titleFontSize"
              step="0.25"
              min="1"
              max="5"
            />
          </div>
          <div class="separator">
            <p>Couleur du titre principal</p>
            <input type="color" v-model="style.titleColor" />
          </div>
          <h4>Cartes</h4>
          <div class="separator">
            <p>Couleur de fond</p>
            <input type="color" v-model="style.backgroundColor" />
          </div>
          <div class="separator">
            <p>Couleur de fond des cartes</p>
            <input type="color" v-model="style.backgroundColorCard" />
          </div>
          <div class="separator">
            <p>taille des titres</p>
            <input
              type="number"
              v-model="style.titleCardFontSize"
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
            <p>Icone</p>
            <input
              type="file"
              @change="onImageChange('icone1', $event)"
              accept="image/*"
            />
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
            <p>Icone</p>
            <input
              type="file"
              @change="onImageChange('icone2', $event)"
              accept="image/*"
            />
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
            <p>Icone</p>
            <input
              type="file"
              @change="onImageChange('icone3', $event)"
              accept="image/*"
            />
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
        title: "Les points forts de : Nom de l’entreprise",
        subTitle: "Sous Titre",
        icone1: "/public/logo.svg",
        title1: "Titre Principal",
        paragraph1:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        icone2: "/public/logo.svg",
        title2: "Titre Principal",
        paragraph2:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        icone3: "/public/logo.svg",
        title3: "Titre Principal",
        paragraph3:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      },
      style: {
        titleColor: "#00000",
        backgroundColor: "#ffffff",
        titleFontSize: "2rem",
        titleColor: "#000",
        titleCardFontSize: "1.5rem",
        title1Color: "#000",
        title2Color: "#000",
        title3Color: "#000",
        paragraphColor: "#000",
        carteBackground: "#fff",
        backgroundColorCard: "#fff",
        paragraphColor: "#000",
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
    onImageChange(iconeKey, event) {
      const file = event.target.files[0];
      if (file) {
        console.log(`Selected file: ${file.name}`);
        const reader = new FileReader();

        reader.onload = (e) => {
          console.log(`Image loaded: ${e.target.result}`);
          this.content[iconeKey] = e.target.result;
          this.updateStoreContent();
        };

        reader.readAsDataURL(file);
      } else {
        console.log("No file selected");
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
.container-grid {
  position: relative;
  margin: 15px;
  height: 100%;
  padding: 15px;
}

.container-grid h2 {
  text-align: center;
  padding: 25px 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 35px;
  height: 100%;
  grid-auto-rows: minmax(100px, auto);
}

.grid-item {
  text-align: center;
  padding: 30px 20px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 15px;
  position: relative;
  transition: all 0.5s ease;
}
.grid-item img {
  width: 35px;
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
