import { defineStore } from 'pinia';
import { v4 as uuidv4} from 'uuid' ;

export const usePageStore = defineStore('page', {
  state: () => ({
    components: [],
  }),
  actions: {
    addComponent(component) {
        const newComponent = { ...component, id : uuidv4()};
      this.components.push(newComponent);
    },
  },
});
