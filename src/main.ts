import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import './faConfig'


const pinia = createPinia();
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);
app.mount("#app");
