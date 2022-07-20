<template>
  <div class="pageModal" v-if="modalVisible">
    <el-drawer v-model="modalVisible" :title="title" :direction="direction">
      <AuForm v-bind="pageModalConfig" v-model="formData" ref="pageFormRef" />
      <slot />
      <template #footer>
        <div style="flex: auto">
          <span class="dialog-footer">
            <el-button @click="modalVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfirmCick(pageFormRef?.formRef)"> 确 定 </el-button>
          </span>
        </div>
      </template>
    </el-drawer>
    <!-- <el-dialog :title="title" v-model="modalVisible" width="30%" center destroy-on-close>
      <AuForm v-bind="pageModalConfig" v-model="formData" ref="pageFormRef" />
      <slot />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modalVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmCick(pageFormRef?.formRef)"> 确 定 </el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>
<script setup lang="ts">
import { PropType, ref, watch } from "vue"
import AuForm from "@/base-ui/form"
import type { FormInstance } from "element-plus"

import { useSystemStore } from "@/store/modules/system"
import message from "@/utils/message"
import cache from "@/utils/cache"

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
  },
  direction: {
    type: String as PropType<"ltr" | "rtl" | "ttb" | "btt">,
    default: "rtl"
  }
})

const store = useSystemStore()
const pageFormRef = ref<InstanceType<typeof AuForm>>()
const userInfo = cache.getCache("userInfo")

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

    store.editPageDataAction({ editData: { ...formData.value, id: props.defaultInfo.id }, pageName: props.pageName })
    modalVisible.value = false
  } else {
    // 新建
    console.log("新建")
    if (props.pageName === "doctorOrder") {
      formData.value.id = userInfo.clinicId
    }
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
