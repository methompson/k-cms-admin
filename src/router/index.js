import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

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
  {
    path: "/pages",
    name: "Page List",
    component: () => import("../components/pages/PageList.vue"),
  },
  {
    path: "/page/:slug",
    name: "Page List",
    component: () => import("../components/pages/PageEditor.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
