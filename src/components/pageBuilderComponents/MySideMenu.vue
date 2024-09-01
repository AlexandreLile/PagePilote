<template>
  <aside class="aisde">
    <div class="container">
      <input type="search" v-model="searchButton" placeholder="recherche" />
      <div class="grid">
        <MyButton
          class="button-wrapper"
          v-for="(button, index) in sortedButtons"
          :key="index"
          :text="button.text"
          :size="button.size"
          @click="button.onClick"
          @mouseover="hoveredButton = index"
          @mouseleave="hoveredButton = null"
          ><img
            v-if="(hoveredButton = index)"
            :src="getImageSrc(button.text)"
            alt="Image hover"
            class="hover-image"
        /></MyButton>
      </div>
    </div>
  </aside>
</template>

<script>
import MyButton from "../MyButton.vue";
import { usePageStore } from "@/stores/componentsStore";

export default {
  data() {
    return {
      showComponents: true,
      searchButton: "",
      hoveredButton: null,
      buttons: [
        {
          text: "Menu",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyMenuBuilder", props: {} });
          },
        },
        {
          text: "Bannière",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyHero", props: {} });
          },
        },
        {
          text: "Bannière arche",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyHeroTemplate1", props: {} });
          },
        },
        {
          text: "Itèmes",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyItems", props: {} });
          },
        },
        {
          text: "Itèmes avec icones",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyItemsIcons", props: {} });
          },
        },
        {
          text: "Texte",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyText", props: {} });
          },
        },
        {
          text: "Texte arche",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyTextTemplate1", props: {} });
          },
        },
        {
          text: "Image pleine largeur",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyImgFullWidth", props: {} });
          },
        },
        {
          text: "Image et texte",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyDoubleColumn", props: {} });
          },
        },
        {
          text: "Information",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyInformation", props: {} });
          },
        },
        {
          text: "Bas de page",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyFooterBuilder", props: {} });
          },
        },
        {
          text: "Template",
          size: "builder",
          onClick: () => {
            this.addComponent({ type: "MyMenu", props: {} });
            this.addComponent({ type: "MyHeroTemplate1", props: {} });
            this.addComponent({ type: "MyTextTemplate1", props: {} });
            this.addComponent({ type: "MyItemsIcons", props: {} });
            this.addComponent({ type: "MyDoubleColumn", props: {} });
            this.addComponent({ type: "MyInformation", props: {} });
          },
        },
      ],
    };
  },
  methods: {
    getImageSrc(buttonText) {
      switch (buttonText) {
        case "Image et texte":
          return "/public/banniere.png";
        case "Bannière":
          return "/public/hero.png";
        case "Itèmes":
          return "/public/items.png";
        case "Bannière arche":
          return "/public/arche.png";
        case "Information":
          return "/public/information.png";
        case "Bas de page":
          return "/public/footer.png";
        case "Image pleine largeur":
          return "/public/imgfullwidth.png";
        case "Texte arche":
          return "/public/textarche.png";
        case "Texte":
          return "/public/texte.png";
        case "Itèmes avec icones":
          return "/public/itemsicons.png";

        case "Template":
          return "/public/template.png";
      }
    },

    addComponent(component) {
      const pageStore = usePageStore();
      pageStore.addComponent(component);
      console.log("Composant ajouté:", component);
      console.log("Tous les composants:", pageStore.components);
    },
  },
  computed: {
    sortedButtons() {
      if (!this.searchButton) {
        return this.buttons;
      }
      return [...this.buttons].sort((a, b) => {
        const aMatch = a.text
          .toLowerCase()
          .includes(this.searchButton.toLowerCase());
        const bMatch = b.text
          .toLowerCase()
          .includes(this.searchButton.toLowerCase());
        return aMatch === bMatch ? 0 : aMatch ? -1 : 1;
      });
    },
  },

  components: {
    MyButton,
  },
};
</script>

<style scoped>
.hover-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.button-wrapper:hover img {
  opacity: 1;
}
.container {
  max-height: 80vh;
  overflow-y: auto;
  padding: 25px 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 0.5rem;
  background-color: #fcfcfc;
  height: 100%;
  display: flex;
  gap: 15px;
  flex-direction: column;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: minmax(auto, 80px);
  gap: 5px;

  min-width: 100px;
}

.container > * {
  max-height: 80px;
}

input {
  border: solid 2px #2b303a;
  border-radius: 0.5rem;
  height: 35px;
  padding: 5px;
}
</style>
