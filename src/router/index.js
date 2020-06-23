import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

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
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
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

export default router;
