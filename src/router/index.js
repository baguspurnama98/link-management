import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../components/login/Login.vue";
import RegisterView from "../components/login/Register.vue";
import LandingView from "../components/index.vue";
import ContentView from "../components/content/index.vue";
import Redirect from "../components/redirect/index.vue";
// https://blog.logrocket.com/authentication-vue-3-firebase/
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/dashboard",
    component: ContentView,
    meta: {
      authRequired: false,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "redirect",

    component: Redirect,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
const auth = getAuth();
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    console.log(auth.currentUser);
    if (auth.currentUser) {
      next();
    } else {
      alert("You must be logged in to see this page");
      next({
        path: "/",
      });
    }
  } else {
    next();
  }
});

export default router;
