<template>
    <div class="container">
     <div v-for="component in pageComponents" :key="component.id">
      <component :is="component.type" v-bind="component.props"></component>
      <p class="component-id">ID: {{ component.id }}</p>
    </div>
    </div>
  </template>
  
  <script>
import { usePageStore } from '@/stores/componentsStore';
import MyHero from './MyHero.vue';
  
  
  export default {
    setup() {
        const pageStore = usePageStore();

      return {
        pageComponents: pageStore.components,
      };
    },components:{
        MyHero
    }
  };
  </script>
  
  <style scoped>
  .container {
    height: 100%;
    max-height: 80vh;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
    border-radius: 0.5rem;
    background-color: #fcfcfc;
    overflow-y: auto;
  }
  
  
  </style>
  