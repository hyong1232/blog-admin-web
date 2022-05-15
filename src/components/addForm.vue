<template>
  <el-dialog v-model="showDialog" :title="title">
    <el-form ref="ruleFormRef" :rules="rules" :model="form"  @submit.native.prevent>
      <template v-for="(item, key) in formOptions" :key="key">
        <el-form-item
          v-if="item?.type === 'select'"
          :label="item.label"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form[key]"
            :placeholder="item?.placeholder || `Please select a ${item.label}`"
          >
            <el-option
              v-for="(op, i) in item.options"
              :key="i"
              :label="op.label"
              :value="op.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-else-if="item.type === 'date'"
          :label="item.label"
          :prop="item.prop"
        >
          <el-time-picker
            v-model="form[item?.key]"
            :label="item?.label"
            placeholder="pick a end time"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item
          v-else-if="item.type === 'doubleDetaPicker'"
          :label="item.label"
          :prop="item.prop"
        >
          <el-col :span="11">
            <el-form-item :prop="item?.start?.propl">
              <el-date-picker
                v-model="form[item?.start?.key]"
                type="date"
                :label="item?.start?.lable"
                placeholder="pick a start time"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item :prop="item?.end?.prop">
              <el-time-picker
                v-model="form[item?.end?.key]"
                :label="item?.end?.label"
                placeholder="pick a end time"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          v-else-if="item.type === 'switch'"
          :label="item.label"
          :prop="item.prop"
        >
          <el-switch v-model="form[key]" />
        </el-form-item>
        <el-form-item
          v-else-if="item.type === 'checkbox'"
          :label="item.label"
          :prop="item.prop"
        >
          <el-checkbox-group v-model="form[key]">
            <el-checkbox
              v-for="(ck, i) in item.checkboxs"
              :label="ck.label"
              :name="ck.label"
            />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          v-else-if="item.type === 'radio'"
          :label="item.label"
          :prop="item.prop"
        >
          <el-radio-group v-model="form[key]">
            <el-radio
              v-for="(ra, i) in item.radios"
              :key="i"
              :label="ra.label"
              :value="ra.value"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-else-if="item.type === 'textarea'"
          :prop="item.prop"
          :label="item.label"
          :label-width="formLabelWidth"
        >
          <el-input
            :placeholder="item?.placeholder || `Please select a ${item.label}`"
            type="textarea"
            v-model="form[key]"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          v-else
          :prop="item.prop"
          :label="item.label"
          :label-width="formLabelWidth"
        >
          <el-input
            :placeholder="item?.placeholder || `Please select a ${item.label}`"
            v-model="form[key]"
            autocomplete="off"
          />
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
        <el-button
          native-type="submit"
          type="primary"
          @click="onSubmit"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, toRefs, ref } from "vue";
const showDialog = ref(false);
const formLabelWidth = "140px";
const props = defineProps({
  title: String,
  formOptions: Object,
  rules: {
      type: any,
      required: false,
  }
});
const ruleFormRef = ref<FormInstance>()
let form: any = ref({});
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    try {
        await formEl.validate();
        console.log(form);
    } catch(e: any) {
        console.error(e);
    }
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  showDialog.value = false;
}
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
