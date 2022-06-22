<!--
 * @Author: Kenny
 * @Date: 2022-06-17 14:54:19
 * @LastEditors: Kenny
 * @LastEditTime: 2022-06-22 18:45:59
 * @FilePath: \yiya-straight-pc\src\components\page-search\src\page-search.vue
-->
<template>
  <div class="page-search">
    <au-form v-bind="searchFormConfig" v-model:modelValue="formData">
      <template #header>
        <h1 class="header flex flex-center">{{ searchFormConfig?.title }}</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon class="mr1"><Refresh /></el-icon>
            重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick">
            <el-icon class="mr1"><Search /></el-icon>
            搜索</el-button
          >
        </div>
      </template>
    </au-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import auForm from "@/base-ui/form"

const props = defineProps({
  searchFormConfig: {
    type: Object,
    reuqired: true
  }
})
const emit = defineEmits(["resetBtnClick", "queryBtnClick"])
// 双向绑定的属性应该是由配置文件的field来决定
// 1.优化一: formData中的属性应该动态来决定
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  if (typeof item.field === "object") {
    item.field.forEach((e: string) => {
      formOriginData[e] = ""
    })
  } else {
    formOriginData[item.field] = ""
  }
}
const formData = ref(formOriginData)

// 2.优化二: 当用户点击重置
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  formData.value = formOriginData
  emit("resetBtnClick")
}

// 3.优化三: 当用户点击搜索
const handleQueryClick = () => {
  emit("queryBtnClick", formData.value)
}
</script>

<style lang="scss" scoped>
.handle-btns {
  text-align: right;
  padding: 0 40px 0 0;
}
</style>
