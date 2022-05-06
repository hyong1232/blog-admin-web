<template>
  <div class="container">
    <el-table :data="dataSource" style="width: 100%" max-height="500px">
      <template v-for="(col, i) in tabConf" :key="col.order">
        <el-table-column
          :stripe="true"
          header-align="center"
          align="center"
          :show-overflow-tooltip="true"
          :prop="col.prop"
          :fixed="col.fixed"
          :label="col.label"
        >
          <template #default="scope" v-if="col.prop === 'operation'">
            <el-button
              type="text"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              Remove
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue";

const tabConf = [
  { order: 1, prop: "title", label: "标题", width: "14%", fixed: false },
  { order: 2, prop: "tag", label: "标签", width: "12%", fixed: false },
  { order: 3, prop: "category", label: "分类", width: "12%", fixed: false },
  { order: 4, prop: "summary", label: "摘要", width: "14%", fixed: false },
  { order: 5, prop: "author", label: "作者", width: "12%", fixed: false },
  {
    order: 6,
    prop: "careatedAt",
    label: "创作日期",
    width: "12%",
    fixed: false,
  },
  {
    order: 7,
    prop: "updatedAt",
    label: "修改日期",
    width: "12%",
    fixed: false,
  },
  { order: 8, prop: "operation", label: "操作", width: "12%", fixed: 'right' },
];

const dataSource = ref([]);
const deleteRow = (index: number) => {
  console.log(index);
};
</script>

<style lang="scss" scoped></style>
