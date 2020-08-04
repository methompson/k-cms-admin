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
      title: "Editing A Page",
    },
  },
  {
    path: "/page-preview/:pageId",
    name: "Page Preview",
    component: () => import("@/components/pages/Preview.vue"),
    meta: {
      title: "Preview Your Page",
    },
  },
];

export default routes;
