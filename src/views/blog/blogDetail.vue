<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    @submit.native.prevent
    label-width="120px"
    :class="sy['form-style']"
    :size="'large'"
  >
    <el-form-item label="title" prop="title">
      <el-input
        v-model="ruleForm.title"
        placeholder="please enter article title"
      />
    </el-form-item>
    <el-form-item label="tag" prop="tag">
      <el-select
        clearable
        multiple
        filterable
        v-model="ruleForm.tag"
        placeholder="please choose tag"
      >
        <el-option
          v-for="ta in tagArr"
          :key="ta?._id"
          :label="ta?.name"
          :value="ta?._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="category" prop="category">
      <el-select
        clearable
        filterable
        v-model="ruleForm.category"
        placeholder="please choose category"
      >
        <el-option
          v-for="ca in categoryArr"
          :key="ca._id"
          :label="ca.name"
          :value="ca._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="author" prop="author">
      <el-select
        clearable
        filterable
        v-model="ruleForm.author"
        placeholder="please choose author"
      >
        <el-option
          v-for="au in authorArr"
          :key="au._id"
          :label="au.username"
          :value="au._id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="url" prop="url">
      <el-input v-model="ruleForm.url" placeholder="please enter article url" />
    </el-form-item>
    <el-form-item label="summary" prop="summary">
      <el-input
        type="textarea"
        v-model="ruleForm.summary"
        placeholder="please enter article summury"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">{{
        id ? "Update" : "Create"
      }}</el-button>
      <el-button native-type="submit" @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { request } from "@/hooks/request";
import { reactive, toRefs, ref, onMounted } from "vue";
import { ElNotification } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
let ruleForm = ref({
  title: "",
  category: "",
  tag: "",
  author: "",
  summary: "",
  url: "",
});

const authorArr = ref<any[]>([]);
const tagArr = ref<any[]>([]);
const categoryArr = ref<any[]>([]);

const rules = reactive<FormRules>({
  title: [{ required: true, message: "Please input title", trigger: "blur" }],
  tag: [
    {
      //   type: "array",
      required: false,
      message: "Please select at least one tag",
      trigger: "change",
    },
  ],
  category: [
    {
      //   type: "array",
      required: true,
      message: "Please select at least one category",
      trigger: "change",
    },
  ],
  author: [
    {
      required: true,
      //   type: "array",
      message: "Please select at least one author",
      trigger: "change",
    },
  ],
  summary: [
    {
      required: true,
      message: "Please enter a summary",
      trigger: "change",
    },
  ],
  url: [
    {
      required: true,
      //   pattern: new RegExp('\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)'),
      message: "Please enter a link in the correct format",
      trigger: "change",
    },
  ],
});

const router = useRouter();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  const vali = await formEl.validate();
  if (vali) {
    const body = {
      ...ruleForm.value,
    };
    try {
      const method = props?.id ? "put" : "post";
      const res = await request({ url: props?.id ? `/article/${props?.id}` : '/article', method, body });
      if (res.code === 200) {
        ElNotification.success({
          title: "success",
          message: "save article data success",
        });
        ruleForm.value  = {};
        // router.push("/blog");
      } else {
        ElNotification.error({
          title: "error",
          message: "save article data failed",
        });
      }
    } catch (e: any) {
      ElNotification.error({ title: "error", message: e.message });
      console.error(e);
    }
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const props = defineProps({
  id: String,
});

const fetchGridDataById = async () => {
  try {
    const res = await request({ url: `/article/${props.id}`, method: "get" });
    ruleForm.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchTags = async () => {
    const params = {
        limit: 100,
        sort: "createdAt",
    }
  try {
    const res = await request({ url: `/tag`, method: "get" , params: {query: JSON.stringify(params)}});
    if (res.code === 200) {
      tagArr.value = res.data;
    } else {
      ElNotification.error({
        title: "error",
        message: "fetch tags data failed",
      });
    }
  } catch (e: any) {
    ElNotification.error({ title: "error", message: e.message });
    console.error(e);
  }
};
const fetchCategories = async () => {
  try {
    const res = await request({ url: `/category`, method: "get" });
    if (res.code === 200) {
      categoryArr.value = res.data;
    } else {
      ElNotification.error({
        title: "error",
        message: "fetch catetory data failed",
      });
    }
  } catch (e: any) {
    ElNotification.error({ title: "error", message: e.message });
    console.error(e);
  }
};

const fetchUsers = async () => {
  try {
    const res = await request({ url: `/users`, method: "get" });
    if (res.code === 200) {
      authorArr.value = res.data;
    } else {
      ElNotification.error({
        title: "error",
        message: "fetch author data failed",
      });
    }
  } catch (e: any) {
    ElNotification.error({ title: "error", message: e.message });
    console.error(e);
  }
};

onMounted(() => {
  fetchTags();
  fetchCategories();
  fetchUsers();
  props?.id && fetchGridDataById();
});
</script>

<style lang="scss" scoped module="sy">
.form-style {
  margin: 12px;
  width: 60%;
}
</style>
