<template>
  <div class="flex">
    <div class="grid">
      <MySideMenu class="a"></MySideMenu>
      <MyBuilderContainer class="b"></MyBuilderContainer>
    </div>
  </div>
  <div class="container-mobile">
    <h1>Page Pilote n'est pas encore disponible sur mobile</h1>
  </div>
</template>

<script>
import MyBuilderContainer from "./MyBuilderContainer.vue";
import MySideMenu from "./MySideMenu.vue";

export default {
  data() {
    return {};
  },
  components: {
    MySideMenu,
    MyBuilderContainer,
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  min-height: 90vh;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 25px;
  grid-template-areas: "A B";
  width: 100%;
  max-width: 100%;
  min-height: 80vh;
  margin: 0 5%;
}

.a {
  grid-area: A;
}

.b {
  grid-area: B;
}

.container-mobile {
  display: none;
}
@media (max-width: 670px) {
  .flex {
    display: none;
  }

  .container-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 20px;
  }

  .container-mobile h1 {
    font-size: 2rem;
    text-align: center;
  }
}
</style>
