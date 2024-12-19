import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "The Book - Home",
        hideFooter: false,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { 
        title: "The Book - Login",
        hideFooter: true,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: SignupView,
      meta: {
        title: "The Book - Sign Up",
        hideFooter: true,
      },
    },
    {
      path: "/sellerPage",
      name: "Seller Page Login",
      component: SignupView,
      meta: {
        title: "The Book - Seller Page Login",
        hideFooter: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Default Title";
  next();
});

export default router;
