<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

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
      <RouterLink class="menu_link" to="/about">Dashboard</RouterLink>
      <RouterLink class="menu_link" to="/">Page builder</RouterLink>
      <button class="menu_link">
        Enregistrer
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </button>
      <a href="#" class="menu_link"
        >Paramètres
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </a>
      <a href="#" target="_blank" class="menu_link"
        >Visualiser
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
          />
        </svg>
      </a>
    </nav>
  </header>
  <RouterView></RouterView>
</template>

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
