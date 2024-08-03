import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import MyTitle from './components/MyTitle.vue';
import MyMenu from './components/MyMenu.vue';
import draggable from "vuedraggable";

const app = createApp(App)
.component(MyTitle, 'MyTitle')
.component(MyMenu, 'MyMenu')
.component("draggable" , draggable)

app.use(createPinia())
app.use(router)

app.mount('#app');
