<template>
  <div class="pageModal" v-if="modalVisible">
    <el-dialog :title="title" v-model="modalVisible" width="30%" center destroy-on-close>
      <AuForm v-bind="pageModalConfig" v-model="formData" ref="pageFormRef" />
      <slot />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modalVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmCick(pageFormRef?.formRef)"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-card />
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue"
import AuForm from "@/base-ui/form"
import type { FormInstance } from "element-plus"

import { useSystemStore } from "@/store/modules/system"
import message from "@/utils/message"

const props = defineProps({
  pageModalConfig: {
    type: Object,
    required: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  },
  pageName: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  }
})

const store = useSystemStore()
const pageFormRef = ref<InstanceType<typeof AuForm>>()

// 1.绑定属性
const formData = ref<any>({})
const modalVisible = ref(false)
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.pageModalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
  },
  { deep: true }
)
// watch(
//   formData,
//   (newValue) => {
//     console.log(newValue)
//   },
//   { deep: true }
// )
// 点击确认按钮的逻辑
const handleConfirmCick = async (formEl: FormInstance | undefined) => {
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    console.log("编辑")
  } else {
    // 新建
    console.log("新建")
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const res = await store.addPageDataAction({
          pageName: props.pageName,
          addData: { ...formData.value, ...props.otherInfo }
        })
        if (res.code !== 200) {
          return message.error("添加失败")
        }
        message.success("添加成功")
        modalVisible.value = false
      } else {
        console.log("error submit!", fields)
      }
    })
  }
}
defineExpose({
  modalVisible,
  formData,
  handleConfirmCick
})
</script>
<style lang="scss" scoped></style>
