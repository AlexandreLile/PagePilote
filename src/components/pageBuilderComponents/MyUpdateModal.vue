<template>
  <div class="container_Update_modal">
    <div class="update_modal">
      <div class="btn_container">
        <MyButton size="sm" text="Appliquer" @click="apply" />
        <MyButton size="sm" text="Fermer" @click="close" />
        <MyButton
          size="sm"
          text="Supprimer"
          class="delete-button"
          @click="deleteComp"
        />
      </div>
      <div class="slot">
        <slot class="slot" name="group"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "../MyButton.vue";
export default {
  methods: {
    close() {
      this.$emit("close");
    },
    apply() {
      this.$emit("apply");
    },
    deleteComp() {
      this.$emit("deleteComp");
    },
  },
  components: {
    MyButton,
  },
};
</script>

<style scoped>
.container_Update_modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  background-color: #cccccc65;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.update_modal {
  background-color: white;
  padding: 0 20px 20px 20px;
  z-index: 1000;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  height: 50vh;
  min-width: 400px;
  max-width: 500px;
  overflow: auto;
  z-index: 999;
}

.btn_container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  padding: 20px;
  position: sticky;
  top: 0;
  background-color: #fff;
}

.slot {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
  gap: 15px;
}
</style>
