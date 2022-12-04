import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../components/login/Login.vue";
import RegisterView from "../components/login/Register.vue";
import HomeView from "../components/home/Main.vue";
import DashboardView from "../components/home/Dashboard.vue";
// https://blog.logrocket.com/authentication-vue-3-firebase/
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
    name: "dashboard",
    component: DashboardView,
    meta: {
      authRequired: false,
    },
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
