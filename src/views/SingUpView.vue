<template>
  <MyMenu></MyMenu>
  <section class="form_section">
    <h2>Inscrivez-vous</h2>
    <h1><strong>Page Pilote</strong>, création de Landing Page</h1>
    <form @submit.prevent="registerUser">
      <input
        type="text"
        v-model="username"
        placeholder="Nom d'utilisateur"
        required
      />
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Mot de passe"
        required
      />
      <label class="check">
        <input type="checkbox" v-model="termsAccepted" />
        J’accepte les conditions d’utilisation
      </label>
      <MyButton size="form" text="S'inscrire"></MyButton>
      <MyButton
        @click="alreadySignUp"
        size="nostyle"
        text="J'ai déja un compte"
      ></MyButton>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </section>

  <section class="double_col">
    <div class="container_double_col">
      <div class="content_double_col">
        <h2><strong>Page Pilote </strong>pour vos projets de landing page</h2>
        <p>
          Créer des landing pages rapidement et facilement, sans nécessiter de
          compétences en développement ou en design. Que vous soyez une agence
          de marketing, un entrepreneur ou un professionnel de la communication,
          Page Pilote vous permet de mettre en ligne des pages efficaces et
          attrayantes en quelques clics.
        </p>
      </div>
      <div class="img_double_col">
        <img src="/public/page_builder_Page_Pilote.png" alt="" />
      </div>
    </div>
  </section>
  <MyFooter></MyFooter>
</template>

<script>
import MyButton from "@/components/MyButton.vue";
import MyMenu from "@/components/MyMenu.vue";
import MyFooter from "@/components/MyFooter.vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { registerUser } from "@/api/authApi";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      errorMessage: "",
      successMessage: "",
      termsAccepted: false,
    };
  },
  methods: {
    async registerUser() {
      if (!this.termsAccepted) {
        this.errorMessage = "Vous devez accepter les conditions d'utilisation.";
        return;
      }

      try {
        const data = await registerUser(
          this.username,
          this.email,
          this.password
        );
        this.successMessage =
          "Inscription réussie ! Veuillez confirmer votre adresse mail.";
        this.username = "";
        this.email = "";
        this.password = "";
      } catch (error) {
        this.errorMessage = error.message || "Erreur lors de l'inscription";
      }
    },

    alreadySignUp() {
      this.$router.push("/connexion");
    },
  },
  components: {
    MyMenu,
    MyButton,
    MyFooter,
  },
};
</script>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}
</style>

<style scoped>
.error {
  color: red;
}

.success {
  color: green;
}

.form_section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  max-width: 700px;
  margin: 0 auto;
  padding: 100px 20px;
}

h2 {
  font-size: 3rem;
  text-align: center;
}

h1 {
  font-size: 2rem;
  text-align: center;
  padding-bottom: 25px;
}

h1 strong {
  color: var(--primary-color);
}
form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  gap: 25px;
}

input {
  width: 100%;
  height: 2.5rem;
  padding: 5px 0 5px 15px;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: var(--primary-color);
  font-weight: 300;
  border: 0;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.3);
  background-color: var(--light);
  outline: none;
  font-weight: 600;
}
input::placeholder {
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 200;
}

.check {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
input[type="checkbox"] {
  width: 10%;
  height: 20px;
  box-shadow: 0 0 0;
}

.double_col {
  padding: 0 20px 100px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container_double_col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  gap: 25px;
  max-width: 1400px;
  margin: 0 auto;
}

.content_double_col {
  gap: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;
  text-align: left;
  max-width: 550px;
}

.content_double_col h2 {
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-align: left;
}

.content_double_col h2 strong {
  color: var(--primary-color);
  font-weight: 500;
}

.content_double_col a {
  color: var(--light);
  background-color: var(--dark);
  padding: 0.5rem 1rem;
  font-weight: 700;
}
.content_double_col h2 .img_double_col {
  flex: 1;
}
.img_double_col {
  flex: 1;
  max-width: 550px;
}
.img_double_col img {
  display: block;
  max-width: 100%;
  width: 100%;
  max-height: 500px;
  object-fit: contain;
}

@media (max-width: 800px) {
  .container_double_col {
    flex-direction: column;
  }
}

@media (max-width: 500px) {
  .content_double_col h2 {
    font-size: 1.5rem;
  }

  .form_section h2 {
    font-size: 2rem;
  }

  .form_section h1 {
    font-size: 1.5rem;
  }
}
</style>
