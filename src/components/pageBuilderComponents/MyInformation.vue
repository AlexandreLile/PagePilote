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
          <div v-if="content.showMail" class="content_info">
            <strong>Adresse mail : </strong>
            <a
              :style="{
                color: style.mailColor,
              }"
              :href="content.mail"
              target="_blank"
              rel="noopener noreferrer"
              >{{ content.mail }}</a
            >
          </div>

          <div v-if="content.showPhone" class="content_info">
            <strong>Numéro de téléphone : </strong>
            <a
              :style="{
                color: style.phoneColor,
              }"
              :href="content.phone"
              target="_blank"
              rel="noopener noreferrer"
              >{{ content.phone }}</a
            >
          </div>

          <div class="content_info">
            <strong>Adresse postale : </strong>
            <p :style="{ color: style.locationColor }">
              {{ content.location }}
            </p>
          </div>
        </div>
        <div class="container_iframe">
          <iframe :src="content.iframe" frameborder="0"></iframe>
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
          <h4>Information</h4>
          <div class="separator">
            <h4>Titre Principal</h4>
            <input type="text" v-model="content.title" />
          </div>
          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.titleColor" />
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

          <h4>Adresse mail</h4>
          <div class="separator">
            <p>Afficher l'adresse mail</p>
            <input type="checkbox" v-model="content.showMail" />
          </div>
          <div class="separator">
            <p>Votre adresse mail</p>
            <input type="text" v-model="content.mail" />
          </div>
          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.mailColor" />
          </div>

          <h4>Numéro de téléphone</h4>
          <div class="separator">
            <p>Afficher votre numéro de téléphone</p>
            <input type="checkbox" v-model="content.showPhone" />
          </div>
          <div class="separator">
            <p>Votre numéro de téléphone</p>
            <input type="text" v-model="content.phone" />
          </div>
          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.phoneColor" />
          </div>

          <h4>Adresse postale</h4>

          <div class="separator">
            <p>Votre addresse postale</p>
            <input type="text" v-model="content.location" />
          </div>
          <div class="separator">
            <p>Couleur</p>
            <input type="color" v-model="style.locationColor" />
          </div>
          <h4>Google Maps</h4>
          <div class="separator">
            <p>URL de l'iframe Google Maps</p>
            <p class="help">
              Une fois votre Iframe Google Maps récupéré, ne renseignez
              uniquement la partie qui se trouve entre
              <code>&lt;iframe src=" "&gt;&lt;/iframe&gt;</code>
            </p>
            <input type="text" v-model="content.iframe" />
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
        showMail: true,
        mail: "contact@pagepilote.fr",
        showPhone: true,
        phone: "06 06 06 06 06",
        location: "1 rue de Page pilote, 33000 Bordeaux",
        iframe:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202845.20095778865!2d-122.20590605050924!3d37.402689177766526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb68ad0cfc739%3A0x7eb356b66bd4b50e!2sSilicon%20Valley%2C%20Californie%2C%20%C3%89tats-Unis!5e0!3m2!1sfr!2sfr!4v1724678824924!5m2!1sfr!2sfr",
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
        mailColor: "#000",
        phoneColor: "#000",
        locationColor: "#000",
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

.container_iframe iframe {
  width: 500px;
  height: 400px;
  max-width: 100%;
}
.content_info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
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

@media (max-width: 1100px) {
  .container_two_col {
    flex-direction: column;
  }
  .content_info {
    justify-content: center;
  }

  .content_two_col {
    align-items: center;
    text-align: center;
  }
}
</style>
