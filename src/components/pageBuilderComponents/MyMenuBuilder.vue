<template>
  <div class="container_builder">
    <header class="menu" :style="{ backgroundColor: style.backgroundColor }">
      <div class="container_menu">
        <div class="logo" :style="{ width: style.logoSize + 'px' }">
          <img :src="content.logo" alt="" />
        </div>
        <div class="links">
          <a
            v-if="content.showPhone"
            :style="{ color: style.phoneColor }"
            class="phone"
            :href="'tel:' + content.phone"
            >{{ content.phoneText }}</a
          >

          <a
            v-if="content.showMail"
            :style="{ color: style.mailColor }"
            class="mail"
            :href="'mail:' + content.mail"
            >{{ content.mailText }}</a
          >

          <a
            v-if="content.showFacebook"
            class="facebook"
            :href="content.facebook"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 50 50"
              class="svg"
              :style="{ fill: style.facebookColor }"
            >
              <path
                d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"
              ></path>
            </svg>
          </a>

          <a
            v-if="content.showInstagram"
            class="instagram"
            :href="content.instagram"
            target="_blank"
          >
            <svg
              class="svg instagram_svg"
              viewBox="0 0 2476 2476"
              :style="{ fill: style.instagramColor }"
              v
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5"
              />
            </svg>
          </a>

          <a
            v-if="content.showTiktok"
            class="tiktok"
            :href="content.tiktok"
            target="_blank"
          >
            <svg
              :style="{ fill: style.tiktokColor }"
              class="svg instagram_svg"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"
              ></path>
            </svg>
          </a>
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
          <h4>Logo</h4>
          <div class="separator">
            <input type="file" @change="onImageChange" accept="image/*" />
          </div>
          <div class="separator">
            <p>taille</p>
            <input
              type="number"
              v-model="style.logoSize"
              step="5"
              min="20"
              max="250"
            />
          </div>
          <h4>Téléphone</h4>
          <div class="separator">
            <p>Afficher le numéro de téléphone</p>
            <input type="checkbox" v-model="content.showPhone" />
          </div>
          <div class="separator">
            <p>Couleur du téléphone</p>
            <input type="color" v-model="style.phoneColor" />
          </div>
          <div class="separator">
            <p>Votre numéro</p>
            <input type="tel" v-model="content.phone" />
          </div>
          <div class="separator">
            <p>Texte du bouton</p>
            <input type="tel" v-model="content.phoneText" />
          </div>

          <h4>Mail</h4>
          <div class="separator">
            <p>Afficher l'adresse mail</p>
            <input type="checkbox" v-model="content.showMail" />
          </div>
          <div class="separator">
            <p>Couleur du mail</p>
            <input type="color" v-model="style.mailColor" />
          </div>
          <div class="separator">
            <p>Votre addresse mail</p>
            <input type="tel" v-model="content.mail" />
          </div>
          <div class="separator">
            <p>Texte du bouton</p>
            <input type="tel" v-model="content.mailText" />
          </div>
          <h4>Facebook</h4>
          <div class="separator">
            <p>Afficher le logo Facebook</p>
            <input type="checkbox" v-model="content.showFacebook" />
          </div>
          <div class="separator">
            <p>Couleur du logo Facebook</p>
            <input type="color" v-model="style.facebookColor" />
          </div>
          <div class="separator">
            <p>Lien de votre compte facebook</p>
            <input type="text" v-model="content.facebook" />
          </div>

          <h4>Instagram</h4>
          <div class="separator">
            <p>Afficher le logo Instagram</p>
            <input type="checkbox" v-model="content.showInstagram" />
          </div>
          <div class="separator">
            <p>Couleur du logo Instagram</p>
            <input type="color" v-model="style.instagramColor" />
          </div>
          <div class="separator">
            <p>Lien de votre compte Instagram</p>
            <input type="text" v-model="content.instagram" />
          </div>

          <h4>Tiktok</h4>
          <div class="separator">
            <p>Afficher le logo Tiktok</p>
            <input type="checkbox" v-model="content.showTiktok" />
          </div>
          <div class="separator">
            <p>Couleur du logo Tiktok</p>
            <input type="color" v-model="style.tiktokColor" />
          </div>
          <div class="separator">
            <p>Lien de votre compte Tiktok</p>
            <input type="text" v-model="content.tiktok" />
          </div>

          <h4>Responsive</h4>
          <div class="separator">
            <p>Couleur du menu burger</p>
            <input type="color" v-model="style.menuBurgerColor" />
          </div>
        </template>
      </MyUpdateModal>
    </header>
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
        logo: "/public/logo.svg",
        link: "",
        btnText: "Call to action",
        showPhone: true,
        phone: "06 06 06 06 06",
        phoneText: "Appelez-moi",
        showMail: true,
        mail: "monaddressemail@mail.com",
        mailText: "Contact",
        showFacebook: true,
        facebook: "https://www.facebook.com/",
        showInstagram: true,
        instagram: "https://www.instagram.com/",
        showTiktok: true,
        tiktok: "https://www.tiktok.com/fr/",
      },
      style: {
        titleColor: "#00000",
        backgroundColor: "#ffffff",
        logoSize: "50",
        facebookColor: "#121212",
        instagramColor: "#121212",
        tiktokColor: "#121212",
        phoneColor: "#000",
        mailColor: "#000",
        menuBurgerColor: "#121212",
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
      this.loadFromStore();
    },
  },
};
</script>

<style scoped>
.menu {
  /* position: sticky;
  top: 0;
  left: 0;
  right: 0; */
  width: 100%;
}

.container_menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.links a {
  text-decoration: none;
  color: var(--dark);
  font-weight: 700;
}

.svg {
  width: 40px;
}

.instagram_svg {
  width: 35px;
}
.btn_edit {
  position: absolute;
  top: 25%;
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
