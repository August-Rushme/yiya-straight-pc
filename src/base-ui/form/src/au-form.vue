<template>
  <div class="au-form">
    <div class="header">
      <slot name="header" />
    </div>
    <el-form :label-width="labelWidth" :label-position="labelPosition" :model="formData" ref="formRef">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :prop="item.field"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option v-for="option in item.options" :key="option.value" :value="option.value">{{
                    option.label
                  }}</el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'treeSelect'">
                <el-tree-select
                  v-model="formData[`${item.field}`]"
                  :data="item.options"
                  check-strictly
                  clearable
                  style="width: 100%"
                />
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%" v-bind="item.otherOptions" v-model="formData[`${item.field}`]" />
              </template>
              <template v-else-if="item.type === 'menuIcon'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 50%; margin-right: 6px"
                  v-model="formData[`${item.field}`]"
                /><el-button v-if="formData[`${item.field}`]" :disabled="true">
                  <!-- <svg-icon :name="formData[`${item.field}`]" /> -->
                  <i :class="formData[`${item.field}`]"
                /></el-button>
                <el-popover :visible="modal" placement="top" width="50vw" title="请选择图标">
                  <icons @success="onSuccess($event, item.field)" />
                  <template #reference>
                    <el-button @click="handleClickChoose">选择图标</el-button>
                  </template>
                </el-popover>
              </template>
              <template v-else-if="item.type === 'switch'">
                <el-switch
                  v-model="formData[`${item.field}`]"
                  inline-prompt
                  :size="item.size"
                  active-text="是"
                  inactive-text="否"
                  v-bind="item.otherOptions"
                />
              </template>
              <template v-else-if="item.type === 'upload'">
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:8081/clinic/upload/"
                  drag
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="formData[`${item.field}`]" :src="formData[`${item.field}`]" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                  <div class="el-upload__text mt-1">拖拽或者 <em>点击上传</em></div>
                </el-upload>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, watch } from "vue"
import type { FormInstance, UploadProps } from "element-plus"
import icons from "@/icons/icon.vue"
import { IFormItem } from "../types"
import message from "@/utils/message"

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  labelWidth: {
    type: String,
    default: "100px"
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: "10px 40px" })
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    })
  },
  inline: {
    type: Boolean,
    default: false
  },
  labelPosition: {
    type: String as PropType<"left" | "right" | "top">,
    default: "top"
  }
})
const emit = defineEmits(["update:modelValue"])

const formRef = ref<FormInstance>()
const formData = ref({ ...props.modelValue })

watch(
  formData,
  (newValue) => {
    emit("update:modelValue", newValue)
  },
  {
    deep: true
  }
)

/**
 *处理值变化
 * @param {any} value 改变的值
 * @param {string} field 绑定的字段
 */
// const handleValueChange = (value: any, field: string) => {
//   emit("update:modelValue", { ...props.modelValue, [field]: value })
// }

// 图标选择相关
const modal = ref(false)
const handleClickChoose = () => {
  modal.value = !modal.value
}
const onSuccess = (val: string, field: string) => {
  formData.value[`${field}`] = val
  modal.value = false
}

// 头像上传相关
const beforeAvatarUpload = (file: File) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("只能上传 JPG/PNG 格式的图片!")
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("图片大小不能超过 2MB!")
  }
  return isJpgOrPng && isLt2M
}

const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  console.log(uploadFile)
  formData.value["img"] = response.data
}
// 重置表单
const rerestFormDate = () => {
  formData.value = {}
}
defineExpose({
  formData,
  formRef,
  rerestFormDate
})
</script>

<style scoped>
.au-form {
  padding-top: 22px;
}
.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
}
</style>
