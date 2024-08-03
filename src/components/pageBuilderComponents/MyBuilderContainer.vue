<template>
    <div class="container">
      <draggable
        v-model="draggableComponentsList"
        @end="handleListChange"
        item-key="id"
      >
        <template #item="{ element }">
          <component
            :is="element.type"
            :key="element.id"
            v-bind="element.props"
          >
            <p class="component-id">ID: {{ element.id }}</p>
          </component>
        </template>
      </draggable>
    </div>
  </template>
  
  <script>
  import { usePageStore } from '@/stores/componentsStore';
  import MyHero from './MyHero.vue';
  import MyItems from './MyItems.vue';
  import Draggable from 'vuedraggable';
  
  export default {
    components: {
      MyHero,
      Draggable,
      MyItems
    },
    computed: {
      pageStore() {
        return usePageStore();
      },
      draggableComponentsList: {
        get() {
          return this.pageStore.components;
        },
        set(value) {
          this.pageStore.updateComponentsOrder(value);
        }
      }
    },
    methods: {
      
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
  