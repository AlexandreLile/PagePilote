<template>
  <header>
    <div class="logo">
      <a href="http://localhost:3000/">
        <img src="/public/Logo.svg" alt="Logo de Page Pilote" />
      </a>
    </div>
    <nav>
      <RouterLink v-if="isAuthenticated" class="menu_link" to="/dashboard">
        Dashboard
      </RouterLink>
      <button
        v-if="isAuthenticated && isPageBuilder"
        class="menu_link"
        @click="renderView"
      >
        Visualiser
        <!-- SVG Content -->
      </button>
      <button
        v-if="isAuthenticated && isDashboard"
        class="menu_link"
        @click="logout"
      >
        Déconnexion
        <!-- SVG Content -->
      </button>
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

    renderView() {
      const pageId = this.$route.params.pageId; // Accéder au paramètre pageId
      if (pageId) {
        window.open(`http://localhost:3000/page/${pageId}`, "_blank");
      } else {
        alert("ID de page non défini.");
      }
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

    isDashboard() {
      const route = useRoute();
      return route.name === "Dashboard";
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
  width: 40px;
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
@media (max-width: 400px) {
  header {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
}
</style>
