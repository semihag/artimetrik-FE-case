import { format } from "prettier";
import { createRouter, createWebHistory } from "vue-router";
import Users from "../components/Users.vue";
import UserDetail from "../components/UserDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "users",
      component: Users,
    },
    {
      path: "/userdetail",
      name: "userdetail",
      component: UserDetail,
    },
  ],
});

export default router;
