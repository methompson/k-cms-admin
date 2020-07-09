import Vue from 'vue';
import VueRouter from 'vue-router';

import store from "@/store/index";
import { isString } from "@/shared/is-data";
import { isTokenValid } from "@/shared/auth-utils";

import pageRoutes from "./page-routes";
import userRoutes from "./user-routes";
import blogRoutes from "./blog-routes";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../components/pages/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/pages/Login.vue"),
  },
  ...pageRoutes,
  ...userRoutes,
  ...blogRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // We check for the authentication status of the user
  let loggedIn;

  if (!isString(store.state.userToken)
    || !isTokenValid(store.state.decodedUserToken)
  ) {
    loggedIn = false;
  } else {
    loggedIn = true;
  }

  console.log("loggedIn", loggedIn);

  // If the user is headed to Login and they're logged in, we'll redirect
  // to the home page.
  if (to.name === "Login" && loggedIn === true) {
    next("/home");
    return;
  }

  // If the user is not logged in and going somewhere other than Login, we'll
  // redirect to the Login page
  if (to.name !== "Login" && loggedIn === false) {
    next("/login");
    return;
  }

  let name = store.state.appName;

  if ("meta" in to
    && "title" in to.meta
  ) {
    name += ` - ${to.meta.title}`;
  }

  document.title = name;

  // Just go to the next page in the route.
  next();
});

export default router;
