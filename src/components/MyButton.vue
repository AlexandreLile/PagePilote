<template>
    <button :class="buttonClasses()">{{ text }}</button>
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
    border-radius: 0.125rem;
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
  }
  </style>
  