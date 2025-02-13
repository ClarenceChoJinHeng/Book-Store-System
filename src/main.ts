import "./assets/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createApp } from "vue";
import { useRoute } from "vue-router";
import { createPinia } from "pinia";
import router from "@/router";
import App from "./App.vue";
import { useAuthStore } from "./stores/authStore";
import { useAuthorStore } from "./stores/author";
import { bookStore } from "./stores/book";
import { useAdminStore } from "./stores/admin";

const app = createApp(App);

const pinia = createPinia();
app.use(router);
app.use(pinia);

app.mount("#app");

const authStore = useAuthStore();
authStore.initializeStore();

// Author Global Fetch
const authors = useAuthorStore();
authors.getAuthor();

// Book Global Fetch
const book = bookStore();
book.getBook();
book.getBookById(Number(book.book.id));

// Admin Global Fetch
// const admin = useAdminStore();
// admin.fetchAdmin();
