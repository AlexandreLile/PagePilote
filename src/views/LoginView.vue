<template>
  <MyMenu></MyMenu>
  <section>
    <h1>Connexion</h1>
    <h2>Page Pilote, accès à votre compte</h2>
    <form @submit.prevent="loginUser">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Mot de passe"
        required
      />
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </section>
</template>

<script>
import MyMenu from "@/components/MyMenu.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          let errorData = {};
          try {
            errorData = await response.json();
          } catch (jsonError) {
            console.error("Erreur lors de la lecture du JSON:", jsonError);
          }

          this.errorMessage = errorData.msg || "Erreur lors de la connexion";
          throw new Error(this.errorMessage);
        }

        const data = await response.json();
        this.successMessage = "Connexion réussie ! Redirection en cours...";
        this.email = "";
        this.password = "";

        localStorage.setItem("token", data.token);

        this.$router.push("/dashboard");
      } catch (error) {
        console.error(
          "Erreur lors de la tentative de connexion:",
          error.message
        );
        this.errorMessage = error.message || "Une erreur est survenue";
      }
    },
  },
  components: {
    MyMenu,
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

section {
  width: 100%;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  max-width: 700px;
  margin: 0 auto;
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
}
input::placeholder {
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 200;
}

button {
  width: 100%;
  border: 0;
  background-color: var(--primary-color);
  color: var(--white);
  font-size: 1.15rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.5s ease;
}

button svg {
  width: 20px;
}

button:hover {
  background-color: #338f64;
}

.login_txt {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding-top: 70px;
}

.content_login {
  gap: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.content_login p {
  line-height: 1.5;
}
</style>
