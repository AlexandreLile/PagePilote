<template>
  <button :class="buttonClasses()">{{ text }} <slot></slot></button>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    text: {
      type: String,
      default: "Hello Wordl",
      required: false,
    },

    size: {
      type: String,
      default: "builder",
    },
  },
  methods: {
    buttonClasses() {
      const sizeClass = `btn-${this.size}`;
      return [`btn`, sizeClass];
    },
  },
};
</script>

<style scoped>
.btn-sm {
  font-size: 12px;
  padding: 8px 12px;
  background-color: #2b303a;
  color: #e5eef0;
  border-radius: 0.25rem;
  border: 0;
  cursor: pointer;
}

.btn-md {
  font-size: 16px;
  background-color: #2b303a;
  color: #e5eef0;
  padding: 10px 16px;
  border-radius: 0.25rem;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.btn-lg {
  font-size: 20px;
  padding: 14px 24px;
  background-color: #2b303a;
  color: #e5eef0;
  border-radius: 0.5rem;
}

.btn-builder {
  font-size: 16px;
  background-color: #2b303a;
  color: #e5eef0;
  padding: 10px 16px;
  border-radius: 0.25rem;
  border: 0;
  cursor: pointer;
  height: 80px;
  position: relative;
}

.btn-form {
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
.btn-form:hover {
  background-color: var(--dark);
}
.btn-nostyle {
  background-color: transparent;
  color: var(--dark);
  box-shadow: unset;
  border: unset;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.btn-nostyle:hover {
  color: var(--dark);
}

.delete-button {
  background-color: #ff1e1e;
}
</style>
