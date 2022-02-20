import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movies/:id",
    name: "MoreDetail",
    component: () =>
      import("../views/MoreDetail.vue"),
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("access_token")) {
        next({ name: "Home" });
      } else {
        next();
      }
    },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("access_token")) {
        next({ name: "Home" });
      } else {
        next();
      }
    },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/bookmarks",
    name: "Bookmark",
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("access_token")) {
        next({
          name: "Login"
        });
      } else {
        next();
      }
    },
    component: () =>
      import("../views/Bookmark.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
