import "./assets/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";
import { useAuthStore } from "./stores/authStore";
import { useAuthorStore } from "./stores/author";
import { bookStore } from "./stores/book";

const app = createApp(App);

app.use(router);
app.use(createPinia());

const authStore = useAuthStore();
authStore.initializeStore();

// Author Global Fetch
const authors = useAuthorStore();
authors.getAuthor();

// Book Global Fetch
const book = bookStore();
book.getBook();

app.mount("#app");
