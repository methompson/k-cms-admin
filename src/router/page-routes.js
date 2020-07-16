const routes = [
  {
    path: "/pages",
    name: "Page List",
    component: () => import("@/components/pages/PageList.vue"),
    meta: {
      title: "All Pages",
    },
  },
  {
    path: "/add-page",
    name: "Add A New Page",
    component: () => import("@/components/pages/AddPage.vue"),
    meta: {
      title: "Add A New Page",
    },
  },
  {
    path: "/edit-page/:pageId",
    name: "Edit A Page",
    component: () => import("@/components/pages/EditPage.vue"),
    meta: {
      title: "Editing a Page",
    },
  },
  // {
  //   path: "/page/:slug",
  //   name: "Page List",
  //   component: () => import("@/components/pages/PageEditor.vue"),
  // },
];

export default routes;
