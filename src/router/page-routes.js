const routes = [
  {
    path: "/pages",
    name: "Page List",
    component: () => import("@/components/pages/PageList.vue"),
  },
  {
    path: "/add-page",
    name: "Add A New Page",
    component: () => import("@/components/pages/AddPage.vue"),
  },
  // {
  //   path: "/page/:slug",
  //   name: "Page List",
  //   component: () => import("@/components/pages/PageEditor.vue"),
  // },
];

export default routes;
