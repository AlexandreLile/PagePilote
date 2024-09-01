<template>
  <div class="container_security_modal">
    <h2>{{ text }}</h2>
    <div class="container-btn">
      <MyButton
        class="delete-button"
        size="md"
        text="supprimer"
        @click="deleteElement"
      ></MyButton>
      <MyButton size="md" text="Non" @click="close"></MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/MyButton.vue";
export default {
  data() {
    return {};
  },
  methods: {
    deleteElement() {
      this.$emit("deleteElement");
    },
    close() {
      this.$emit("close");
    },
  },
  components: {
    MyButton,
  },
  props: {
    text: {
      type: String,
      default: "Cette action est irreversible !",
      required: false,
    },
  },
};
</script>

<style scoped>
.container_security_modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  height: auto;
  width: fit-content;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  z-index: 9999;
  border-radius: 5px;
}

h2 {
  font-size: 1rem;
}

.container-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
