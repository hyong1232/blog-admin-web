import { h } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: { displayName: "blogHome", render: () => h("router-view") },
    children: [
      { path: "/blog", component: () => import("@/components/blog.vue") },
      {
        path: "blog/edit",
        component: () => import("@/components/blogDetail.vue"),
      },
      {
        path: "blog/edit/:id",
        component: () => import("@/components/blogDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
