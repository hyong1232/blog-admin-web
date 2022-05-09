import { h, resolveComponent } from "vue";
import {
    createRouter,
    createWebHistory,
    RouterView,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: RouterView,
        children: [
            {
                path: "/blog",
                component: { render: () => h(resolveComponent("router-view"))},
                children: [
                    { path: "", component: () => import("@/views/blog/blog.vue") },
                    {
                        path: "edit",
                        component: () => import("@/views/blog/blogDetail.vue"),
                    },
                    {
                        path: "edit/:id",
                        props: true,
                        component: () => import("@/views/blog/blogDetail.vue"),
                    },
                ],
            },
            {
                path: "/diary",
                component: { render: () => h(resolveComponent("router-view")) },
                children: [
                    { path: "", component: () => import("@/views/diary/diary.vue") },
                    {
                        path: "edit",
                        component: () => import("@/views/diary/diaryDetail.vue"),
                    },
                    {
                        path: "edit/:id",
                        props: true,
                        component: () => import("@/views/diary/diaryDetail.vue"),
                    },
                ],
            },
            {
                path: "/tag",
                component: { render: () => h(resolveComponent("router-view")) },
                children: [
                    { path: "", component: () => import("@/views/tag/tag.vue") },
                    {
                        path: "edit",
                        component: () => import("@/views/tag/tagDetail.vue"),
                    },
                    {
                        path: "edit/:id",
                        props: true,
                        component: () => import("@/views/tag/tagDetail.vue"),
                    },
                ],
            },
            {
                path: "/category",
                component: { render: () => h(resolveComponent("router-view")) },
                children: [
                    { path: "", component: () => import("@/views/category/category.vue") },
                    {
                        path: "edit",
                        component: () => import("@/views/category/categoryDetail.vue"),
                    },
                    {
                        path: "edit/:id",
                        props: true,
                        component: () => import("@/views/category/categoryDetail.vue"),
                    },
                ],
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
