<template>
  <footer class="footer_home">
    <div class="container_footer_home">
      <div class="logo_title_footer_home">
        <svg
          viewBox="0 0 150 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="96.3252"
            width="23.3292"
            height="167.97"
            transform="rotate(5 96.3252 0)"
            fill="#518490"
          />
          <rect
            x="15.1396"
            width="23.3292"
            height="167.97"
            transform="rotate(5 15.1396 0)"
            fill="#2B303A"
          />
          <rect
            x="126.26"
            y="3.573"
            width="23.3292"
            height="83.9851"
            transform="rotate(5 126.26 3.573)"
            fill="#518490"
          />
          <rect
            x="45.0742"
            y="3.573"
            width="23.3292"
            height="83.9851"
            transform="rotate(5 45.0742 3.573)"
            fill="#2B303A"
          />
        </svg>
        <h2>
          Page
          <strong>Pilote</strong>
        </h2>
      </div>
      <div class="rgpd_footer_home">
        <a href="">Mentions Légales</a>
        <a href="">Politiques de Confidentialités</a>
      </div>
      <div class="credits_footer_home">
        <p>&copy; 2024 | pagepilote.com</p>
        <a href="mailto:contact@pagepilote.com">contact@pagepilote.com</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.container_footer_home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.logo_title_footer_home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background-color: var(--light);
  width: 100%;
  padding: 20px 15px;
}

.logo_title_footer_home svg {
  width: 50px;
}

.logo_title_footer_home h2 strong {
  color: var(--primary-color);
}

.rgpd_footer_home {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px;
  gap: 15px;
}

.rgpd_footer_home a {
  color: var(--dark);
  text-decoration: none;
}

.credits_footer_home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background-color: var(--light);
  width: 100%;
}

.credits_footer_home a {
  padding: 0;
  color: var(--primary-color);
}

@media (max-width: 800px) {
  .rgpd_footer_home {
    flex-direction: column;
  }
}
</style>
