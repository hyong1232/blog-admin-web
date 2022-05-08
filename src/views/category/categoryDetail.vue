<template>
  <el-form
    ref="form"
    :model="sizeForm"
    label-width="auto"
    :class="sy['form-style']"
    :label-position="'right'"
    :size="'large'"
  >
    <el-form-item label="Activity zone">
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
          :key="i"
          :label="op.name"
          :value="op._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity name">
      <el-input v-model="sizeForm.name" clearable size="large" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{
        id ? "submit" : "created"
      }}</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { request } from "@/hooks/request";
import { reactive, toRefs, ref, onMounted } from "vue";

const categoryOptions = ref<any>([]);

const props = defineProps({
  id: String,
});

const sizeForm = reactive({
  pid: "",
  name: "",
});

const fetchCategoryData = async () => {
  try {
    const res = await request({ url: "/category", method: "get" });
    categoryOptions.value = res.data;
  } catch (e) {
    console.error(e);
  }
};

const onSubmit = async (params: any) => {
  console.log(params);
};

onMounted(() => {
  fetchCategoryData();
});
</script>

<style lang="scss" scoped module="sy">
.form-style {
  margin: 12px;
}
</style>
