import "./assets/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";
import { useAuthStore } from './stores/authStore';

const app = createApp(App);

app.use(router);
app.use(createPinia());

const authStore = useAuthStore();
authStore.initializeStore();

app.mount("#app");
