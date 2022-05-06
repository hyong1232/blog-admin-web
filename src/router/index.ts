import { h, resolveComponent } from "vue";
import {
  createRouter,
  createWebHistory,
  RouterView,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/blog",
    component: RouterView,
    // component: { render: () => h(resolveComponent("router-view"))},
    children: [
      { path: "", component: () => import("@/components/blog/blog.vue") },
      {
        path: "/edit",
        component: () => import("@/components/blog/blogDetail.vue"),
      },
      {
        path: "/edit/:id",
        component: () => import("@/components/blog/blogDetail.vue"),
      },
    ],
  },
  {
    path: "/diary",
    component: { render: () => h(resolveComponent("router-view"))},
    children: [
      { path: "", component: () => import("@/components/diary/diary.vue") },
      {
        path: "/edit",
        component: () => import("@/components/diary/diaryDetail.vue"),
      },
      {
        path: "/edit/:id",
        component: () => import("@/components/diary/diaryDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
