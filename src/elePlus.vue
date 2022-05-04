<template>
  <el-config-provider :size="'small'" :z-index="zIndex">
    <App />
  </el-config-provider>
</template>

<script lang="ts" >
import App from "@/App.vue";
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  components: {
    ElConfigProvider,
    App
  },
  setup() {
    return {
      zIndex: 3000,
    }
  },
})
</script>