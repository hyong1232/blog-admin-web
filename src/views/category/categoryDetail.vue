<template>
  <el-form
    ref="form"
    :model="sizeForm"
    label-width="auto"
    :class="sy['form-style']"
    :label-position="'right'"
    :size="'large'"
  >
    <el-form-item label="parentId">
      <el-select
        clearable
        filterable
        style="width: 300px"
        size="large"
        v-model="sizeForm.pid"
        placeholder="please select category parent"
      >
        <el-option
          v-for="(op, i) in categoryOptions"
          :key="op._id"
          :label="op?.name"
          :value="op?._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="category name">
      <el-input v-model="sizeForm.name" clearable size="large" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{
        id ? "submit" : "created"
      }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ElNotification } from "element-plus";
import { request } from "@/hooks/request";
import { reactive, toRefs, ref, onMounted } from "vue";

const router = useRouter();

const categoryOptions = ref<any>([]);

const props = defineProps({
  id: String,
});

const sizeForm = ref({
  pid: "",
  name: "",
});

const fetchCategoryOptions = async () => {
  try {
    const res = await request({ url: `/category`, method: "get" });
    categoryOptions.value = res.data;
  } catch (e) {
    console.error(e);
  }
};

const fetchCategoryDataById = async () => {
  try {
    const res = await request({ url: `/category/${props.id}`, method: "get" });
    sizeForm.value = res.data;
  } catch (e) {
    console.error(e);
  }
};

const onSubmit = async () => {
    try {
        let res;
            res = await request({url: `/category`, method: 'put', body: sizeForm.value});  
        if (res.code === 200) {
            fetchCategoryOptions();
            sizeForm.value = {pid: '', name: ''};
            ElNotification.success({title: 'success', message: `${props.id ? 'update' : 'add'} category sucess`})
            router.push('/tag')
        } else {
            ElNotification.error({title: 'success', message: 'add category sucess'})
        }
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
  fetchCategoryOptions();
  props.id && fetchCategoryDataById();
});
</script>

<style lang="scss" scoped module="sy">
.form-style {
  margin: 12px;
}
</style>
