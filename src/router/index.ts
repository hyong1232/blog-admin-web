import { h, resolveComponent } from "vue";
import {
    createRouter,
    createWebHistory,
    RouterView,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
                    { path: "/blog/", component: () => import("@/views/blog/blog.vue") },
                    {
                        path: "/blog/edit",
                        component: () => import("@/views/blog/blogDetail.vue"),
                    },
                    {
                        path: "/blog/edit/:id",
                        props: true,
                        component: () => import("@/views/blog/blogDetail.vue"),
                    },
                    { path: "/diary", component: () => import("@/views/diary/diary.vue") },
                    {
                        path: "/diary/edit",
                        component: () => import("@/views/diary/diaryDetail.vue"),
                    },
                    {
                        path: "/diary/edit/:id",
                        props: true,
                        component: () => import("@/views/diary/diaryDetail.vue"),
                    },
                    { path: "/tag", component: () => import("@/views/tag/tag.vue") },
                    {
                        path: "/tag/edit",
                        component: () => import("@/views/tag/tagDetail.vue"),
                    },
                    {
                        path: "/tag/edit/:id",
                        props: true,
                        component: () => import("@/views/tag/tagDetail.vue"),
                    },
                    { path: "/category", component: () => import("@/views/category/category.vue") },
                    {
                        path: "/category/edit",
                        component: () => import("@/views/category/categoryDetail.vue"),
                    },
                    {
                        path: "/category/edit/:id",
                        props: true,
                        component: () => import("@/views/category/categoryDetail.vue"),
                    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
