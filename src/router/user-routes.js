const routes = [
  {
    path: "/users",
    name: "User List",
    component: () => import("../components/pages/UserList.vue"),
  },
  {
    path: "/add-user",
    name: "Add User",
    component: () => import("../components/pages/AddUser.vue"),
  },
  {
    path: "/edit-user/:id",
    name: "Edit User",
    component: () => import("../components/pages/EditUser.vue"),
  },
];

export default routes;
