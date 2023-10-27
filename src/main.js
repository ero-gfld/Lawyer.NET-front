import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
// import { icons } from "oh-vue-icons/icons";

addIcons();

createApp(App)
    .component("v-icon", OhVueIcon)
    .use(router)
    .mount('#app')
