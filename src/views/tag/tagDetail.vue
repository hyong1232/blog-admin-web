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
        placeholder="please select tag parent"
      >
        <el-option
          v-for="(op, i) in tagOptions"
          :key="op._id"
          :label="op?.name"
          :value="op?._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="tag name">
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

const tagOptions = ref<any>([]);

const router = useRouter();

const props = defineProps({
  id: String,
});

const sizeForm = ref({
  pid: "",
  name: "",
});

const fetchtagOptions = async () => {
  try {
    const res = await request({ url: `/tag`, method: "get" });
    tagOptions.value = res.data;
  } catch (e) {
    console.error(e);
  }
};

const fetchtagDataById = async () => {
  try {
    const res = await request({ url: `/tag/${props.id}`, method: "get" });
    sizeForm.value = res;
  } catch (e) {
    console.error(e);
  }
};

const onSubmit = async () => {
    try {
        let res;
            res = await request({url: `/tag`, method: 'put', body: sizeForm.value});  
        if (res.code === 200) {
            fetchtagOptions();
            ElNotification.success({title: 'success', message: `${props.id ? 'update' : 'add'} tag sucess`})
            sizeForm.value = {pid: '', name: ''};
            router.push('/tag')
        } else {
            ElNotification.error({title: 'success', message: 'add tag sucess'})
        }
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
  fetchtagOptions();
  props.id && fetchtagDataById();
});
</script>

<style lang="scss" scoped module="sy">
.form-style {
  margin: 12px;
}
</style>
