<template>
  <div class="container">
    <div class="nav">
        <el-button type="danger" @click="batchDeleteHandler">batch delete</el-button>
    </div>
    <el-table :data="dataSource" style="width: 100%" @selection-change="handleSelectionChange" max-height="500px">
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
         <template #default="{row}" v-if="col.prop === 'updatedAt'">
            {{dateTransform(row?.updatedAt)}}
         </template>
         <template #default="{row}" v-if="col.prop === 'createdAt'">
            {{dateTransform(row?.createdAt)}}
         </template>
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
    <el-pagination background layout="prev, pager, next"  :total="pager.total" :hide-on-single-page="true" />
  </div>
</template>

<script lang="ts" setup>
import dateTransform from '@/hooks/dateTransform';
import type { ElTable } from 'element-plus'
import { useRouter } from 'vue-router';
import { ElNotification, ElMessageBox, ElMessage } from 'element-plus';
import {request} from '@/hooks/request';
import { reactive, toRefs, ref, onMounted } from "vue";

const tabConf = [
  { order: 1, prop: "_id", label: "ID", width: "14%", fixed: false },
  { order: 2, prop: "name", label: "名称", width: "12%", fixed: false },
//   { order: 5, prop: "author", label: "作者", width: "12%", fixed: false },
  {
    order: 6,
    prop: "createdAt",
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
    router.push(`/tag/edit/${id}`)
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
    const res = await request({url: `/tag/${row._id}`, method: 'delete'})
    if (res.code === 200) {
            fetchGridData();
            ElNotification.success({title: 'success', message: ` delete tag sucess`})
        } else {
            ElNotification.error({title: 'error', message: 'delete tag failed'})
        }
  } catch(e) {
      console.error(e);
  }
};

const pager = reactive({
    pageSize: 20,
    pageIndex: 1,
    total: 0
})

const fetchGridData = async () => {
    const params = {
        populate: ['author'],
        limit: pager.pageSize,
        page: pager.pageIndex,
        sort: "createdAt",
    };
    try {
        const res = await request({
            url: '/tag',
            method: 'get',
            params: {query: JSON.stringify(params)},
        })
        dataSource.value = res.data;
        pager.total = res?.data?.total;
    } catch (error: any) {
        ElNotification.error({title: 'error', message: error});
        console.error(error);
    }
}

const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
    multipleSelection.value = val;
}
const batchDeleteHandler = async() => {
    try {
        if(!multipleSelection.value.length) {
            await  ElMessageBox.confirm('choose one record, please', 'Tips', {showCancelButton: false, type: 'warning',})
            return;
        }
        const ids = multipleSelection.value.map(v => v._id)
        const res = await request({url: '/tag/batchdelete', method: 'post', body: ids})
        if(res.code === 200) {
            fetchGridData();
        } else {
            ElNotification.error({title: 'error', message: 'batch delete failed'})
        }
    } catch(e) {
        console.error(e)
    }
}


onMounted(() => {
    fetchGridData();
})

</script>

<style lang="scss" scoped>
.nav {
    margin: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
