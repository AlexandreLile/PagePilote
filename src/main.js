import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import MyTitle from "./components/MyTitle.vue";
import draggable from "vuedraggable";

const app = createApp(App)
  .component(MyTitle, "MyTitle")
  .component("draggable", draggable);

app.use(createPinia());
app.use(router);

app.mount("#app");
