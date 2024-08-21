<template>
  <header>
    <div class="logo">
      <svg
        viewBox="0 0 923 1049"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="593.517"
          width="144.495"
          height="1040.37"
          transform="rotate(5 593.517 0)"
          fill="#2B303A"
        />
        <rect
          x="90.6738"
          width="144.495"
          height="1040.37"
          transform="rotate(5 90.6738 0)"
          fill="#2B303A"
        />
        <rect
          x="778.924"
          y="22.1296"
          width="144.495"
          height="520.183"
          transform="rotate(5 778.924 22.1296)"
          fill="#2B303A"
        />
        <rect
          x="276.081"
          y="22.1296"
          width="144.495"
          height="520.183"
          transform="rotate(5 276.081 22.1296)"
          fill="#2B303A"
        />
      </svg>
    </div>
    <nav>
      <RouterLink v-if="isAuthenticated" class="menu_link" to="/dashboard">
        Dashboard
      </RouterLink>
      <button v-if="isAuthenticated && isPageBuilder" class="menu_link">
        Enregistrer
        <!-- SVG Content -->
      </button>
      <button v-if="isAuthenticated" class="menu_link" @click="logout">
        Déconnexion
        <!-- SVG Content -->
      </button>
      <a v-if="isAuthenticated" href="#" class="menu_link">
        Paramètres
        <!-- SVG Content -->
      </a>
      <RouterLink class="menu_link" v-if="!isAuthenticated" to="/connexion">
        Connexion
      </RouterLink>
      <RouterLink class="menu_link" v-if="!isAuthenticated" to="/inscription">
        Inscription
      </RouterLink>
    </nav>
  </header>
  <RouterView></RouterView>
</template>

<script>
import { RouterLink, RouterView, useRoute } from "vue-router";
import { usePageStore } from "@/stores/componentsStore";

export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem("token");
    },

    savePage() {
      const pageStore = usePageStore();

      pageStore
        .saveComponentsToDatabase()
        .then(() => {
          alert("Page enregistrée avec succès !");
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement :", error);
          alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
        });
    },
    logout() {
      localStorage.removeItem("token");
      this.isAuthenticated = false;
      this.$router.push("/connexion");
    },
  },
  created() {
    this.checkAuth();
  },
  computed: {
    isPageBuilder() {
      const route = useRoute();
      return route.name === "PageBuilder";
    },
  },
  watch: {
    $route() {
      this.checkAuth();
    },
  },
};
</script>
<style scoped>
header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  z-index: 999;
}
.logo {
  width: 30px;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
}

.menu_link {
  font-size: 17px;
  padding: 8px 12px;
  background-color: #2b303a;
  color: #e5eef0;
  border-radius: 0.25rem;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.menu_link svg {
  width: 20px;
}
</style>
