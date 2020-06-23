const routes = [
  {
    path: "/blog",
    name: "Blog List",
    component: () => import("@/components/pages/BlogList.vue"),
  },
  {
    path: "/add-blog-post",
    name: "Add a New Blog Post",
    component: () => import("@/components/pages/AddBlogPost.vue"),
  },
];

export default routes;
