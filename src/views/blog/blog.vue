<template>
  <div class="container">
    <el-table :data="dataSource" style="width: 100%" max-height="500px">
    <el-table-column type="selection" width="55" />
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
          <template #default="{$index, row}" v-if="col.prop === 'operation'">
            <el-button
              type="danger"
              size="small"
              @click.prevent="deleteRow(row)"
            >
              delete
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click.prevent="editRow(row._id)"
            >
              edit
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ElNotification, ElMessageBox } from 'element-plus';
import {request} from '@/hooks/request';
import { reactive, toRefs, ref, onMounted } from "vue";

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

const router = useRouter();

let dataSource = ref([]);

const editRow = (id: string) => {
    router.push(`/blog/edit/${id}`)
}

const fetchGridData = async () => {
    try {
        const res = await request({
            url: '/article',
            method: 'get',
        })
        dataSource.value = res.data;
    } catch (error) {
        ElNotification.error({title: 'error', message: error});
        console.error(error);
    }
}

const deleteRow = async (row: any) => {
  try {
       await ElMessageBox.confirm(
            `proxy will permanently delete the row Record ${row.name}. Continue?`,
            'Warning',
            {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            }
        ) 
    const res = await request({url: `/article/${row._id}`, method: 'delete'})
    if (res.code === 200) {
            fetchGridData();
            ElNotification.success({title: 'success', message: ` delete article sucess`})
        } else {
            ElNotification.error({title: 'error', message: 'delete article failed'})
        }
  } catch(e) {
      console.error(e);
  }
};

onMounted(() => {
    fetchGridData();
})

</script>

<style lang="scss" scoped></style>
