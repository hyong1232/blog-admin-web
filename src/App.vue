<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['/']" :router="true">
          <el-sub-menu v-for="(item, i) in menuArr" :key="i" :index="item.path">
            <template #title>
              <el-icon></el-icon>文章管理
            </template>
            <el-menu-item-group v-for="g in item.groups" :key="g.name"   :title="g.name">
              <el-menu-item v-for="c in g.children" :key="c.path" :index="c.path">{{c.title}}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header style="display: flex; align-items: center">
        <div class="blog-title">博客后台管理系统</div>
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
              ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
            <router-view class="router-view" v-slot="{ Component }">
            </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

const transitionName = ref('slide-left');

const menuArr = reactive([
  {
    path: "/",
    icon: 'icon-message',
    title: "文章管理",
    groups: [
      {
        name: "博客",
        children: [
          { path: "/blog", title: "博客列表" },
          { path: "/blog/edit", title: "博客详情" },
        ],
      },
      {
        name: "日志",
        children: [
          { path: "/diary", title: "日志列表" },
          { path: "/diary/edit", title: "日志详情" },
        ],
      },
    ],
  },
]);
</script>

<style scoped lang="scss">

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.van-badge--fixed {
  z-index: 1000;
}
.right-bar {
  float: right;
  right: 0;
}
.blog-title {
  flex: 1;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  float: right;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
