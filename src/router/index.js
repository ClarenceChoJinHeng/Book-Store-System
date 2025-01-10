import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import ProfileView from "../views/ProfileView.vue";
import AboutView from "../views/AboutView.vue";
import BookView from "../views/BookView.vue";
import DashboardView from "../views/admin/DashboardView.vue";
import AuthorView from "@/views/admin/authors/AuthorView.vue";
import BookManagement from "@/views/admin/books/BookView.vue";
import UsersManagement from "@/views/admin/UsersView.vue";
import AddBookView from "@/views/admin/books/AddBookView.vue";
import AddAuthorView from "@/views/admin/authors/AddAuthorView.vue";
import EditAuthorView from "@/views/admin/authors/EditAuthorView.vue";
import EditBookView from "@/views/admin/books/EditBookView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "The Book - Home",
        hideHeader: true,
        hideFooter: false,
        hideAdmin: false,
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: {
        title: "The Book - Login",
        hideHeader: true,
        hideFooter: true,
        hideAdmin: false,
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
      meta: {
        title: "The Book - Sign Up",
        hideFooter: true,
        hideHeader: true,
        hideAdmin: false,
      },
    },
    {
      path: "/sellerPage",
      name: "Seller Page Login",
      component: SignupView,
      meta: {
        title: "The Book - Seller Page Login",
        hideFooter: true,
        hideHeader: true,
        hideAdmin: false,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: {
        title: "The Book - Profile",
        hideFooter: true,
        hideAdmin: false,
        requiresAuth: true,
        hideHeader: false,
      },
    },
    {
      path: "/about",
      name: "About",
      component: AboutView,
      meta: {
        title: "The Book - About",
        hideFooter: true,
        hideAdmin: false,
        requiresAuth: true,
        hideHeader: true,
      },
    },
    {
      path: "/book",
      name: "Book",
      component: BookView,
      meta: {
        title: "The Book - Book Section",
        hideFooter: true,
        hideAdmin: false,
        requiresAuth: true,
        hideHeader: true,
      },
    },
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta: {
        title: "The Book [Admin] - Dashboard",
        hideHeader: true,
        hideAdmin: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
    {
      path: "/admin/book/book-manage",
      name: "Library",
      component: BookManagement,
      meta: {
        title: "The Book [Admin] - Book Management",
        hideAdmin: true,
        hideHeader: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
    {
      path: "/admin/author/author-manage",
      name: "Author",
      component: AuthorView,
      meta: {
        title: "The Book [Admin] - Author List",
        hideAdmin: true,
        hideHeader: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
    {
      path: "/admin/users-manage",
      name: "Users",
      component: UsersManagement,
      meta: {
        title: "The Book [Admin] - User Management",
        hideAdmin: true,
        hideHeader: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
    {
      path: "/admin/book/add-book",
      name: "Add Book",
      component: AddBookView,
      meta: {
        title: "The Book [Admin] - Add Book",
        hideAdmin: true,
        hideHeader: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
    {
      path: "/admin/book/edit-book/:id",
      name: "Edit Book",
      component: EditBookView,
      meta: {
        title: "The Book [Admin] - Edit Book",
        hideAdmin: true,
        hideHeader: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
    {
      path: "/admin/author/add-author",
      name: "Add Author",
      component: AddAuthorView,
      meta: {
        title: "The Book [Admin] - Add Author",
        hideAdmin: true,
        hideHeader: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
    {
      path: "/admin/author/edit-author/:id",
      name: "Edit Author",
      component: EditAuthorView,
      meta: {
        title: "The Book [Admin] - Edit Author",
        hideAdmin: true,
        hideHeader: true,
        hideFooter: true,
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Default Title";
  next();
});

export default router;
